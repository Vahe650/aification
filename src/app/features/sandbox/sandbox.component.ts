import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/store/app.reducer';
import { Device } from '../../core/models/device.model';
import { Configuration } from '../../core/models/config.model';
import * as DeviceActions from '../../core/store/device/device.actions';
import * as ConfigActions from '../../core/store/config/config.actions';
import { selectDevices } from '../../core/store/device/device.selectors';
import { selectCurrentConfig } from '../../core/store/config/config.selectors';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {
  devices$: Observable<Device[]>;
  config$: Observable<Configuration | null>;
  currentLanguage$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private i18nService: I18nService
  ) {
    this.devices$ = this.store.select(selectDevices);
    this.config$ = this.store.select(selectCurrentConfig);
    this.currentLanguage$ = this.i18nService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.i18nService.init();
    this.store.dispatch(DeviceActions.loadDevices());
    this.store.dispatch(ConfigActions.loadConfiguration());
  }

  onLanguageChange(lang: string): void {
    this.i18nService.setLanguage(lang as any);
  }
}
