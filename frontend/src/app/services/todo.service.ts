import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReadTodoDto } from 'lib';
import { BehaviorSubject, tap } from 'rxjs';
import { Page } from '../models/utils';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  todos$ = new BehaviorSubject<ReadTodoDto[]>([]);
  todos = this.todos$.asObservable();

  loadTodos() {
    this.http
      .get<Page<ReadTodoDto>>('/todos')
      .pipe(tap((page) => this.todos$.next([...this.todos$.value, ...page.items])))
      .subscribe();
  }
}
