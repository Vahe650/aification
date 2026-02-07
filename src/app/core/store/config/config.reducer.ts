import { createReducer, on } from '@ngrx/store';
import { Configuration } from '../../models/config.model';
import * as ConfigActions from './config.actions';

export interface ConfigState {
  currentConfig: Configuration | null;
  loading: boolean;
  error: string | null;
  isValid: boolean;
  validationErrors: string[];
}

export const initialState: ConfigState = {
  currentConfig: null,
  loading: false,
  error: null,
  isValid: true,
  validationErrors: []
};

export const configReducer = createReducer(
  initialState,
  on(ConfigActions.loadConfiguration, (state) => ({
    ...state,
    loading: true
  })),
  on(ConfigActions.loadConfigurationSuccess, (state, { config }) => ({
    ...state,
    currentConfig: config,
    loading: false
  })),
  on(ConfigActions.saveConfiguration, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ConfigActions.saveConfigurationSuccess, (state, { config }) => ({
    ...state,
    currentConfig: config,
    loading: false,
    error: null
  })),
  on(ConfigActions.saveConfigurationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ConfigActions.updateConfigurationDescription, (state, { description }) => ({
    ...state,
    currentConfig: state.currentConfig ? {
      ...state.currentConfig,
      description
    } : null
  })),
  on(ConfigActions.validateConfiguration, (state) => {
    const errors: string[] = [];
    // Add validation logic here
    return {
      ...state,
      isValid: errors.length === 0,
      validationErrors: errors
    };
  })
);
