import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class InvoiceService {

  data : any;
  http : any;

  constructor(http: Http, public api: ApiProvider) {
    this.http = http;
    this.data = null;
  }

  getDetailInvoice(_id: string) {
    return this.api.GET(this.api.administrativo, '/getDetalleFactura/' + _id);
  }

  changeState(state: string, id: string){
    return this.api.POST(this.api.administrativo, '/ActualizarEstadoDetalleFactura', { id: id, estado: state });
  }
}