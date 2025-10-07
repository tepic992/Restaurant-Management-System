import { Injectable } from '@angular/core';
import { Foods } from '../models/foods';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  private readonly API_URL = "http://localhost:8082/foods";
  dataChange: BehaviorSubject<Foods[]> = new BehaviorSubject<Foods[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  public getAllFoods(): Observable<Foods[]>{

    this.httpClient.get<Foods[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addFood(foods : Foods): void {
    this.httpClient.post(this.API_URL, foods).subscribe();
  }

  public updateFood(foods: Foods): void {
    this.httpClient.put(this.API_URL + foods.foodId, foods).subscribe();
  }

  public deleteFood(foodId: number): void {
    this.httpClient.delete(this.API_URL + foodId).subscribe();
  }
}
