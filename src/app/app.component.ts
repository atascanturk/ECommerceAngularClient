import { MessageType } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition, ToastrOptions } from './services/ui/custom-toastr.service';
import { Component } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'net6Camp';
  constructor(private toastrService : CustomToastrService){
    //toastrService.message("SELAM","Test", {messageType : ToastrMessageType.Success ,  position :ToastrPosition.BottomCenter})
  }
}


