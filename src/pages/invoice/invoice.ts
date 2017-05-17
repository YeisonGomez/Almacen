import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ContractService } from '../../services/contract.service';
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
  public invoice_detail_copy: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private invoiceService: InvoiceService,
    private contractService: ContractService,
    public alertCtrl: AlertController,
    private util: Util) {
    this.invoice = navParams.get('invoice'); 
  }

  ionViewDidLoad() {
    this.getDetailInvoice();
  }

  getDetailInvoice(){
    this.util.loading();
    this.invoiceService.getDetailInvoice(this.invoice.FACT_ID)
    .then(data => {
      if(data != undefined && data.length != 0){
        this.invoice_detail = data;
        for(var i = 0; i < this.invoice_detail.length; i++){
						this.invoice_detail[i].state_color = this.util.pinColor(this.invoice_detail[i].FADE_ESTADOALMACEN); 
            this.invoice_detail[i].state_color_copy = Object.assign({}, this.invoice_detail[i].state_color);
        }
        this.invoice_detail_copy = Object.assign({}, this.invoice_detail);
      } else {
        this.util.presentToast('No se encontraron elementos para esta factura.');  
      }
      this.util.loadingDismiss();
    })
    .catch(error => {
      this.util.loadingDismiss();
      this.util.presentToast('No es posible conectarse al servidor.');
    });
  }

  changeState(ev, fade_id, index){
    let copy = Object.assign({}, this.invoice_detail[index].state_color);
    this.invoice_detail[index].state_color = this.util.pinColor(ev);
    //Se cambia el estado temporalmente para validar que todos estan aceptados.
    let acceptInvoice = this.validateInvoiceAccept(this.invoice_detail);

    if (acceptInvoice) {
      let title = (ev == 'A')? '¿Estás seguro?' : 'Agregar descripción';
      let description = (ev == 'A')? 'No es posible cambiar el estado de la factura déspues de aceptado.' : 'La descripción no es obligatoria.';
      let placeholder = (ev == 'A')? 'Todos los elementos fueron aprobados' : 'Al menos un elemento hace falta';
      let prompt = this.alertCtrl.create({
        title: title,
        message: description,
        inputs: [{ name: 'description', placeholder: 'Descripción' }],
        buttons: [
          {
            text: 'Cancelar', 
            handler: data => {
              this.invoice.state_color = Object.assign({}, this.invoice.state_color_copy);
              this.invoice.state_color_copy = Object.assign({}, this.invoice.state_color);
              this.invoice_detail[index].state_color = copy;
              this.invoice_detail[index].state_color_copy = Object.assign({}, this.invoice_detail[index].state_color);
            }
          },
          {
            text: 'Vale',
            handler: data => {
              this.changeStateInvoice(ev, this.invoice.FACT_ID, index, acceptInvoice, data.description);
            }
          }
        ]
      });
      prompt.present();
    } else {
      this.invoice_detail[index].state_color = copy;
      this.changeStateInvoiceDetail(ev,  fade_id, index, acceptInvoice);
    }
  }

  changeStateInvoice(ev, fade_id, index, acceptInvoice, description){
    this.util.loading(); 
    this.contractService.changeStateInvoice(ev, fade_id, description)
      .then(data => {
        if(data != undefined && data[0]._TIPO == "notificacion"){
            if(acceptInvoice){
              this.invoice.state_color =  { id: 'A', name: 'Aceptado', color: 'green' };
            } else {
              this.invoice.state_color =  { id: 'R', name: 'Rechazado', color: 'red' };
            }
            this.invoice.FACT_OBSERVACIONES = description;
            this.invoice.state_color_copy = Object.assign({}, this.invoice.state_color);
            this.invoice_detail_copy = Object.assign({}, this.invoice_detail);
            this.util.presentToast(data[0]._MENSAJE);
        } else {
          this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
        }
        this.util.loadingDismiss();
      })
      .catch(error => {
        this.invoice.state_color_copy = Object.assign({}, this.invoice.state_color);
        this.util.loadingDismiss();
        this.util.presentToast('No es posible conectarse al servidor.');
      });
  }

  changeStateInvoiceDetail(ev, fade_id, index, acceptInvoice){
    this.util.loading(); 
    this.invoiceService.changeState(ev, fade_id)
    .then(data => {
      if(data != undefined && data[0]._TIPO == "notificacion"){
        this.invoice_detail[index].state_color = this.util.pinColor(ev);
          if(acceptInvoice){
            this.invoice.state_color =  { id: 'A', name: 'Aceptado', color: 'green' };
          } else {
            this.invoice.state_color =  { id: 'R', name: 'Rechazado', color: 'red' };
          }
          this.invoice.state_color_copy = Object.assign({}, this.invoice.state_color);
          this.invoice_detail_copy = Object.assign({}, this.invoice_detail);
          this.util.presentToast(data[0]._MENSAJE);
      } else {
          this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
      }
      this.util.loadingDismiss();
    })
    .catch(error => {
        this.util.loadingDismiss();
        this.invoice.state_color_copy = Object.assign({}, this.invoice.state_color);
        this.util.presentToast('No es posible conectarse al servidor.');
    });
  }

  validateInvoiceAccept(array: any): boolean{
    for (var i = 0; i < array.length; ++i) {
      if(array[i].state_color.id != 'A'){
        return false;
      }
    }
    return true;
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
