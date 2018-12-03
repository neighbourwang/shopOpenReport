import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams} from 'ionic-angular';
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
  constructor(public viewCtrl: ViewController,private moduleConfigService: ModuleConfigService,public navParams:NavParams) {

  }

  hardwareModule;null;
  hardwareModuleList=[];
  ionViewDidEnter(){
    this.hardwareModuleList=(this.moduleConfigService.hardWareList).slice(0);
    console.log(this.navParams)
    console.log('hard',this.hardwareModuleList)
    
    this.hardwareModule=this.navParams.data['hardware']
    if(this.hardwareModule.children){
      for(var i=0;i<this.hardwareModuleList.length;i++){
        this.hardwareModule.children.forEach(child=>{
          if(this.hardwareModuleList[i]&&(child.id==this.hardwareModuleList[i].id)){
            console.log(this.hardwareModuleList[i])
            this.hardwareModuleList.splice(i,1)
            i--;
          }
        })
      }
    }
    
  }
  close(hardware) {
    console.log(hardware)
    console.log(this.hardwareModule)
    
    this.hardwareModuleList.forEach((hard,index)=>{
      if(hardware.id==hard.id){
        this.hardwareModuleList.splice(index,1)
      }
    })
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