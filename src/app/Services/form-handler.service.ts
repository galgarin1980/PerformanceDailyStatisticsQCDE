import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum FormType {
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {
  private _formType: BehaviorSubject<FormType> = new BehaviorSubject<FormType>(FormType.ADD);

  // Using type 'any' so it can be loosely coupled by not binding to a specific form.
  // Object can be cast using 'foo:PreferedType = bar as PreferedType' when necessary.
  private _formObject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  get formType() {
    return this._formType.asObservable();
  }

  setFormType(type: FormType) {
    this._formType.next(type);
  }

  get formTypeValue(): any {
    return this._formType.value;
  }

  get formObject() {
    return this._formObject.asObservable();
  }

  setFormObject(obj: any) {
    this._formObject.next(obj);
  }

  get formObjectValue(): any {
    return this._formObject.value;
  }

  clear() {
    // always setting the form to an 'Add New' state when finished 
    this._formType.next(FormType.ADD);
    this._formObject.next({});
  }

  constructor() { }

}
