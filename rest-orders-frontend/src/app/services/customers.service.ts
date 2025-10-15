import { Injectable } from '@angular/core';
import { Customers } from '../models/customers';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly API_URL = "http://localhost:8082/customers/";
  dataChange: BehaviorSubject<Customers[]> = new BehaviorSubject<Customers[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<Customers[]>{

    this.httpClient.get<Customers[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addCustomer(customer: Customers): void {
    this.httpClient.post(this.API_URL, customer).subscribe();
  }

  public updateCustomer(customer: Customers): void {
    this.httpClient.put(this.API_URL + customer.customerId, customer).subscribe();
  }

  public deleteCustomer(customerId: number): void {
    this.httpClient.delete(this.API_URL + customerId).subscribe();
  }
}
