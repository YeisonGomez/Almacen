var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ContractPage } from '../pages/contract/contract';
import { InvoicePage } from '../pages/invoice/invoice';
import { ModalInvoicesComponent } from '../components/modal-invoices/modal-invoices';
import { Oauth2Service } from '../services/oauth2.service';
import { ContractService } from '../services/contract.service';
import { InvoiceService } from '../services/invoice.service';
import { Util } from '../providers/util';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            HomePage,
            ContractPage,
            InvoicePage,
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
            ModalInvoicesComponent
        ],
        providers: [ContractService, InvoiceService, Oauth2Service, Util, { provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map