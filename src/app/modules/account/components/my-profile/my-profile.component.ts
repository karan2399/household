import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  //Anonymous object to store the response.
  userDetails;
  home;
  myProfileModel: FormGroup;

  constructor(public authService: AuthService,
    private toastrService: ToastrService) {
    this.myProfileModel = new FormGroup({
      Email: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Role: new FormControl(),
      UserId: new FormControl(),
      bdate: new FormControl(),
      currentHome: new FormControl(),
    });

  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.authService.getHomeForUser(this.userDetails.userId).subscribe(res => {
          this.home = res;
          this.myProfileModel.get('currentHome').setValue(this.home[0].home_name);
        })

        this.myProfileModel.get('Email').setValue(this.userDetails.email);
        this.myProfileModel.get('FirstName').setValue(this.userDetails.firstname);
        this.myProfileModel.get('LastName').setValue(this.userDetails.lastname);
        this.myProfileModel.get('Role').setValue(this.userDetails.role);
        this.myProfileModel.get('UserId').setValue(this.userDetails.userId);
        this.myProfileModel.get('bdate').setValue(this.userDetails.birthdate);

      },
      err => {
        console.log(err);
      },
    )
  }

  onSubmit() {
    //   this.authService.updateProfile().subscribe(
    //     (res: any) => {
    //       if (res.success == true) {
    //         this.toastrService.success(res.message, 'Success');
    //       }
    //       else {
    //         this.toastrService.error(res.message, 'Error');
    //       }
    //     },
    //     err => {
    //       this.toastrService.error('There is some problem while updating the profile, Please contact to administrator.', 'Error');
    //     }

    //   )
  }

}
