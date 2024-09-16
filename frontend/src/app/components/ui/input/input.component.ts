import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-field">
      <label [for]="name()">{{ label() }}</label>
      <input
        [type]="type()"
        [id]="name()"
        [name]="name()"
        [(ngModel)]="value"
        (ngModelChange)="test($event)"
        [disabled]="disabled()"
      />
    </div>
  `,
  styleUrls: ['../ui.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FormFieldComponent<string | number> {
  type = input<string>('text');

  test(event: any) {
    console.log(event);
  }
}
