import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../config/user.service'
import { ModuleConfigService } from '../../config/moduleConfigService';
import { elementAt } from 'rxjs/operator/elementAt';
import { MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  moduleconfigList = [];
  subModulelist = [];
  endModule=null;
  activeModuleList=null;
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService,public menuCtrl: MenuController,public actionSheetCtrl: ActionSheetController,private camera: Camera
  ) {

  }
  ngOnInit() {
    this.moduleconfigList = this.moduleConfigService.getModuleConfig();
    console.log(this.moduleconfigList)
    this.tab1Click(this.moduleconfigList[0])
    this.endModule=this.moduleconfigList[0].children[0];
    this.activeModuleList=this.moduleconfigList;
    // this.moduleConfigService.getModuleHtml();
  }

  tab1Click(module) {
    console.log(module)
    // if (module.isActive) return;
    // this.moduleconfigList.forEach(module => module.isActive = false)
    // module.isActive = true;
    this.moduleconfigList.forEach(element => {
      if (module.id != element.id) {
        element.isActive = false
      } else {
        console.log(element)
        module.isActive = !module.isActive;
      }
    })
    if (module.children) this.subModulelist = module.children;
    this.activeModuleList=module.children;
    
    this.moduleConfigService.initNagtive(module.children);
  }
  tab2Click(module, fatherModule) {
    console.log(module)
    // if(module.isActive) return;
    fatherModule.children.forEach(element => {
      if (module.id != element.id) {
        element.isActive = false
      } else {
        console.log(element)
        module.isActive = !module.isActive;
      }
    })
    if (!module.children) {
      this.closeMenu();
      return
    };
    this.subModulelist = module.children;
    this.activeModuleList=module.children;
    
    this.moduleConfigService.initNagtive(module.children);
  }
  cardClick(module){
    if(!module.children){
      console.log(module)
      this.subModulelist=[];
      this.endModule=module;
    }else{
      this.subModulelist.forEach(sub=>{
        if(sub.id!=module.id){
          sub.isActive=false
        }else{
          module.isActive=true;
        }
      })
      this.subModulelist=module.children;
    }
  }
  itemModule(module){
    if(module.children){
      this.activeModuleList=module.children;
    }else{
      console.log(module)
      // this.endModule=module;
    }
  }
  openMenu() {
    console.log('open')
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
  fileAction(module){
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture(module,1)
          }
        },{
          text: '从相册选取',
          handler: () => {
            console.log('Archive clicked');
            this.takePicture(module,0)            
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  takePicture(module,type){
    const options = {
      quality: 100,
      sourceType:type,
      allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image.slice(11))
     }, (err) => {
      // Handle error
      console.log(err)
     });
  }
}
