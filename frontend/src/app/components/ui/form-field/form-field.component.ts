import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class FormFieldComponent<T> implements ControlValueAccessor {
  @Input() label = '';
  @Input() name = '';
  @Input() disabled = false;

  @Input() set value(val: T | undefined) {
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
    this._value = value;
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
