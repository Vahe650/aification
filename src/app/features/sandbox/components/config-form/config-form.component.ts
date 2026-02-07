import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../../../core/store/app.reducer';
import { Configuration } from '../../../../core/models/config.model';
import * as ConfigActions from '../../../../core/store/config/config.actions';
import * as DeviceActions from '../../../../core/store/device/device.actions';
import { selectDevices } from '../../../../core/store/device/device.selectors';
import { selectCurrentConfig } from '../../../../core/store/config/config.selectors';
import { ConfigService } from '../../../../core/services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  devices$: Observable<any[]>;
  config$: Observable<Configuration | null>;
  isSubmitting = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private configService: ConfigService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.devices$ = this.store.select(selectDevices);
    this.config$ = this.store.select(selectCurrentConfig);
  }

  ngOnInit(): void {
    const configSub = this.config$.subscribe(config => {
      if (config) {
        this.form.patchValue({
          name: config.name,
          description: config.description
        });
      }
    });
    this.subscriptions.push(configSub);

    const descSub = this.form.get('description')?.valueChanges.subscribe(description => {
      this.store.dispatch(ConfigActions.updateConfigurationDescription({ description }));
    });
    if (descSub) {
      this.subscriptions.push(descSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSave(): void {
    if (this.form.valid) {
      this.devices$.pipe(take(1)).subscribe(devices => {
        const config: Configuration = {
          id: `config-${Date.now()}`,
          name: this.form.value.name,
          description: this.form.value.description,
          devices: devices,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const validation = this.configService.validateConfiguration(config);
        if (validation.isValid) {
          this.store.dispatch(ConfigActions.saveConfiguration({ config }));
          this.snackBar.open('Конфигурация сохранена', 'Закрыть', { duration: 2000 });
        } else {
          this.snackBar.open(`Ошибка: ${validation.errors.join(', ')}`, 'Закрыть', { duration: 3000 });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.devices$.pipe(take(1)).subscribe(devices => {
        const config: Configuration = {
          id: `config-${Date.now()}`,
          name: this.form.value.name,
          description: this.form.value.description,
          devices: devices,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const validation = this.configService.validateConfiguration(config);
        if (validation.isValid) {
          this.configService.submitConfiguration(config).subscribe({
            next: (result) => {
              this.isSubmitting = false;
              this.snackBar.open(
                `Заказ успешно отправлен! ID: ${result.orderId}`,
                'Закрыть',
                { duration: 5000 }
              );
            },
            error: (error) => {
              this.isSubmitting = false;
              this.snackBar.open(`Ошибка отправки: ${error.message}`, 'Закрыть', { duration: 3000 });
            }
          });
        } else {
          this.isSubmitting = false;
          this.snackBar.open(`Ошибка валидации: ${validation.errors.join(', ')}`, 'Закрыть', { duration: 3000 });
        }
      });
    }
  }

  onReset(): void {
    if (confirm('Вы уверены, что хотите сбросить все устройства?')) {
      this.store.dispatch(DeviceActions.resetDevices());
      this.form.reset();
      this.snackBar.open('Конфигурация сброшена', 'Закрыть', { duration: 2000 });
    }
  }
}
