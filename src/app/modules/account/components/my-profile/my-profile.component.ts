import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/authentication-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  //Anonymous object to store the response.
  userDetails

  constructor(public authService : AuthService,
    private toastrService:ToastrService) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      res =>{
        this.userDetails = res;
        this.userDetails.myProfileModel.get('Email').setValue(this.userDetails.email);
        this.userDetails.myProfileModel.get('FirstName').setValue(this.userDetails.firstName);
        this.userDetails.myProfileModel.get('LastName').setValue(this.userDetails.lastName);
        this.userDetails.myProfileModel.get('Role').setValue(this.userDetails.role);
        this.userDetails.myProfileModel.get('UserID').setValue(this.userDetails.userId);

      },
      err =>{
        console.log(err);
      },
    )
  }

  onSubmit(){
    this.authService.updateProfile().subscribe(
        (res: any )=>{
          if(res.success == true){
            this.toastrService.success(res.message,'Success');
          }
          else{
            this.toastrService.error(res.message,'Error');
          }
        },
        err =>{
          this.toastrService.error('There is some problem while updating the profile, Please contact to administrator.','Error');
        }

    )
  }

}
