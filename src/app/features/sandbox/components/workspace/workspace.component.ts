import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../../../core/store/app.reducer';
import { Device, DeviceType, DEVICE_TEMPLATES } from '../../../../core/models/device.model';
import * as DeviceActions from '../../../../core/store/device/device.actions';
import { selectDevices } from '../../../../core/store/device/device.selectors';
import { DeviceSettingsDialogComponent } from '../device-settings-dialog/device-settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from '../../../../core/services/i18n.service';
import { DeviceService } from '../../../../core/services/device.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('workspaceContent', { static: false }) workspaceContentRef!: ElementRef<HTMLElement>;
  devices$: Observable<Device[]>;
  draggedDeviceType: DeviceType | null = null;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private i18nService: I18nService,
    private deviceService: DeviceService
  ) {
    this.devices$ = this.store.select(selectDevices);
  }

  ngOnInit(): void {
    // Load devices on init
  }

  onWorkspaceDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const deviceType = event.dataTransfer?.getData('deviceType') as DeviceType;
    if (!deviceType) return;

    const template = DEVICE_TEMPLATES.find(t => t.type === deviceType);
    if (!template) return;

    this.devices$.pipe(take(1)).subscribe(devices => {
      const typeCount = devices.filter(d => d.type === deviceType).length;
      const deviceName = this.i18nService.translate(`device.${deviceType}`);

      // Calculate position based on total device count (grid layout)
      const position = this.deviceService.calculateGridPosition(devices.length);

      const device: Device = {
        id: `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: deviceType,
        name: `${deviceName} ${typeCount + 1}`,
        position,
        threshold: { ...template.defaultThreshold },
        isActive: false,
        icon: template.icon
      };

      this.store.dispatch(DeviceActions.addDevice({ device }));
    });
  }

  onWorkspaceDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDeviceClick(device: Device): void {
    const dialogRef = this.dialog.open(DeviceSettingsDialogComponent, {
      width: '500px',
      data: { device }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(DeviceActions.updateDevice({ device: result }));
      }
    });
  }

  onDeviceDelete(device: Device): void {
    this.store.dispatch(DeviceActions.removeDevice({ deviceId: device.id }));
  }

  onDeviceToggle(device: Device): void {
    this.store.dispatch(DeviceActions.toggleDeviceActive({ deviceId: device.id }));
  }

  onDevicePositionChange(device: Device, position: { x: number; y: number }): void {
    // Просто обновляем позицию без проверки коллизий при перемещении
    // Пользователь может размещать устройства где угодно, даже если они перекрываются
    this.store.dispatch(DeviceActions.updateDevicePosition({ 
      deviceId: device.id, 
      position: {
        x: Math.max(0, position.x),
        y: Math.max(0, position.y)
      }
    }));
  }

  onDeviceDragStart(device: Device, event: DragEvent): void {
    // Prevent default drag behavior for workspace devices
    event.stopPropagation();
  }
}
