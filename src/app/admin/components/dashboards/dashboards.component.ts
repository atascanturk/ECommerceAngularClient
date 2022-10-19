import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import { MessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent extends BaseComponent implements OnInit {

  constructor(private alertify : AlertifyService, spinner : NgxSpinnerService) { super(spinner) }

  ngOnInit(): void {
    this.alertify.message("merhaba",   {
      messageType:MessageType.Success,
      delay:12
    } )
  }


}
