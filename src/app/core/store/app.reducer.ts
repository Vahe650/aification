import { ActionReducerMap } from '@ngrx/store';
import { deviceReducer, DeviceState } from './device/device.reducer';
import { configReducer, ConfigState } from './config/config.reducer';

export interface AppState {
  devices: DeviceState;
  config: ConfigState;
}

export const appReducer: ActionReducerMap<AppState> = {
  devices: deviceReducer,
  config: configReducer
};
