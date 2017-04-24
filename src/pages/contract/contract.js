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
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
var ContractPage = (function () {
    function ContractPage(navCtrl, navParams, profileSQL, menu, contractService, util, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileSQL = profileSQL;
        this.menu = menu;
        this.contractService = contractService;
        this.util = util;
        this.alertCtrl = alertCtrl;
        this.contracts = [];
        this.not_data = true;
    }
    ContractPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menu.swipeEnable(true, 'menu1');
        this.profileSQL.isToken().then(function (data) {
            if (!data) {
                _this.navCtrl.setRoot(LoginPage);
            }
            else {
                _this.getAllContract();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    ContractPage.prototype.getAllContract = function (callback) {
        var _this = this;
        this.loader = this.util.loading();
        this.contractService.getContractAll()
            .then(function (data) {
            if (data != undefined && data.status != 'ERROR') {
                if (data.length != 0) {
                    _this.contracts = data;
                    _this.contract_copy = _this.contracts;
                    _this.not_data = true;
                }
                else {
                    _this.not_data = false;
                    _this.util.presentToast('No hay contratos pendientes.');
                }
            }
            else {
                _this.not_data = false;
                _this.util.presentToast('No es posible conectarse al servidor.');
            }
            _this.loader.dismiss();
            if (callback != undefined) {
                callback();
            }
        })
            .catch(function (error) {
            _this.not_data = false;
            _this.loader.dismiss();
            if (callback != undefined) {
                callback();
            }
            _this.util.presentToast('No es posible conectarse al servidor.');
        });
    };
    ContractPage.prototype.getContract = function (contract) {
        this.navCtrl.push(HomePage, { contract: contract });
    };
    ContractPage.prototype.onInput = function (event) {
        this.contracts = this.contract_copy;
        var val = event.target.value;
        if (val && val.trim() != '') {
            this.contracts = this.contracts.filter(function (item) {
                return (item.COCO_DESCRIPCION.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.NAME_PROVEEDOR.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.COCO_ID.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ContractPage.prototype.doRefresh = function (refresher) {
        this.getAllContract(function () { return refresher.complete(); });
    };
    return ContractPage;
}());
ContractPage = __decorate([
    Component({
        selector: 'page-contract',
        templateUrl: 'contract.html',
        providers: [ProfileSQL, Util]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ProfileSQL,
        MenuController,
        ContractService,
        Util,
        AlertController])
], ContractPage);
export { ContractPage };
//# sourceMappingURL=contract.js.map