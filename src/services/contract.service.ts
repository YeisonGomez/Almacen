import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class ContractService {

  data : any;
  http : any;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  getContractAll(){
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getContratosPendientes')
      .timeout(5000)
      .toPromise()
      .then(response => response.json(), this.handleError);
  }
  
  getContract(_id: string) {
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getContrato/' + _id)
    .timeout(5000)
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  getElementsContract(_id: string){
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getElementosSolicitudContrato/' + _id)
        .timeout(5000)
        .toPromise()
        .then(response => response.json(), this.handleError);
  }

  getInvoices(_id: string){
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getFacturasContrato/' + _id)
        .timeout(5000)
        .toPromise()
        .then(response => response.json(), this.handleError);
  }

  changeStateInvoice(state: string, id: string, observation: string){
    return this.http.post('https://chaira.udla.edu.co/API_Almacen/api/Almacen/ActualizarEstadoFactura', { id: id, estado: state, observaciones: observation })
      .timeout(5000)
      .toPromise()
      .then(response => response.json(), this.handleError);
  }

  handleError(error) {
    return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.'};
  }
}