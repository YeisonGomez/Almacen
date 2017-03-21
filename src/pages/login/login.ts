import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

	
declare var window: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	this.platform.ready().then(() => {
        this.chairaLogin().then(success => {
            alert(success.access_token);
        }, (error) => {
            alert(error);
        });
    });
  }

  	public chairaLogin(): Promise<any> {
		return new Promise(function(resolve, reject) {
		    var browserRef = window.cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=" + "CLIENT_ID_HERE" + "&redirect_uri=http://localhost/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
		    browserRef.addEventListener("loadstart", (event) => {
		        if ((event.url).indexOf("http://localhost/callback") === 0) {
		            browserRef.removeEventListener("exit", (event) => {});
		            browserRef.close();
		            var responseParameters = ((event.url).split("#")[1]).split("&");
		            var parsedResponse = {};
		            for (var i = 0; i < responseParameters.length; i++) {
		                parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
		            }
		            if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
		                resolve(parsedResponse);
		            } else {
		                reject("Problem authenticating with Facebook");
		            }
		        }
		    });
		    browserRef.addEventListener("exit", function(event) {
		        reject("The Facebook sign in flow was canceled");
		    });
		});
    }
}
