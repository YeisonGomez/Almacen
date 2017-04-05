import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})
export class InvoicePage {

  public invoice: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.invoice = this.navParams.get('invoice'); 
    console.log(this.invoice);
    console.log(this.navParams);
  }

}
