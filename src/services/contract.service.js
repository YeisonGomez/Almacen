var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
var ContractService = (function () {
    function ContractService(http) {
        this.http = http;
        this.data = null;
    }
    ContractService.prototype.getContractAll = function () {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getContratosPendientes')
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.getContract = function (_id) {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getContrato/' + _id)
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.getInvoiceByElement = function (_id) {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getFacturasElementoSolicitado/' + _id)
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.getElementsContract = function (_id) {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getElementosSolicitudContrato/' + _id)
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.getInvoices = function (_id) {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getFacturasContrato/' + _id)
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.changeStateInvoice = function (state, id, observation) {
        return this.http.post('https://chaira.udla.edu.co/API_Almacen/api/Almacen/ActualizarEstadoFactura', { id: id, estado: state, observaciones: observation })
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    ContractService.prototype.handleError = function (error) {
        return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.' };
    };
    return ContractService;
}());
ContractService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ContractService);
export { ContractService };
//# sourceMappingURL=contract.service.js.map