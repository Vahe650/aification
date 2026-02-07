export enum DeviceType {
  FAN = 'fan',
  LIGHT_SENSOR = 'light_sensor',
  SMOKE_SENSOR = 'smoke_sensor',
  PUMP = 'pump',
  BURNER = 'burner',
  ULTRASONIC_SENSOR = 'ultrasonic_sensor',
  LAMP = 'lamp',
  ENGINE = 'engine',
  CONTACTOR = 'contactor'
}

export enum Voltage {
  V12 = 12,
  V220 = 220
}

export interface DeviceThreshold {
  min?: number;
  max?: number;
  triggerValue?: number;
  speed?: number; // Скорость оборотов для моторов (0-100%)
  voltage?: Voltage; // Вольтаж для двигателей (12В или 220В)
  current?: number; // Ток для двигателей (А)
}

export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  position: { x: number; y: number };
  threshold: DeviceThreshold;
  isActive: boolean;
  currentValue?: number;
  icon?: string;
}

export interface DeviceTemplate {
  type: DeviceType;
  name: string;
  icon: string;
  maxCount: number;
  defaultThreshold: DeviceThreshold;
}

export const DEVICE_TEMPLATES: DeviceTemplate[] = [
  {
    type: DeviceType.FAN,
    name: 'Вентилятор',
    icon: 'air',
    maxCount: 2,
    defaultThreshold: { triggerValue: 25 }
  },
  {
    type: DeviceType.LIGHT_SENSOR,
    name: 'Датчик света',
    icon: 'wb_sunny',
    maxCount: 2,
    defaultThreshold: { min: 0, max: 100 }
  },
  {
    type: DeviceType.SMOKE_SENSOR,
    name: 'Датчик дыма/CO2',
    icon: 'cloud',
    maxCount: 999,
    defaultThreshold: { triggerValue: 50 }
  },
  {
    type: DeviceType.PUMP,
    name: 'Помпа',
    icon: 'water_drop',
    maxCount: 2,
    defaultThreshold: { triggerValue: 30 }
  },
  {
    type: DeviceType.BURNER,
    name: 'Горелка',
    icon: 'local_fire_department',
    maxCount: 1,
    defaultThreshold: { triggerValue: 20 }
  },
  {
    type: DeviceType.ULTRASONIC_SENSOR,
    name: 'Ультразвуковой датчик',
    icon: 'sensors',
    maxCount: 999,
    defaultThreshold: { min: 0, max: 200 }
  },
  {
    type: DeviceType.LAMP,
    name: 'Лампа',
    icon: 'lightbulb',
    maxCount: 999,
    defaultThreshold: { triggerValue: 50 }
  },
  {
    type: DeviceType.ENGINE,
    name: 'Двигатель',
    icon: 'build',
    maxCount: 999,
    defaultThreshold: { 
      speed: 50, // Скорость оборотов 0-100%
      voltage: Voltage.V12, // По умолчанию 12В
      current: 2.5, // Ток до 5А для 12В
      min: 0,
      max: 100
    }
  },
  {
    type: DeviceType.CONTACTOR,
    name: 'Контактор',
    icon: 'settings_power',
    maxCount: 999,
    defaultThreshold: { triggerValue: 0 }
  }
];
