var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Util } from '../../providers/util';
var ModalInvoicesComponent = (function () {
    //FACT_REGISTRADOFECHA
    function ModalInvoicesComponent(params, viewCtrl, util) {
        this.viewCtrl = viewCtrl;
        this.util = util;
        this.invoices = params.get('invoices');
        console.log(this.invoices);
        for (var i = 0; i < this.invoices.length; i++) {
            this.invoices[i].state_color = this.util.pinColor(this.invoices[i].FACT_ESTADOALMACEN);
        }
    }
    ModalInvoicesComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalInvoicesComponent;
}());
ModalInvoicesComponent = __decorate([
    Component({
        selector: 'modal-invoices',
        templateUrl: 'modal-invoices.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController, Util])
], ModalInvoicesComponent);
export { ModalInvoicesComponent };
//# sourceMappingURL=modal-invoices.js.map