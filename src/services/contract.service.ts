import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class ContractService {

  data : any;
  http : any;

  constructor(http: Http, public api: ApiProvider) {
    this.http = http;
    this.data = null;
  }

  getContractAll(){
    return this.api.GET(this.api.administrativo, '/getContratosPendientes');
  }
  
  getContract(_id: string) {
    return this.api.GET(this.api.administrativo, '/getContrato/' + _id);  
  }

  getInvoiceByElement(_id: string){
    return this.api.GET(this.api.administrativo, '/getFacturasElementoSolicitado/' + _id);
  }

  getElementsContract(_id: string){
    return this.api.GET(this.api.administrativo, '/getElementosSolicitudContrato/' + _id);
  }

  getInvoices(_id: string){
    return this.api.GET(this.api.administrativo, '/getFacturasContrato/' + _id);
  }

  changeStateInvoice(state: string, id: string, observation: string){
    return this.api.POST(this.api.administrativo, '/ActualizarEstadoFactura', { id: id, estado: state, observaciones: observation });
  }
}