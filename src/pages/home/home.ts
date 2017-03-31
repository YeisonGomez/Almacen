import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, Slides } from 'ionic-angular';

import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';

import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, 
	public navParams: NavParams, 
	private profileSQL: ProfileSQL, 
	private menu: MenuController,
	private contractService: ContractService,
	private util: Util) {}

  ionViewDidLoad() {
  	this.menu.swipeEnable(true, 'menu1');
		let loader = this.util.loading();
  	this.profileSQL.isToken().then(data => {
  		if(!data) {
  			this.navCtrl.setRoot(LoginPage);
  		} else {
  			this.profileSQL.getUser();
  		}
			loader.dismiss();
		}).catch(error => {
			console.log(error);
			loader.dismiss();
		});
  }

	getContract(ev: any){
		if(!isNaN(ev.target.value) && ev.target.value != ''){
			let loader = this.util.loading();
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
					loader.dismiss();
				})
				.catch(error => { 
					this.util.presentToast('No es posible conectarse al servidor.');
					loader.dismiss();
				});
		}
	}

	getElementsContract(_id: string){
		let loader = this.util.loading();
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
			loader.dismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			loader.dismiss();
		});
	}

	getInvoices(_id: string){
		let loader = this.util.loading();
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
			loader.dismiss();
		})
		.catch(error => { 
			this.util.presentToast('No es posible conectarse al servidor.');
			loader.dismiss();
		});
	}

	goToSlide(index: number) {
    this.slides.slideTo(index, 200);
  }	
}
