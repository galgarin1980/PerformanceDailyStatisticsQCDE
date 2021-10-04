import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DailyStatListComponent} from './daily-stat-list.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [DailyStatListComponent],
  exports: [DailyStatListComponent],
  bootstrap: [DailyStatListComponent]
})
export class NgbdTableFilteringModule {}