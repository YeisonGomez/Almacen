import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';

import { ElementService } from '../../services/element.service';
import { Util } from '../../providers/util';

@Component({
  selector: 'page-data-sheet',
  templateUrl: 'data-sheet.html',
  providers: [ Util ]
}) 
export class DataSheetPage {

	@ViewChild(Slides) slides: Slides;
	//private loader: any;
	private count: number = 0;
	public getElementByCode: any;
	public param_search: number;
  	public elements: any = [];
  	public movements: any = [];
  	public characteristics: any = [];
  	public clasificator: any = [];
  	public current_slide: number = 0;

  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	private menu: MenuController,
	  	private elementService: ElementService,
	  	private util: Util) {
  		this.menu.swipeEnable(true, 'menu1');
  		this.elements = navParams.get('elements');
  		this.getElementByCode = navParams.get('getElementByCode');

  		this.updateElement(this);
  	}
 
	ionViewDidLoad() {}

	public getClasificatorElement(){
		this.util.loading();
		this.elementService.getClasificatorElement(this.elements[0].CLAS_ID)
		.then(data => {
		      	if(data != undefined && data.status != 'ERROR'){
		      		this.clasificator = data;
		        	if(data.length == 0){
			          	//this.util.presentToast('Este elemento no tiene clasificadores.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.util.loadingDismiss();
		    })
		    .catch(error => {
		        this.util.loadingDismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	public getCaracteristicsElement(){
		this.util.loading();
		this.elementService.getElementCaracteristics(this.elements[0].ELEM_ID)
		.then(data => {
		      	if(data != undefined && data.status != 'ERROR'){
		      		this.characteristics = data;
		        	if(data.length == 0){
		        		//this.util.presentToast('Este elemento no tiene caracteristicas.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.util.loadingDismiss();
		    })
		    .catch(error => {
		        this.util.loadingDismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	public getMovementsElement(){
		this.util.loading();
		this.elementService.getMovementsElement(this.elements[0].ELEM_ID)
		.then(data => {
		      	if(data != undefined && data.status != 'ERROR'){
		      		this.movements = data;
		        	if(data.length == 0){
		        		//this.util.presentToast('Este elemento no tiene movimientos.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.util.loadingDismiss();
		    })
		    .catch(error => {
		        this.util.loadingDismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	public updateElement(context: any){
  		context.getCaracteristicsElement();
  		context.getMovementsElement();
  		context.getClasificatorElement();
	}

	goToSlide(index: number) {
		this.current_slide = index;
    	this.slides.slideTo(index, 200);
  	}

	slideChanged() {
		this.current_slide = this.slides.getActiveIndex();
  	}
}
