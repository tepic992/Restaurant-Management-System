import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobsDialogComponent } from 'src/app/dialogs/jobs-dialog/jobs-dialog.component';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{

  displayedColumns = ['jobId', 'jobTitle','actions'];

  dataSource: MatTableDataSource<Jobs>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public jobService: JobsService,
    public dialog: MatDialog) {

}



  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.JobsService.getAllJobs();
    this.jobService.getAllJobs().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'jobId': return data[property];
          case 'jobTitle': return data[property];          
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  public openDialog(flag: number, jobId: number, jobTitle: string) {
    const dialog = this.dialog.open(JobsDialogComponent, {data: {id: jobId, jobTitle: jobTitle}});
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


