import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

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
    this.router.navigate(['/login']);
    this.snackBar.open('You are now logged out', 'close', {
      duration: 3000,
      panelClass: 'my-custom-snackbar',
    });
  }
}
