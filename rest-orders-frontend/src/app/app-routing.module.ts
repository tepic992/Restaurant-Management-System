import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './core/author/author.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { TablesComponent } from './components/tables/tables.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ItemsComponent } from './components/items/items.component';
import { FoodsComponent } from './components/foods/foods.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes= [
  {path: 'home', component: HomeComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'about', component: AboutComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'orders', component: OrdersComponent}, 
  {path: 'items', component: ItemsComponent}, 
  {path: 'foods', component: FoodsComponent}, 
  {path: 'booking', component: BookingComponent},  
  {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
