import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [style.--bg-color]="'var(--' + color + ')'"
      [type]="type"
      [disabled]="disabled"
      (click)="click.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      @use 'sass:color';
      @use 'modules/theme' as *;

      button {
        padding: 0.5rem;
        line-height: 1.2rem;
        background-color: t(var(--bg-color));
        color: var(--white);
        border-radius: 10px;
        transition: all 0.2s ease-in-out;

        &:hover {
        }

        &:active {
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() type: 'button' | 'menu' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  @Output() click = new EventEmitter<MouseEvent>();
}
