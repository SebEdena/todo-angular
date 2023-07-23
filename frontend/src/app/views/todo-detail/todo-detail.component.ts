import { CommonModule } from '@angular/common';
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
    <h2>Edit Todo</h2>
    <app-spinner *ngIf="!todo" />
    <app-todo-form *ngIf="todo" [id]="id" [todo]="todo" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, TodoFormComponent, SpinnerComponent],
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
        this.cdRef.detectChanges();
      } else {
        this.router.navigate([]);
      }
    }
  }
}
