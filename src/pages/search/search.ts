import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../config/user.service'
import { ModuleConfigService } from '../../config/moduleConfigService';
import { elementAt } from 'rxjs/operator/elementAt';
import { MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { wyHttpService } from '../../config/http.service'
import { PopoverController } from 'ionic-angular';
import { HardwarePage } from '../../conponents/hardwarePage'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { LoadingController } from 'ionic-angular';
// import { SelectValuePipe } from '../../config/selectValue.pipe'
@Component({
  templateUrl: 'search.html'
})
export class SearchPage {
  shouldShowCancel = true;
  progress=0;
  loading=null;
  shopCode = ''
  constructor(public navCtrl: NavController, private moduleConfigService: ModuleConfigService, public menuCtrl: MenuController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl: AlertController,
    private http: wyHttpService, public popoverCtrl: PopoverController, private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController) {

  }
  ngOnInit() {

  }
  onInput(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // console.log(ev)
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })

    }
  }
  onCancel = (e) => {
    this.shopCode='';
    // console.log(e)
    // console.log(this.shopCode)
    // if (!this.shopCode || this.shopCode.trim() == '') {
    //   const alert = this.alertCtrl.create({
    //     title: '提示',
    //     subTitle: '请输入新店代码',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // } else {
    //   this.http.generateReport().then(data => {
    //     console.log(data)
    //   }).catch(error => {
    //     const alert = this.alertCtrl.create({
    //       title: '提示',
    //       subTitle: error,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
    // }
  }
  inputBlur() {
    console.log(this.shopCode)
    // if (!this.shopCode || this.shopCode.trim() == '') {
    //   const alert = this.alertCtrl.create({
    //     title: '提示',
    //     subTitle: '请输入新店代码',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // } else {
    //   this.http.generateReport().then(data => {
    //     console.log(data)
    //   }).catch(error => {
    //     const alert = this.alertCtrl.create({
    //       title: '提示',
    //       subTitle: error,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
    // }
  }
  // loading(){
  //   let loading = this.loadingCtrl.create({
  //     content: `${content}`,
  //       duration: 5000
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Dismissed loading');
  //   });
  
  //   loading.present();
  // }
  download(url) {
    console.log('gg')
    if(!url){
      return
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    // const url = 'http://137.135.112.26:8080/report/3145.docx';
    fileTransfer.download(url, this.file.dataDirectory + `${this.shopCode}.docx`).then((entry) => {
      console.log('download ' + entry);
      console.log('download complete: ' + entry.toURL());
      // entry.nativeURL 是上面那个插件文件下载后的保存路径
      this.fileOpener.open(entry.nativeURL,this.getFileMimeType('docx'))
        .then(() => {
          console.log('打开成功');
        })
        .catch(() => {
          console.log('打开失败');
        });
    }, (error) => {
      // handle error
    });
    this.loading=this.loadingCtrl.create({
        content: `Downloading`,
        duration: 60000
    });
    this.loading.present()
    fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        // 下载过程会一直打印，完成的时候会显示 1
        console.log(progressEvent.loaded / progressEvent.total);
        this.progress=progressEvent.loaded / progressEvent.total;
        // this.loading(progressEvent.loaded / progressEvent.total)
        if(progressEvent.loaded / progressEvent.total==1){
          this.loading.dismiss();
        }
      } else {
    
      }
    });
  }
  // 进度


  getFileMimeType(fileType: string): string {
    let mimeType: string = '';
  
    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }
  keyUp(e){
    // console.log(e)
    if(e.keyCode==13){
      console.log(this.shopCode)
      e.preventDefault();//禁止键盘默认事件
      if (!this.shopCode || this.shopCode.trim() == '') {
        const alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '请输入新店代码',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.http.generateReport(this.shopCode).then(data => {
          console.log(data)
          if(data['code']==200&&data['reportURL']){
            this.download(data['reportURL'])
          }else{
            const alert = this.alertCtrl.create({
              title: '提示',
              subTitle: data['message'],
              buttons: ['OK']
            });
            alert.present();
          }
        }).catch(error => {
          const alert = this.alertCtrl.create({
            title: '提示',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        })
      }
    }
  }
}
