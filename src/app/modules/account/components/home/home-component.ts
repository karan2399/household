import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
    selector: 'home-component',
    templateUrl: 'home-component.html',
    styleUrls: ['home-component.scss']
})
export class HomeComponent implements OnInit {
    events: string[] = [];
    opened: boolean;



    constructor(private authService: AuthService) {

    }

    ngOnInit() {

    }


}

