import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'modal-invoices',
  templateUrl: 'modal-invoices.html'
})
export class ModalInvoicesComponent {

  text: string;

  constructor(params: NavParams) {
    this.text = 'Hello World';
    console.log('UserId', params.get('userId'));
  }

}
