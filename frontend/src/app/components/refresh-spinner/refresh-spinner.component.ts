import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { InViewportDirective } from 'src/app/utils/in-viewport.directive';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

@Component({
  selector: 'app-refresh-spinner',
  standalone: true,
  template: `
    <div
      class="w-full p-20 flex-center"
      *ngIf="!todoService.fullyLoaded()"
      inViewport
      (visibleInViewport)="todoService.loadNextPage()"
    >
      <app-spinner />
    </div>
  `,
  styles: [
    `
      :host {
        grid-column: 1 / -1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InViewportDirective, SpinnerComponent],
})
export class RefreshSpinnerComponent {
  todoService = inject(TodoService);
}
