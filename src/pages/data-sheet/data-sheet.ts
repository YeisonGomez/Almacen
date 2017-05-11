import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContractService } from '../../services/contract.service';
import { Util } from '../../providers/util';

@Component({
  selector: 'page-data-sheet',
  templateUrl: 'data-sheet.html',
  providers: [ Util ]
})
export class DataSheetPage {

	private loader: any;
  	public elements: any = [];
  	public elements_copy: any;
  	public not_data: boolean = true;
  	public loadingInit: boolean = false;

  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	private util: Util) {}

	ionViewDidLoad() {}

	onInput(event: any) {
	    this.elements = this.elements_copy;
	    let val = event.target.value;
	    if (val && val.trim() != '') {
	      this.elements = this.elements_copy.filter((item) => {
	        return (item.COCO_DESCRIPCION.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.NAME_PROVEEDOR.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.COCO_ID.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
	  }

}
