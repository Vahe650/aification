import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Device, DeviceType, Voltage } from '../../../../core/models/device.model';

@Component({
  selector: 'app-device-settings-dialog',
  templateUrl: './device-settings-dialog.component.html',
  styleUrls: ['./device-settings-dialog.component.scss']
})
export class DeviceSettingsDialogComponent {
  form: FormGroup;
  device: Device;
  allDevices: Device[];
  sensors: Device[];
  devices: Device[];
  isSensor: boolean;

  private sensorTypes: DeviceType[] = [
    DeviceType.LIGHT_SENSOR,
    DeviceType.SMOKE_SENSOR,
    DeviceType.ULTRASONIC_SENSOR
  ];

  Voltage = Voltage;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeviceSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { device: Device; allDevices: Device[] }
  ) {
    this.device = data.device;
    this.allDevices = data.allDevices || [];
    this.isSensor = this.sensorTypes.includes(this.device.type);

    // Sensors can affect devices, Devices can depend on sensors
    this.sensors = this.allDevices.filter(d => this.sensorTypes.includes(d.type) && d.id !== this.device.id);
    this.devices = this.allDevices.filter(d => !this.sensorTypes.includes(d.type) && d.id !== this.device.id);

    this.form = this.fb.group({
      name: [this.device.name, Validators.required],
      triggerValue: [this.device.threshold.triggerValue || null],
      minValue: [this.device.threshold.min || null],
      maxValue: [this.device.threshold.max || null],
      speed: [this.device.threshold.speed || null],
      voltage: [this.device.threshold.voltage || Voltage.V12],
      current: [this.device.threshold.current || null],
      dependsOn: [this.device.dependsOn || []],
      affects: [this.device.affects || []]
    });

    // Автоматически обновляем ограничения тока при изменении вольтажа
    this.form.get('voltage')?.valueChanges.subscribe(voltage => {
      const currentControl = this.form.get('current');
      if (voltage === Voltage.V12) {
        currentControl?.setValidators([Validators.max(5)]);
        if (currentControl?.value && currentControl.value > 5) {
          currentControl.setValue(5);
        }
      } else {
        currentControl?.clearValidators();
      }
      currentControl?.updateValueAndValidity();
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const updatedDevice: Device = {
        ...this.device,
        name: formValue.name,
        threshold: {
          triggerValue: formValue.triggerValue,
          min: formValue.minValue,
          max: formValue.maxValue,
          speed: formValue.speed,
          voltage: formValue.voltage,
          current: formValue.current
        },
        dependsOn: formValue.dependsOn,
        affects: formValue.affects
      };
      this.dialogRef.close(updatedDevice);
    }
  }

  isEngine(): boolean {
    return this.device.type === DeviceType.ENGINE;
  }

  isVoltage12V(): boolean {
    return this.form.get('voltage')?.value === Voltage.V12;
  }

  getVoltageOptions(): number[] {
    return [Voltage.V12, Voltage.V220];
  }

  getVoltageLabel(voltage: Voltage): string {
    return voltage === Voltage.V12 ? '12В' : '220В';
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
