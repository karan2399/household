import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/authentication/authentication-service';

@Component({
    selector: 'home-component',
    templateUrl: 'home-component.html',
    styleUrls: ['home-component.scss']
})
export class HomeComponent implements OnInit {
    events: string[] = [];
    constructor(private authService: AuthService) { }
    ngOnInit() {
    }

    userFName;
}

