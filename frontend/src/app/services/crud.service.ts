import { HttpClient } from '@angular/common/http';
import { computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ReadTodo } from '../models/todos';
import { Page } from '../models/utils';
import { QueryParams, q } from '../utils/filter';

export const ITEMS_PER_PAGE = 50;

export interface ItemState<T> {
  items: T[];
  loading: boolean;
  error?: string;
  total?: number;
}

export abstract class CrudService<Read extends { id: string }, Create, Update> {
  private http = inject(HttpClient);

  private itemsState = signal<ItemState<Read>>({
    items: [],
    loading: true,
    error: undefined,
    total: undefined,
  });

  items = computed(() => this.itemsState().items);
  loading = computed(() => this.itemsState().loading);
  error = computed(() => this.itemsState().error);
  total = computed(() => this.itemsState().total);
  fullyLoaded = computed(() => this.items().length === this.total());

  protected abstract baseUrl: string;
  protected loadParams: Partial<QueryParams> = {
    limit: ITEMS_PER_PAGE,
  };

  private updateState(update: Partial<ItemState<Read>>) {
    this.itemsState.update((current) => ({ ...current, ...update }));
  }

  private refresh() {
    this.updateState({ loading: true });
    this.http
      .get<Page<Read>>(this.baseUrl, {
        params: q({
          ...this.loadParams,
          limit: this.items().length,
        }),
      })
      .subscribe({
        next: ({ items, total }) => {
          this.updateState({
            items: items,
            loading: false,
            total,
          });
        },
        error: (err: any) => {
          this.updateState({ error: err.message, loading: false });
        },
      });
  }

  loadAll() {
    this.updateState({ loading: true });
    this.http
      .get<Page<Read>>(this.baseUrl, {
        params: q({
          ...this.loadParams,
          limit: undefined,
        }),
      })
      .subscribe({
        next: ({ items, total }) => {
          this.updateState({
            items: items,
            loading: false,
            total,
          });
        },
        error: (err: any) => {
          this.updateState({ error: err.message, loading: false });
        },
      });
  }

  loadNextPage() {
    this.updateState({ loading: true });
    this.http
      .get<Page<Read>>(this.baseUrl, {
        params: q({
          ...this.loadParams,
          offset: this.items().length,
        }),
      })
      .subscribe({
        next: ({ items, total }) => {
          this.updateState({
            items: [...this.items(), ...items],
            loading: false,
            total,
          });
        },
        error: (err: any) => {
          this.updateState({ error: err.message, loading: false });
        },
      });
  }

  async get(id: string) {
    let itemInCache = this.items().find((item) => item.id === id);
    if (!itemInCache) {
      return await firstValueFrom(this.http.get<Read>(`${this.baseUrl}/${id}`));
    }
    return itemInCache;
  }

  create(item: Create) {
    this.http.post<Read>(this.baseUrl, item).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err: any) => {
        this.updateState({ error: err.message });
      },
    });
  }

  update(id: string, item: Update) {
    this.http.patch<Read>(`${this.baseUrl}/${id}`, item).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err: any) => {
        this.updateState({ error: err.message });
      },
    });
  }

  delete(id: string) {
    this.http.delete<ReadTodo>(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err: any) => {
        this.updateState({ error: err.message });
      },
    });
  }
}
