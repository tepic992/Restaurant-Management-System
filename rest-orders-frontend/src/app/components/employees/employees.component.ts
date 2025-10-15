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
export class EmployeesComponent implements OnInit {

  displayedColumns = ['employeeId', 'employeeAddress', 'employeeLastName', 'employeeName', 'employeePhone', 'employeeSalary', 'jobs', 'actions'];
  dataSource: MatTableDataSource<Employees>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeesService.getAllEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'jobs': return item.job?.jobTitle?.toLowerCase() || '';
          default: return item[property];
        }
      };

      this.dataSource.filterPredicate = (data: Employees, filter: string): boolean => {
        const fullString = `
          ${data.employeeId}
          ${data.employeeAddress}
          ${data.employeeLastName}
          ${data.employeeName}
          ${data.employeePhone}
          ${data.employeeSalary}
          ${data.job?.jobTitle}
        `.toLowerCase();

        return fullString.includes(filter.trim().toLowerCase());
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(flag: number, employee?: Employees): void {
    const dialogRef = this.dialog.open(EmployeesDialogComponent, {
      data: employee ? { ...employee } : {}
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
