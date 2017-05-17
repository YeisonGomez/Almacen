import { ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class Util {

  private loader: any = undefined;
  private loader_cont: number = 0;

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
    this.loader_cont++;
    if (this.loader == undefined) {
      this.loader = this.loadingCtrl.create({
        content: "Cargando",
        dismissOnPageChange: false
      });
      this.loader.present();
    }
    return this.loader;
  }

  public loadingDismiss() {
    this.loader_cont--;
    if(this.loader_cont == 0) {
      this.loader.dismiss();
      this.loader = undefined;
    }
  };

  public pinColor(state: string): any {
    if (state == 'A') {
      return { id: 'A', name: 'ACEPTADO', color: 'green' };
    } else if (state == 'P') {
      return { id: 'P', name: 'PENDIENTE', color: 'orange' };
    } else if (state == 'C') {
      return { id: 'C', name: 'ANULADO', color: 'gray' };
    } else if (state == 'R') {
      return { id: 'R', name: 'RECHAZADO', color: 'red' };
    }
  }

}