import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, concatMap, switchMap, tap } from 'rxjs/operators';
import { TodosService } from './todos.service';
import { TodoDto } from '../models';

export interface TodosState {
  error: boolean;
  loaded: boolean;
  loading: boolean;
  todos: TodoDto[];
}

const todosInitialState: TodosState = {
  error: false,
  loaded: false,
  loading: false,
  todos: [],
};

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private readonly service: TodosService) {
    super(todosInitialState);
    this.all();
  }

  private readonly error$ = this.select((state: TodosState) => {
    return state.error;
  });

  private readonly loaded$ = this.select((state: TodosState) => {
    return state.loaded;
  });

  private readonly loading$ = this.select((state: TodosState) => {
    return state.loading;
  });

  private readonly todos$ = this.select((state: TodosState) => {
    return state.todos;
  });

  readonly vm$ = this.select(
    this.error$,
    this.loaded$,
    this.loading$,
    this.todos$,
    (error, loaded, loading, todos) => ({
      error,
      loaded,
      loading,
      todos,
    })
  );

  private readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  private readonly all = this.effect<void>((todos$: Observable<void>) => {
    return todos$.pipe(
      switchMap(() =>
        this.service.all().pipe(
          tap({
            next: (todos) => {
              this.setState((state) => {
                return {
                  ...state,
                  loaded: true,
                  todos,
                };
              });
            },
            error: (e) => {
              this.setState((state) => {
                return {
                  ...state,
                  error: true,
                };
              });
            },
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly create = this.effect<TodoDto>((todos$: Observable<TodoDto>) => {
    return todos$.pipe(
      tap({
        next: () => {
          this.setLoading(true);
        },
      }),
      concatMap((todo: TodoDto) =>
        this.service.create(todo).pipe(
          tap({
            next: (res) => {
              this.all();
            },
            error: (e) => {
              this.setState((state) => {
                return {
                  ...state,
                  error: true,
                };
              });
            },
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly update = this.effect<TodoDto>((todos$: Observable<TodoDto>) => {
    return todos$.pipe(
      tap({
        next: () => {
          this.setLoading(true);
        },
      }),
      concatMap((todo: TodoDto) =>
        this.service.update(todo).pipe(
          tap({
            next: (res) => {
              const { id } = todo;
              this.setState((state) => {
                return {
                  ...state,
                  loading: false,
                  todos: state.todos.map((current) => {
                    if (Number(current.id) === Number(id)) {
                      return res;
                    }
                    return current;
                  }),
                };
              });
            },
            error: (e) => {
              this.setState((state) => {
                return {
                  ...state,
                  error: true,
                };
              });
            },
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly remove = this.effect<TodoDto>((todos$: Observable<TodoDto>) => {
    return todos$.pipe(
      tap({
        next: () => {
          this.setLoading(true);
        },
      }),
      concatMap((todo: TodoDto) =>
        this.service.remove(todo).pipe(
          tap({
            next: (res) => {
              this.all();
            },
            error: (e) => {
              this.setState((state) => {
                return {
                  ...state,
                  error: true,
                };
              });
            },
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  selectTodo(todoId: number): Observable<TodoDto | undefined> {
    return this.select((state: TodosState) =>
      state.todos.find((todo) => todo.id === todoId)
    );
  }
}
