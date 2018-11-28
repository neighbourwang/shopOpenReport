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
import { EditService } from './edit.service'
import { EditSubPage } from '../editsub/editsub';

// import { SelectValuePipe } from '../../config/selectValue.pipe'
@Component({
  templateUrl: 'edit.html',
  providers: [EditService]
})
export class EditPage {
  shouldShowCancel = true;
  shopCode = ''
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService, public menuCtrl: MenuController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl: AlertController,
    private http: wyHttpService, public popoverCtrl: PopoverController, private editservice: EditService) {

  }
  ngOnInit() {
    console.log(this.moduleConfigService.modelJson)
    if (!this.moduleConfigService.modelJson) {
      this.moduleConfigService.getInitConfig('kfc').then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error)
        alert('获取配置信息错误')
      });
    }
  }
  onInput(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })

    }
  }
  onCancel = (e) => {
    this.shopCode=''
    // console.log(e)
    // console.log(this.shopCode)
    // if (!this.shopCode || this.shopCode.trim() == '') {
    //   const alert = this.alertCtrl.create({
    //     title: '提示',
    //     subTitle: '请输入新店代码',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // }else{
    //   this.editservice.getEditModuleList(this.shopCode).then(data=>{
    //     console.log(this.editservice.editModuleList)
    //     this.navCtrl.push(EditSubPage,{editModuleList:this.editservice.editModuleList})
    //   }).catch(error=>{
    //     const alert = this.alertCtrl.create({
    //       title: '提示',
    //       subTitle: error,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
    // }
  }
  inputBlur() {
    console.log(this.shopCode)
    // if (!this.shopCode || this.shopCode.trim() == '') {
    //   const alert = this.alertCtrl.create({
    //     title: '提示',
    //     subTitle: '请输入新店代码',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // }else{
    //   this.editservice.getEditModuleList(this.shopCode).then(data=>{
    //     console.log(this.editservice.editModuleList)
    //     this.navCtrl.push(EditSubPage,{editModuleList:this.editservice.editModuleList})
    //   }).catch(error=>{
    //     const alert = this.alertCtrl.create({
    //       title: '提示',
    //       subTitle: error,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
    // }
  }
  keyUp(e) {
    // console.log(e)
    if (e.keyCode == 13) {
      console.log(this.shopCode)
      e.preventDefault();//禁止键盘默认事件
      if (!this.shopCode || this.shopCode.trim() == '') {
        const alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '请输入新店代码',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.editservice.getEditModuleList(this.shopCode).then(data => {
          console.log(this.editservice.editModuleList)
          this.navCtrl.push(EditSubPage, { editModuleList: this.editservice.editModuleList })
        }).catch(error => {
          const alert = this.alertCtrl.create({
            title: '提示',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        })
      }
    }
  }
}
