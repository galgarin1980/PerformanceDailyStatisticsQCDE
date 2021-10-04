import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _currentUser: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    // Initalize the Current user with an empty user
    this._currentUser = new BehaviorSubject<User>(new User());
    this.currentUser = this._currentUser.asObservable();

    // When page is refreshed, this reloads user data without having to log in again.
    if (this.isAuthenticated()) {
      this._currentUser.next(this.sessionUser());
            
    }
    else {
      this.logout();
    }
  }

  public get currentUserValue() {
    return this._currentUser?.value;
  }
//login function, calls the AD Auth API
  login(username: string, password: string): Observable<any> {
    console.log("calling the api...");
    return this.http.get<any>(`https://eimweb4tst/gmldev/mw_Development/Data/BIAA_AD_Authentication/data/api/ADAuthentication/${username}/${password}/QCDE`).pipe(
      tap(data => {
        console.log("Auth User", data);
        let user: User = data;
        user.Username = username;
        console.log("login user result", user);
        if (data.IsAuthenticated == true){
          this._currentUser.next(user);
          this.sessionSet(user);

        }
        else{
          this.logout();
        }
        return user;
      }),
      catchError(error => { console.log("Auth User Error", error); return error})
    );

  }

  logout() {
    this._currentUser.next(new User());
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  sessionSet(user: User): void {
    // The expiration offset is in hours and can be modified as needed
    let session = {
      expiration: this.expiration(3),
      user: user
    }
    sessionStorage.setItem('session', JSON.stringify(session));
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem("session")) {
      let session: any = JSON.parse(sessionStorage.getItem("session") || "0");

      // If the session object is not expired the user is authenticated 
      if (new Date(session.expiration) > new Date()) {
        return true;
      }
    }

    return false;
  }

  expiration(offset: number): Date {
    // The expiration offset is in hours and can be modified as needed
    let dt = new Date();
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours() + offset, dt.getMinutes());
  }

  sessionUser(): User {
    let user: User = new User();
    if (sessionStorage.getItem("session")) {
      let session: any = JSON.parse(sessionStorage.getItem("session") || "0");

      // If the session object is not expired the user is authenticated 
      if (session.user) {
        user = session.user;
        console.log("session user", user);
      }
     
    }
    return user;
  }

}
