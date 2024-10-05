import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { RepeatDirective } from 'src/app/utils/repeat.directive';
import { RefreshSpinnerComponent } from '../../components/refresh-spinner/refresh-spinner.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pb-5">
      <ul class="todo-container" role="list">
        @for (todo of todosService.items(); track todo.id) {
          <li class="todo-item">
            <app-todo-card [todo]="todo" (delete)="removeTodo(todo.id)" />
          </li>
        }
      </ul>

      <app-refresh-spinner />
      <ng-template #placeholder>
        <div class="placeholder" *repeat="20" [style.height]="getRandomHeight()">
          <app-skeleton />
        </div>
      </ng-template>
    </section>
  `,
  styles: `
    section {
      .todo-container {
        --todo-container-gap: 2rem;

        display: flex;
        flex-wrap: wrap;
        gap: var(--todo-container-gap);
        justify-content: center;
        padding-left: 0; 
        margin: calc(-1 * var(--todo-container-gap) / 2);

        .todo-item, .placeholder {
          width: calc(50% - var(--todo-container-gap));
          box-sizing: border-box;

          @container(width > var(--bp-md)) {
            width: 100%;
          }
        }
      }
    }
  `,
  imports: [
    NgTemplateOutlet,
    RepeatDirective,
    TodoCardComponent,
    RefreshSpinnerComponent,
    SkeletonComponent,
  ],
})
export class TodoListComponent implements AfterViewInit, OnDestroy {
  todosService = inject(TodoService);

  ngAfterViewInit(): void {}

  getRandomHeight() {
    return `${200}px`;
  }

  removeTodo(id: string) {
    this.todosService.delete(id);
  }

  ngOnDestroy(): void {}
}
