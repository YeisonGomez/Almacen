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
var Oauth2Service = (function () {
    function Oauth2Service(http) {
        this.http = http;
        this.data = null;
    }
    Oauth2Service.prototype.getAccessToken = function (code) {
        return this.http.post('http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/token', JSON.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost/callback",
            client_id: "5762722203711",
            client_secret: "nyp4vkxg05nk4wxn7nwkd59od137w8",
            state: "OK"
        }))
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    Oauth2Service.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    return Oauth2Service;
}());
Oauth2Service = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Oauth2Service);
export { Oauth2Service };
//# sourceMappingURL=oauth2.service.js.map