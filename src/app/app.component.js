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
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { LandingSheetPage } from '../pages/landing-sheet/landing-sheet';
import { ContractPage } from '../pages/contract/contract';
import { ProfileSQL } from '../sql/profile.sql';
var MyApp = (function () {
    function MyApp(platform, profileSQL, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.profileSQL = profileSQL;
        this.alertCtrl = alertCtrl;
        this.rootPage = LandingSheetPage;
        this.initializeApp();
        this.pages = [
            { title: 'Contratos', component: ContractPage },
            { title: 'Ficha técnica', component: LandingSheetPage }
        ];
        this.profileSQL.currentUser.subscribe(function (userData) {
            _this.user = userData;
        });
        this.profileSQL.isToken().then(function (data) {
            if (data) {
                _this.profileSQL.getUser().then(function (user) { });
            }
            else {
                _this.nav.setRoot(LoginPage);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            //StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#006500');
            Splashscreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.showConfirm();
    };
    MyApp.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '¿Estas seguro?',
            message: 'Cerraremos la sesión que actualmente esta iniciada.',
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Vale',
                    handler: function () {
                        _this.profileSQL.clear();
                        _this.nav.setRoot(LoginPage);
                    }
                }
            ]
        });
        confirm.present();
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [ProfileSQL]
    }),
    __metadata("design:paramtypes", [Platform, ProfileSQL, AlertController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map