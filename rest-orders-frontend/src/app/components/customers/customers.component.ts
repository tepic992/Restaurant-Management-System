import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomersDialogComponent } from 'src/app/dialogs/customers-dialog/customers-dialog.component';
import { Customers } from 'src/app/models/customers';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  

  displayedColumns = ['customerId', 'customerAddress', 'customerLastName', 'customerName', 'customerPhone', 'actions'];

  //dataSource: Observable<Liga[]>;
  dataSource: MatTableDataSource<Customers>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public customersService: CustomersService,
    public dialog: MatDialog) {

}

ngOnInit(): void {
this.loadData();
}

public loadData(){
  //this.dataSource = this.CustomersServices.getAllCustomers();
  this.customersService.getAllCustomers().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch(property) {
        case 'customerId': return data[property];
        case 'customerAddress': return data[property];
        case 'customerLastName': return data[property];
        case 'customerName': return data[property];
        case 'customerPhone': return data[property];
        default: return "default";
      }
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}


public openDialog(flag: number, customerId: number, customerAddress: string, customerLastName: string, customerName: string, customerPhone: number,) {
  const dialog = this.dialog.open(CustomersDialogComponent, {data: {customerId: customerId, customerAddress: customerAddress, customerLastName: customerLastName,
    customerName:customerName, customerPhone:customerPhone}});
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
