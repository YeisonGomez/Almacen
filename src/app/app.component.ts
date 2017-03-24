import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { ProfileSQL } from '../sql/profile.sql';

@Component({
  templateUrl: 'app.html',
  providers: [ ProfileSQL ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage; 

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private profileSQL: ProfileSQL) {
    this.initializeApp();
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

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
