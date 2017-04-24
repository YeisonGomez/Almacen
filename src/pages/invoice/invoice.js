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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ContractService } from '../../services/contract.service';
import { InvoiceService } from '../../services/invoice.service';
import { Util } from '../../providers/util';
var InvoicePage = (function () {
    function InvoicePage(navCtrl, navParams, invoiceService, contractService, alertCtrl, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.invoiceService = invoiceService;
        this.contractService = contractService;
        this.alertCtrl = alertCtrl;
        this.util = util;
        this.invoice = navParams.get('invoice');
    }
    InvoicePage.prototype.ionViewDidLoad = function () {
        this.getDetailInvoice();
    };
    InvoicePage.prototype.getDetailInvoice = function () {
        var _this = this;
        var loader = this.util.loading();
        this.invoiceService.getDetailInvoice(this.invoice.FACT_ID)
            .then(function (data) {
            if (data != undefined && data.length != 0) {
                _this.invoice_detail = data;
                for (var i = 0; i < _this.invoice_detail.length; i++) {
                    _this.invoice_detail[i].state_color = _this.util.pinColor(_this.invoice_detail[i].FADE_ESTADOALMACEN);
                    _this.invoice_detail[i].state_color_copy = Object.assign({}, _this.invoice_detail[i].state_color);
                }
                _this.invoice_detail_copy = Object.assign({}, _this.invoice_detail);
            }
            else {
                _this.util.presentToast('No se encontraron elementos para esta factura.');
            }
            loader.dismiss();
        })
            .catch(function (error) {
            loader.dismiss();
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    InvoicePage.prototype.changeState = function (ev, fade_id, index) {
        var _this = this;
        var copy = Object.assign({}, this.invoice_detail[index].state_color);
        this.invoice_detail[index].state_color = this.util.pinColor(ev);
        //Se cambia el estado temporalmente para validar que todos estan aceptados.
        var acceptInvoice = this.validateInvoiceAccept(this.invoice_detail);
        if (acceptInvoice) {
            var title = (ev == 'A') ? '¿Estás seguro?' : 'Agregar descripción';
            var description = (ev == 'A') ? 'No es posible cambiar el estado de la factura déspues de aceptado.' : 'La descripción no es obligatoria.';
            var placeholder = (ev == 'A') ? 'Todos los elementos fueron aprobados' : 'Al menos un elemento hace falta';
            var prompt_1 = this.alertCtrl.create({
                title: title,
                message: description,
                inputs: [{ name: 'description', placeholder: 'Descripción' }],
                buttons: [
                    {
                        text: 'Cancelar',
                        handler: function (data) {
                            _this.invoice.state_color = Object.assign({}, _this.invoice.state_color_copy);
                            _this.invoice.state_color_copy = Object.assign({}, _this.invoice.state_color);
                            _this.invoice_detail[index].state_color = copy;
                            _this.invoice_detail[index].state_color_copy = Object.assign({}, _this.invoice_detail[index].state_color);
                        }
                    },
                    {
                        text: 'Vale',
                        handler: function (data) {
                            _this.changeStateInvoice(ev, fade_id, index, acceptInvoice, data.description);
                        }
                    }
                ]
            });
            prompt_1.present();
        }
        else {
            this.invoice_detail[index].state_color = copy;
            this.changeStateInvoiceDetail(ev, fade_id, index, acceptInvoice);
        }
    };
    InvoicePage.prototype.changeStateInvoice = function (ev, fade_id, index, acceptInvoice, description) {
        var _this = this;
        var loader = this.util.loading();
        this.contractService.changeStateInvoice(ev, fade_id, description)
            .then(function (data) {
            if (data != undefined && data[0]._TIPO == "notificacion") {
                if (acceptInvoice) {
                    _this.invoice.state_color = { id: 'A', name: 'Aceptado', color: 'green' };
                }
                else {
                    _this.invoice.state_color = { id: 'R', name: 'Rechazado', color: 'red' };
                }
                _this.invoice.state_color_copy = Object.assign({}, _this.invoice.state_color);
                _this.invoice_detail_copy = Object.assign({}, _this.invoice_detail);
                _this.util.presentToast(data[0]._MENSAJE);
            }
            else {
                _this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
            }
            loader.dismiss();
        })
            .catch(function (error) {
            _this.invoice.state_color_copy = Object.assign({}, _this.invoice.state_color);
            loader.dismiss();
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    InvoicePage.prototype.changeStateInvoiceDetail = function (ev, fade_id, index, acceptInvoice) {
        var _this = this;
        var loader = this.util.loading();
        this.invoiceService.changeState(ev, fade_id)
            .then(function (data) {
            if (data != undefined && data[0]._TIPO == "notificacion") {
                _this.invoice_detail[index].state_color = _this.util.pinColor(ev);
                if (acceptInvoice) {
                    _this.invoice.state_color = { id: 'A', name: 'Aceptado', color: 'green' };
                }
                else {
                    _this.invoice.state_color = { id: 'R', name: 'Rechazado', color: 'red' };
                }
                _this.invoice.state_color_copy = Object.assign({}, _this.invoice.state_color);
                _this.invoice_detail_copy = Object.assign({}, _this.invoice_detail);
                _this.util.presentToast(data[0]._MENSAJE);
            }
            else {
                _this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
            }
            loader.dismiss();
        })
            .catch(function (error) {
            loader.dismiss();
            _this.invoice.state_color_copy = Object.assign({}, _this.invoice.state_color);
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    InvoicePage.prototype.validateInvoiceAccept = function (array) {
        for (var i = 0; i < array.length; ++i) {
            if (array[i].state_color.id != 'A') {
                return false;
            }
        }
        return true;
    };
    InvoicePage.prototype.onInput = function (event) {
        this.invoice_detail = this.invoice_detail_copy;
        var val = event.target.value;
        if (val && val.trim() != '') {
            this.invoice_detail = this.invoice_detail.filter(function (item) {
                return (item.CLAS_NOMBRE.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.CLAS_ID.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    return InvoicePage;
}());
InvoicePage = __decorate([
    Component({
        selector: 'page-invoice',
        templateUrl: 'invoice.html',
        providers: [Util]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        InvoiceService,
        ContractService,
        AlertController,
        Util])
], InvoicePage);
export { InvoicePage };
//# sourceMappingURL=invoice.js.map