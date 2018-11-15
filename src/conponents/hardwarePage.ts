import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ModuleConfigService } from '../config/moduleConfigService';
import { NavController,NavParams} from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>添加硬件列表</ion-list-header>
      <button ion-item *ngFor="let hardware of moduleConfigService.hardWareList" (click)="close(hardware)">{{hardware.displayName}}</button>
    </ion-list>
  `
})
export class HardwarePage {
  constructor(public viewCtrl: ViewController,public navParams:NavParams,private moduleConfigService:ModuleConfigService) {
    console.log(this.navParams)
    this.hardwareModule=this.navParams.data['hardware']
  }
  hardwareModule;null;
  close(hardware) {
    console.log(hardware)
    hardware.value=[];
    if(this.hardwareModule.children){
      this.hardwareModule.children.push(hardware)
    }else{
      this.hardwareModule.children=[];
      this.hardwareModule.children.push(hardware)      
    }
    this.viewCtrl.dismiss();
  }
}