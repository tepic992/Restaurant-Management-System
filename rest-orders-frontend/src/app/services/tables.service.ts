import { Injectable } from '@angular/core';
import { Tables } from '../models/tables';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private readonly API_URL = "http://localhost:8082/tables";
  dataChange: BehaviorSubject<Tables[]> = new BehaviorSubject<Tables[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllTables(): Observable<Tables[]>{

    this.httpClient.get<Tables[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
    } 
    );
    return this.dataChange.asObservable();
  }

  public addTable(table : Tables): void {
    this.httpClient.post(this.API_URL, table).subscribe();
  }

  public updateTable(table: Tables): void {
    this.httpClient.put(this.API_URL + table.tableId, table).subscribe();
  }

  public deleteTable(tableId: number): void {
    this.httpClient.delete(this.API_URL + tableId).subscribe();
  }
}
