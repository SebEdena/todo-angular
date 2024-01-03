import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-todo-button',
  standalone: true,
  imports: [RouterModule],
  template: `
    <button class="p-10 bg-transparent" routerLink="/todos/new">
      <span class="icon-plus icon-size-15"></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoButtonComponent {}
