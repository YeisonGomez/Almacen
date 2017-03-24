import { ToastController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class Util {

  constructor(private toastCtrl: ToastController) {

  }

  public presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}