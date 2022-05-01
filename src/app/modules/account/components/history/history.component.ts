import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Karan', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
  { position: 2, name: 'Dhaneshwar', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
  { position: 3, name: 'Shivani', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
  { position: 4, name: 'Vishal', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
  { position: 5, name: 'Henil', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
  { position: 6, name: 'Sharvil', tDate: '2022-05-01', comment: 'Dummy Comment', status: 'Done' },
];
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})


export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'tDate', 'comment', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
