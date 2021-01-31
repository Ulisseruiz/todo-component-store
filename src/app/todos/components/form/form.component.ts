import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoDto } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-form',
  templateUrl: './form.component.html',
})
export class TodosFormComponent implements OnInit {
  @HostBinding('class') classList = 'w-full';
  @Input() data!: TodoDto | undefined;
  @Input() loading!: boolean;
  @Output() submitted = new EventEmitter<TodoDto>();

  frm!: FormGroup;

  get isDisabled(): boolean {
    return this.frm.invalid || this.loading;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.frm = this.fb.group({
      id: [null],
      isComplete: [0],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.frm.valid) {
      this.submitted.emit(this.frm.value);
      this.frm.reset();
    }
  }
}
