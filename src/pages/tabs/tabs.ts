import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';

@Component({
    template: `

    <ion-tabs>
      <ion-tab tabIcon="home" tabTitle="Home" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="leaf" tabTitle="Life" [root]="tab2"></ion-tab>
      <ion-tab tabIcon="flame" tabTitle="Fire" [root]="tab3"></ion-tab>
      <ion-tab tabIcon="magnet" tabTitle="Force" [root]="tab4"></ion-tab>
    </ion-tabs>`
})
export class TabsTextPage {
    tab1 = HomePage;
    tab2 = HomePage;
    tab3 = HomePage;
    tab4 = SettingPage;
    // tab2 = TabsTextContentPage;
    constructor() {
        
    }

}