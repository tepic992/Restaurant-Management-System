import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Foods } from 'src/app/models/foods';
import { Items } from 'src/app/models/items';
import { Orders } from 'src/app/models/orders';
import { FoodsService } from 'src/app/services/foods.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.css']
})
export class ItemsDialogComponent implements OnInit {

  public flag: number;

  foods: Foods[] = [];
  orders: Orders[] = [];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Items,
    public itemsService: ItemsService,
    public foodsService: FoodsService,
    public ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.foodsService.getAllFoods().subscribe(foods => this.foods = foods);
    this.ordersService.getAllOrders().subscribe(orders => this.orders = orders);
  }

  public add(): void {
    this.itemsService.addItem(this.data);
    this.snackBar.open('Uspešno dodat predmet ' + this.data.itemId, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.itemsService.updateItem(this.data);
    this.snackBar.open('Uspešno izmenjen predmet ' + this.data.itemId, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.itemsService.deleteItem(this.data.itemId);
    this.snackBar.open('Uspešno obrisan predmet ' + this.data.itemId, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareFood(a: Foods, b: Foods): boolean {
    return a && b ? a.foodId === b.foodId : a === b;
  }

  compareOrder(a: Orders, b: Orders): boolean {
    return a && b ? a.orderId === b.orderId : a === b;
  }
}
