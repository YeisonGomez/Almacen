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
import { MenuController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Oauth2Service } from '../../services/oauth2.service';
import { ProfileSQL } from '../../sql/profile.sql';
import { Util } from '../../providers/util';
import { HomePage } from '../home/home';
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, platform, toastCtrl, oauth2Service, profileSQL, menu, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.oauth2Service = oauth2Service;
        this.profileSQL = profileSQL;
        this.menu = menu;
        this.util = util;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false, 'menu1');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.platform.ready().then(function () {
            _this.chairaLogin().then(function (success) {
                _this.oauth2Service.getAccessToken(success.detail)
                    .then(function (response) {
                    _this.loading = false;
                    console.log(response);
                    _this.profileSQL.setUser(response);
                    _this.navCtrl.setRoot(HomePage);
                })
                    .catch(function (error) { return console.log(error); });
            }, function (error) {
                _this.loading = false;
                if (error.state == 'error_noti') {
                    _this.util.presentToast(error.detail);
                }
            });
        });
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
                        reject({ detail: responseParameters[0].substring(6, responseParameters[0].length), state: 'error' });
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
        providers: [Oauth2Service, ProfileSQL]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Platform,
        ToastController,
        Oauth2Service,
        ProfileSQL,
        MenuController,
        Util])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map