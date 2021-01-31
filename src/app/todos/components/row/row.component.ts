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
  selector: 'app-todos-row',
  templateUrl: './row.component.html',
})
export class TodosRowComponent implements OnInit {
  @HostBinding('class') classList = 'w-full';
  @Input() data!: TodoDto;

  ngOnInit(): void {}
}
