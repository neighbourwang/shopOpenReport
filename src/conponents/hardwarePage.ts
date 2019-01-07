import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ModuleConfigService } from '../config/moduleConfigService';

@Component({
  template: `
    <ion-list>
      <ion-list-header>添加硬件列表</ion-list-header>
      <button ion-item *ngFor="let hardware of this.hardwareModuleList" (click)="close(hardware)">{{hardware.displayName}}</button>
    </ion-list>
  `
})
export class HardwarePage {
  constructor(public viewCtrl: ViewController, private moduleConfigService: ModuleConfigService, public navParams: NavParams) {

  }

  hardwareModule; null;
  hardwareModuleList = [];
  ionViewDidEnter() {
    this.hardwareModuleList = (this.moduleConfigService.hardWareList).slice(0);
    console.log(this.navParams)
    console.log('hard', this.hardwareModuleList)

    this.hardwareModule = this.navParams.data['hardware']
    // if(this.hardwareModule.children){
    //   for(var i=0;i<this.hardwareModuleList.length;i++){
    //     this.hardwareModule.children.forEach(child=>{
    //       if(this.hardwareModuleList[i]&&(child.id==this.hardwareModuleList[i].id)){
    //         console.log(this.hardwareModuleList[i])
    //         this.hardwareModuleList.splice(i,1)
    //         i--;
    //       }
    //     })
    //   }
    // }

  }
  close(hardware) {
    hardware.value = [];
    if (this.hardwareModule.children) {
      let obj = Object.assign({}, hardware)
      let mapHardwareChildren = this.hardwareModule.children.filter(hard => hard.displayName == hardware.displayName)
      console.log(mapHardwareChildren[mapHardwareChildren.length - 1])
      if (mapHardwareChildren.length > 0) {
        let id = '0' + (Number(mapHardwareChildren[mapHardwareChildren.length - 1].id.slice(0, mapHardwareChildren[mapHardwareChildren.length - 1].id.length)) + 1);
        obj.id = id
        console.log(obj)
        this.hardwareModule.children.push(obj);
      } else {
        let obj = Object.assign({}, hardware)
        let id = (hardware.id.slice(0, hardware.id.length))
        obj.id = id + '0' + 1
        this.hardwareModule.children.push(obj)
      }
    } else {
      let obj = Object.assign({}, hardware)
      let id = (hardware.id.slice(0, hardware.id.length))
      obj.id = id + '0' + 1
      this.hardwareModule.children = [];
      this.hardwareModule.children.push(obj)
    }
    this.navParams.data['moduleConfigList'].forEach(module=>{
      if(module.id=='08'){
        module.finish=false;
        module.children[0].finish=false;
      }
    })
    this.viewCtrl.dismiss();
    console.log(hardware)
    console.log(this.hardwareModule)
  }

}