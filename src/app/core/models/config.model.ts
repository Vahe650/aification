import { Device } from './device.model';

export interface Configuration {
  id: string;
  name: string;
  description: string;
  devices: Device[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfigurationTemplate {
  id: string;
  name: string;
  description: string;
  devices: Partial<Device>[];
}

export const CONFIGURATION_TEMPLATES: ConfigurationTemplate[] = [
  {
    id: 'greenhouse',
    name: 'Теплица',
    description: 'Базовая конфигурация для управления теплицей',
    devices: [
      { type: 'light_sensor' as any, name: 'Датчик света 1' },
      { type: 'pump' as any, name: 'Помпа полива' },
      { type: 'fan' as any, name: 'Вентилятор' },
      { type: 'lamp' as any, name: 'Освещение' }
    ]
  },
  {
    id: 'warehouse',
    name: 'Склад',
    description: 'Конфигурация для мониторинга склада',
    devices: [
      { type: 'smoke_sensor' as any, name: 'Датчик дыма' },
      { type: 'ultrasonic_sensor' as any, name: 'УЗ датчик движения' },
      { type: 'lamp' as any, name: 'Освещение склада' }
    ]
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    description: 'Умная кухня с контролем воздуха',
    devices: [
      { type: 'smoke_sensor' as any, name: 'Датчик дыма' },
      { type: 'fan' as any, name: 'Вытяжка' },
      { type: 'burner' as any, name: 'Горелка' }
    ]
  }
];
