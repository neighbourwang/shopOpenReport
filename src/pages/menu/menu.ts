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

// import { SelectValuePipe } from '../../config/selectValue.pipe'
@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {
  moduleconfigList = [];
  subModulelist = [];
  endModule = null;
  activeModuleList = null;
  tabModule = {
    displayName: '新建新店报告'
  }
  brand = 'kfc';
  shopInfo = {
    shopName: null,
    shopBrand: 'KFC',
    shopCode: null,
    shopVersion: null,
    shopContent: []
  };
  valueContent=[];
  
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService, public menuCtrl: MenuController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl: AlertController,
    private http: wyHttpService) {

  }
  ngOnInit() {
    this.moduleconfigList = this.moduleConfigService.getModuleConfig();
    console.log(this.moduleconfigList)
    this.tab1Click(this.moduleconfigList[0])
    this.endModule = this.moduleconfigList[0].children[0];
    this.activeModuleList = this.moduleconfigList;

    // this.moduleConfigService.getModuleHtml();
    // this.showRadio();
  }

  tab1Click(module) {
    console.log(module)
    // if (module.isActive) return;
    // this.moduleconfigList.forEach(module => module.isActive = false)
    // module.isActive = true;
    this.tabModule = module;
    this.moduleconfigList.forEach(element => {
      if (module.id != element.id) {
        element.isActive = false
      } else {
        console.log(element)
        module.isActive = !module.isActive;
      }
    })
    if (module.children) this.subModulelist = module.children;
    this.activeModuleList = module.children;

    this.moduleConfigService.initNagtive(module.children, 'nagtive');
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
    this.activeModuleList = module.children;

    this.moduleConfigService.initNagtive(module.children, 'nagtive');
  }
  cardClick(module) {
    if (!module.children) {
      console.log(module)
      this.subModulelist = [];
      this.endModule = module;
    } else {
      this.subModulelist.forEach(sub => {
        if (sub.id != module.id) {
          sub.isActive = false
        } else {
          module.isActive = true;
        }
      })
      this.subModulelist = module.children;
    }
  }
  itemModule(module) {
    if (module.children) {
      this.activeModuleList = module.children;
    } else {
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
  fileAction(module) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture(module, 1)
          }
        }, {
          text: '从相册选取',
          handler: () => {
            console.log('Archive clicked');
            this.takePicture(module, 0)
          }
        }, {
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
  takePicture(module, type) {
    const options = {
      quality: 80,
      sourceType: type,
      // allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('ok', base64Image)
      // console.log(base64Image.slice(11))
    }, (err) => {
      // Handle error
      console.log(err)
    });
  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('选取品牌');

    alert.addInput({
      type: 'radio',
      label: 'KFC',
      value: 'kfc',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '必胜客',
      value: 'bishengke',
      checked: false
    });
    // alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        // this.testRadioOpen = false;
        // this.testRadioResult = data;
        console.log(data)
        if (data != this.brand) {
          this.brandChange(data);
        }
      }
    });
    alert.present();
  }
  brandChange(brand) {
    console.log(brand)
  }
  openModal() {
    let _self = this;
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '提交',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            _self.saveModule();
          }
        }, {
          text: '返回',
          handler: () => {
            console.log('Archive clicked');
            _self.navCtrl.pop();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  getSelectValue(id) {
    let length = this.moduleconfigList.length;
    // console.log(this.moduleconfigList)
    // console.log(this.moduleconfigList[length-1]['selectedValue'].filter(element => element.id==id)[0]['list'])
    let valueList = this.moduleconfigList[length - 1]['selectedValue'].filter(element => element.id == id)[0]['list'];
    return valueList ? valueList : [];
  }
  saveModule() {
    console.log(this.moduleconfigList)
    this.moduleconfigList.forEach(module => {
      if (module.name == 'basicInformation') {
        console.log(module)
        module.children.forEach(child => {
          if (child.name == 'restaurantName') {
            this.shopInfo.shopName = child.value[0]
          } else if (child.name == 'restaurantNO') {
            this.shopInfo.shopCode = child.value[0]
          } else if (child.name == 'brand') {
            this.shopInfo.shopBrand = child.value[0]
          }
        })
      }
      if (module.name == 'versionNo') {
        this.shopInfo.shopVersion = module.children[0].value[0]
      }
      if (module.name == 'title') {
        module.children.forEach(child => {
          if (child.name == 'code') {
            this.shopInfo.shopCode = child.value[0]
          }
        })
      }
      // this.shopInfo.shopContent.push({ id: module.id, content: this.returnLajiBackend(module) })
    })
    console.log(this.shopInfo)
    for (let attr in this.shopInfo) {
      console.log(attr)
      if (!this.shopInfo[attr]) {
        alert(attr)
      }
    }
    this.pingPu(this.moduleconfigList)
    console.log(this.valueContent)
    this.moduleconfigList.forEach(module=>{
      // module.id==
      let moduleContent=[];
      this.valueContent.forEach(value=>{
        // console.log(value.id.slice(0,2))
        if(module.id==value.id.slice(0,2)){
          moduleContent.push(value)
        }
      })
      if(module.id){
        this.shopInfo.shopContent.push({
          id:module.id,
          content:moduleContent
        })
      }
    })
    console.log(this.shopInfo)
    this.http.saveModule(this.shopInfo).then(data=>{
      console.log(data)
    })
  }
  returnLajiBackend(module) {
    let content = [];
    if (!module.children) {
      // return {
      //   id:module.id,
      //   type:module.type,
      //   value:module.value,
      //   docType:""
      // }
    } else {

    }

  }
  pingPu(children) {
    children.forEach((module) => {
      if(module.id){
        if (!module['children']) {
          // console.log(module)
          this.valueContent.push({
            id:module.id,
            value:module.value,
            docType:"",
            type:module.type
          })
        } else {
          this.pingPu(module.children)
        }
      }
    })
  }
}
