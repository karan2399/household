import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './modules/account/services/authentication/authentication-service';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'household';
  userLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.getUser();
    this.userLoggedIn = this.authService.userLoggedIn;

    setInterval(() => {
      this
    }, 90000)
  }
  ngOnDestroy() {

  }
}
