import { createAction, props } from '@ngrx/store';
import { Configuration } from '../../models/config.model';

export const loadConfiguration = createAction('[Config] Load Configuration');
export const loadConfigurationSuccess = createAction(
  '[Config] Load Configuration Success',
  props<{ config: Configuration | null }>()
);

export const saveConfiguration = createAction(
  '[Config] Save Configuration',
  props<{ config: Configuration }>()
);

export const saveConfigurationSuccess = createAction(
  '[Config] Save Configuration Success',
  props<{ config: Configuration }>()
);

export const saveConfigurationFailure = createAction(
  '[Config] Save Configuration Failure',
  props<{ error: string }>()
);

export const updateConfigurationDescription = createAction(
  '[Config] Update Configuration Description',
  props<{ description: string }>()
);

export const loadTemplate = createAction(
  '[Config] Load Template',
  props<{ templateId: string }>()
);

export const validateConfiguration = createAction('[Config] Validate Configuration');
