import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap, catchError } from 'rxjs/operators';
import { DailyStat } from 'src/app/Models/daily-stat.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { User } from '../Models/user.model';
import { LoginComponent } from '../Pages/login/login.component';
import { DailyStatListComponent } from '../Components/daily-stat-list/daily-stat-list.component';
import { FormHandlerService } from 'src/app/Services/form-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private connectionString: string = "https://localhost:44365/api/Temp"; //<-- Data API
  //private connectionString: string = "https://eimweb4tst/gmldev/ga_Development/QCDE_Performance_API/api/Temp"; //<-- Data API
  public user: User = new User;
  public formHandle: FormHandlerService = new FormHandlerService;
  
   
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    
    this.authService.currentUser.subscribe(user => { this.user = user; console.log("temp service user", user) });
    
  }
  
  getList(): Observable<DailyStat[]> {
        
    return this.http.get<DailyStat[]>(this.connectionString + "/Filter/" + this.user.Username);
  }

  addData(obj: DailyStat): Observable<DailyStat> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    obj.Username = this.user.Username;
    console.log("user name logged in", this.user)

    return this.http.post<DailyStat>(this.connectionString, JSON.stringify(obj), { headers: httpHeaders }).pipe(
      map(response => {
        console.log("Add Data - Post Response mapping... ", response);
        return response;
      })
    );
  }

  updateData(obj: DailyStat): Observable<DailyStat> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<DailyStat>(this.connectionString.concat(`/${obj.ID?.toString()}`), JSON.stringify(obj), { headers: httpHeaders }).pipe(
      map(response => {
        console.log("Update Data - Post Response mapping... ", response);
        return response;
      })
    );
  }

  deleteData(id: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete<any>(this.connectionString.concat(`/${id}`), { headers: httpHeaders }).pipe(
      map(response => {
        console.log("Delete Response mapping... ", response);
        return response;
      })
    );
  }



}
