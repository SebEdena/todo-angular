import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { ReadTodoDto } from 'lib';
import { TodoService } from 'src/app/services/todo.service';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <app-todo-card
        *ngFor="let todo of todosService.todos | async; trackBy: trackTodos"
        [todo]="todo"
      />
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    `,
  ],
  imports: [CommonModule, TodoCardComponent],
})
export class TodoListComponent implements OnInit {
  todosService = inject(TodoService);

  ngOnInit(): void {
    this.todosService.loadTodos();
  }

  trackTodos: TrackByFunction<ReadTodoDto> = (_index: number, item: ReadTodoDto) => {
    return item.id;
  };
}
