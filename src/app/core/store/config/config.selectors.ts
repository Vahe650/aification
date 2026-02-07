import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ConfigState } from './config.reducer';

export const selectConfigState = (state: AppState) => state.config;

export const selectCurrentConfig = createSelector(
  selectConfigState,
  (state: ConfigState) => state.currentConfig
);

export const selectConfigLoading = createSelector(
  selectConfigState,
  (state: ConfigState) => state.loading
);

export const selectConfigError = createSelector(
  selectConfigState,
  (state: ConfigState) => state.error
);

export const selectConfigValidation = createSelector(
  selectConfigState,
  (state: ConfigState) => ({
    isValid: state.isValid,
    errors: state.validationErrors
  })
);
