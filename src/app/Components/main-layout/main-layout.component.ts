import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  title: string = environment.app_name;
  profileUser: User = new User();
  app: string = environment.app_name;
  version: string = environment.version;
  build: string = environment.build;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(data => { this.profileUser = data });
  }

  logout(): void {
    this.authService.logout();
  }

}
