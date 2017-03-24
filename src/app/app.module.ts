import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { Oauth2Service } from '../services/oauth2.service';
import { Util } from '../providers/util';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    HomePage
  ],
  providers: [Oauth2Service, Util, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
