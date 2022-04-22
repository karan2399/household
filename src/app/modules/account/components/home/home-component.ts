import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/authentication/authentication-service';
import { MatCard } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'home-component',
    templateUrl: 'home-component.html',
    styleUrls: ['home-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    events: string[] = [];
    isAdmin;
    user;
    users = [];
    wList;
    usersCutting;
    userCutting: string;
    userKitchen: string;
    userWeekly: string;
    comingSunday: Date;
    selectedOptionSwapKitchen: string;
    selectedOptionWithKitchen: string;

    selectedOptionWithWeekly: string;
    selectedOptionSwapWeekly: string;


    selectedOptionSwapCutting: string;
    selectedOptionWithCutting: string;
    myDate;
    home;
    cDate;


    constructor(private authService: AuthService, private snackBar: MatSnackBar, private dataRoute: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef
    ) {
        this.cDate = new Date();
        this.comingSunday = new Date();
        this.comingSunday.setDate(this.comingSunday.getDate() + (((1 + 6 - this.comingSunday.getDay()) % 7) || 7));
        this.user = {};
        this.authService.getUserProfile().subscribe(
            res => {
                this.user = res;
                if (res['role'] === 'Admin') {
                    this.isAdmin = true;
                    this.authService.getHomeForUser(this.user.userId).subscribe(res => {
                        if (res.toString()[0] !== undefined) {
                            this.home = res[0].home_name;
                        }
                        else {
                            this.home = null;
                        }

                    })
                }
            },
            err => {
                console.log(err);
            },
        )
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

        // Get Weekly Task List
        this.authService.getWeeklyTaskList().subscribe(res => {
            this.wList = res;
            this.allocateWeeklyTask();
        })
    }
    getDay(i) {

        let d = new Date();
        switch (i) {

            case 0:
                {
                    d.setDate(d.getDate());
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }
            case 1:
                {
                    d.setDate(d.getDate() + 1);
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }
            case 2:
                {
                    d.setDate(d.getDate() + 2);
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }
            case 3:
                {
                    d.setDate(d.getDate() + 3);
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }
            case 4:
                {
                    d.setDate(d.getDate() + 4);
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }
            case 5:
                {
                    d.setDate(d.getDate() + 5);
                    this.snackBar.open(this.days[d.getDay()], 'close', {
                        duration: 3000,
                        panelClass: 'my-custom-snackbar',
                    });
                    break;
                }

        }
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
    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }


    cuttingDone() {
        this.usersCutting.push(this.usersCutting.shift());
        this.userCutting = this.usersCutting[0].name;
        this.selectedOptionSwapCutting = this.usersCutting[0].name;
        // Post New Updated User List
        // this.authService.postNewCuttingUsersList(this.users);
    }

    kitchenDone() {
        // this.users.push(this.users.shift());
        // this.userKitchen = this.users[0].firstName;
        // this.selectedOptionSwapKitchen = this.users[0].firstName;


        // console.log(this.users);
        // let nUsers = [];
        // for (let userI of this.users) {
        //     let u = {
        //         email: userI.email,
        //         firstName: userI.firstName,
        //         id: null,
        //         lastName: userI.lastName,
        //         task_Description: null,
        //         task_id: (userI.task_id - 1)
        //     }
        //     if (u.task_id === 0) {
        //         u = {
        //             email: userI.email,
        //             firstName: userI.firstName,
        //             id: null,
        //             lastName: userI.lastName,
        //             task_Description: null,
        //             task_id: this.users.length
        //         }
        //     }
        //     nUsers.push(u);
        // }
        // this.users = nUsers.slice(0);

        // Post New Updated User List
        // for (let u of this.users) {
        this.authService.postNewKitchenUsersList().subscribe(res => {
            this.authService.getKitchenUserList().subscribe((uList: any) => {
                this.users = uList;
                this.allocateKitchenTask();
                this.allocateCuttingTask();
            });
        });
        // }


    }
    kitchenSwap() {
        // let swapIndex;
        // this.users.forEach((u, index) => {
        //     if (u.firstName == this.selectedOptionWithKitchen) {
        //         swapIndex = index;
        //     }
        // });
        // let temp;
        // temp = this.users[0];
        // this.users[0] = this.users[swapIndex];
        // this.users[swapIndex] = temp;

        let swapIndex;
        this.users.forEach((u, index) => {
            if (u.firstName == this.selectedOptionWithKitchen) {
                swapIndex = index;
            }
        });

        let u1 = {
            email: this.users[0].email,
            firstName: this.users[0].firstName,
            id: null,
            lastName: this.users[0].lastName,
            task_Description: null,
            task_id: (this.users[swapIndex].task_id)
        }

        let u2 = {
            email: this.users[swapIndex].email,
            firstName: this.users[swapIndex].firstName,
            id: null,
            lastName: this.users[swapIndex].lastName,
            task_Description: null,
            task_id: (this.users[0].task_id)
        }
        let uSwapList: Object[] = [];
        uSwapList.push(u1);
        uSwapList.push(u2);



        for (let uSwap in uSwapList) {
            this.authService.swapKitchenList(u1).subscribe(res => {
                this.authService.getKitchenUserList().subscribe((uList: any) => {
                    this.users = uList;
                    this.allocateKitchenTask();
                    this.allocateCuttingTask();
                });
            });
            this.authService.swapKitchenList(u2).subscribe(res => {
                this.authService.getKitchenUserList().subscribe((uList: any) => {
                    this.users = uList;
                    this.allocateKitchenTask();
                    this.allocateCuttingTask();
                });
            });
        }

        // }
    }

    cuttingSwap() {
        let swapIndex;
        this.usersCutting.forEach((u, index) => {
            if (u.name == this.selectedOptionWithCutting) {
                swapIndex = index;
            }
        });
        let temp;
        temp = this.usersCutting[0];
        this.usersCutting[0] = this.usersCutting[swapIndex];
        this.usersCutting[swapIndex] = temp;
    }

    weeklyDone() {
        let wUsers = [];
        for (let [i, userI] of this.wList.entries()) {
            // if (i == this.wList.length - 1) {
            //     break;
            // }
            let u;
            if (i === 0) {
                u =
                {
                    task_id: this.wList[this.wList.length - 1].task_id,
                    id: null,
                    firstName: userI.firstName,
                    lastName: userI.lastName,
                    email: userI.email,
                    task_Description: this.wList[this.wList.length - 1].task_Description
                }
            }
            else {
                u =
                {
                    task_id: this.wList[i - 1].task_id,
                    id: null,
                    firstName: userI.firstName,
                    lastName: userI.lastName,
                    email: userI.email,
                    task_Description: this.wList[i - 1].task_Description
                }
            }
            wUsers.push(u);

        }
        this.wList = wUsers.slice(0);
        // for (let w of this.wList) {
        //     this.authService.updateWeeklyTaskList(w).subscribe(res => {
        //         this.authService.getWeeklyTaskList().subscribe((uList: any) => {
        //             this.wList = uList;
        //             this.allocateWeeklyTask();
        //         });
        //     });
        // }
        console.log(wUsers);

    }
    allocateWeeklyTask() {
        this.userWeekly = this.wList[0].firstName;
        this.selectedOptionSwapWeekly = this.wList[0].firstName;
    }

    weeklySwap() {

    }

}

