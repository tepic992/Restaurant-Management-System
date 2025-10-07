import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employees } from 'src/app/models/employees';
import { Foods } from 'src/app/models/foods';
import { EmployeesService } from 'src/app/services/employees.service';
import { FoodsService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-foods-dialog',
  templateUrl: './foods-dialog.component.html',
  styleUrls: ['./foods-dialog.component.css']
})
export class FoodsDialogComponent implements OnInit{

  public flag: number;

  employees: Employees[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FoodsDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Foods,
              public foodsService: FoodsService,
              public emplService: EmployeesService ) { }

  ngOnInit(): void {
    this.emplService.getAllEmployees().subscribe((employees: Employees[]) =>
    this.employees = employees);
  }

  public add(): void {
    this.foodsService.addFood(this.data);
    this.snackBar.open('Uspešno dodata hrana ' + this.data.foodName, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.foodsService.updateFood(this.data);
    this.snackBar.open('Uspešno izmenjen hrana ' + this.data.foodName, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.foodsService.deleteFood(this.data.foodId);
    this.snackBar.open("Uspešno obrisana hrana ' " + this.data.foodId, "U redu", {duration: 2000});
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
