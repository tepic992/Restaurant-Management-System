import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsDialogComponent } from 'src/app/dialogs/items-dialog/items-dialog.component';
import { Foods } from 'src/app/models/foods';
import { Items } from 'src/app/models/items';
import { Orders } from 'src/app/models/orders';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  displayedColumns = ['itemId', 'quantity', 'food', 'order', 'actions'];

  dataSource: MatTableDataSource<Items>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public itemsService: ItemsService,
    public dialog: MatDialog) {

    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.itemsService.getAllItems().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
           switch(property) {
          case 'itemId': return data[property];
          case 'food': return data[property].foodId;
          case 'order': return data[property].orderId;
          case 'quantity': return data[property];
          default: return "default";
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, itemId: number, quantity: number, food: Foods, order: Orders) {
    const dialog = this.dialog.open(ItemsDialogComponent, {data: {itemId: itemId, quantity: quantity, food:food, order:order}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        setTimeout(() => {
          this.loadData();
        }, 100)       
      }
    })
  }

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



}
