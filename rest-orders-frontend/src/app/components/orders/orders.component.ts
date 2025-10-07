import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersDialogComponent } from 'src/app/dialogs/orders-dialog/orders-dialog.component';
import { Customers } from 'src/app/models/customers';
import { Employees } from 'src/app/models/employees';
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{


  displayedColumns = ['orderId', 'orderDate', 'orderType', 'customer', 'employee','actions'];

  dataSource: MatTableDataSource<Orders>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public ordersService: OrdersService,
    public dialog: MatDialog) {

    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.ordersService.getAllOrders().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
           switch(property) {
          case 'id': return data[property];
          case 'customer': return data[property];
          case 'employee': return data[property];
          case 'orderDate': return data[property];
          case 'orderType': return data[property];
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, orderId: number, customer: Customers, employee: Employees, orderDate: Date, orderType: string) {
    const dialog = this.dialog.open(OrdersDialogComponent, {data: {orderId: orderId, customer: customer, employee: employee, orderDate: orderDate, orderType: orderType}});
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
