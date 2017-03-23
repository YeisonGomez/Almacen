import { Storage } from '@ionic/storage';

export class ProfileSQL {

  storage: any;

  constructor() {
    this.storage = new Storage();
    //this.storage.query('CREATE TABLE IF NOT EXISTS profile (name TEXT, lastname TEXT, gender TEXT, rh TEXT, email TEXT PRIMARY KEY, rol TEXT, department TEXT, municipality TEXT, state TEXT, photo TEXT)');
  }

  public set(data: any){
    this.storage.set('profile_name', data.NOMBRES);
    this.storage.set('profile_lastname', data.APELLIDOS);
    this.storage.set('profile_gender', data.GENERO);
    this.storage.set('profile_rh', data.RH);
    this.storage.set('profile_email', data.CORREO);
    this.storage.set('profile_rol', data.ROL);
    this.storage.set('profile_departament', data.DEPARTAMENTO);
    this.storage.set('profile_municipality', data.MUNICIPIO);
    this.storage.set('profile_state', data.ESTADO);
    this.storage.set('profile_photo', data.FOTO);
    /*this.storage.query(
      'insert into profile \n' + 
      '(name, lastname, gender, rh, email, rol, department, municipality, state, photo) \n' + 
      'values(' + 
      data.NOMBRES + ', ' + 
      data.APELLIDOS + ', ' + 
      data.GENERO + ', ' + 
      data.RH + ', ' + 
      data.CORREO + ', ' + 
      data.ROL + ', ' + 
      data.DEPARTAMENTO + ', ' + 
      data.MUNICIPIO + ', ' + 
      data.ESTADO + ', ' + 
      data.FOTO + ')');*/
  }

  public get(): Promise<any>{
    return new Promise(function(resolve, reject) {
      this.storage.get('profile_name').then(data => {
        console.log("Dato almacenado: ", data); 
      });
      /*this.storage.query('select * from profile').then(((response) => {
        console.log(response);
        resolve(response);
      }))
      .catch(error => {
        console.log('profile.sql.ts');
        console.log(error);
        reject(error);
      });*/
    }); 
  }

}