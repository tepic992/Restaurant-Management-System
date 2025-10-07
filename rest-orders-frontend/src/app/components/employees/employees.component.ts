import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesDialogComponent } from 'src/app/dialogs/employees-dialog/employees-dialog.component';
import { Employees } from 'src/app/models/employees';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{
  
  displayedColumns = ['employeeId', 'employeeAddress', 'employeeLastName', 'employeeName', 'employeePhone',
   'employeeSalary', 'jobs', 'actions'];

  dataSource: MatTableDataSource<Employees>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public employeesService: EmployeesService,
              public dialog: MatDialog) {

  }
   
  
  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.employeesService.getAllEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'employeeId': return data[property];
          case 'employeeAddress': return data[property];
          case 'employeeLastName': return data[property];
          case 'employeeName': return data[property].toString();
          case 'employeePhone': return data[property];
          case 'employeeSalary': return data[property];
          case 'jobs': return data[property];
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }  

  public openDialog(flag: number, employeeId: number, employeeAddress: string, employeeLastName: string, employeeName: string, employeePhone: number, employeeSalary: number, job: string) {
    const dialog = this.dialog.open(EmployeesDialogComponent, {data: {employeeId: employeeId, employeeAddress: employeeAddress, employeeLastName:employeeLastName,
       employeeName:employeeName, employeePhone:employeePhone, employeeSalary:employeeSalary, job: job}});
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
