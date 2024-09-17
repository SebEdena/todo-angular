import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./views/todo-list/todo-list.component').then((m) => m.TodoListComponent),
  },
  {
    path: 'todos/new',
    loadComponent: () =>
      import('./views/todo-detail/todo-detail.component').then((m) => m.TodoDetailComponent),
  },
  {
    path: 'todos/:id',
    loadComponent: () =>
      import('./views/todo-detail/todo-detail.component').then((m) => m.TodoDetailComponent),
  },
  {
    path: '**',
    redirectTo: 'todos',
  },
];
