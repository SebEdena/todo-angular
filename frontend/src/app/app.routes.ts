import { Routes } from '@angular/router';
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
    path: '**',
    redirectTo: 'todos',
  },
];
