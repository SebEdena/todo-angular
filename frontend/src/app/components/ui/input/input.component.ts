import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-field">
      <label [for]="name">{{ label }}</label>
      <input [type]="type" [id]="name" [name]="name" [(ngModel)]="value" [disabled]="disabled" />
    </div>
  `,
  styleUrls: ['../ui.scss'],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FormFieldComponent<string | number> {
  @Input() type = 'text';
}
