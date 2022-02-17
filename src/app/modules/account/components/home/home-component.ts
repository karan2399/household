import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/authentication/authentication-service';
import { MatCard } from '@angular/material/card';
@Component({
    selector: 'home-component',
    templateUrl: 'home-component.html',
    styleUrls: ['home-component.scss']
})
export class HomeComponent implements OnInit {
    events: string[] = [];
    @Input() isAdmin: boolean;
    users = [];
    usersCutting;
    userCutting: string;
    userKitchen: string;
    selectedOptionSwapKitchen: string;
    selectedOptionWithKitchen: string;


    selectedOptionSwapCutting: string;
    selectedOptionWithCutting: string;
    myDate;
    constructor(private authService: AuthService) {
        setInterval(() => {
            this.myDate = Date.now();
        }, 1000);

        this.usersCutting = [
            {
                name: "Karan",
            },
            {
                name: "Sharvil",
            },
            {
                name: "Shivani",
            },
            {
                name: "Vishal",
            },
            {
                name: "DK",
            }
        ];
        // Get Latest User List from Web API
        // this.users = this.authService.getUsers();
        this.authService.getKitchenUserList().subscribe((uList: any) => {
            this.users = uList;
            this.allocateKitchenTask();
            this.allocateCuttingTask();
        });


    }
    allocateCuttingTask() {
        this.userCutting = this.usersCutting[0].name;
        this.selectedOptionSwapCutting = this.usersCutting[0].name;
    }
    allocateKitchenTask() {
        this.userKitchen = this.users[0].firstName;
        this.selectedOptionSwapKitchen = this.users[0].firstName;

    }
    ngOnInit() {

    }

    cuttingDone() {
        this.usersCutting.push(this.usersCutting.shift());
        this.userCutting = this.usersCutting[0].name;
        this.selectedOptionSwapCutting = this.usersCutting[0].name;
        // Post New Updated User List
        // this.authService.postNewCuttingUsersList(this.users);
    }

    kitchenDone() {
        this.users.push(this.users.shift());
        this.userKitchen = this.users[0].firstName;
        this.selectedOptionSwapKitchen = this.users[0].firstName;
        // Post New Updated User List
        // this.authService.postNewKitchenUsersList(this.users);
    }
    kitchenSwap() {
        console.log(this.selectedOptionSwapKitchen + ' ' + this.selectedOptionWithKitchen);
    }

}

