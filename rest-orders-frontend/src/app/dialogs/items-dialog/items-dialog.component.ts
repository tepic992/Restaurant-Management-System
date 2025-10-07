import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Items } from 'src/app/models/items';
import { Orders } from 'src/app/models/orders';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.css']
})
export class ItemsDialogComponent implements OnInit{


  public flag: number;

  orders: Orders[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ItemsDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Items,
              public itemsService: ItemsService,
              public ordersService: OrdersService ) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((orders: Orders[]) =>
    this.orders = orders);
  }

  public add(): void {
    this.itemsService.addItem(this.data);
    this.snackBar.open('Uspešno dodat predmet ' + this.data.itemId, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.itemsService.updateItem(this.data);
    this.snackBar.open('Uspešno izmenjen predmet ' + this.data.itemId, "U redu", {duration: 2000});
  }

  public delete(): void {
    this.itemsService.deleteItem(this.data.itemId);
    this.snackBar.open("Uspešno obrisan predmet ' " + this.data.itemId, "U redu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'U redu', {duration:2000});
  }

  compareTo(a: any, b: any) {
    if (a === null || b === null) {
      return false;
    }
    return a.id === b.id;
  }


}
