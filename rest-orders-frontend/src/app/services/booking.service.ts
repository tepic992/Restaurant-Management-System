import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly API_URL = "http://localhost:8082/booking";
  dataChange: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllBooking(): Observable<Booking[]>{

    this.httpClient.get<Booking[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addBooking(booking : Booking): void {
    this.httpClient.post(this.API_URL, booking).subscribe();
  }

  public updateBooking(booking: Booking): void {
    this.httpClient.put(this.API_URL + booking.bookingId, booking).subscribe();
  }

  public deleteBooking(bookingId: number): void {
    this.httpClient.delete(this.API_URL + bookingId).subscribe();
  }
}
