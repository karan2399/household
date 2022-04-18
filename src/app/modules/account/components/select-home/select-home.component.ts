import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {

    this.selectHomeForm = new FormGroup({
      selectHome: new FormControl(),
    });
    this.adminForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
    })
    this.authService.getUserProfile().subscribe(
      res => {
        this.user = res;
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

}
