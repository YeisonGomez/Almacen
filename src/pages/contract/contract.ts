import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { Util } from '../../providers/util';
import { ProfileSQL } from '../../sql/profile.sql';
import { ContractService } from '../../services/contract.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contract',
  templateUrl: 'contract.html',
  providers: [ ProfileSQL, Util ]
})
export class ContractPage {

  private loader: any;

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
        console.log(data);
        if(!data) {
          this.navCtrl.setRoot(LoginPage);
        } else {
            this.getAllContract();
        }
        this.loader.dismiss();
      }).catch(error => {
        console.log(error);
        this.loader.dismiss();
      });
  }

  getAllContract(){
    this.loader = this.util.loading();
    this.contractService.getContractAll()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
        console.log(error);
        this.loader.dismiss();
      });
  }

}
