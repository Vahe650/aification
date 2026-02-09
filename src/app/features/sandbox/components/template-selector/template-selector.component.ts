import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../core/store/app.reducer';
import { CONFIGURATION_TEMPLATES, ConfigurationTemplate } from '../../../../core/models/config.model';
import { Device, DEVICE_TEMPLATES } from '../../../../core/models/device.model';
import * as DeviceActions from '../../../../core/store/device/device.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../../../core/services/device.service';
import { ConfigService } from '../../../../core/services/config.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit, OnDestroy {
  builtInTemplates = CONFIGURATION_TEMPLATES;
  customTemplates: ConfigurationTemplate[] = [];
  private subscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private deviceService: DeviceService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadCustomTemplates();
    this.subscription = this.configService.templatesChanged$.subscribe(() => {
      this.loadCustomTemplates();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadCustomTemplates(): void {
    this.customTemplates = this.configService.getCustomTemplates();
  }

  isCustomTemplate(template: ConfigurationTemplate): boolean {
    return template.id.startsWith('custom-');
  }

  deleteTemplate(template: ConfigurationTemplate, event: Event): void {
    event.stopPropagation();
    if (confirm(`Удалить шаблон "${template.name}"?`)) {
      this.configService.deleteCustomTemplate(template.id);
      this.loadCustomTemplates();
      this.snackBar.open(`Шаблон "${template.name}" удалён`, 'Закрыть', { duration: 2000 });
    }
  }

  loadTemplate(template: typeof CONFIGURATION_TEMPLATES[0]): void {
    // Clear existing devices
    this.store.dispatch(DeviceActions.resetDevices());

    // Create devices from template
    setTimeout(() => {
      template.devices.forEach((deviceTemplate, index) => {
        const deviceTypeTemplate = DEVICE_TEMPLATES.find(t => t.type === deviceTemplate.type);
        if (deviceTypeTemplate) {
          const position = this.deviceService.calculateGridPosition(index);
          const device: Device = {
            id: `device-${Date.now()}-${index}`,
            type: deviceTemplate.type as any,
            name: deviceTemplate.name || `${deviceTypeTemplate.name} ${index + 1}`,
            position,
            threshold: { ...deviceTypeTemplate.defaultThreshold },
            isActive: false,
            icon: deviceTypeTemplate.icon
          };
          this.store.dispatch(DeviceActions.addDevice({ device }));
        }
      });
      this.snackBar.open(`Шаблон "${template.name}" загружен`, 'Закрыть', { duration: 2000 });
    }, 100);
  }
}
