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
	private loader: any;
	private count: number = 0;
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

  		this.loader = this.util.loading();
  		this.getCaracteristicsElement();
  		this.getMovementsElement();
  		this.getClasificatorElement();
  	}
 
	ionViewDidLoad() {}

	public getClasificatorElement(){
		this.elementService.getClasificatorElement(this.elements[0].CLAS_ID)
		.then(data => {
				console.log("Clasificador");
		    	console.log(data);
		      	if(data != undefined && data.status != 'ERROR'){
		        	if(data.length != 0){
			          	this.clasificator = data;
			        } else {
			          this.util.presentToast('Este elemento no tiene clasificadores.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.dismissLoader();
		    })
		    .catch(error => {
		        this.loader.dismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	public getCaracteristicsElement(){
		//CARA_DESCRIPCION
		//ELCV_UNIDAD KG
		//ELCV_VALOR 25
		//ELCV_ESTADO ( A = ACTIVO, I = Inactivo)
		this.elementService.getElementCaracteristics(this.elements[0].ELEM_ID)
		.then(data => {
				console.log("Caracteristicas");
		    	console.log(data);
		      	if(data != undefined && data.status != 'ERROR'){
		        	if(data.length != 0){
			          	this.characteristics = data;
			        } else {
			          this.util.presentToast('Este elemento no tiene caracteristicas.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.dismissLoader();
		    })
		    .catch(error => {
		        this.loader.dismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	public getMovementsElement(){
		//COPR_PROCESO: "TRASLADOS"
		//UNID_ID: 815  Codigo dependencia
 		//UNID_NOMBRE: "BODEGA DE REINTEGROS" Nombre dependencia
 		//FUNCIONARIO: "JOSÉ ANTONIO PASTRANA LIZCANO" Tercero
		//PEGE_DOCUMENTOIDENTIDAD: "1117498549"
		//COAL_FECHA: "2016-12-16T00:00:00"
		this.elementService.getMovementsElement(this.elements[0].ELEM_ID)
		.then(data => {
				console.log("Movimientos");
		    	console.log(data);
		      	if(data != undefined && data.status != 'ERROR'){
		        	if(data.length != 0){
			          	this.movements = data;
			        } else {
			          this.util.presentToast('Este elemento no tiene movimientos.');
			        }
		      	} else {
		        	this.util.presentToast('No es posible conectarse al servidor.');
		      	}
		      	this.dismissLoader();
		    })
		    .catch(error => {
		        this.loader.dismiss();
		        this.util.presentToast('No es posible conectarse al servidor.');
		    });
	}

	dismissLoader(){
		if(this.count == 1){
			this.loader.dismiss();
			this.count = 0;
		} else {
			this.count++;
		}
	}

	goToSlide(index: number) {
		this.current_slide = index;
    	this.slides.slideTo(index, 200);
  	}

	slideChanged() {
		this.current_slide = this.slides.getActiveIndex();
  	}
}
