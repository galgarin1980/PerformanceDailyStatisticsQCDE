import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild('password') password: ElementRef | undefined;
  app: string = environment.app_name;
  version: string = environment.version;
  build: string = environment.build;
  error: boolean = false;
  loading: boolean = false;
  errorMsg: string = "";
  loginForm: FormGroup;

  // convenience getter for easy access to form values
  get form() { return this.loginForm.value; }

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required]});
   }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  onSubmit(): void {
    this.loading = true;
    this.error = false;

    let un = this.loginForm.controls['username'].value;
    let pw = this.loginForm.controls['password'].value;

    this.authService.login(un, pw).subscribe(response => {
      if (response.IsAuthenticated){
        this.router.navigate(['profile']);
      }
      else {
        this.setError("Login Failed: Invalid Credentials.");
      }

    }, error => { console.log("error...");
    this.setError("System error, try again later");
  })

  }

  setError(msg: string): void {
    this.error = true;
    this.loading = false;
    this.errorMsg = msg;
  }
}
