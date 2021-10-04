import { OnChanges, Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('userCharm') userCharm?: ElementRef;
  @Input('option') option: string = "default";
  @Input('background') background: string = "default";
  @Input() user: User = new User();
  

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => { this.user = user; })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue) {
      this.setCharm();
    }
  }

  ngAfterViewInit(): void {
    this.setCharm();
  }

  setCharm() {
    if (this.user.Initials !== '') {
      var initials: string = this.user.Initials;
      if (this.background == 'dark') {
        this.userCharm?.nativeElement.setAttribute('data-user-charm', initials);
      }
      else {
        this.userCharm?.nativeElement.setAttribute('data-user-charm-dark', initials);
      }
    }
  }

}
