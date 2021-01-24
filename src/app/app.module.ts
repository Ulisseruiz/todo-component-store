import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TodosModule } from './todos';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
