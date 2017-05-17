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
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { ElementService } from '../../services/element.service';
import { Util } from '../../providers/util';
var DataSheetPage = (function () {
    function DataSheetPage(navCtrl, navParams, menu, elementService, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.elementService = elementService;
        this.util = util;
        this.count = 0;
        this.elements = [];
        this.movements = [];
        this.characteristics = [];
        this.clasificator = [];
        this.current_slide = 0;
        this.menu.swipeEnable(true, 'menu1');
        this.elements = navParams.get('elements');
        this.getElementByCode = navParams.get('getElementByCode');
        this.updateElement(this);
    }
    DataSheetPage.prototype.ionViewDidLoad = function () { };
    DataSheetPage.prototype.getClasificatorElement = function () {
        var _this = this;
        this.elementService.getClasificatorElement(this.elements[0].CLAS_ID)
            .then(function (data) {
            if (data != undefined && data.status != 'ERROR') {
                _this.clasificator = data;
                if (data.length == 0) {
                    //this.util.presentToast('Este elemento no tiene clasificadores.');
                }
            }
            else {
                _this.util.presentToast('No es posible conectarse al servidor.');
            }
            _this.dismissLoader();
        })
            .catch(function (error) {
            _this.loader.dismiss();
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    DataSheetPage.prototype.getCaracteristicsElement = function () {
        var _this = this;
        this.elementService.getElementCaracteristics(this.elements[0].ELEM_ID)
            .then(function (data) {
            if (data != undefined && data.status != 'ERROR') {
                _this.characteristics = data;
                if (data.length == 0) {
                    //this.util.presentToast('Este elemento no tiene caracteristicas.');
                }
            }
            else {
                _this.util.presentToast('No es posible conectarse al servidor.');
            }
            _this.dismissLoader();
        })
            .catch(function (error) {
            _this.loader.dismiss();
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    DataSheetPage.prototype.getMovementsElement = function () {
        var _this = this;
        this.elementService.getMovementsElement(this.elements[0].ELEM_ID)
            .then(function (data) {
            if (data != undefined && data.status != 'ERROR') {
                _this.movements = data;
                if (data.length == 0) {
                    //this.util.presentToast('Este elemento no tiene movimientos.');
                }
            }
            else {
                _this.util.presentToast('No es posible conectarse al servidor.');
            }
            _this.dismissLoader();
        })
            .catch(function (error) {
            _this.loader.dismiss();
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    DataSheetPage.prototype.updateElement = function (context) {
        console.log(context);
        context.loader = context.util.loading();
        context.getCaracteristicsElement();
        context.getMovementsElement();
        context.getClasificatorElement();
    };
    DataSheetPage.prototype.dismissLoader = function () {
        if (this.count == 2) {
            this.loader.dismiss();
            this.count = 0;
        }
        else {
            this.count++;
        }
    };
    DataSheetPage.prototype.goToSlide = function (index) {
        this.current_slide = index;
        this.slides.slideTo(index, 200);
    };
    DataSheetPage.prototype.slideChanged = function () {
        this.current_slide = this.slides.getActiveIndex();
    };
    return DataSheetPage;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], DataSheetPage.prototype, "slides", void 0);
DataSheetPage = __decorate([
    Component({
        selector: 'page-data-sheet',
        templateUrl: 'data-sheet.html',
        providers: [Util]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        ElementService,
        Util])
], DataSheetPage);
export { DataSheetPage };
//# sourceMappingURL=data-sheet.js.map