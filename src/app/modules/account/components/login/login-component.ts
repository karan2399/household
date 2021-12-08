import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: 'login-component.html',
    styleUrls: ['login-component.scss']
})
export class LoginComponent implements OnInit {


    public email: FormControl;
    public password: FormControl;

    public loginForm: FormGroup;


    constructor(private authService: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl(""),
            password: new FormControl(""),
        })
    }

    ngOnInit() {

    }

    doLogin(e) {
        e.preventDefault();
        this.authService.login(this.loginForm.value).subscribe(res => {
            if (res.statusCode == 200) {
                this.authService.userLoggedIn = true;
                this.router.navigate(['/home']);
            }
        });
    }

    onRegisterClick() {
        this.router.navigate(['/register']);
    }
}

