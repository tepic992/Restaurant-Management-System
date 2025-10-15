import { Injectable } from '@angular/core';
import { Employees } from '../models/employees';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API_URL = "http://localhost:8082/employees/";
  dataChange: BehaviorSubject<Employees[]> = new BehaviorSubject<Employees[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllEmployees(): Observable<Employees[]>{

    this.httpClient.get<Employees[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addEmployee(employees : Employees): void {
    this.httpClient.post(this.API_URL, employees).subscribe();
  }

  public updateEmployee(employees: Employees): void {
    this.httpClient.put(this.API_URL + employees.employeeId, employees).subscribe();
  }

  public deleteEmployee(employeeId: number): void {
    this.httpClient.delete(this.API_URL + employeeId).subscribe();
  }
}
