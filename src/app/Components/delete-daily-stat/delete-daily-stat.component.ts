import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-daily-stat',
  templateUrl: './delete-daily-stat.component.html',
  styleUrls: ['./delete-daily-stat.component.css']
})
export class DeleteDailyStatComponent implements OnInit {
  @Output() deleteSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  yes($event: any) {
    this.deleteSubmit.emit(true);
  }

  cancel($event: any) {
    this.deleteSubmit.emit(false);
  }

}
