import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  QueryList,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/utils/click-outside.directive';
import { FormFieldComponent } from '../form-field/form-field.component';
import { OptionComponent } from './option/option.component';

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
          [value]="currentOption?.optionContainer?.nativeElement?.innerHTML"
          (focus)="!disabled && !dropdownOpen && openDropdown()"
          #input
        />
        <input
          style="display: none;"
          readonly
          disabled
          [(ngModel)]="value"
          [id]="name"
          [name]="name"
        />
        <button class="icon" (click)="!disabled && !dropdownOpen && openDropdown()">
          <i class="icon-chevron-down icon-size-12"></i>
        </button>
        <div class="dropdown-ct">
          <div class="dropdown-list" role="listbox" [attr.aria-expanded]="dropdownOpen">
            {{ options }}
          </div>
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
        padding: 0;
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> extends FormFieldComponent<T> {
  @ContentChildren(OptionComponent, { descendants: true }) options!: QueryList<OptionComponent<T>>;

  currentOption?: OptionComponent<T> = undefined;

  dropdownOpen = false;

  private optionChange?: Observable<OptionComponent<T> | undefined>;
  private destroyRef = inject(DestroyRef);

  ngAfterContentInit() {
    this.currentOption = this.options.find((opt) => Object.is(opt.value, this.value));
    this.optionChange = merge(...this.options.map((optionCom) => optionCom.select.asObservable()));
    this.optionChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((component) => {
      this.select(component?.value);
    });
  }

  openDropdown() {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  select(value?: T) {
    this.value = value;
    this.closeDropdown();
  }
}
