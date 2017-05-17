var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, Slides, AlertController, ModalController } from 'ionic-angular';
import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';
import { ModalInvoicesComponent } from '../../components/modal-invoices/modal-invoices';
import { InvoicePage } from '../invoice/invoice';
var HomePage = (function () {
    function HomePage(navCtrl, navParams, profileSQL, menu, contractService, util, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileSQL = profileSQL;
        this.menu = menu;
        this.contractService = contractService;
        this.util = util;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.current_slide = 0;
        this.count = 0;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(true, 'menu1');
        this.contract = this.navParams.get('contract');
        this.loader = this.util.loading();
        this.getElementsContract(this.contract.COCO_ID);
        this.getInvoices(this.contract.COCO_ID);
    };
    HomePage.prototype.getElementsContract = function (_id) {
        var _this = this;
        this.contractService.getElementsContract(_id)
            .then(function (response) {
            if (response != undefined && response.status != 'ERROR') {
                if (response.length != 0) {
                    _this.elements = response;
                }
                else {
                    _this.util.presentToast('No hay elementos solicitados.');
                }
            }
            else {
                _this.util.presentToast(response.message);
            }
            _this.dismissLoader();
        })
            .catch(function (error) {
            _this.util.presentToast('No es posible conectarse al servidor.');
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.getInvoiceByElement = function (_id) {
        var _this = this;
        this.loader = this.util.loading();
        this.contractService.getInvoiceByElement(_id)
            .then(function (response) {
            if (response != undefined && response.length != 0) {
                var profileModal = _this.modalCtrl.create(ModalInvoicesComponent, { invoices: response });
                profileModal.present();
            }
            else {
                _this.util.presentToast('No hay facturas para este elemento.');
            }
            _this.loader.dismiss();
        })
            .catch(function (error) {
            _this.util.presentToast('No es posible conectarse al servidor.');
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.getInvoices = function (_id) {
        var _this = this;
        this.contractService.getInvoices(_id)
            .then(function (response) {
            if (response != undefined && response.status != 'ERROR') {
                if (response.length != 0) {
                    _this.invoice = response;
                    for (var i = 0; i < _this.invoice.length; i++) {
                        _this.invoice[i].state_color = _this.util.pinColor(_this.invoice[i].FACT_ESTADOALMACEN);
                        _this.invoice[i].state_color_copy = Object.assign({}, _this.invoice[i].state_color);
                    }
                }
                else {
                    _this.util.presentToast('No hay facturas pendientes.');
                }
            }
            else {
                _this.util.presentToast(response.message);
            }
            _this.dismissLoader();
        })
            .catch(function (error) {
            _this.util.presentToast('No es posible conectarse al servidor.');
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.changeStateInvoice = function (ev, fa_id, index) {
        var _this = this;
        var title = (ev == 'A') ? '¿Estás seguro?' : 'Agregar descripción';
        var description = (ev == 'A') ? 'No es posible cambiar el estado déspues de aceptado.' : 'La descripción no es obligatoria.';
        var placeholder = (ev == 'A') ? 'Todos los elementos fueron aprobados' : 'Al menos un elemento hace falta';
        var prompt = this.alertCtrl.create({
            title: title,
            message: description,
            inputs: [{ name: 'description', placeholder: 'Descripción' }],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        _this.invoice[index].state_color_copy = Object.assign({}, _this.invoice[index].state_color);
                    }
                },
                {
                    text: 'Vale',
                    handler: function (data) {
                        var loader = _this.util.loading();
                        var description = data.description;
                        _this.contractService.changeStateInvoice(ev, fa_id, description)
                            .then(function (data) {
                            if (data != undefined && data[0]._TIPO == "notificacion") {
                                _this.invoice[index].state_color = _this.util.pinColor(ev);
                                _this.invoice[index].state_color_copy = Object.assign({}, _this.invoice[index].state_color);
                                _this.invoice[index].FACT_OBSERVACIONES = description;
                                _this.util.presentToast(data[0]._MENSAJE);
                            }
                            else {
                                _this.util.presentToast('Tenemos un problema, por favor intentelo más tarde.');
                            }
                            loader.dismiss();
                        })
                            .catch(function (error) {
                            _this.invoice[index].state_color_copy = Object.assign({}, _this.invoice[index].state_color);
                            loader.dismiss();
                            _this.util.presentToast('No es posible conectarse al servidor.');
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.showObservation = function (description) {
        var alert = this.alertCtrl.create({
            title: 'Observaciones',
            subTitle: description,
            buttons: ['Vale']
        });
        alert.present();
    };
    HomePage.prototype.viewInvoicDetail = function (invoice) {
        this.navCtrl.push(InvoicePage, { invoice: invoice });
    };
    HomePage.prototype.dismissLoader = function () {
        if (this.count == 1) {
            this.loader.dismiss();
            this.count = 0;
        }
        else {
            this.count++;
        }
    };
    HomePage.prototype.goToSlide = function (index) {
        this.current_slide = index;
        this.slides.slideTo(index, 200);
    };
    HomePage.prototype.slideChanged = function () {
        this.current_slide = this.slides.getActiveIndex();
    };
    return HomePage;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], HomePage.prototype, "slides", void 0);
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [ProfileSQL, Util]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ProfileSQL,
        MenuController,
        ContractService,
        Util,
        AlertController,
        ModalController])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map