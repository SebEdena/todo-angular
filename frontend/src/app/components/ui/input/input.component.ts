import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/utils/click-outside.directive';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: ` <p>input works!</p> `,
  styleUrls: ['../ui.scss'],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FormFieldComponent<string> {}
