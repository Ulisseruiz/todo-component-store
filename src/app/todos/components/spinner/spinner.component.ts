import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-spinner',
  templateUrl: './spinner.component.html',
})
export class TodosSpinnerComponent {
  @HostBinding('class') classList = 'w-full';
}
