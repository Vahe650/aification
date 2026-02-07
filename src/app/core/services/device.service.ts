import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device.model';

export interface GridConfig {
  cardWidth: number;
  cardHeight: number;
  spacing: number;
  startX: number;
  startY: number;
  columns: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly STORAGE_KEY = 'iot_sandbox_devices';

  readonly gridConfig: GridConfig = {
    cardWidth: 260,
    cardHeight: 130,
    spacing: 20,
    startX: 20,
    startY: 20,
    columns: 3
  };

  calculateGridPosition(deviceIndex: number): { x: number; y: number } {
    const { cardWidth, cardHeight, spacing, startX, startY, columns } = this.gridConfig;
    const col = deviceIndex % columns;
    const row = Math.floor(deviceIndex / columns);
    return {
      x: startX + col * (cardWidth + spacing),
      y: startY + row * (cardHeight + spacing)
    };
  }

  loadDevices(): Observable<Device[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const devices = JSON.parse(stored);
        return of(devices.map((d: any) => ({
          ...d,
          createdAt: d.createdAt ? new Date(d.createdAt) : new Date()
        })));
      } catch (e) {
        return of([]);
      }
    }
    return of([]);
  }

  saveDevices(devices: Device[]): Observable<Device[]> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(devices));
    return of(devices);
  }
}
