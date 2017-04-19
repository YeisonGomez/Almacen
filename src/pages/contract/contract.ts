import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-contract',
  templateUrl: 'contract.html',
  providers: [ ProfileSQL, Util ]
})
export class ContractPage {

  private loader: any;
  public contracts: any;
  public contract_copy: any;
  public not_404: boolean;
  public not_data: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private profileSQL: ProfileSQL, 
  	private menu: MenuController,
  	private contractService: ContractService,
  	private util: Util,
  	public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.menu.swipeEnable(true, 'menu1');
    this.loader = this.util.loading();
    this.profileSQL.isToken().then(data => {
        if(!data) {
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.getAllContract();
        }
    }).catch(error => {
        console.log(error);
        this.loader.dismiss();
    });
  }

  getAllContract(callback?: any){
    this.contractService.getContractAll()
    .then(data => {
      this.not_404 = true;
      if(data != undefined && data.length != 0){
        this.contracts = data;
        this.contract_copy = this.contracts;
        console.log(this.contracts);
        this.not_data = true;
      } else {
        this.not_data = true;
        this.util.presentToast('No hay contratos pendientes.');
      }
      this.loader.dismiss();
      if(callback != undefined){
        callback();
      }
    })
    .catch(error => {
        this.not_404 = false;
        this.loader.dismiss();
        this.util.presentToast('No es posible conectarse al servidor.');
    });
  }

  getContract(contract: any){
    this.navCtrl.push(HomePage, { contract: contract });	
	}


  onInput(event: any) {
    this.contracts = this.contract_copy;
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.contracts = this.contracts.filter((item) => {
        return (item.COCO_DESCRIPCION.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.NAME_PROVEEDOR.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.COCO_ID.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doRefresh(refresher) {
    this.getAllContract(() => refresher.complete()); 
  }
}