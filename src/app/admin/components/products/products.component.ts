import { ListComponent } from './list/list.component';
import { HttpClientService } from './../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClientService : HttpClientService ) {super(spinner)}

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallAtom)
    // this.httpClientService.delete<Create_Product>({
    //   controller:"products",
    // },"a9854cc0-6580-49af-b524-d14dfacc9ca5").subscribe(data => console.log(data))
  }

  @ViewChild(ListComponent) listComponents : ListComponent;

  createdProduct (createdProduct : Create_Product) {
  this.listComponents.getProducts();
  }

}
