import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TablesDialogComponent } from 'src/app/dialogs/tables-dialog/tables-dialog.component';
import { Tables } from 'src/app/models/tables';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit{
  
  displayedColumns = ['tableId', 'capacity', 'employee', 'actions'];
  
  
  dataSource: MatTableDataSource<Tables>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public tablesService: TablesService,
    public dialog: MatDialog) {

    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.tablesService.getAllTables().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
           switch(property) {
          case 'id': return data[property];
          case 'employee': return data[property];
          case 'capacity': return data[property];          
          default: return "default";
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, tableId: number, capacity: number, employee: string) {
    const dialog = this.dialog.open(TablesDialogComponent, {data: {tableId: tableId, capacity: capacity, employee: employee}});
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
