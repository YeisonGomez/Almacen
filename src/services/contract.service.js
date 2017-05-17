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
import { ApiProvider } from '../providers/api.provider';
var ContractService = (function () {
    function ContractService(http, api) {
        this.api = api;
        this.http = http;
        this.data = null;
    }
    ContractService.prototype.getContractAll = function () {
        return this.api.GET(this.api.administrativo, '/getContratosPendientes');
    };
    ContractService.prototype.getContract = function (_id) {
        return this.api.GET(this.api.administrativo, '/getContrato/' + _id);
    };
    ContractService.prototype.getInvoiceByElement = function (_id) {
        return this.api.GET(this.api.administrativo, '/getFacturasElementoSolicitado/' + _id);
    };
    ContractService.prototype.getElementsContract = function (_id) {
        return this.api.GET(this.api.administrativo, '/getElementosSolicitudContrato/' + _id);
    };
    ContractService.prototype.getInvoices = function (_id) {
        return this.api.GET(this.api.administrativo, '/getFacturasContrato/' + _id);
    };
    ContractService.prototype.changeStateInvoice = function (state, id, observation) {
        return this.api.POST(this.api.administrativo, '/ActualizarEstadoFactura', { id: id, estado: state, observaciones: observation });
    };
    return ContractService;
}());
ContractService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ApiProvider])
], ContractService);
export { ContractService };
//# sourceMappingURL=contract.service.js.map