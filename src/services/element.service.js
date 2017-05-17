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
import { ApiProvider } from '../providers/api.provider';
var ElementService = (function () {
    function ElementService(api) {
        this.api = api;
        this.data = null;
    }
    ElementService.prototype.getElementByCode = function (_id) {
        return this.api.GET(this.api.almacen, '/getElementoPorCodigo/' + _id);
    };
    ElementService.prototype.getClasificatorElement = function (_id) {
        return this.api.GET(this.api.almacen, '/getClasificadorElemento/' + _id);
    };
    ElementService.prototype.getMovementsElement = function (_id) {
        return this.api.GET(this.api.almacen, '/getMovimientosElemento/' + _id);
    };
    ElementService.prototype.getElementCaracteristics = function (_id) {
        return this.api.GET(this.api.almacen, '/getElementoCaracteristicas/' + _id);
    };
    return ElementService;
}());
ElementService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApiProvider])
], ElementService);
export { ElementService };
//# sourceMappingURL=element.service.js.map