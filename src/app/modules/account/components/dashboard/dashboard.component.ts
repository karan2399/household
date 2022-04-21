import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/authentication/authentication-service';
import { JwtHelperService } from "@auth0/angular-jwt";
export interface DialogSelectData {
  home: string;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDetails;
  opened = false;
  isAdmin: boolean = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  home: string;
  jwtHelperService: JwtHelperService;
  constructor(private observer: BreakpointObserver,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.jwtHelperService = new JwtHelperService();



    let intervalSession = setInterval(() => {
      if (this.jwtHelperService.isTokenExpired(localStorage.getItem('token')) && this.authService.getUser() != {}) {
        this.snackBar.open('You are now logged out due to SESSSION TIMEOUT', 'close', {
          duration: 3000,
          panelClass: 'my-custom-snackbar',
        });
        clearInterval(intervalSession);
        this.router.navigate(['\login']);
        this.authService.logout();
      }
    }, 10000)

    // setTimeout(function () {
    //   this.userDetails = this.authService.getUser();
    //   if (this.userDetails['role'] === 'Admin') {
    //     this.authService.setRoleAdmin();
    //     this.isAdmin = this.authService.getRoleAdmin();
    //   }
    // }, 3000)
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.authService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;

        this.authService.checkHomeAdded(this.userDetails.userId).subscribe(res => {

          // if (res.toString() === '') {
          //   this.snackBar.open('You must select a home in order to access the dashboard', 'close', {
          //     duration: 3000,
          //     panelClass: 'my-custom-snackbar',
          //   });
          //   this.router.navigate(['/dash/select-home']);
          // }
        })
      });

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }
  onLogout() {
    localStorage.removeItem('token');
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBar.open('You are now logged out', 'close', {
      duration: 3000,
      panelClass: 'my-custom-snackbar',
    });
  }

  goToProfile() {
    this.router.navigate(['dash/profile']);
    this.opened = false;
  }
  goToHome() {
    this.router.navigate(['dash/home']);
    this.opened = false;
  }
  goToSelectHome() {
    this.router.navigate(['dash/select-home']);
    this.opened = false;
  }
}
