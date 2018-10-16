import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../config/user.service'
import { ModuleConfigService } from '../../config/moduleConfigService';
import { elementAt } from 'rxjs/operator/elementAt';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  moduleconfigList = [];
  subModulelist = [];
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService,public menuCtrl: MenuController
  ) {

  }
  ngOnInit() {
    this.moduleconfigList = this.moduleConfigService.getModuleConfig();
    console.log(this.moduleconfigList)
    // this.tab1Click(this.moduleconfigList[0])
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
    if (!module.children) return;
    this.subModulelist = module.children;
    this.moduleConfigService.initNagtive(module.children);
  }
  openMenu() {
    console.log('open')
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
  toggleMenu(){

  }
}
