import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../../core/store/app.reducer';
import { Device, DeviceType } from '../../../../core/models/device.model';
import * as DeviceActions from '../../../../core/store/device/device.actions';
import { selectDevices } from '../../../../core/store/device/device.selectors';

@Component({
  selector: 'app-simulation-panel',
  templateUrl: './simulation-panel.component.html',
  styleUrls: ['./simulation-panel.component.scss']
})
export class SimulationPanelComponent implements OnInit, OnDestroy {
  devices$: Observable<Device[]>;
  simulationValues: { [deviceId: string]: number } = {};
  isSimulating = false;
  private subscription?: Subscription;

  constructor(private store: Store<AppState>) {
    this.devices$ = this.store.select(selectDevices);
  }

  ngOnInit(): void {
    this.subscription = this.devices$.subscribe(devices => {
      devices.forEach(device => {
        if (this.simulationValues[device.id] === undefined) {
          this.simulationValues[device.id] = 0;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onValueChange(deviceId: string, value: number): void {
    this.simulationValues[deviceId] = value;
    this.store.dispatch(DeviceActions.simulateDeviceValue({ deviceId, value }));
  }

  startSimulation(): void {
    this.isSimulating = true;
    // Add real-time simulation logic here
  }

  stopSimulation(): void {
    this.isSimulating = false;
  }

  getDeviceLabel(device: Device): string {
    switch (device.type) {
      case DeviceType.LIGHT_SENSOR:
        return 'Яркость света';
      case DeviceType.SMOKE_SENSOR:
        return 'Уровень дыма';
      case DeviceType.ULTRASONIC_SENSOR:
        return 'Расстояние';
      default:
        return 'Значение';
    }
  }

  getDeviceRange(device: Device): { min: number; max: number } {
    switch (device.type) {
      case DeviceType.LIGHT_SENSOR:
        return { min: 0, max: 100 };
      case DeviceType.SMOKE_SENSOR:
        return { min: 0, max: 100 };
      case DeviceType.ULTRASONIC_SENSOR:
        return { min: 0, max: 200 };
      default:
        return { min: 0, max: 100 };
    }
  }
}
