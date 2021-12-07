import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
    selector: 'register-component',
    templateUrl: 'register-component.html',
    styleUrls: ['register-component.scss']
})
export class RegsiterComponent implements OnInit {

    public firstName: FormControl;
    public lastName: FormControl;
    public phoneNumber: FormControl;
    public email: FormControl;
    public password: FormControl;
    public confirmPassword: FormControl;

    public registerForm: FormGroup;

    constructor(private authService: AuthService,) {
        this.registerForm = new FormGroup({
            firstName: new FormControl(""),
            lastName: new FormControl(""),
            email: new FormControl(""),
            phone: new FormControl(""),
            password: new FormControl(""),
            confirmPassword: new FormControl(""),
        })
    }

    ngOnInit() {

    }

    doRegsiter(e) {
        e.preventDefault();
        this.authService.register(this.registerForm.value);
    }
}

