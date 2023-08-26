import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div (click)="onOptionSelect()" #optionContainer>
      <ng-content></ng-content>
    </div>
  `,
  host: {
    tabindex: '0',
    role: 'option',
    class: 'w-full',
  },
  styles: [
    `
      :host > div {
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T> {
  @ViewChild('optionContainer') optionContainer!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) value!: T;
  @Output() select = new EventEmitter<OptionComponent<T>>();

  onOptionSelect() {
    this.select.emit(this);
  }
}
