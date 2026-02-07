import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store/app.reducer';
import { Device, DeviceType, DEVICE_TEMPLATES } from '../../../../core/models/device.model';
import { selectDevices } from '../../../../core/store/device/device.selectors';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { I18nService } from '../../../../core/services/i18n.service';

@Component({
  selector: 'app-device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.scss']
})
export class DevicePanelComponent {
  deviceTemplates = DEVICE_TEMPLATES;
  devices$: Observable<Device[]>;

  constructor(
    private store: Store<AppState>,
    private i18nService: I18nService
  ) {
    this.devices$ = this.store.select(selectDevices);
  }

  getDeviceName(type: DeviceType): string {
    return this.i18nService.translate(`device.${type}`);
  }

  canAddDevice(template: typeof DEVICE_TEMPLATES[0]): Observable<boolean> {
    return this.devices$.pipe(
      map(devices => {
        const count = devices.filter(d => d.type === template.type).length;
        return template.maxCount >= 999 || count < template.maxCount;
      })
    );
  }

  onDeviceDragStart(event: DragEvent, template: typeof DEVICE_TEMPLATES[0]): void {
    // Check limit synchronously
    this.devices$.pipe(take(1)).subscribe(devices => {
      const count = devices.filter(d => d.type === template.type).length;
      const canAdd = template.maxCount >= 999 || count < template.maxCount;

      if (!canAdd) {
        event.preventDefault();
        return;
      }

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('deviceType', template.type);
      }
    });
  }

  getDeviceCount(devices: Device[] | null, type: DeviceType): number {
    return devices ? devices.filter(d => d.type === type).length : 0;
  }

  getMaxCountDisplay(maxCount: number): string {
    return maxCount >= 999 ? '∞' : maxCount.toString();
  }
}
