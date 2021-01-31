import { Component, OnInit } from '@angular/core';
import { TodoDto } from '../../models';

import { TodosService, TodosState, TodosStore } from '../../services';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TodosService, TodosStore],
})
export class TodosMainComponent implements OnInit {
  /*readonly error$ = this.store.error$;
  readonly loaded$ = this.store.loaded$;
  readonly loading$ = this.store.loading$;
  readonly todos$ = this.store.todos$;*/

  readonly vm$ = this.store.vm$;

  todo: TodoDto | undefined;

  constructor(private readonly store: TodosStore) {}

  ngOnInit(): void {}
  handlerSubmit(data: TodoDto): void {
    this.store.create(data);
  }
}
