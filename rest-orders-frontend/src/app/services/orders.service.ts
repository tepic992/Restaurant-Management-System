import { Injectable } from '@angular/core';
import { Orders } from '../models/orders';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly API_URL = "http://localhost:8082/orders";
  dataChange: BehaviorSubject<Orders[]> = new BehaviorSubject<Orders[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllOrders(): Observable<Orders[]>{

    this.httpClient.get<Orders[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addOrder(orders : Orders): void {
    this.httpClient.post(this.API_URL, orders).subscribe();
  }

  public updateOrder(orders: Orders): void {
    this.httpClient.put(this.API_URL + orders.orderId, orders).subscribe();
  }

  public deleteOrder(orderId: number): void {
    this.httpClient.delete(this.API_URL + orderId).subscribe();
  }
}
