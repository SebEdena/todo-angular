import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [style.--bg-color]="'var(--' + color + ')'"
      [type]="type()"
      [disabled]="disabled()"
      (click)="click.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    button {
      --bg-color-light: color-mix(in srgb, var(--bg-color), #fff 10%);
      --bg-color-lighter: color-mix(in srgb, var(--bg-color), #fff 20%);

      padding: 0.5rem;
      line-height: 1.2rem;
      background-color: var(--bg-color);
      color: var(--white);
      border-radius: 10px;
      transition: all 0.2s ease-in-out !important;

      &:hover {
        background-color: var(--bg-color-light);
      }

      &:active {
        background-color: var(--bg-color-lighter);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  color = input<'primary' | 'secondary'>('primary');
  type = input<'button' | 'menu' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);

  @Output() click = new EventEmitter<MouseEvent>();
}
