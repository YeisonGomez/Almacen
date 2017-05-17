var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
var ApiProvider = (function () {
    function ApiProvider(http) {
        this.http = http;
        this.api_url = 'https://chaira.udla.edu.co/API_Almacen/api/';
        //Controladores
        this.administrativo = 'Administrativo';
        this.almacen = 'Almacen';
        this.timeout = 5000;
    }
    ApiProvider.prototype.GET = function (controller, url) {
        return this.http.get(this.api_url + controller + url)
            .timeout(this.timeout)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ApiProvider.prototype.POST = function (controller, url, params) {
        return this.http.post(this.api_url + controller + url, params)
            .timeout(this.timeout)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ApiProvider.prototype.handleError = function (error) {
        return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.' };
    };
    return ApiProvider;
}());
ApiProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ApiProvider);
export { ApiProvider };
//# sourceMappingURL=api.provider.js.map