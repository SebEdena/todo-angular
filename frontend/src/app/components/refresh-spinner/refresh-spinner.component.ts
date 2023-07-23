import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { InViewportDirective } from 'src/app/utils/in-viewport.directive';

@Component({
  selector: 'app-refresh-spinner',
  standalone: true,
  imports: [CommonModule, InViewportDirective],
  template: `
    <div
      class="w-full p-20 flex-center"
      *ngIf="!todoService.fullyLoaded()"
      inViewport
      (visibleInViewport)="todoService.loadNextPage()"
    >
      <svg
        fill="var(--primary)"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="spinner_VpEe" cx="12" cy="12" r="0" />
        <circle class="spinner_VpEe spinner_eahp" cx="12" cy="12" r="0" />
        <circle class="spinner_VpEe spinner_f7Y2" cx="12" cy="12" r="0" />
      </svg>
    </div>
  `,
  styles: [
    `
      :host {
        grid-column: 1 / -1;
      }
      .spinner_VpEe {
        animation: spinner_vXu6 1.2s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite;
      }
      .spinner_eahp {
        animation-delay: 0.4s;
      }
      .spinner_f7Y2 {
        animation-delay: 0.8s;
      }
      @keyframes spinner_vXu6 {
        0% {
          r: 0;
          opacity: 1;
        }
        100% {
          r: 11px;
          opacity: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshSpinnerComponent {
  todoService = inject(TodoService);
}
