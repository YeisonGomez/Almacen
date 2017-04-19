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
import { Storage } from '@ionic/storage';
var ProfileSQL = (function () {
    function ProfileSQL(storage2) {
        this.storage2 = storage2;
        this.storage = storage2;
    }
    ProfileSQL.prototype.setUser = function (data) {
        var profile = JSON.parse(data.scope)[0];
        var access_token = data.access_token;
        var refresh_token = data.refresh_token;
        this.user = profile;
        this.setToken(access_token);
        this.setRefreshToken(refresh_token);
        this.storage.set('profile_name', profile.NOMBRES);
        this.storage.set('profile_lastname', profile.APELLIDOS);
        this.storage.set('profile_gender', profile.GENERO);
        this.storage.set('profile_rh', profile.RH);
        this.storage.set('profile_email', profile.CORREO);
        this.storage.set('profile_rol', profile.ROL);
        this.storage.set('profile_departament', profile.DEPARTAMENTO);
        this.storage.set('profile_municipality', profile.MUNICIPIO);
        this.storage.set('profile_state', profile.ESTADO);
        this.storage.set('profile_photo', profile.FOTO);
    };
    ProfileSQL.prototype.getUser = function () {
        var context = this;
        return new Promise(function (resolve, reject) {
            context.getMultiple(['profile_name', 'profile_lastname', 'profile_gender', 'profile_rh', 'profile_email', 'profile_rol', 'profile_departament', 'profile_municipality', 'profile_state', 'profile_photo'])
                .then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    ProfileSQL.prototype.isToken = function () {
        var storage = this.storage;
        return new Promise(function (resolve, reject) {
            storage.get('token').then(function (token) {
                token ? resolve(true) : resolve(false);
            }).catch(function (error) {
                resolve(false);
            });
        });
    };
    ProfileSQL.prototype.getToken = function () {
        var storage = this.storage;
        return new Promise(function (resolve, reject) {
            storage.get('token').then(function (data) {
                resolve(data);
            });
        });
    };
    ProfileSQL.prototype.setToken = function (token) {
        this.storage.set('token', token);
    };
    ProfileSQL.prototype.getRefreshToken = function () {
        var storage = this.storage;
        return new Promise(function (resolve, reject) {
            storage.get('refresh_token').then(function (data) {
                console.log(data);
                resolve(data);
            });
        });
    };
    ProfileSQL.prototype.setRefreshToken = function (data) {
        this.storage.set('refresh_token', data);
    };
    ProfileSQL.prototype.getMultiple = function (keys) {
        var _this = this;
        var promises = [];
        keys.forEach(function (key) { return promises.push(_this.storage.get(key)); });
        return Promise.all(promises).then(function (values) {
            var result = {};
            values.map(function (value, index) {
                result[keys[index]] = value;
            });
            return result;
        });
    };
    ProfileSQL.prototype.clear = function () {
        this.storage.clear();
    };
    return ProfileSQL;
}());
ProfileSQL = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], ProfileSQL);
export { ProfileSQL };
//# sourceMappingURL=profile.sql.js.map