import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'ru' | 'en' | 'hy';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage$ = new BehaviorSubject<Language>('ru');
  private translations: { [key: string]: { [lang: string]: string } } = {
    // Device types
    'device.fan': { ru: 'Вентилятор', en: 'Fan', hy: 'Fan' },
    'device.light_sensor': { ru: 'Датчик света', en: 'Light Sensor', hy: 'Light Sensor' },
    'device.smoke_sensor': { ru: 'Датчик дыма/CO2', en: 'Smoke/CO2 Sensor', hy: 'Smoke/CO2 Sensor' },
    'device.pump': { ru: 'Помпа', en: 'Pump', hy: 'Pump' },
    'device.burner': { ru: 'Горелка', en: 'Burner', hy: 'Burner' },
    'device.ultrasonic_sensor': { ru: 'Ультразвуковой датчик', en: 'Ultrasonic Sensor', hy: 'Ultrasonic Sensor' },
    'device.lamp': { ru: 'Лампа', en: 'Lamp', hy: 'Lamp' },
    'device.engine': { ru: 'Двигатель', en: 'Engine', hy: 'Engine' },
    'device.contactor': { ru: 'Контактор', en: 'Contactor', hy: 'Contactor' },

    // Device states
    'device.active': { ru: 'Активен', en: 'Active', hy: 'Active' },
    'device.inactive': { ru: 'Неактивен', en: 'Inactive', hy: 'Inactive' },

    // Device settings
    'device.settings': { ru: 'Настройки устройства', en: 'Device Settings', hy: 'Device Settings' },
    'device.name': { ru: 'Название', en: 'Name', hy: 'Name' },
    'device.threshold': { ru: 'Пороговое значение', en: 'Threshold Value', hy: 'Threshold Value' },
    'device.threshold_hint': { ru: 'Устройство активируется при достижении этого значения', en: 'Device activates when this value is reached', hy: 'Device activates when this value is reached' },
    'device.min_value': { ru: 'Минимальное значение', en: 'Minimum Value', hy: 'Minimum Value' },
    'device.max_value': { ru: 'Максимальное значение', en: 'Maximum Value', hy: 'Maximum Value' },
    'device.speed': { ru: 'Скорость оборотов (%)', en: 'Rotation Speed (%)', hy: 'Rotation Speed (%)' },
    'device.voltage': { ru: 'Вольтаж', en: 'Voltage', hy: 'Voltage' },
    'device.voltage_12v': { ru: '12В', en: '12V', hy: '12V' },
    'device.voltage_220v': { ru: '220В', en: '220V', hy: '220V' },
    'device.current': { ru: 'Ток (А)', en: 'Current (A)', hy: 'Current (A)' },
    'device.speed_range': { ru: 'Диапазон скорости', en: 'Speed Range', hy: 'Speed Range' },
    'device.depends_on': { ru: 'Зависит от', en: 'Depends On', hy: 'Depends On' },
    'device.depends_on_hint': { ru: 'Выберите устройства, от которых зависит это устройство', en: 'Select devices this device depends on', hy: 'Select devices this device depends on' },
    'device.affects': { ru: 'Влияет на', en: 'Affects', hy: 'Affects' },
    'device.affects_hint': { ru: 'Выберите устройства, на которые влияет это устройство', en: 'Select devices this device affects', hy: 'Select devices this device affects' },

    // Panels
    'panel.available_devices': { ru: 'Доступные устройства', en: 'Available Devices', hy: 'Available Devices' },
    'panel.sensors': { ru: 'Сенсоры', en: 'Sensors', hy: 'Sensors' },
    'panel.devices': { ru: 'Устройства', en: 'Devices', hy: 'Devices' },
    'panel.simulation': { ru: 'Симуляция условий', en: 'Simulation', hy: 'Simulation' },
    'panel.templates': { ru: 'Шаблоны конфигураций', en: 'Configuration Templates', hy: 'Configuration Templates' },
    'panel.custom_templates': { ru: 'Мои шаблоны', en: 'My Templates', hy: 'My Templates' },

    // Workspace
    'workspace.title': { ru: 'Рабочая область', en: 'Workspace', hy: 'Workspace' },
    'workspace.hint': { ru: 'Перетащите устройства из панели слева', en: 'Drag devices from the left panel', hy: 'Drag devices from the left panel' },
    'workspace.empty': { ru: 'Рабочая область пуста', en: 'Workspace is empty', hy: 'Workspace is empty' },
    'workspace.empty_hint': { ru: 'Перетащите устройства из панели слева', en: 'Drag devices from the left panel', hy: 'Drag devices from the left panel' },

    // Configuration
    'config.title': { ru: 'Конфигурация системы', en: 'System Configuration', hy: 'System Configuration' },
    'config.name': { ru: 'Название конфигурации', en: 'Configuration Name', hy: 'Configuration Name' },
    'config.description': { ru: 'Описание бизнес-кейса', en: 'Business Case Description', hy: 'Business Case Description' },
    'config.description_hint': { ru: 'Опишите назначение и особенности данной конфигурации', en: 'Describe the purpose and features of this configuration', hy: 'Describe the purpose and features of this configuration' },
    'config.device_count': { ru: 'Устройств в конфигурации', en: 'Devices in configuration', hy: 'Devices in configuration' },
    'config.submitting': { ru: 'Отправка...', en: 'Submitting...', hy: 'Submitting...' },

    // Simulation
    'simulation.add_devices': { ru: 'Добавьте устройства для симуляции', en: 'Add devices for simulation', hy: 'Add devices for simulation' },
    'simulation.value': { ru: 'Значение', en: 'Value', hy: 'Value' },

    // Buttons
    'button.cancel': { ru: 'Отмена', en: 'Cancel', hy: 'Cancel' },
    'button.save': { ru: 'Сохранить', en: 'Save', hy: 'Save' },
    'button.save_template': { ru: 'Сохранить как шаблон', en: 'Save as Template', hy: 'Save as Template' },
    'button.reset': { ru: 'Сбросить', en: 'Reset', hy: 'Reset' },
    'button.submit': { ru: 'Отправить заказ', en: 'Submit Order', hy: 'Submit Order' },

    // Languages
    'language.ru': { ru: 'Русский', en: 'Russian', hy: 'Russian' },
    'language.en': { ru: 'English', en: 'English', hy: 'English' },
    'language.hy': { ru: 'Армянский', en: 'Armenian', hy: 'Armenian' },

    // Auth
    'auth.login': { ru: 'Войти', en: 'Login', hy: 'Login' },
    'auth.logout': { ru: 'Выйти', en: 'Logout', hy: 'Logout' },
    'auth.username': { ru: 'Имя пользователя', en: 'Username', hy: 'Username' },
    'auth.password': { ru: 'Пароль', en: 'Password', hy: 'Password' },
    'auth.login_subtitle': { ru: 'Вход в систему конфигурации', en: 'Sign in to configuration system', hy: 'Sign in to configuration system' }
  };

  getCurrentLanguage(): Observable<Language> {
    return this.currentLanguage$.asObservable();
  }

  setLanguage(lang: Language): void {
    this.currentLanguage$.next(lang);
    localStorage.setItem('iot_sandbox_language', lang);
  }

  translate(key: string): string {
    const lang = this.currentLanguage$.value;
    return this.translations[key]?.[lang] || key;
  }

  init(): void {
    const saved = localStorage.getItem('iot_sandbox_language') as Language;
    if (saved && ['ru', 'en', 'hy'].includes(saved)) {
      this.currentLanguage$.next(saved);
    }
  }
}
