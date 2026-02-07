import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'ru' | 'en' | 'hy';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage$ = new BehaviorSubject<Language>('ru');
  private translations: { [key: string]: { [lang: string]: string } } = {
    'device.fan': { ru: 'Вентилятор', en: 'Fan', hy: 'Օդափոխիչ' },
    'device.light_sensor': { ru: 'Датчик света', en: 'Light Sensor', hy: 'Լույսի սենսոր' },
    'device.smoke_sensor': { ru: 'Датчик дыма/CO2', en: 'Smoke/CO2 Sensor', hy: 'Ծխի/CO2 սենսոր' },
    'device.pump': { ru: 'Помпа', en: 'Pump', hy: 'Պոմպ' },
    'device.burner': { ru: 'Горелка', en: 'Burner', hy: 'Այրիչ' },
    'device.ultrasonic_sensor': { ru: 'Ультразвуковой датчик', en: 'Ultrasonic Sensor', hy: 'Ուլտրաձայնային սենսոր' },
    'device.lamp': { ru: 'Лампа', en: 'Lamp', hy: 'Լամպ' },
    'device.engine': { ru: 'Двигатель', en: 'Engine', hy: 'Շարժիչ' },
    'device.contactor': { ru: 'Контактор', en: 'Contactor', hy: 'Կոնտակտոր' },
    'sandbox.title': { ru: 'Песочница IoT', en: 'IoT Sandbox', hy: 'IoT Ավազարկղ' },
    'sandbox.add_device': { ru: 'Добавить устройство', en: 'Add Device', hy: 'Ավելացնել սարք' },
    'sandbox.description': { ru: 'Описание бизнес-кейса', en: 'Business Case Description', hy: 'Բիզնես դեպքի նկարագրություն' },
    'sandbox.submit': { ru: 'Отправить заказ', en: 'Submit Order', hy: 'Ուղարկել պատվեր' },
    'sandbox.save': { ru: 'Сохранить', en: 'Save', hy: 'Պահել' },
    'sandbox.reset': { ru: 'Сбросить', en: 'Reset', hy: 'Վերակայել' },
    'sandbox.templates': { ru: 'Шаблоны', en: 'Templates', hy: 'Կաղապարներ' },
    'panel.available_devices': { ru: 'Доступные устройства', en: 'Available Devices', hy: 'Հասանելի սարքեր' },
    'panel.simulation': { ru: 'Симуляция условий', en: 'Simulation', hy: 'Սիմուլյացիա' },
    'panel.templates': { ru: 'Шаблоны конфигураций', en: 'Configuration Templates', hy: 'Կոնֆիգուրացիայի կաղապարներ' },
    'workspace.title': { ru: 'Рабочая область', en: 'Workspace', hy: 'Աշխատանքային տարածք' },
    'workspace.hint': { ru: 'Перетащите устройства из панели слева', en: 'Drag devices from the left panel', hy: 'Քաշեք սարքերը ձախ վահանակից' },
    'workspace.empty': { ru: 'Рабочая область пуста', en: 'Workspace is empty', hy: 'Աշխատանքային տարածքը դատարկ է' },
    'workspace.empty_hint': { ru: 'Перетащите устройства из панели слева', en: 'Drag devices from the left panel', hy: 'Քաշեք սարքերը ձախ վահանակից' },
    'device.active': { ru: 'Активен', en: 'Active', hy: 'Ակտիվ' },
    'device.inactive': { ru: 'Неактивен', en: 'Inactive', hy: 'Անակտիվ' },
    'config.title': { ru: 'Конфигурация системы', en: 'System Configuration', hy: 'Համակարգի կոնֆիգուրացիա' },
    'config.name': { ru: 'Название конфигурации', en: 'Configuration Name', hy: 'Կոնֆիգուրացիայի անվանում' },
    'config.description': { ru: 'Описание бизнес-кейса', en: 'Business Case Description', hy: 'Բիզնես դեպքի նկարագրություն' },
    'config.description_hint': { ru: 'Опишите назначение и особенности данной конфигурации', en: 'Describe the purpose and features of this configuration', hy: 'Նկարագրեք այս կոնֆիգուրացիայի նպատակը և առանձնահատկությունները' },
    'config.device_count': { ru: 'Устройств в конфигурации', en: 'Devices in configuration', hy: 'Սարքեր կոնֆիգուրացիայում' },
    'config.submitting': { ru: 'Отправка...', en: 'Submitting...', hy: 'Ուղարկվում է...' },
    'simulation.add_devices': { ru: 'Добавьте устройства для симуляции', en: 'Add devices for simulation', hy: 'Ավելացրեք սարքեր սիմուլյացիայի համար' },
    'simulation.light': { ru: 'Яркость света', en: 'Light Brightness', hy: 'Լույսի պայծառություն' },
    'simulation.smoke': { ru: 'Уровень дыма', en: 'Smoke Level', hy: 'Ծխի մակարդակ' },
    'simulation.distance': { ru: 'Расстояние', en: 'Distance', hy: 'Հեռավորություն' },
    'simulation.value': { ru: 'Значение', en: 'Value', hy: 'Արժեք' },
    'device.settings': { ru: 'Настройки устройства', en: 'Device Settings', hy: 'Սարքի կարգավորումներ' },
    'device.name': { ru: 'Название', en: 'Name', hy: 'Անվանում' },
    'device.threshold': { ru: 'Пороговое значение', en: 'Threshold Value', hy: 'Շեմային արժեք' },
    'device.threshold_hint': { ru: 'Устройство активируется при достижении этого значения', en: 'Device activates when this value is reached', hy: 'Սարքը ակտիվանում է, երբ հասնում է այս արժեքին' },
    'device.min_value': { ru: 'Минимальное значение', en: 'Minimum Value', hy: 'Նվազագույն արժեք' },
    'device.max_value': { ru: 'Максимальное значение', en: 'Maximum Value', hy: 'Առավելագույն արժեք' },
    'device.speed': { ru: 'Скорость оборотов (%)', en: 'Rotation Speed (%)', hy: 'Պտտման արագություն (%)' },
    'device.voltage': { ru: 'Вольтаж', en: 'Voltage', hy: 'Լարում' },
    'device.voltage_12v': { ru: '12В', en: '12V', hy: '12V' },
    'device.voltage_220v': { ru: '220В', en: '220V', hy: '220V' },
    'device.current': { ru: 'Ток (А)', en: 'Current (A)', hy: 'Հոսանք (Ա)' },
    'device.speed_range': { ru: 'Диапазон скорости', en: 'Speed Range', hy: 'Արագության միջակայք' },
    'button.cancel': { ru: 'Отмена', en: 'Cancel', hy: 'Չեղարկել' },
    'button.save': { ru: 'Сохранить', en: 'Save', hy: 'Պահել' },
    'button.reset': { ru: 'Сбросить', en: 'Reset', hy: 'Վերակայել' },
    'button.submit': { ru: 'Отправить заказ', en: 'Submit Order', hy: 'Ուղարկել պատվեր' },
    'language.ru': { ru: 'Русский', en: 'Russian', hy: 'Ռուսերեն' },
    'language.en': { ru: 'English', en: 'English', hy: 'Անգլերեն' },
    'language.hy': { ru: 'Հայերեն', en: 'Armenian', hy: 'Հայերեն' }
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
