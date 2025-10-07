import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customers } from 'src/app/models/customers';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './customers-dialog.component.html',
  styleUrls: ['./customers-dialog.component.css']
})
export class CustomersDialogComponent implements OnInit{
  
  
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CustomersDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Customers,
              public customersService: CustomersService ) { }
  
  
  ngOnInit(): void 
  {
    
  }

  public add(): void {
    this.customersService.addCustomer(this.data);
    this.snackBar.open('Uspešno dodat korisnik' + this.data.customerName, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.customersService.updateCustomer(this.data);
    this.snackBar.open('Uspešno izmenjen korisnik' + this.data.customerName, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.customersService.deleteCustomer(this.data.customerId);
    this.snackBar.open("Uspešno obrisan korisnik ' " + this.data.customerId, "U redu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'U redu', {duration:2000});
  }


}
