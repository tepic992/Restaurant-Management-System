import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FoodsDialogComponent } from 'src/app/dialogs/foods-dialog/foods-dialog.component';
import { Employees } from 'src/app/models/employees';
import { Foods } from 'src/app/models/foods';
import { FoodsService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit{


  displayedColumns = ['foodId', 'foodName', 'foodPrice', 'employee', 'actions'];

  dataSource: MatTableDataSource<Foods>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public foodsService: FoodsService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.foodsService.getAllFoods().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'foodId': return data[property];
          case 'employee': return data[property].employeeId;
          case 'foodName': return data[property];
          case 'foodPrice': return data[property];
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, foodId: number, foodName: string, foodPrice: number, employee: Employees) {
    const dialog = this.dialog.open(FoodsDialogComponent, {data: {foodId:foodId, foodName:foodName, foodPrice:foodPrice, employee:employee}});
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
