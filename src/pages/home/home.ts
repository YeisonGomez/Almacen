import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';

import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ProfileSQL ]
})
export class HomePage {

  constructor(public navCtrl: NavController, 
	public navParams: NavParams, 
	private profileSQL: ProfileSQL, 
	private menu: MenuController,
	private contractService: ContractService) {}

  ionViewDidLoad() {
  	this.menu.swipeEnable(true, 'menu1');
  	this.profileSQL.isToken().then(data => {
  		if(!data) {
  			this.navCtrl.setRoot(LoginPage);
  		} else {
  			this.profileSQL.getUser();
  		}
		}).catch(error => {
			console.log(error);
		});
  }

	getContract(_id: string){
		console.log(_id);
		this.contractService.getContract(_id)
			.then(response => {
				console.log(response);
			})
			.catch(error => console.log(error))
	}
}
