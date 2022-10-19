import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';


export class BaseComponent {
/**
 *
 */
constructor(private spinner: NgxSpinnerService) { }


showSpinner(spinnerNameType :SpinnerType){

    this.spinner.show(spinnerNameType);

    setTimeout(()=>this.hideSpinner(spinnerNameType),3000)
}

hideSpinner(spinnerNameType :SpinnerType){
  this.spinner.hide(spinnerNameType);
}
}

export enum SpinnerType {
  BallSpinClockWiseFade = "s1",
  BallAtom = "s2"
}
