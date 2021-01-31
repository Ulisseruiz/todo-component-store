import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-alert',
  templateUrl: './alert.component.html',
})
export class TodosAlertComponent {
  @HostBinding('class') classList = 'w-full';
}
