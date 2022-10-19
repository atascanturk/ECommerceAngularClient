import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner :NgxSpinnerService) { super(spinner)}

  ngOnInit(): void {
  }

}
