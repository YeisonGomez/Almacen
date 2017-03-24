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
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { ProfileSQL } from '../../sql/profile.sql';
import { LoginPage } from '../login/login';
var HomePage = (function () {
    function HomePage(navCtrl, navParams, profileSQL, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileSQL = profileSQL;
        this.menu = menu;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menu.swipeEnable(true, 'menu1');
        this.profileSQL.isToken().then(function (data) {
            if (!data) {
                _this.navCtrl.setRoot(LoginPage);
            }
            else {
                _this.profileSQL.getUser();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [ProfileSQL]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProfileSQL, MenuController])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map