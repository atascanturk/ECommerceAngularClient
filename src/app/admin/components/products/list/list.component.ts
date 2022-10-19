import { AlertifyOptions, MessageType, Position } from './../../../../services/admin/alertify.service';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

declare var $:any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit  {

  constructor(spinner:NgxSpinnerService, private productService : ProductService, private alertifyService:AlertifyService ) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','modifiedDate','edit', 'delete'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource : MatTableDataSource<List_Product> = null;

//   delete(id,event){

//     const img :HTMLImageElement = event.srcElement;
// $(img.parentElement).fadeOut(2000);

//   }

async getProducts () {
  this.showSpinner(SpinnerType.BallAtom)
  const allProducts : {totalCount : number ; products :List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex :0,
    this.paginator? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallAtom)
    , errorMessage => this.alertifyService.message(errorMessage,{
     dismissOthers : true,
     messageType : MessageType.Error,
     position: Position.TopRight
   }))

   this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
   this.paginator.length = allProducts.totalCount;

}

async pageChanged(){
await this.getProducts();
}

  async ngOnInit() {
   await this.getProducts()
  }

}
