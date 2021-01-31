import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoDto, TodoActions, TodoActionsType } from '../../models';
import { TodosService, TodosState, TodosStore } from '../../services';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TodosService, TodosStore],
})
export class TodosMainComponent {
  readonly vm$: Observable<TodosState> = this.store.vm$;
  todo$!: Observable<TodoDto | undefined>;

  constructor(
    private ref: ChangeDetectorRef,
    private readonly store: TodosStore
  ) {}

  handlerSubmit(data: TodoDto): void {
    data.id ? this.store.update(data) : this.store.create(data);
  }
  onHandleAcions(data: TodoActions): void {
    const { action, data: todo } = data;
    switch (action) {
      case 'delete':
        this.store.remove(todo);
        break;
      case 'isComplete':
        todo.isComplete = +todo.isComplete ? '0' : '1';
        this.store.update(todo);
        break;
      case 'update':
        const id = todo.id;
        if (id) {
          this.todo$ = this.store.selectTodo(id);
          this.ref.detectChanges();
        }
        break;
      default:
        throw new Error('Invalid action');
    }
  }
}
