import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class ProfileSQL {

  private storage: any;
  private user: any;

  constructor(private storage2: Storage) {
    this.storage = storage2; 
  }

  public setUser(data: any){
    let profile = JSON.parse(data.scope)[0];
    let access_token = data.access_token;
    let refresh_token = data.refresh_token;

    this.user = profile;

    this.setToken(access_token);
    this.setRefreshToken(refresh_token);
    this.storage.set('profile_name', profile.NOMBRES);
    this.storage.set('profile_lastname', profile.APELLIDOS);
    this.storage.set('profile_gender', profile.GENERO);
    this.storage.set('profile_rh', profile.RH);
    this.storage.set('profile_email', profile.CORREO);
    this.storage.set('profile_rol', profile.ROL);
    this.storage.set('profile_departament', profile.DEPARTAMENTO);
    this.storage.set('profile_municipality', profile.MUNICIPIO);
    this.storage.set('profile_state', profile.ESTADO);
    this.storage.set('profile_photo', profile.FOTO);
  }

  public getUser(): Promise<any>{
    let context = this;
    return new Promise(function(resolve, reject) {
      context.getMultiple(['profile_name', 'profile_lastname', 'profile_gender', 'profile_rh', 'profile_email', 'profile_rol', 'profile_departament', 'profile_municipality', 'profile_state', 'profile_photo'])
      .then((data) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public isToken(): Promise<any> {
    let storage = this.storage;
    return new Promise(function(resolve, reject) {
      storage.get('token').then(token => {
        token ? resolve(true) : resolve(false);
      }).catch(error => {
        resolve(false);
      });
    });
  }

  public getToken(): Promise<any> {
    let storage = this.storage;
    return new Promise(function(resolve, reject) {
      storage.get('token').then(data => {
        resolve(data);
      });
    });
  }

  public setToken(token: string){
    this.storage.set('token', token);
  }

  public getRefreshToken(): Promise<any>{
    let storage = this.storage;
    return new Promise(function(resolve, reject) {
      storage.get('refresh_token').then(data => {
        console.log(data);
        resolve(data);
      });
    });
  }

  public setRefreshToken(data: string){
    this.storage.set('refresh_token', data);
  }  

  private getMultiple(keys: string[]) {
    const promises = [];
    keys.forEach( key => promises.push(this.storage.get(key)) );
    return Promise.all(promises).then( values => {
      const result = {};
      values.map( (value, index) => { 
        result[keys[index]] = value; 
      });
      return result;
    });
  }

  public clear(){
    this.storage.clear();
  }

}