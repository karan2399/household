import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
    selector: 'register-component',
    templateUrl: 'register-component.html',
    styleUrls: ['register-component.scss']
})
export class RegsiterComponent implements OnInit {

    public firstName: AbstractControl;
    public lastName: AbstractControl;
    public phoneNumber: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;
    public birthdate: AbstractControl;
    public username: AbstractControl;
 

    public registerForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        this.registerForm = new FormGroup({
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required]),
            phoneNumber: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [Validators.required]),
            birthdate: new FormControl("", [Validators.required]),
            
            // username: new FormControl("", [Validators.required]),
        })
    }

    ngOnInit() {
        this.firstName = this.registerForm.get('firstName');
        this.lastName = this.registerForm.get('lastName');
        this.email = this.registerForm.get('email');
        // this.username = this.registerForm.get('username');
        this.password = this.registerForm.get('password');
        this.birthdate = this.registerForm.get('birthdate');
        this.phoneNumber = this.registerForm.get('phoneNumber');
        this.confirmPassword = this.registerForm.get('confirmPassword');
        


    }

    doRegsiter(e) {
        e.preventDefault();
        this.authService.register(this.registerForm.value).subscribe(res => {
            console.log('Register Response: ' + res);
        });
    }

    onLogin() {
        this.router.navigate(['/login']);
    }
}

