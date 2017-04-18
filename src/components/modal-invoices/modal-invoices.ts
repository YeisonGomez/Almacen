import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Util } from '../../providers/util';

@Component({
  selector: 'modal-invoices',
  templateUrl: 'modal-invoices.html'
})
export class ModalInvoicesComponent {

  public invoices: any;
//FACT_REGISTRADOFECHA
  constructor(params: NavParams, public viewCtrl: ViewController, private util: Util) {
      this.invoices = params.get('invoices');
      console.log(this.invoices);
      for(var i = 0; i < this.invoices.length; i++){
        this.invoices[i].state_color = this.util.pinColor(this.invoices[i].FACT_ESTADOALMACEN);
      }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
