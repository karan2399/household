import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSelectHomeDialog } from '../../dialogs/selectHome/dialog-select-home';
export interface DialogSelectData {
  home: string;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  home: string;
  constructor(private observer: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
    const dialogRef = this.dialog.open(DialogSelectHomeDialog, {
      width: '250px',
      data: { home: this.home, },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The select home dialog was closed');
      this.home = result;
    });
  }

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
