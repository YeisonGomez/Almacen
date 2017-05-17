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
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ElementService } from '../../services/element.service';
import { Util } from '../../providers/util';
import { DataSheetPage } from '../data-sheet/data-sheet';
var LandingSheetPage = (function () {
    function LandingSheetPage(navCtrl, navParams, menu, elementService, util, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.elementService = elementService;
        this.util = util;
        this.barcodeScanner = barcodeScanner;
        this.elements = [];
        this.menu.swipeEnable(true, 'menu1');
    }
    LandingSheetPage.prototype.ionViewDidLoad = function () { };
    LandingSheetPage.prototype.getElementByCode = function (code, callback, context) {
        var _this = this;
        console.log(code);
        if (code != undefined && !isNaN(code) && code.length > 0) {
            this.loader = this.util.loading();
            this.elementService.getElementByCode(code)
                .then(function (data) {
                console.log(data);
                if (data != undefined) {
                    if (data.length != 0) {
                        _this.elements = data;
                        if (callback) {
                            callback(context);
                        }
                        else {
                            console.log("hola");
                            _this.goView(_this.elements);
                        }
                    }
                    else {
                        _this.util.presentToast('No se encontro el elemento.');
                    }
                }
                else {
                    _this.util.presentToast('No es posible conectarse al servidor.');
                }
                _this.loader.dismiss();
            })
                .catch(function (error) {
                console.log(error);
                _this.loader.dismiss();
                _this.util.presentToast('No es posible conectarse al servidor.');
            });
        }
    };
    LandingSheetPage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log(barcodeData);
            _this.param_search = parseInt(barcodeData.text);
            _this.getElementByCode(_this.param_search.toString());
        }, function (err) {
            console.log(err);
        });
    };
    LandingSheetPage.prototype.goView = function (elements) {
        this.navCtrl.push(DataSheetPage, { elements: elements, getElementByCode: this.getElementByCode });
    };
    return LandingSheetPage;
}());
LandingSheetPage = __decorate([
    Component({
        selector: 'page-landing-sheet',
        templateUrl: 'landing-sheet.html',
        providers: [Util, BarcodeScanner]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        ElementService,
        Util,
        BarcodeScanner])
], LandingSheetPage);
export { LandingSheetPage };
//# sourceMappingURL=landing-sheet.js.map