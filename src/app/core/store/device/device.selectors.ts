import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { DeviceState } from './device.reducer';

export const selectDeviceState = (state: AppState) => state.devices;

export const selectDevices = createSelector(
  selectDeviceState,
  (state: DeviceState) => state.devices
);

export const selectDeviceById = (deviceId: string) => createSelector(
  selectDevices,
  (devices) => devices.find(d => d.id === deviceId)
);

export const selectDevicesByType = (deviceType: string) => createSelector(
  selectDevices,
  (devices) => devices.filter(d => d.type === deviceType)
);

export const selectActiveDevices = createSelector(
  selectDevices,
  (devices) => devices.filter(d => d.isActive)
);
