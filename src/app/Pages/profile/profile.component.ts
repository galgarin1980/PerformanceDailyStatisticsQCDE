import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileUser: User = new User();

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(data => { this.profileUser = data });
  }

}
