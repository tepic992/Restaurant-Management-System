import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JobsComponent } from './components/jobs/jobs.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { TablesComponent } from './components/tables/tables.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ItemsComponent } from './components/items/items.component';
import { FoodsComponent } from './components/foods/foods.component';
import { BookingComponent } from './components/booking/booking.component';

import { JobsService } from './services/jobs.service';
import { EmployeesService } from './services/employees.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { ItemsService } from './services/items.service';
import { TablesService } from './services/tables.service';
import { FoodsService } from './services/foods.service';
import { BookingService } from './services/booking.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BookingDialogComponent } from './dialogs/booking-dialog/booking-dialog.component';
import { CustomersDialogComponent } from './dialogs/customers-dialog/customers-dialog.component';
import { FoodsDialogComponent } from './dialogs/foods-dialog/foods-dialog.component';
import { JobsDialogComponent } from './dialogs/jobs-dialog/jobs-dialog.component';
import { OrdersDialogComponent } from './dialogs/orders-dialog/orders-dialog.component';
import { TablesDialogComponent } from './dialogs/tables-dialog/tables-dialog.component';
import { EmployeesDialogComponent } from './dialogs/employees-dialog/employees-dialog.component';
import { ItemsDialogComponent } from './dialogs/items-dialog/items-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    EmployeesComponent,
    CustomersComponent,
    TablesComponent,
    OrdersComponent,
    ItemsComponent,
    FoodsComponent,
    BookingComponent,
    JobsDialogComponent,
    EmployeesDialogComponent,
    CustomersDialogComponent,
    FoodsDialogComponent,
    ItemsDialogComponent,
    OrdersDialogComponent,
    BookingDialogComponent,
    TablesDialogComponent,
    AboutComponent,
    HomeComponent,
    AuthorComponent,
    HeaderComponent,
    BookingDialogComponent,
    CustomersDialogComponent,
    EmployeesDialogComponent,
    FoodsDialogComponent,
    ItemsDialogComponent,
    JobsDialogComponent,
    OrdersDialogComponent,
    TablesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  JobsService,
  EmployeesService,
  CustomersService,
  OrdersService,
  ItemsService,
  TablesService,
  FoodsService,
  BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
