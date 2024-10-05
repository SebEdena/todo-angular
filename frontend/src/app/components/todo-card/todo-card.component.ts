import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { ReadTodo } from 'src/app/models/todos';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  template: `
    <article>
      <div class="bg-neutral-accent p-10" (click)="open()">
        <h2 class="title font-size-12">{{ todo().title }}</h2>
        <div class="actions font-size-12 flex-center">
          <app-icon-button size="1.3rem" icon="delete" (click)="deleteTodo($event)" />
        </div>
        <p class="description">{{ todo().description }}</p>
        <span class="date font-size-8">{{ todo().updatedAt | date: 'medium' }}</span>
        <span class="status font-size-8">{{ todo().status | uppercase }}</span>
      </div>
    </article>
  `,
  styles: `
    article {
      &,
      & > div {
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 3px 3px var(--primary);
        height: 100%;
      }

      &:hover > div {
        $border: 3px;
        transform: translate(-$border, -$border);
        transition: all 0.2s;
      }

      & > div {
        display: grid;
        grid-template-areas:
          'title actions'
          'description description'
          'date status';
        gap: 0.5rem;
        grid-template-columns: 1fr max-content;
        grid-template-rows: auto 1fr auto;
        $areas: 'title', 'actions', 'description', 'date', 'status';

        @each $area in $areas {
          .#{$area} {
            grid-area: #{$area};
          }
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .status {
          text-align: end;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  private router = inject(Router);

  todo = input.required<ReadTodo>();

  @Output() delete = new EventEmitter<ReadTodo>();

  open() {
    this.router.navigate(['todos', this.todo().id]);
  }

  deleteTodo(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit(this.todo());
  }
}
