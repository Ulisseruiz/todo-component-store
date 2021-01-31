import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { TodoDto, TodoActions } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-grid',
  templateUrl: './grid.component.html',
})
export class TodosGridComponent {
  @HostBinding('class') classList = 'w-full';
  @Input() data!: TodoDto[];
  @Output() handleAcions = new EventEmitter<TodoActions>();

  onHandleAcions(data: TodoActions): void {
    this.handleAcions.emit(data);
  }
}
