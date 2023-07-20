import { Routes } from '@angular/router';
import { TodoDetailComponent } from './views/todo-detail/todo-detail.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'todos/:id',
    component: TodoDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'todos',
  },
];
