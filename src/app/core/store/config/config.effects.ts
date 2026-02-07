import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as ConfigActions from './config.actions';
import { ConfigService } from '../../services/config.service';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);
  private configService = inject(ConfigService);

  loadConfiguration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.loadConfiguration),
      switchMap(() =>
        this.configService.loadConfiguration().pipe(
          map(config => ConfigActions.loadConfigurationSuccess({ config })),
          catchError(error => of(ConfigActions.loadConfigurationSuccess({ config: null })))
        )
      )
    );
  });

  saveConfiguration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.saveConfiguration),
      switchMap(({ config }) =>
        this.configService.saveConfiguration(config).pipe(
          map(savedConfig => ConfigActions.saveConfigurationSuccess({ config: savedConfig })),
          catchError(error => of(ConfigActions.saveConfigurationFailure({ error: error.message })))
        )
      )
    );
  });
}
