import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent implements OnInit {

  homes = [];
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
    this.user = this.authService.getUser();
    if (this.user['role'] === 'Admin') {
      this.isAdmin = true;
    }

    this.homes = [
      {
        homeId: 1,
        homeName: '22 Ridware Crescent',
      },
      {
        homeId: 2,
        homeName: '302 Silverstone Drive',
      },
      {
        homeId: 3,
        homeName: '29 Halesia Drive',
      }
    ];

  }

  ngOnInit(): void {
    this.selectHome = this.selectHomeForm.get('selectHome');

  }

}
