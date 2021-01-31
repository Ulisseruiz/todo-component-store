import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';

import * as fromComponents from './components';
import { TodosMainComponent } from './containers/main/main.component';

@NgModule({
  declarations: [...fromComponents.components, TodosMainComponent],
  exports: [TodosMainComponent],
  imports: [CommonModule, ReactiveFormsModule, ReactiveComponentModule],
})
export class TodosModule {}
