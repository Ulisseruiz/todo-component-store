import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

import { TodoDto } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-grid',
  templateUrl: './grid.component.html',
})
export class TodosGridComponent implements OnInit {
  @HostBinding('class') classList = 'w-full';
  @Input() data!: TodoDto[];

  ngOnInit(): void {}
}
