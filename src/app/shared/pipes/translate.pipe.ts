import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { I18nService, Language } from '../../core/services/i18n.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string = '';
  private lastValue: string = '';
  private subscription?: Subscription;

  constructor(
    private i18nService: I18nService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscription = this.i18nService.getCurrentLanguage().subscribe(() => {
      this.lastValue = '';
      this.changeDetector.markForCheck();
    });
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastValue = this.i18nService.translate(key);
    } else if (!this.lastValue) {
      this.lastValue = this.i18nService.translate(key);
    }
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
