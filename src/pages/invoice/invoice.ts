import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoiceService } from '../../services/invoice.service';
import { Util } from '../../providers/util';
import { SearchFilter } from '../../pipes/search_ngfor.pipe';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers: [ Util, SearchFilter ]
})
export class InvoicePage {

  public invoice: any;
  public invoice_detail: any;
  public invoice_detail_copy: any;

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
        this.invoice_detail_copy = this.invoice_detail;
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
        
        if(this.invoice_detail[index].state_color.id == 'A'){
          this.invoice.state_color =  { id: 'A', name: 'Aceptado', color: 'green' };
        } else {
          this.invoice.state_color =  { id: 'R', name: 'Rechazado', color: 'red' };
        }
        this.invoice_detail_copy = this.invoice_detail;
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

  onInput(event: any) {
    this.invoice_detail = this.invoice_detail_copy;
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.invoice_detail = this.invoice_detail.filter((item) => {
        return (item.CLAS_NOMBRE.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.CLAS_ID.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
