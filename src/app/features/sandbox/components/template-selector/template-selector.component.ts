import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store/app.reducer';
import { CONFIGURATION_TEMPLATES } from '../../../../core/models/config.model';
import { Device, DEVICE_TEMPLATES } from '../../../../core/models/device.model';
import * as DeviceActions from '../../../../core/store/device/device.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../../../core/services/device.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent {
  templates = CONFIGURATION_TEMPLATES;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private deviceService: DeviceService
  ) {}

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
