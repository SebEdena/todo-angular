import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ReadTodo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  todos$ = new BehaviorSubject<ReadTodo[]>([]);
  todos = this.todos$.asObservable();

  loadTodos() {
    this.http
      .get<ReadTodo[]>('/todos', { params: { orderBy: JSON.stringify({ updatedAt: 'DESC' }) } })
      .pipe(tap((todos) => this.todos$.next([...this.todos$.value, ...todos])))
      .subscribe();
  }

  getTodo(id: string) {
    return this.todos$.value.find((todo) => todo.id === id);
  }
}
