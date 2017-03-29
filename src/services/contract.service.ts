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

  getContract(_id: string) {
    return this.http.get('https://chaira.udla.edu.co/API_Almacen/api/Almacen/getContrato/' + _id)
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}