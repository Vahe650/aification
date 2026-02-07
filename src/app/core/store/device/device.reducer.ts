import { createReducer, on } from '@ngrx/store';
import { Device } from '../../models/device.model';
import * as DeviceActions from './device.actions';

export interface DeviceState {
  devices: Device[];
  loading: boolean;
  error: string | null;
}

export const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null
};

export const deviceReducer = createReducer(
  initialState,
  on(DeviceActions.loadDevices, (state) => ({
    ...state,
    loading: true
  })),
  on(DeviceActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices,
    loading: false
  })),
  on(DeviceActions.addDevice, (state, { device }) => ({
    ...state,
    devices: [...state.devices, device]
  })),
  on(DeviceActions.updateDevice, (state, { device }) => ({
    ...state,
    devices: state.devices.map(d => d.id === device.id ? device : d)
  })),
  on(DeviceActions.removeDevice, (state, { deviceId }) => ({
    ...state,
    devices: state.devices.filter(d => d.id !== deviceId)
  })),
  on(DeviceActions.updateDevicePosition, (state, { deviceId, position }) => ({
    ...state,
    devices: state.devices.map(d =>
      d.id === deviceId ? { ...d, position } : d
    )
  })),
  on(DeviceActions.updateDeviceThreshold, (state, { deviceId, threshold }) => ({
    ...state,
    devices: state.devices.map(d =>
      d.id === deviceId ? { ...d, threshold } : d
    )
  })),
  on(DeviceActions.simulateDeviceValue, (state, { deviceId, value }) => ({
    ...state,
    devices: state.devices.map(d => {
      if (d.id === deviceId) {
        const updatedDevice = { ...d, currentValue: value };
        // Auto-activate device based on threshold
        if (d.threshold.triggerValue !== undefined) {
          updatedDevice.isActive = value >= d.threshold.triggerValue;
        } else if (d.threshold.min !== undefined && d.threshold.max !== undefined) {
          updatedDevice.isActive = value >= d.threshold.min && value <= d.threshold.max;
        }
        return updatedDevice;
      }
      return d;
    })
  })),
  on(DeviceActions.toggleDeviceActive, (state, { deviceId }) => ({
    ...state,
    devices: state.devices.map(d =>
      d.id === deviceId ? { ...d, isActive: !d.isActive } : d
    )
  })),
  on(DeviceActions.resetDevices, () => initialState)
);
