import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoDto } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos-form',
  templateUrl: './form.component.html',
})
export class TodosFormComponent implements OnChanges, OnInit {
  @HostBinding('class') classList = 'w-full';
  @Input() data!: TodoDto | undefined;
  @Output() submitted = new EventEmitter<TodoDto>();

  frm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.firstChange) {
      const data = changes.data.currentValue;
      this.frm.setValue(data);
    }
  }

  createForm(): void {
    this.frm = this.fb.group({
      id: [null],
      isComplete: ['0'],
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
