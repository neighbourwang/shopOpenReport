import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';
import { SearchPage } from '../search/search';
import { EditPage } from '../edit/edit';
@Component({
    template: `

    <ion-tabs>
      <ion-tab tabIcon="home" tabTitle="新建" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="build" tabTitle="更新" [root]="tab2"></ion-tab>
      <ion-tab tabIcon="flame" tabTitle="查看" [root]="tab3"></ion-tab>
      <ion-tab tabIcon="person-add" tabTitle="我" [root]="tab4"></ion-tab>
    </ion-tabs>`
})
export class TabsTextPage {
    tab1 = HomePage;
    tab2 = EditPage;
    tab3 = SearchPage;
    tab4 = SettingPage;
    // tab2 = TabsTextContentPage;
    constructor() {
        
    }

}