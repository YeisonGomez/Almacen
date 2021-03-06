import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms'

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ContractPage } from '../pages/contract/contract';
import { DataSheetPage } from '../pages/data-sheet/data-sheet';
import { LandingSheetPage } from '../pages/landing-sheet/landing-sheet';
import { InvoicePage } from '../pages/invoice/invoice';

import { ModalInvoicesComponent } from '../components/modal-invoices/modal-invoices';

import { Oauth2Service } from '../services/oauth2.service';
import { ContractService } from '../services/contract.service';
import { ElementService } from '../services/element.service';
import { InvoiceService } from '../services/invoice.service';

import { Util } from '../providers/util';
import { ApiProvider } from '../providers/api.provider';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ContractPage,
    InvoicePage,
    DataSheetPage,
    LandingSheetPage,
    ModalInvoicesComponent
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
    InvoicePage,
    DataSheetPage,
    LandingSheetPage,
    ModalInvoicesComponent
  ],
  providers: [
    ContractService, 
    InvoiceService, 
    ElementService, 
    Oauth2Service, 
    Util, 
    ApiProvider, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
