import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, Slides, AlertController, ModalController } from 'ionic-angular';

import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';
import { ModalInvoicesComponent } from '../../components/modal-invoices/modal-invoices';

import { LoginPage } from '../login/login';
import { InvoicePage } from '../invoice/invoice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ProfileSQL, Util ]
})
export class HomePage {
	
	@ViewChild(Slides) slides: Slides;
	public contract: any;
	public elements: any;
	public invoice: any;
	public current_slide: number = 0;
	private count: number = 0;

  constructor(public navCtrl: NavController, 
	public navParams: NavParams, 
	private profileSQL: ProfileSQL, 
	private menu: MenuController,
	private contractService: ContractService,
	private util: Util,
	public alertCtrl: AlertController,
	public modalCtrl: ModalController) {}

  ionViewDidLoad() {
  	this.menu.swipeEnable(true, 'menu1');
	this.contract = this.navParams.get('contract');
	
	this.getElementsContract(this.contract.COCO_ID);
	this.getInvoices(this.contract.COCO_ID);
  }

	getElementsContract(_id: string){
		this.util.loading();
		this.contractService.getElementsContract(_id)
		.then(response => {
			if(response != undefined && response.status != 'ERROR'){
				if(response.length != 0){
					this.elements = response;
				} else {
					this.util.presentToast('No hay elementos solicitados.');
				}
			} else {
				this.util.presentToast(response.message);
			}
			this.util.loadingDismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.util.loadingDismiss();
		});
	}

	getInvoiceByElement(_id: string){
		this.util.loading();
		this.contractService.getInvoiceByElement(_id)
		.then(response => {
			if(response != undefined && response.length != 0){
				let profileModal = this.modalCtrl.create(ModalInvoicesComponent, { invoices: response });
   				profileModal.present();
			} else {
				this.util.presentToast('No hay facturas para este elemento.');
			}
			this.util.loadingDismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.util.loadingDismiss();
		});
	}

	getInvoices(_id: string){
		this.util.loading();
		this.contractService.getInvoices(_id)
		.then(response => {
			if(response != undefined && response.status != 'ERROR'){
				if(response.length != 0){
					this.invoice = response;
					for(var i = 0; i < this.invoice.length; i++){
						this.invoice[i].state_color = this.util.pinColor(this.invoice[i].FACT_ESTADOALMACEN);
						this.invoice[i].state_color_copy = Object.assign({}, this.invoice[i].state_color);
					}
				} else {
					this.util.presentToast('No hay facturas pendientes.');
				}
			} else {
				this.util.presentToast(response.message);
			}
			this.util.loadingDismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.util.loadingDismiss();
		});
	}

	changeStateInvoice(ev, fa_id, index){
		let title = (ev == 'A')? '¿Estás seguro?' : 'Agregar descripción';
		let description = (ev == 'A')? 'No es posible cambiar el estado déspues de aceptado.' : 'La descripción no es obligatoria.';
		let placeholder = (ev == 'A')? 'Todos los elementos fueron aprobados' : 'Al menos un elemento hace falta';
	    let prompt = this.alertCtrl.create({
	      title: title,
	      message: description,
	      inputs: [{ name: 'description', placeholder: 'Descripción' }],
	      buttons: [
	        {
	          text: 'Cancelar', 
	          handler: data => {
	            this.invoice[index].state_color_copy = Object.assign({}, this.invoice[index].state_color);
	          }
	        },
	        {
	          text: 'Vale',
	          handler: data => {
				this.util.loading();
	            let description = data.description;
				this.contractService.changeStateInvoice(ev, fa_id, description)
				.then(data => {
					if(data != undefined && data[0]._TIPO == "notificacion"){
						this.invoice[index].state_color = this.util.pinColor(ev);
						this.invoice[index].state_color_copy = Object.assign({}, this.invoice[index].state_color);
						this.invoice[index].FACT_OBSERVACIONES = description;
						this.util.presentToast(data[0]._MENSAJE);
					} else {
						this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
					}
					this.util.loadingDismiss();
				})
				.catch(error => {
					this.invoice[index].state_color_copy = Object.assign({}, this.invoice[index].state_color);
					this.util.loadingDismiss();
					this.util.presentToast('No es posible conectarse al servidor.');
				});
	          }
	        }
	      ]
	    });
	    prompt.present();
	}

	showObservation(description) {
		let alert = this.alertCtrl.create({
			title: 'Observaciones',
			subTitle: description,
			buttons: ['Vale']
		});
		alert.present();
	}

	viewInvoicDetail(invoice){
		this.navCtrl.push(InvoicePage, {invoice: invoice});
	}

	goToSlide(index: number) {
		this.current_slide = index;
    	this.slides.slideTo(index, 200);
  	}

	slideChanged() {
		this.current_slide = this.slides.getActiveIndex();
  	}	
}
