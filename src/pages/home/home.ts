import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';

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

	public contract: any;

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
}
