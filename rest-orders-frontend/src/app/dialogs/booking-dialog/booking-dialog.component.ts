import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/booking';
import { Customers } from 'src/app/models/customers';
import { Tables } from 'src/app/models/tables';
import { BookingService } from 'src/app/services/booking.service';
import { CustomersService } from 'src/app/services/customers.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit{

  public flag: number;

  customers: Customers[];

  tables: Tables[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<BookingDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Booking,
              public customersService: CustomersService,
              public tablesService: TablesService,
              public bookingService: BookingService ) { }

  ngOnInit(): void {
    this.customersService.getAllCustomers().subscribe((customers: Customers[]) =>
    this.customers = customers);

    this.tablesService.getAllTables().subscribe((tables: Tables[]) =>
      this.tables = tables);
  }

  public add(): void {
    this.bookingService.addBooking(this.data);
    this.snackBar.open('Uspešno dodata rezervacija ' + this.data.bookingId, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.bookingService.updateBooking(this.data);
    this.snackBar.open('Uspešno izmenjena rezervacija ' + this.data.bookingId, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.bookingService.deleteBooking(this.data.bookingId);
    this.snackBar.open("Uspešno obrisana rezervacija ' " + this.data.bookingId, "U redu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'U redu', {duration:2000});
  }

  compareTo(a: any, b: any) {
    if (a === null || b === null) {
      return false;
    }
    return a.id === b.id;
  }

}
