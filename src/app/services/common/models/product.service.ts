import { firstValueFrom, Observable } from 'rxjs';
import { List_Product } from './../../../contracts/list_product';
import { Create_Product } from './../../../contracts/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product : Create_Product, successCallback? : () => void, errorCallback? : (errorMessage:string) => void) {
this.httpClientService.post({
  controller:"products"
},product)
.subscribe(result=> {
  successCallback();

},(errorResponse: HttpErrorResponse)=>{
  const err :Array<{key:string, value:Array<string>}> = errorResponse.error;
let message="";

err.forEach((v,i)=>{
  v.value.forEach((_v,_i)=>{
    message+=`${_v}<br>`
  })
})

errorCallback(message);



})
  }

  async read(page : number = 0, size : number= 5 ,successCallback? : ()=> void , errorCallback? : (errorMessage:string) => void)
  : Promise<{totalCount : number ; products :List_Product[]}>{
  const promiseData : Promise<{totalCount : number ; products :List_Product[]}> =  this.httpClientService.get<{totalCount : number ; products :List_Product[]}>({
      controller:"products",
      queryString : `page= ${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallback()).catch((errorResponse: HttpErrorResponse)=> errorCallback(errorResponse.message))

    return await promiseData;
  }

 async delete(id:string){
 const obs : Observable<any> =  this.httpClientService.delete<any>({
      controller:"products"
    },id);

   await firstValueFrom(obs);
  }
}
