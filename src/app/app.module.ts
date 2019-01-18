import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModuleConfigService } from '../config/moduleConfigService';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { EditPage } from '../pages/edit/edit';
import { EditSubPage } from '../pages/editsub/editsub';
import { SettingPage } from '../pages/setting/setting';
import { DemoPage } from '../pages/demos/demo';
import { TabsTextPage } from '../pages/tabs/tabs';
import { HttpClientModule }    from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../config/user.service'
import { wyHttpService } from '../config/http.service'
import { Menu } from 'ionic-angular/components/menu/menu';
import { SelectValuePipe } from '../config/selectValue.pipe'
import { HardwarePage } from '../conponents/hardwarePage'
import { Searchbar } from 'ionic-angular/components/searchbar/searchbar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

// import { Util } from '../config/utils'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage,
    MenuPage,
    SelectValuePipe,
    HardwarePage,
    EditPage,
    EditSubPage,
    SearchPage,
    DemoPage 
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true' // ionic2隐藏全部子页面tabs
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsTextPage,
    SettingPage,
    MenuPage,
    HardwarePage,
    EditPage,
    EditSubPage,    
    SearchPage,
    DemoPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    UserService,
    ModuleConfigService ,
    wyHttpService,
    FileTransfer,
    File,
    FileOpener,
    // Util,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
