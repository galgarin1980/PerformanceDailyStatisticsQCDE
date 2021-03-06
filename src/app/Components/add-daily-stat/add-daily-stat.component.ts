import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyStat } from 'src/app/Models/daily-stat.model';
import { FormHandlerService } from 'src/app/Services/form-handler.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-daily-stat',
  templateUrl: './add-daily-stat.component.html',
  styleUrls: ['./add-daily-stat.component.css']
})
export class AddDailyStatComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  regions: string[] = ["West", "Central", "Northeast"];
  roles: string[] = ["CMSL/GIM", "Care At Home", "Geisinger at Home", "LIFE Geisinger", "Retro"];
  value: number = 0;

  attachedObject: any;

  constructor(public formHandler: FormHandlerService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ID: new FormControl(),
      Username: new FormControl(Validators.required),
      EventDate: new FormControl(Validators.required),
      Region: new FormControl(Validators.required),
      Role: new FormControl(Validators.required),
      AmpCount: new FormControl(Validators.required),
      AmpTime: new FormControl('Enter your time', Validators.required),
      TalixRetro: new FormControl('Enter your time', Validators.required),
      EncounterCount: new FormControl('Enter your time', Validators.required),
      MeetingTime: new FormControl('Enter your time', Validators.required),
      SpecialProject: new FormControl('Enter your time', Validators.required),
      OtherTime: new FormControl('Enter your time', Validators.required),
      Comment: new FormControl(),
    });
   }


  ngOnInit(): void {
    
    this.attachedObject = {};
    this.formHandler.formObject.subscribe(obj => {
      if (obj) {
        this.attachedObject = obj;

        // set the form control values for Edit 
        if (obj.StatDate) {
          let statDate = new Date((new Date(obj.StatDate)).getTime());
          this.form.controls['EventDate'].setValue(formatDate(statDate, 'yyyy-MM-dd', 'en-US'));
        }
        this.form.controls['ID'].setValue(obj.ID);
        this.form.controls['Username'].setValue(obj.Username);
        this.form.controls['Region'].setValue(obj.Region);
        this.form.controls['Role'].setValue(obj.Role);
        this.form.controls['AmpCount'].setValue(obj.AmpCount);
        this.form.controls['AmpTime'].setValue(obj.AmpTime);
        this.form.controls['TalixRetro'].setValue(obj.TalixRetro);
        this.form.controls['EncounterCount'].setValue(obj.EncounterCount);
        this.form.controls['MeetingTime'].setValue(obj.MeetingTime);
        this.form.controls['SpecialProject'].setValue(obj.SpecialProject);
        this.form.controls['OtherTime'].setValue(obj.OtherTime);
        this.form.controls['Comment'].setValue(obj.Comment);
        this.form.updateValueAndValidity();
      }
    });
  }

  ngAfterContentInit(){
    this.form.controls['AmpCount'].setValue(0);
    this.form.updateValueAndValidity();
  }
  changeRegion(region: any) {
    console.log("region is... ", region);
  }

  changeRole(role: any) {
    console.log("role is... ", role);
  }

  onSubmit() {
    console.log("Submit Form! You Must validate before submitting");

    // Validate Form
    let obj: DailyStat = new DailyStat();
    obj.ID = this.form.controls['ID'].value;
    obj.Username = this.form.controls['Username'].value;
    obj.StatDate = this.form.controls['EventDate'].value;
    obj.Region = this.form.controls['Region'].value;
    obj.Role = this.form.controls['Role'].value;
    obj.AmpCount = this.form.controls['AmpCount'].value;
    obj.AmpTime = this.form.controls['AmpTime'].value;
    obj.TalixRetro = this.form.controls['TalixRetro'].value;
    obj.EncounterCount = this.form.controls['EncounterCount'].value;
    obj.MeetingTime = this.form.controls['MeetingTime'].value;
    obj.SpecialProject = this.form.controls['SpecialProject'].value;
    obj.OtherTime = this.form.controls['OtherTime'].value;
    obj.Comment = this.form.controls['Comment'].value;

    // The user is needed on the add new form but not part of the user input
    if (!obj.Username) {
      obj.Username = 'mjwisniewski';
    }

    console.log("Form Object... ", obj);

    this.form.reset();
    this.formSubmit.emit(obj);
  }


}
