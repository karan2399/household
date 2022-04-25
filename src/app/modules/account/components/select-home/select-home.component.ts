import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent implements OnInit {

  homes;
  selectHome: AbstractControl;
  selectedHome;
  selectHomeForm: FormGroup;
  adminForm: FormGroup;
  address: AbstractControl;
  user;
  currentHome;
  isAdmin: boolean = false;
  home;
  cHome;
  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {

    this.selectHomeForm = new FormGroup({
      selectHome: new FormControl(),
    });
    this.adminForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
    })
    this.authService.getUserProfile().subscribe(
      res => {
        this.user = res;
        this.authService.getHomeForUser(this.user.userId).subscribe(res => {
          if (res.toString()[0] !== undefined) {
            this.home = res;
            this.currentHome = this.home[0].home_name;
            this.selectedHome = this.home[0].home_id;
          }

        })
        if (res['role'] === 'Admin') {
          this.isAdmin = true;
        }
      },
      err => {
        console.log(err);
      },
    )

    this.authService.getHomes().subscribe(res => {
      this.homes = res;
    })
    // [
    //   {
    //     homeId: 1,
    //     homeName: '22 Ridware Crescent',
    //   },
    //   {
    //     homeId: 2,
    //     homeName: '302 Silverstone Drive',
    //   },
    //   {
    //     homeId: 3,
    //     homeName: '29 Halesia Drive',
    //   },
    //   {
    //     homeId: 4,
    //     homeName: '1030 Kipling Avenue',
    //   }
    // ];

  }

  ngOnInit(): void {
    this.selectHome = this.selectHomeForm.get('selectHome');
    this.address = this.adminForm.get('address');

  }

  addHome() {
    let home = {
      home_Name: this.adminForm.value.address,
    }
    this.authService.addHome(home).subscribe(res => {
      this.authService.getHomes().subscribe(res => {
        this.homes = res;
      })
    })
  }
  homeChanged(e) {
    // this.selectedHome = this.homes.filter((h) => {
    //   return h.home_id === +e.target.value;
    // })[0].home_Name;
    this.cHome = this.homes.filter((h) => {
      return h.home_id === +e.target.value;
    })[0];
  }
  addHomeToUser() {
    let obj = {
      home_id: this.cHome.home_id,
      home_name: this.cHome.home_Name,
      id: this.user.userId,
      firstName: this.user.firstname,
      lastName: this.user.lastname
    }

    this.authService.addHomeToUser(obj).subscribe(res => {
      this.snackbar.open('You have succesfully added your home', 'close', {
        duration: 3000,
        panelClass: 'my-custom-snackbar',
      });
    });
  }
  updateHome() {
    let obj = {
      home_id: this.cHome.home_id,
      home_name: this.cHome.home_Name,
      id: this.user.userId,
      firstName: this.user.firstname,
      lastName: this.user.lastname,
    }
    this.authService.updateHomeToUser(obj).subscribe(res => {
      console.log(res[0].home_id);

      this.currentHome = res[0].home_name;
    });

    this.snackbar.open('You have succesfully updated your home', 'close', {
      duration: 3000,
      panelClass: 'my-custom-snackbar',
    });
  }

}
