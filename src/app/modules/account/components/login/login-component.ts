import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';
import { Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '../home/home-component';


@Component({
    selector: 'login-component',
    templateUrl: 'login-component.html',
    styleUrls: ['login-component.scss']
})
export class LoginComponent implements OnInit {


    public email: AbstractControl;
    public password: AbstractControl;

    public loginForm: FormGroup;
    durationInSeconds = 5;


    constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required]),
        })
    }
    isDisabled = false;
    ngOnInit() {
        if (localStorage.getItem('token') !== null && this.authService.getUser() != {}) {
            this.router.navigate(['/dash/home']);
        }
        this.email = this.loginForm.get('email');
        this.password = this.loginForm.get('password');

    }

    doLogin(e) {
        e.preventDefault();
        this.authService.login(this.loginForm.value).subscribe(res => {
            // localStorage.setItem("token", res["token"]);
            if (res.success == true) {
                localStorage.setItem('token', res.token);  //res.token

                this.authService.userLoggedIn = true;
                this.isDisabled = false;
                this.snackBar.open('You are now logged in', 'Close', {
                    duration: 3000,
                    panelClass: 'my-custom-snackbar',
                });
                this.authService.getUserProfile().subscribe(res => {
                    this.authService.setUser(res);
                })
                this.router.navigate(['/dash']);
            }
            else {
                this.snackBar.open('The credentials you entered are incorrect!', 'Close', {
                    duration: 3000,
                    panelClass: 'my-custom-snackbar',
                });

            }


        });
    }


    onRegisterClick() {
        this.router.navigate(['/register']);
    }
}

