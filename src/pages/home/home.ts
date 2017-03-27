import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { ProfileSQL } from '../../sql/profile.sql';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ProfileSQL ]
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private profileSQL: ProfileSQL, private menu: MenuController) {}

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

}
