import { AdminModule } from './../admin.module';
import { ProductsComponent } from './../../ui/components/products/products.component';
import { CustomersModule } from './customers/customers.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    DashboardsModule,
    CustomersModule,
    RouterModule.forChild([
      {path:"",component: ProductsComponent}
    ])
  ]
})
export class ComponentsModule { }

