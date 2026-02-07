import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as DeviceActions from './device.actions';
import { DeviceService } from '../../services/device.service';

@Injectable()
export class DeviceEffects {
  private actions$ = inject(Actions);
  private deviceService = inject(DeviceService);

  loadDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceActions.loadDevices),
      switchMap(() =>
        this.deviceService.loadDevices().pipe(
          map(devices => DeviceActions.loadDevicesSuccess({ devices })),
          catchError(error => of(DeviceActions.loadDevicesSuccess({ devices: [] })))
        )
      )
    );
  });
}
