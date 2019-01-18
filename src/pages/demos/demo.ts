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
import { PopoverController } from 'ionic-angular';
import { HardwarePage } from '../../conponents/hardwarePage'
import { EditSubPage } from '../editsub/editsub';
import { LoadingController } from 'ionic-angular';
import { LoadedModule } from 'ionic-angular/util/module-loader';

// import { SelectValuePipe } from '../../config/selectValue.pipe'
@Component({
  templateUrl: 'demo.html'
})
export class DemoPage {
  shouldShowCancel = true;
  shopCode = ''
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService, public menuCtrl: MenuController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl: AlertController,
    private http: wyHttpService, public popoverCtrl: PopoverController,public loadingCtrl:LoadingController) {

  }
  ngOnInit() {
    
    
  }
  
}
