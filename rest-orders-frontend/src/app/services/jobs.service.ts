import { Injectable } from '@angular/core';
import { Jobs } from '../models/jobs';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private readonly API_URL = "http://localhost:8082/jobs/";
  dataChange: BehaviorSubject<Jobs[]> = new BehaviorSubject<Jobs[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllJobs(): Observable<Jobs[]>{

    this.httpClient.get<Jobs[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }



  
  public addJob(job: Jobs): void {
    this.httpClient.post(this.API_URL, job).subscribe();
  }

  public updateJob(job: Jobs): void {
    this.httpClient.put(this.API_URL + job.jobId, job).subscribe();
  }

  public deleteJob(jobId: number): void {
    this.httpClient.delete(this.API_URL + jobId).subscribe();
  }
}
