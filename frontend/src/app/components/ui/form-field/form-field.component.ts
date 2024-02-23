import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class FormFieldComponent<T> implements ControlValueAccessor {
  private cdRef = inject(ChangeDetectorRef);

  @Input() label = '';
  @Input() name = '';
  @Input() disabled = false;

  @Input() set value(val: T | undefined) {
    this.cdRef.markForCheck();
    if (val !== undefined && this._value !== val) {
      this._value = val;
      this.valueChange.emit(this._value);
      this.onChanged(val);
      this.onTouched(val);
    }
  }

  @Output() valueChange = new EventEmitter<T | undefined>();

  get value() {
    return this._value;
  }

  private _value?: T;

  onChanged: Function = () => {};
  onTouched: Function = () => {};

  writeValue(value?: T): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
