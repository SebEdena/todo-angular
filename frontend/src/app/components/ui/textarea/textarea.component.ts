import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-field">
      <label [for]="name()">{{ label() }}</label>
      <textarea
        [id]="name()"
        [name]="name()"
        [(ngModel)]="value"
        [disabled]="disabled()"
      ></textarea>
    </div>
  `,
  styleUrls: ['../ui.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends FormFieldComponent<string | number> {}
