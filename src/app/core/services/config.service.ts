import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Configuration, ConfigurationTemplate } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly STORAGE_KEY = 'iot_sandbox_config';
  private readonly TEMPLATES_KEY = 'iot_sandbox_custom_templates';
  private readonly API_URL = '/api/configurations'; // Replace with actual API URL

  private templatesUpdated$ = new Subject<void>();
  templatesChanged$ = this.templatesUpdated$.asObservable();

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

  getCustomTemplates(): ConfigurationTemplate[] {
    const stored = localStorage.getItem(this.TEMPLATES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  saveAsTemplate(name: string, description: string, devices: any[]): ConfigurationTemplate {
    const template: ConfigurationTemplate = {
      id: `custom-${Date.now()}`,
      name,
      description,
      devices: devices.map(d => ({
        type: d.type,
        name: d.name,
        threshold: d.threshold,
        dependsOn: d.dependsOn,
        affects: d.affects
      }))
    };

    const templates = this.getCustomTemplates();
    templates.push(template);
    localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));

    console.log('[Save as Template] Template JSON:', JSON.stringify(template, null, 2));

    this.templatesUpdated$.next();

    return template;
  }

  deleteCustomTemplate(templateId: string): void {
    const templates = this.getCustomTemplates().filter(t => t.id !== templateId);
    localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));
    this.templatesUpdated$.next();
  }
}
