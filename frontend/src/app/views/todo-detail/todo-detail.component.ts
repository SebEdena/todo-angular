import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { SpinnerComponent } from '../../components/ui/spinner/spinner.component';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  template: `
    <h2 class="pb-10">{{ id ? 'Edit Todo' : 'Create Todo' }}</h2>
    @if (todoService.loading()) {
      <app-spinner />
    } @else {
      <app-todo-form [id]="id" [todo]="todo" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TodoFormComponent, SpinnerComponent],
})
export class TodoDetailComponent implements OnChanges {
  private router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);
  todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  @Input() id?: string;

  todo!: CreateTodo | UpdateTodo;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['id'] && this.id) {
      const todo = await this.todoService.get(this.id);
      if (todo) {
        this.todo = todo;
        this.cdRef.markForCheck();
      } else {
        this.router.navigate([]);
      }
    }
  }
}
