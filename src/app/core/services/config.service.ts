import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Configuration } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly STORAGE_KEY = 'iot_sandbox_config';
  private readonly API_URL = '/api/configurations'; // Replace with actual API URL

  loadConfiguration(): Observable<Configuration | null> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        return of({
          ...config,
          createdAt: config.createdAt ? new Date(config.createdAt) : new Date(),
          updatedAt: config.updatedAt ? new Date(config.updatedAt) : new Date()
        });
      } catch (e) {
        return of(null);
      }
    }
    return of(null);
  }

  saveConfiguration(config: Configuration): Observable<Configuration> {
    // Save to localStorage
    const configToSave = {
      ...config,
      updatedAt: new Date()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(configToSave));

    // Simulate API call
    return of(configToSave).pipe(delay(500));
  }

  submitConfiguration(config: Configuration): Observable<{ success: boolean; orderId?: string }> {
    // Simulate API call to submit configuration for firmware creation
    return of({
      success: true,
      orderId: `ORDER-${Date.now()}`
    }).pipe(delay(1000));
  }

  validateConfiguration(config: Configuration): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.name || config.name.trim().length === 0) {
      errors.push('Название конфигурации обязательно');
    }

    if (!config.devices || config.devices.length === 0) {
      errors.push('Добавьте хотя бы одно устройство');
    }

    // Validate device limits
    const deviceCounts: { [key: string]: number } = {};
    config.devices.forEach(device => {
      deviceCounts[device.type] = (deviceCounts[device.type] || 0) + 1;
    });

    // Check limits (this should be done based on device templates)
    // Implementation depends on your business logic

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
