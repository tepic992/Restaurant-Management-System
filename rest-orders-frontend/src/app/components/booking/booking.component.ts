import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingDialogComponent } from 'src/app/dialogs/booking-dialog/booking-dialog.component';
import { Booking } from 'src/app/models/booking';
import { Customers } from 'src/app/models/customers';
import { Tables } from 'src/app/models/tables';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  displayedColumns = ['bookingId', 'bhour', 'bdate', 'customer', 'table', 'actions'];

  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public bookingService: BookingService,
    public dialog: MatDialog) {

    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.bookingService.getAllBooking().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
           switch(property) {
          case 'bookingId': return data[property];
          case 'customer': return data[property].customerId;
          case 'table': return data[property].tableId;
          case 'bhour': return data[property];
          case 'bdate': return data[property].getDate();
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, bookingId: number, customer: Customers, table: Tables, bhour: number, bdate: Date) {
    const dialog = this.dialog.open(BookingDialogComponent, {data: {bookingId:bookingId, customer:customer, table: table, bhour:bhour, bdate:bdate}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => {
          this.loadData();
        }, 100)        
      }
    })
  }

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
