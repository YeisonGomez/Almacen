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
	private loader: any;
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
	
	this.loader = this.util.loading();
	this.getElementsContract(this.contract.COCO_ID);
	this.getInvoices(this.contract.COCO_ID);
  }

	getElementsContract(_id: string){
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
			this.dismissLoader();	
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.loader.dismiss();
		});
	}

	getInvoiceByElement(_id: string){
		this.loader = this.util.loading();
		this.contractService.getInvoiceByElement(_id)
		.then(response => {
			if(response != undefined && response.length != 0){
				let profileModal = this.modalCtrl.create(ModalInvoicesComponent, { invoices: response });
   				profileModal.present();
			} else {
				this.util.presentToast('No hay facturas para este elemento.');
			}
			this.loader.dismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.loader.dismiss();
		});
	}

	getInvoices(_id: string){
		this.contractService.getInvoices(_id)
		.then(response => {
			if(response != undefined && response.status != 'ERROR'){
				if(response.length != 0){
					this.invoice = response;
					for(var i = 0; i < this.invoice.length; i++){
						this.invoice[i].state_color = this.util.pinColor(this.invoice[i].FACT_ESTADOALMACEN);
						this.invoice[i].state_color_copy = this.invoice[i].state_color;
					}
				} else {
					this.util.presentToast('No hay facturas pendientes.');
				}
			} else {
				this.util.presentToast(response.message);
			}
			this.dismissLoader();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			this.loader.dismiss();
		});
	}

	changeStateInvoice(ev, fa_id, index){
		let loader = this.util.loading();
		this.contractService.changeStateInvoice(ev, fa_id, 'Ejemplo')
		.then(data => {
			if(data != undefined && data[0]._TIPO == "notificacion"){
				this.invoice[index].state_color = this.util.pinColor(ev);
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

	showObservation(description) {
		let alert = this.alertCtrl.create({
			title: 'Observaciones',
			subTitle: description,
			buttons: ['OK']
		});
		alert.present();
	}

	viewInvoicDetail(invoice){
		this.navCtrl.push(InvoicePage, {invoice: invoice});
	}

	dismissLoader(){
		if(this.count == 1){
			this.loader.dismiss();
			this.count = 0;
		} else {
			this.count++;
		}
	}

	goToSlide(index: number) {
		this.current_slide = index;
    	this.slides.slideTo(index, 200);
  	}

	slideChanged() {
		this.current_slide = this.slides.getActiveIndex();
  	}	
}
