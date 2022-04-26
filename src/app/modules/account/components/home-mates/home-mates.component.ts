import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
  selector: 'app-home-mates',
  templateUrl: './home-mates.component.html',
  styleUrls: ['./home-mates.component.scss']
})
export class HomeMatesComponent implements OnInit {

  homeusers;
  users;
  cHome;

  constructor(private authService: AuthService) {
    this.homeusers = [];

    this.authService.getUserProfile().subscribe(res => {
      this.users = res;
      this.authService.getHomeUsers().subscribe(res => {
        this.homeusers = res;
        this.authService.getHomeForUser(this.users.userId).subscribe(res => {
          this.cHome = res;

          this.homeusers = this.homeusers.filter(h => {
            return this.cHome[0].home_id === h.home_id;
          });


        })
      })
    })


  }


  ngOnInit(): void {
  }

}
