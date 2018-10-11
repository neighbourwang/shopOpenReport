import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../config/user.service'
import { ModuleConfigService } from '../../config/moduleConfigService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  moduleconfigList=[];
  subModulelist=[];
  constructor(public navCtrl: NavController,private moduleConfigService:ModuleConfigService
    ) {

  }
  ngOnInit() {
    this.moduleconfigList=this.moduleConfigService.getModuleConfig();
    console.log(this.moduleconfigList)
    this.tabClick(this.moduleconfigList[0])
  }

  tabClick(module){
    console.log(module)
    if(module.isActive) return;
    this.moduleconfigList.forEach(module=>module.isActive=false)
    module.isActive=true;
    if(module.children)this.subModulelist=module.children;
  }
}
