import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LandingSheetPage } from '../pages/landing-sheet/landing-sheet';
import { ContractPage } from '../pages/contract/contract';

import { ProfileSQL } from '../sql/profile.sql';

@Component({
  templateUrl: 'app.html',
  providers: [ ProfileSQL ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ContractPage; 
  public user: any;
  pages: Array<{title: string, component: any, icon: string}>; 

  constructor(public platform: Platform, private profileSQL: ProfileSQL, public alertCtrl: AlertController) {
    this.initializeApp();
    this.pages = [
      { title: 'Contratos', component: ContractPage, icon: 'briefcase' },
      { title: 'Ficha técnica', component: LandingSheetPage, icon: 'filing' }
    ];

    this.profileSQL.currentUser.subscribe((userData) => { 
      this.user = userData;
    }); 

    this.profileSQL.isToken().then(data => {
  		if(data) {
        this.profileSQL.getUser().then(user => {});
  		} else {
        this.nav.setRoot(LoginPage);
      }
		}).catch(error => {
			console.log(error);
		});

  }

  initializeApp() {
    this.platform.ready().then(() => {
      //StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#006500');
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout(){
    this.showConfirm();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro?',
      message: 'Cerraremos la sesión que actualmente esta iniciada.',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Vale',
          handler: () => {
            this.profileSQL.clear();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
