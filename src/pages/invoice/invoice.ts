import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoiceService } from '../../services/invoice.service';
import { Util } from '../../providers/util';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers: [ Util ]
})
export class InvoicePage {

  public invoice: any;
  public invoice_detail: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private invoiceService: InvoiceService,
    private util: Util) {
    this.invoice = navParams.get('invoice'); 
  }

  ionViewDidLoad() {
    this.getDetailInvoice();
    console.log(this.invoice);
  }

  getDetailInvoice(){
    let loader = this.util.loading();
    this.invoiceService.getDetailInvoice(this.invoice.FACT_ID)
    .then(data => {
      console.log(data);
      if(data.length != 0){
        this.invoice_detail = data;
        for(var i = 0; i < this.invoice_detail.length; i++){
						this.invoice_detail[i].state_color = this.util.pinColor(this.invoice_detail[i].FADE_ESTADOALMACEN); 
            this.invoice_detail[i].state_color_copy = this.invoice_detail[i].state_color;
					}
      } else {
        this.util.presentToast('No se encontraron elementos para esta factura.');  
      }
      loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();
      this.util.presentToast('No es posible conectarse al servidor.');
    });
  }

  changeState(ev, fade_id, index){
    let loader = this.util.loading();
    this.invoiceService.changeState(ev, fade_id)
    .then(data => {
      if(data != undefined && data[0]._TIPO == "notificacion"){
        this.invoice_detail[index].state_color = this.util.pinColor(ev);
        this.invoice.state_color = this.invoice_detail[index].state_color;
        this.util.presentToast(data[0]._MENSAJE);
      } else {
        this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
      }
      loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();
      this.util.presentToast('No es posible conectarse al servidor.');
    });
  }

}
