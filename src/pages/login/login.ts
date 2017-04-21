import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { Oauth2Service } from '../../services/oauth2.service';
import { ProfileSQL } from '../../sql/profile.sql';
import { Util } from '../../providers/util';
import { ContractPage } from '../contract/contract';
	
declare var window: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ Oauth2Service, Util, Network]
})
export class LoginPage {

	private loader: any;
	private wifi: boolean = true

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private platform: Platform, 
		private oauth2Service: Oauth2Service,
		private profileSQL: ProfileSQL,
		private menu: MenuController,
		private util: Util,
		private network: Network) {}

	ionViewDidLoad() {
		this.menu.swipeEnable(false, 'menu1');

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
 
	login(){
		if(this.wifi){
			this.loader = this.util.loading();
			this.platform.ready().then(() => {
			    this.chairaLogin().then(success => {
			    	this.oauth2Service.getAccessToken(success.detail)
					.then(response => {
						this.profileSQL.setUser(response);
						this.profileSQL.getUser().then(user => {
							this.loader.dismiss();
				  			this.navCtrl.setRoot(ContractPage);
						});
					})
					.catch(error => console.log(error))

			    }, (error) => {
			    	this.loader.dismiss();
			        if(error.state == 'error_noti'){
			        	this.util.presentToast(error.detail);
			        }
			    });
			}); 
		} else {
			this.util.presentToast('No tienes conexión a internet.');
		}
		
	}

  	public chairaLogin(): Promise<any> {
  		var api_url = "http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=5762722203711&redirect_uri=http://localhost/callback&state=xyz";
		return new Promise(function(resolve, reject) {
		    var browserRef = window.cordova.InAppBrowser.open(api_url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
		    browserRef.addEventListener("loadstart", (event) => {
		        if ((event.url).indexOf("http://localhost/callback") === 0) {
		            browserRef.removeEventListener("exit", (event) => {});
		            browserRef.close();
		            var responseParameters = ((event.url).split("?")[1]).split("&");

		            if(responseParameters[0].indexOf('error') == -1){
		            	resolve({ detail: responseParameters[0].substring(5, responseParameters[0].length), state: 'OK' });
		            } else if(responseParameters[0].substring(6, responseParameters[0].length) == 'access_denied'){
		            	reject({ detail: 'Esta aplicación no esta autorizada.', state: 'error_noti' });
		            } else {
		            	console.log(responseParameters[0].substring(6, responseParameters[0].length));
		            	reject({ detail: 'Lo sentimos ocurrió un problema, intentalo de nuevo.', state: 'error_noti' });
		            }
		        }
		    });
		    browserRef.addEventListener("exit", function(event) {
		        reject({ detail: 'El usuario cancelo la autorización.', state: 'error' });
		    });
		});
    }
}
