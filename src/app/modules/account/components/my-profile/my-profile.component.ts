import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  //Anonymous object to store the response.
  userDetails;
  myProfileModel: FormGroup;
  Email: AbstractControl;
  FirstName: AbstractControl;
  LastName: AbstractControl;
  Role: AbstractControl;
  UserId: AbstractControl;

  constructor(public authService: AuthService,
    private toastrService: ToastrService) {
    this.userDetails = this.authService.getUser();
    this.myProfileModel = new FormGroup({
      Email: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Role: new FormControl(),
      UserId: new FormControl(),
    });
  }
  ngOnInit() {
    this.Email = this.myProfileModel.get('Email');
    this.FirstName = this.myProfileModel.get('FirstName');
    this.LastName = this.myProfileModel.get('LastName');
    this.Role = this.myProfileModel.get('Role');
    this.UserId = this.myProfileModel.get('UserId');

    this.Email.setValue(this.userDetails.email);

    this.FirstName.setValue(this.userDetails.firstname);

    this.LastName.setValue(this.userDetails.lastname);

    this.Role.setValue(this.userDetails.role);

    this.UserId.setValue("************" + this.userDetails.userId.substring(2, 10) + "************");

  }
  onSubmit() {

  }




}
