import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ElementService } from '../../services/element.service';
import { Util } from '../../providers/util';
import { DataSheetPage } from '../data-sheet/data-sheet';

@Component({
  selector: 'page-landing-sheet',
  templateUrl: 'landing-sheet.html',
  providers: [ Util, BarcodeScanner ]
})
export class LandingSheetPage {

	private loader: any;
	public param_search: number;
  	public elements: any = [];

  	constructor(public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	private menu: MenuController,
	  	private elementService: ElementService,
	  	private util: Util,
	  	private barcodeScanner: BarcodeScanner) {

  		this.menu.swipeEnable(true, 'menu1');
  	}

  	ionViewDidLoad() {}

  	public getElementByCode(code: string){
		if(code != undefined){
			this.loader = this.util.loading();
			this.elementService.getElementByCode(code)
			.then(data => {
		    	console.log(data);
		      	if(data != undefined && data.length != 0){
			        this.goView(data);
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.loader.dismiss();
		    })
		    .catch(error => {
		    	console.log(error);
		        this.loader.dismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
		}
	}

	public scan(){
		this.barcodeScanner.scan().then((barcodeData) => {
			console.log(barcodeData);
			this.param_search = parseInt(barcodeData.text);
			this.getElementByCode(this.param_search.toString());
		}, (err) => {
			console.log(err);
		});
	}

	public goView(elements: any){
    	this.navCtrl.push(DataSheetPage, { elements: elements });	
	}

}
