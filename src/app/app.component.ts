import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ContractPage } from '../pages/contract/contract';

import { ProfileSQL } from '../sql/profile.sql';

@Component({
  templateUrl: 'app.html',
  providers: [ ProfileSQL ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ContractPage; 
  user: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private profileSQL: ProfileSQL) {
    this.initializeApp();
    this.pages = [
      { title: 'Contratos', component: HomePage }
    ];

    this.profileSQL.isToken().then(data => {
  		if(data) {
        this.profileSQL.getUser().then(user => {
          this.user = user;
          console.log(this.user);
        });
  		} 
		}).catch(error => {
			console.log(error);
		});

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout(){
    this.profileSQL.clear();
    this.nav.setRoot(LoginPage);
  }
}
