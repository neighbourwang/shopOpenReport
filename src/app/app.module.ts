import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModuleConfigService } from '../config/moduleConfigService';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { TabsTextPage } from '../pages/tabs/tabs';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../config/user.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    UserService,
    ModuleConfigService ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
