import { FileUploadOptions } from './../../../../services/common/file-upload/file-upload.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Create_Product } from './../../../../contracts/create_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService : ProductService, private alertify :AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }
@Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
@Output() fileUploadOptions : Partial<FileUploadOptions> = {
action:"upload",
controller: "products",
explanation: "Resimleri sürükleyin veya seçin...",
isAdminPage:true,
accept:".png, .jpg, .jpeg"
};

create(name :HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
  this.showSpinner(SpinnerType.BallAtom)
const createProduct :Create_Product = new Create_Product();
createProduct.name=name.value;
createProduct.stock = parseInt(stock.value);
createProduct.price = parseInt(price.value);

this.productService.create(createProduct,()=> {
  this.hideSpinner(SpinnerType.BallAtom)
  this.alertify.message("Product create successfully.",{
    dismissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopRight
  })
this.createdProduct.emit(createProduct);

},errorMessage =>{
  this.alertify.message(errorMessage,{
    dismissOthers:true,
    messageType:MessageType.Error,
  position:Position.TopRight
  })
});
}
}
