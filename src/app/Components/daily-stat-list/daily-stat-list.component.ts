import { Component, ElementRef, OnInit, ViewChild, Input, Directive, EventEmitter, Output, QueryList, ViewChildren, Pipe, PipeTransform, HostListener, APP_BOOTSTRAP_LISTENER} from '@angular/core';
import { DailyStat } from 'src/app/Models/daily-stat.model';
import { User } from 'src/app/Models/user.model';
import { FormHandlerService, FormType } from 'src/app/Services/form-handler.service';
import { ApiDataService } from 'src/app/Services/api-data.service';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';


@Component({
  selector: 'app-daily-stat-list',
  templateUrl: './daily-stat-list.component.html',
  styleUrls: ['./daily-stat-list.component.css'],
  providers: [DecimalPipe]
})

export class DailyStatListComponent implements OnInit {
  @Input() user: User = new User();
  @ViewChild('closebutton') closebutton: any | undefined;
  @ViewChild('popupModal') popupModal: any | undefined;

  list: DailyStat[] = [];
 

  constructor(public apiData: ApiDataService, public formHandler: FormHandlerService) { }

  ngOnInit(): void {
    this.loadList();
    this.list.sort().reverse;
  }

  loadList(): void {
    this.apiData.getList().subscribe(data => { this.list = []; data.map(obj => { this.list.push(obj) }) });
  }

  loadDaily(obj: DailyStat) {
    this.list.push(obj);
  }

  onFormSubmit(obj: DailyStat) {
    if (this.formHandler.formTypeValue === FormType.EDIT) {
      this.apiData.updateData(obj).subscribe(response => { this.close(true); }); // <-- UPDATE DATA
    }
    else {
      this.apiData.addData(obj).subscribe(response => { this.close(true); });  // <-- ADD DATA
    }
  }

  onDeleteSubmit(action: boolean) {
    if (action) {
      let id: string = this.formHandler.formObjectValue.ID.toString();

      this.apiData.deleteData(id).subscribe(response => { this.close(true); });
    }
    else {
      this.close();
    }
  }

  close(reload: boolean = false) {
    if (reload) {
      this.loadList();
    }
    this.closebutton.nativeElement.click();
  }

  openAdd() {
    this.formHandler.setFormType(FormType.ADD);
    this.formHandler.setFormObject({});
    new bootstrap.Modal(this.popupModal.nativeElement).show();
  }

  openEdit(obj: DailyStat) {
    this.formHandler.setFormType(FormType.EDIT);
    this.formHandler.setFormObject(obj);
    new bootstrap.Modal(this.popupModal.nativeElement).show();
  }

  openDelete(obj: DailyStat) {
    this.formHandler.setFormType(FormType.DELETE);
    this.formHandler.setFormObject(obj);
    new bootstrap.Modal(this.popupModal.nativeElement).show();
  }

  onClose($event: any) {
    // console.log("Window Closed... Modal is now hidden. Clearing form...");
    this.formHandler.clear();
  }

}
