import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordFormGroup: FormGroup;

  constructor(private authService: AuthService) {
    this.changePasswordFormGroup = new FormGroup({
      currentPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmNewPassword: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let obj = {
      username: "",
      firstname: "",
      lastname: "",
      birthdate: "",
      phoneNumber: "",
      email: "",
      password: "",
      currentPassword: "",
      role: "",
      userId: "",
    }



    this.authService.changePassword(obj).subscribe(res => {
      console.log(res);

    })
  }

}
