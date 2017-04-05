import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, Slides, AlertController } from 'ionic-angular';

import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';

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
	private loader: any;
	private count: number = 0;

  constructor(public navCtrl: NavController, 
	public navParams: NavParams, 
	private profileSQL: ProfileSQL, 
	private menu: MenuController,
	private contractService: ContractService,
	private util: Util,
	public alertCtrl: AlertController) {}

  ionViewDidLoad() {
  	this.menu.swipeEnable(true, 'menu1');
	this.loader = this.util.loading();
  	this.profileSQL.isToken().then(data => {
  		if(!data) {
  			this.navCtrl.setRoot(LoginPage);
  		} else {
  			this.profileSQL.getUser();
  		}
			this.loader.dismiss();
		}).catch(error => {
			console.log(error);
			this.loader.dismiss();
		});
  }

	getContract(ev: any){
		if(!isNaN(ev.target.value) && ev.target.value != ''){
			this.loader = this.util.loading();
			this.contractService.getContract(ev.target.value)
			.then(response => {
					if(response.status != 'ERROR'){
						if(response.length != 0){
							this.contract = response[0];
							console.log(this.contract);
							this.getElementsContract(ev.target.value);
							this.getInvoices(ev.target.value);
						} else {
							this.util.presentToast('No coincide ningún contrato.');
						}
					} else {
						this.util.presentToast(response.message);
					}
				})
				.catch(error => { 
					this.util.presentToast('No es posible conectarse al servidor.');
				});
		}
	}

	getElementsContract(_id: string){
		this.contractService.getElementsContract(_id)
		.then(response => {
			if(response.status != 'ERROR'){
				if(response.length != 0){
					this.elements = response;
					console.log(this.elements);
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
			this.dismissLoader();
		});
	}

	getInvoices(_id: string){
		this.contractService.getInvoices(_id)
		.then(response => {
			if(response.status != 'ERROR'){
				if(response.length != 0){
					this.invoice = response;
					console.log(this.invoice);
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
			this.dismissLoader();
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
    	this.slides.slideTo(index, 200);
  	}	
}
