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
var InvoiceService = (function () {
    function InvoiceService(http) {
        this.http = http;
        this.data = null;
    }
    InvoiceService.prototype.getDetailInvoice = function (_id) {
        return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getDetalleFactura/' + _id)
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    InvoiceService.prototype.changeState = function (state, id) {
        return this.http.post('https://chaira.udla.edu.co/API_Almacen/api/Almacen/ActualizarEstadoDetalleFactura', { id: id, estado: state })
            .timeout(5000)
            .toPromise()
            .then(function (response) { return response.json(); }, this.handleError);
    };
    InvoiceService.prototype.handleError = function (error) {
        return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.' };
    };
    return InvoiceService;
}());
InvoiceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], InvoiceService);
export { InvoiceService };
//# sourceMappingURL=invoice.service.js.map