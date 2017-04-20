var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from "@angular/core";
var Util = (function () {
    function Util(toastCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    Util.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    Util.prototype.loading = function () {
        var loader = this.loadingCtrl.create({
            content: "Cargando",
            dismissOnPageChange: false
        });
        loader.present();
        return loader;
    };
    Util.prototype.pinColor = function (state) {
        if (state == 'A') {
            return { id: 'A', name: 'ACEPTADO', color: 'green' };
        }
        else if (state == 'P') {
            return { id: 'P', name: 'PENDIENTE', color: 'orange' };
        }
        else if (state == 'C') {
            return { id: 'C', name: 'ANULADO', color: 'gray' };
        }
        else if (state == 'R') {
            return { id: 'R', name: 'RECHAZADO', color: 'red' };
        }
    };
    return Util;
}());
Util = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastController, LoadingController])
], Util);
export { Util };
//# sourceMappingURL=util.js.map