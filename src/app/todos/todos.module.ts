import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosMainComponent } from './main/main.component';

@NgModule({
  declarations: [TodosMainComponent],
  exports: [TodosMainComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodosModule {}
