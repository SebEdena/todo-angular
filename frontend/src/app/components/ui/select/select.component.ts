import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/utils/click-outside.directive';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="form-field"
      (clickOutside)="!disabled && dropdownOpen && closeDropdown()"
      [ngClass]="{ 'dropdown-open': dropdownOpen }"
    >
      <label *ngIf="label" [for]="name">{{ label }}</label>
      <div>
        <input
          readonly
          [disabled]="disabled"
          [(ngModel)]="value"
          [id]="name"
          [name]="name"
          (focus)="!disabled && !dropdownOpen && openDropdown()"
        />
        <button class="icon" (click)="!disabled && !dropdownOpen && openDropdown()">
          <i class="icon-chevron-down icon-size-12"></i>
        </button>
        <div class="dropdown-ct">
          <ul class="dropdown-list" role="listbox" [attr.aria-expanded]="dropdownOpen">
            <li
              *ngFor="let o of options"
              [ngClass]="{ selected: value === o }"
              tabindex="0"
              (click)="!disabled && select(o)"
              role="option"
              [innerHTML]="o"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../ui.scss'],
  styles: [
    `
      @use 'sass:color';
      @use 'modules/theme' as *;
      .form-field {
        position: relative;

        & input,
        & .icon {
          cursor: pointer;
        }

        .icon {
          position: absolute;
          right: 0;
          top: calc(50% + 0.1em);
          background-color: transparent;
          border-radius: 100px;

          &:hover {
            background-color: color.adjust(t('primary'), $alpha: -0.5);
          }
        }
      }

      .dropdown-ct {
        display: none;
        position: absolute;
        inset: 100% 0 0 0.5em;
        z-index: 10;
      }

      .dropdown-open {
        .dropdown-ct {
          display: block;
        }

        .icon i {
          rotate: 180deg;
        }
      }

      .dropdown-list {
        background: var(--neutral);
        border: 3px solid var(--primary);
        border-radius: 10px;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 4px 16px;
          cursor: pointer;
          transition: none;

          &.selected {
            background: var(--primary);
          }

          &:hover {
            background: var(--primary);
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends FormFieldComponent<string> {
  @Input() options: string[] = [];

  dropdownOpen = false;

  openDropdown() {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  select(value: string) {
    this.value = value;
    this.closeDropdown();
  }
}
