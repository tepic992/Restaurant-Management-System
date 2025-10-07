import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employees } from 'src/app/models/employees';
import { Tables } from 'src/app/models/tables';
import { EmployeesService } from 'src/app/services/employees.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-tables-dialog',
  templateUrl: './tables-dialog.component.html',
  styleUrls: ['./tables-dialog.component.css']
})
export class TablesDialogComponent implements OnInit{

  public flag: number;

  employees: Employees[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TablesDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Tables,
              public tablesService: TablesService,
              public employeesService: EmployeesService ) { }

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe((employees: Employees[]) =>
    this.employees = employees);
  }

  public add(): void {
    this.tablesService.addTable(this.data);
    this.snackBar.open('Uspešno dodat sto ' + this.data.tableId, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.tablesService.updateTable(this.data);
    this.snackBar.open('Uspešno izmenjen sto ' + this.data.tableId, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.tablesService.deleteTable(this.data.tableId);
    this.snackBar.open("Uspešno obrisan sto ' " + this.data.tableId, "U redu", {duration: 2000});
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
