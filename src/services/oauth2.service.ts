import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';

@Injectable()
export class Oauth2Service {

  data : any;
  http : any;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  getAccessToken(code: string) {
    return this.http.post('http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/token', JSON.stringify({
      grant_type: "authorization_code", 
      code: code,
      redirect_uri: "http://localhost/callback",
      client_id: "5762722203711",
      client_secret: "nyp4vkxg05nk4wxn7nwkd59od137w8",
      state: "OK"
    }))
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}