import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network';

import { ElementService } from '../../services/element.service';
import { Util } from '../../providers/util';
import { DataSheetPage } from '../data-sheet/data-sheet';

@Component({
  selector: 'page-landing-sheet',
  templateUrl: 'landing-sheet.html',
  providers: [ Util, BarcodeScanner, Network ]
})
export class LandingSheetPage {

	public param_search: number;
  	public elements: any = [];
  	private wifi: boolean = true;

  	constructor(public navCtrl: NavController,  
	  	public navParams: NavParams,
	  	private menu: MenuController,
	  	private elementService: ElementService,
	  	private util: Util,
	  	private barcodeScanner: BarcodeScanner,
	  	private network: Network) {

  		this.menu.swipeEnable(true, 'menu1');

  		this.network.onDisconnect().subscribe(() => {
		  console.log('network was disconnected :-(');
		  this.wifi = false;
		});

		//disconnectSubscription.unsubscribe();

		this.network.onConnect().subscribe(() => {
		  setTimeout(() => {
		    if (this.network.type === 'wifi') {
		    	this.wifi = true;
		      console.log('we got a wifi connection, woohoo!');
		    }
		  }, 3000);
		});
  	}

  	ionViewDidLoad() {}

  	public getElementByCode(code: any, callback?: any, context?: any){
		if(code != undefined && !isNaN(code) && code.length > 0 && this.wifi){
			this.util.loading();
			this.elementService.getElementByCode(code)
			.then(data => {
				console.log(data);
		      	if(data.status != 'ERROR'){
		      		if(data.length != 0){
		      			this.elements = data;
			      		if(callback){
			      			callback(context);
			      		} else {
			      			this.goView(this.elements);
			      		}
		      		} else {
		      			this.util.presentToast('No se encontro el elemento.');
		      		}
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.util.loadingDismiss();
		    })
		    .catch(error => {
		    	console.log(error);
		        this.util.loadingDismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
		} else if(!this.wifi){
			this.util.presentToast('No tienes conexión a internet.');
		}
	}

	public scan(){
		this.barcodeScanner.scan().then((barcodeData) => {
			console.log(barcodeData);
			this.param_search = parseInt(barcodeData.text);
			this.getElementByCode(this.param_search.toString());
		}, (err) => {
			this.util.presentToast('Ocurrio un problema al escanear el código QR.');
		});
	}

	public goView(elements: any){
    	this.navCtrl.push(DataSheetPage, { elements: elements, getElementByCode: this.getElementByCode });	
	}

}
