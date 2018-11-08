import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModuleConfigService } from '../config/moduleConfigService';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { SettingPage } from '../pages/setting/setting';
import { TabsTextPage } from '../pages/tabs/tabs';
import { HttpClientModule }    from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../config/user.service'
import { wyHttpService } from '../config/http.service'
import { Menu } from 'ionic-angular/components/menu/menu';
import { SelectValuePipe } from '../config/selectValue.pipe'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage,
    MenuPage,
    SelectValuePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    UserService,
    ModuleConfigService ,
    wyHttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
