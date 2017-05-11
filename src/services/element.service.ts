import { Injectable } from "@angular/core";
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class ElementService {

  data : any;

  constructor(public api: ApiProvider) {
    this.data = null;
  }

  getElementByCode(code: string){
    return this.api.GET(this.api.almacen, '/getElementoPorCodigo/' + code);
  }

  getClasificatorElement(_id: string){
    return this.api.GET(this.api.almacen, '/getClasificadorElemento/' + _id);
  }

  getMovementsElement(_id: string){
    return this.api.GET(this.api.almacen, '/getMovimientosElemento/' + _id);
  }

  getElementCaracteristics(_id: string){
    return this.api.GET(this.api.almacen, '/getElementosCaracteristicas/' + _id);
  }
}