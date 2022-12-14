import { DialogService } from './../../services/common/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from './../../services/admin/alertify.service';
import {
  DeleteDialogComponent,
  DeleteState,
} from './../../dialogs/delete-dialog/delete-dialog.component';
import { SpinnerType } from './../../base/base.component';
import { ProductService } from './../../services/common/models/product.service';
import { HttpClientService } from './../../services/common/http-client.service';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService : DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute(
      'src',
      'https://cdn.icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png'
    );
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  onclick() {

    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed : async () => {

        this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;

        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe(
            (data) => {
              $(td.parentElement).animate(
                {
                  opacity: 0,
                  left: '+50',
                  height: 'toogle',
                },
                700,
                () => {
                  this.callback.emit();
                  this.alertifyService.message('??r??n ba??ar??yla silinmi??tir.', {
                    messageType: MessageType.Success,
                    position: Position.TopRight,
                  });
                }
              );
            },
            (errorResponse: HttpErrorResponse) => {

              this.spinner.hide(SpinnerType.BallAtom);
              this.alertifyService.message(
                '??r??n silinirken beklenmeyen bir hata ile kar????la????lm????t??r.',
                {
                  messageType: MessageType.Error,
                  position: Position.TopRight,
                  dismissOthers: true,
                }
              );
            }
          );

      }
    })

  }

  openDialog(afterClose: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) afterClose();
    });
  }
}
