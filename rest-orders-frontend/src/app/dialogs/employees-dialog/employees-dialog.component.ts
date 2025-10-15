import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employees } from 'src/app/models/employees';
import { Jobs } from 'src/app/models/jobs';
import { EmployeesService } from 'src/app/services/employees.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.css']
})
export class EmployeesDialogComponent implements OnInit {

  public flag: number;

  jobs: Jobs[]; // Lista poslova za dropdown

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EmployeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employees,
    public jobsService: JobsService,
    public employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    // Učitavanje poslova za izbor u formi
    this.jobsService.getAllJobs().subscribe((jobs: Jobs[]) => this.jobs = jobs);
  }

  public add(): void {
    this.employeesService.addEmployee(this.data);
    this.snackBar.open('Uspešno dodat radnik ' + this.data.employeeName, 'U redu', { duration: 2000 });
  }

  public update(): void {
    this.employeesService.updateEmployee(this.data);
    this.snackBar.open('Uspešno izmenjen radnik ' + this.data.employeeName, 'U redu', { duration: 2000 });
  }

  public delete(): void {
    this.employeesService.deleteEmployee(this.data.employeeId);
    this.snackBar.open("Uspešno obrisan radnik " + this.data.employeeId, 'U redu', { duration: 2000 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'U redu', { duration: 2000 });
  }

  // Funkcija za poređenje dva posla u mat-selectu
  compareTo(a: Jobs, b: Jobs): boolean {
    if (!a || !b) {
      return false;
    }
    return a.jobId === b.jobId;
  }
}
