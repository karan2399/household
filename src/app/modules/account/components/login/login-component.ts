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

    ngOnInit() {
        this.email = this.loginForm.get('email');
        this.password = this.loginForm.get('password');

    }

    doLogin(e) {
        e.preventDefault();
        this.authService.login(this.loginForm.value).subscribe(res => {
            console.log(res);
            if (res.statusCode == 200) {
                localStorage.setItem('token',this.email.value);  //res.token
                this.authService.userLoggedIn = true;
                this.snackBar.open('You are now logged in', 'close', {
                    duration: 3000,
                    panelClass: 'my-custom-snackbar',
                });
                this.router.navigate(['/home']);
            }
        });
    }

    onRegisterClick() {
        this.router.navigate(['/register']);
    }
}

