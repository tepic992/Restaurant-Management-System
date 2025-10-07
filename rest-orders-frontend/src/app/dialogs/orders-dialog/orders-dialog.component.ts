import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customers } from 'src/app/models/customers';
import { Employees } from 'src/app/models/employees';
import { Orders } from 'src/app/models/orders';
import { CustomersService } from 'src/app/services/customers.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.css']
})
export class OrdersDialogComponent implements OnInit{


  public flag: number;

  customers: Customers[];

  employees: Employees[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<OrdersDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Orders,
              public customersService: CustomersService,
              public employeesService: EmployeesService,
              public ordersService: OrdersService ) { }

  ngOnInit(): void {
    this.customersService.getAllCustomers().subscribe((customers: Customers[]) =>
    this.customers = customers);

    this.employeesService.getAllEmployees().subscribe((employees: Employees[]) =>
      this.employees = employees);
  }

  public add(): void {
    this.ordersService.addOrder(this.data);
    this.snackBar.open('Uspešno dodata narudzbina ' + this.data.orderType, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.ordersService.updateOrder(this.data);
    this.snackBar.open('Uspešno izmenjena narudzbina ' + this.data.orderType, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.ordersService.deleteOrder(this.data.orderId);
    this.snackBar.open("Uspešno obrisana narudzbina ' " + this.data.orderId, "U redu", {duration: 2000});
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
