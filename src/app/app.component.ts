import { Component } from '@angular/core';
import { AuthService } from './modules/account/services/authentication/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'household';
  userLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.userLoggedIn = this.authService.userLoggedIn;
  }
}
