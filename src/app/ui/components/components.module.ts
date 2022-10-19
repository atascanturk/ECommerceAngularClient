import { HomeModule } from './home/home.module';
import { CartsModule } from './carts/carts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CartsModule,
    HomeModule
  ]
})
export class ComponentsModule { }
