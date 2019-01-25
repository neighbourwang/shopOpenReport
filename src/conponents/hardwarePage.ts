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
  }
  close(hardware) {
    console.log(hardware)
    hardware.value = [];
    if (this.hardwareModule.children) {
      let mapHardwareChildren = this.hardwareModule.children.filter(hard => hard.displayName == hardware.displayName)
      mapHardwareChildren.sort((a,b)=>a.subId-b.subId)
      console.log(mapHardwareChildren)
      //已有同类设备      
      if (mapHardwareChildren.length > 0) {
      //获取最大subid值
        let addId=mapHardwareChildren[mapHardwareChildren.length-1].subId;
        //subid加1
        addId++
        let obj = Object.assign({}, hardware,{subId:addId,cId:hardware.id+addId})
        this.hardwareModule.children.push(obj);
      } else {
      //没有同类设备
      let obj = Object.assign({}, hardware,{subId:0,cId:hardware.id+1})
      this.hardwareModule.children.push(obj)
      }
    } else {
      let obj = Object.assign({}, hardware,{subId:0,cId:hardware.id+1})
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