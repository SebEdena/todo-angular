import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="bg-transparent" [style.--btn-size]="size()" (click)="click.emit($event)">
      <span [ngClass]="'icon-' + icon()"></span>
    </button>
  `,
  styles: `
    :host { display: flex } 
    
    button {
      padding: calc(var(--btn-size) * 0.1);
    }

    span { 
      height: var(--btn-size); 
      width: var(--btn-size); 
      mask-size: var(--btn-size) var(--btn-size);
      mask-repeat: no-repeat;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  icon = input.required<string>();
  size = input('1.5rem');

  @Output() click = new EventEmitter<MouseEvent>();
}
