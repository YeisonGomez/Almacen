import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms'

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ContractPage } from '../pages/contract/contract';
import { InvoicePage } from '../pages/invoice/invoice';

import { Oauth2Service } from '../services/oauth2.service';
import { ContractService } from '../services/contract.service';
import { InvoiceService } from '../services/invoice.service';
import { Util } from '../providers/util';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ContractPage,
    InvoicePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ContractPage,
    InvoicePage
  ],
  providers: [ContractService, InvoiceService, Oauth2Service, Util, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
