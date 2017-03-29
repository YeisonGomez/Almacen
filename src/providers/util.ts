import { ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class Util {

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  public presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public loading(): any {
      let loader = this.loadingCtrl.create({
        content: "Cargando",
        dismissOnPageChange: false
      });
      
      loader.present();
      return loader;
  }

}