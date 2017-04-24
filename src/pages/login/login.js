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
import { MenuController, NavController, NavParams, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Oauth2Service } from '../../services/oauth2.service';
import { ProfileSQL } from '../../sql/profile.sql';
import { Util } from '../../providers/util';
import { ContractPage } from '../contract/contract';
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, platform, oauth2Service, profileSQL, menu, util, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.oauth2Service = oauth2Service;
        this.profileSQL = profileSQL;
        this.menu = menu;
        this.util = util;
        this.network = network;
        this.wifi = true;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menu.swipeEnable(false, 'menu1');
        this.network.onDisconnect().subscribe(function () {
            console.log('network was disconnected :-(');
            _this.wifi = false;
        });
        //disconnectSubscription.unsubscribe();
        this.network.onConnect().subscribe(function () {
            setTimeout(function () {
                if (_this.network.type === 'wifi') {
                    _this.wifi = true;
                    console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.wifi) {
            this.loader = this.util.loading();
            this.platform.ready().then(function () {
                _this.chairaLogin().then(function (success) {
                    _this.oauth2Service.getAccessToken(success.detail)
                        .then(function (response) {
                        _this.profileSQL.setUser(response);
                        _this.profileSQL.getUser().then(function (user) {
                            _this.loader.dismiss();
                            _this.navCtrl.setRoot(ContractPage);
                        });
                    })
                        .catch(function (error) { return console.log(error); });
                }, function (error) {
                    _this.loader.dismiss();
                    if (error.state == 'error_noti') {
                        _this.util.presentToast(error.detail);
                    }
                });
            });
        }
        else {
            this.util.presentToast('No tienes conexión a internet.');
        }
    };
    LoginPage.prototype.chairaLogin = function () {
        var api_url = "http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=5762722203711&redirect_uri=http://localhost/callback&state=xyz";
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser.open(api_url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
                if ((event.url).indexOf("http://localhost/callback") === 0) {
                    browserRef.removeEventListener("exit", function (event) { });
                    browserRef.close();
                    var responseParameters = ((event.url).split("?")[1]).split("&");
                    if (responseParameters[0].indexOf('error') == -1) {
                        resolve({ detail: responseParameters[0].substring(5, responseParameters[0].length), state: 'OK' });
                    }
                    else if (responseParameters[0].substring(6, responseParameters[0].length) == 'access_denied') {
                        reject({ detail: 'Esta aplicación no esta autorizada.', state: 'error_noti' });
                    }
                    else {
                        console.log(responseParameters[0].substring(6, responseParameters[0].length));
                        reject({ detail: 'Lo sentimos ocurrió un problema, intentalo de nuevo.', state: 'error_noti' });
                    }
                }
            });
            browserRef.addEventListener("exit", function (event) {
                reject({ detail: 'El usuario cancelo la autorización.', state: 'error' });
            });
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [Oauth2Service, Util, Network]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        Oauth2Service,
        ProfileSQL,
        MenuController,
        Util,
        Network])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map