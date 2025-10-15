import { Injectable } from '@angular/core';
import { Items } from '../models/items';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly API_URL = "http://localhost:8082/items/";
  dataChange: BehaviorSubject<Items[]> = new BehaviorSubject<Items[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllItems(): Observable<Items[]>{

    this.httpClient.get<Items[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addItem(items : Items): void {
    this.httpClient.post(this.API_URL, items).subscribe();
  }

  public updateItem(items: Items): void {
    this.httpClient.put(this.API_URL + items.itemId, items).subscribe();
  }

  public deleteItem(itemId: number): void {
    this.httpClient.delete(this.API_URL + itemId).subscribe();
  }
}
