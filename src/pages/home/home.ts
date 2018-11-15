import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../config/user.service'
import { ModuleConfigService } from '../../config/moduleConfigService';
import { elementAt } from 'rxjs/operator/elementAt';
import { MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { wyHttpService } from '../../config/http.service'
import { MenuPage } from "../menu/menu"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  moduleconfigList = [];
  subModulelist = [];
  endModule=null;
  activeModuleList=null;
  brand='kfc';
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService,public menuCtrl: MenuController,public actionSheetCtrl: ActionSheetController,private camera: Camera,public alertCtrl: AlertController
  ,private http:wyHttpService) {

  }
  ngOnInit() {
    
  }
  net(){
    console.log('dd')
    if(this.moduleConfigService.moduleConfiglist.length==0){
      this.moduleConfigService.getInitConfig('kfc').then(data=>{
        this.navCtrl.push(MenuPage)  
      }).catch(error=>{
        console.log(error)
      });
    }else{
      this.navCtrl.push(MenuPage)        
    }
  }

}
