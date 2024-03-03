import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class FormFieldComponent<T> implements ControlValueAccessor {
  private cdRef = inject(ChangeDetectorRef);

  label = input('');
  name = input('');
  disabled = model(false);

  value = model<T | undefined>(undefined);

  onChanged: Function = () => {};
  onTouched: Function = () => {};

  constructor() {
    effect(() => {
      this.cdRef.markForCheck();
      this.onChanged(this.value());
      this.onTouched(this.value());
    });
  }

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: Function): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
