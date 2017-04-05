import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class InvoiceService {

  data : any;
  http : any;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  getDetailInvoice(_id: string) {
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getDetalleFactura/' + _id)
    .timeout(5000)
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  changeState(state: string, id: string){
    return this.http.post('https://chaira.udla.edu.co/API_Almacen/api/Almacen/ActualizarEstadoDetalleFactura', { id: id, estado: state })
    .timeout(5000)
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  handleError(error) {
    return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.'};
  }
}