import { createAction, props } from '@ngrx/store';
import { Device, DeviceType } from '../../models/device.model';

export const loadDevices = createAction('[Device] Load Devices');
export const loadDevicesSuccess = createAction(
  '[Device] Load Devices Success',
  props<{ devices: Device[] }>()
);

export const addDevice = createAction(
  '[Device] Add Device',
  props<{ device: Device }>()
);

export const updateDevice = createAction(
  '[Device] Update Device',
  props<{ device: Device }>()
);

export const removeDevice = createAction(
  '[Device] Remove Device',
  props<{ deviceId: string }>()
);

export const updateDevicePosition = createAction(
  '[Device] Update Device Position',
  props<{ deviceId: string; position: { x: number; y: number } }>()
);

export const updateDeviceThreshold = createAction(
  '[Device] Update Device Threshold',
  props<{ deviceId: string; threshold: any }>()
);

export const simulateDeviceValue = createAction(
  '[Device] Simulate Device Value',
  props<{ deviceId: string; value: number }>()
);

export const toggleDeviceActive = createAction(
  '[Device] Toggle Device Active',
  props<{ deviceId: string }>()
);

export const resetDevices = createAction('[Device] Reset Devices');
