import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class ApiProvider {

	public api_url: string = 'https://chaira.udla.edu.co/API_Almacen/api/';

	//Controladores
	public administrativo: string = 'Administrativo';
	public almacen: string = 'Almacen';

	private timeout: number = 5000;

  	constructor(public http: Http) {}

  	public GET(controller: string, url: string){
  		return this.http.get(this.api_url + controller + url)
	    .timeout(this.timeout)
	    .toPromise()
	    .then(response => response.json(), this.handleError);
  	}

  	public POST(controller: string, url: string, params: any){
  		return this.http.post(this.api_url + controller + url, params)
      	.timeout(this.timeout)
      	.toPromise()
      	.then(response => response.json(), this.handleError);
  	}

  	private handleError(error) {
    	return error.json().message || { status: 'ERROR', message: 'No es posible conectarse al servidor.'};
  	}
}