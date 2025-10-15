import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs-dialog',
  templateUrl: './jobs-dialog.component.html',
  styleUrls: ['./jobs-dialog.component.css']
})
export class JobsDialogComponent implements OnInit{
  
  
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<JobsDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              public jobsService: JobsService ) { }
  
  ngOnInit(): void {
    
  }

  public add(): void {
    this.jobsService.addJob(this.data);
    this.snackBar.open('Uspešno dodat posao ' + this.data.jobTitle, 'U redu', {duration: 2000});
  }

  public update(): void {
    
    this.jobsService.updateJob({jobId: this.data.id, jobTitle: this.data.jobTitle });
    this.snackBar.open('Uspešno izmenjen posao ' + this.data.jobTitle, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.jobsService.deleteJob(this.data.id);
    this.snackBar.open("Uspešno obrisan posao' " + this.data.id, "U redu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'U redu', {duration:2000});
  }

}
