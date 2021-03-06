import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
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
import { EditSubService } from './editsub.service'
import { updateDate } from 'ionic-angular/util/datetime-util';
// import { SelectValuePipe } from '../../config/selectValue.pipe'
@Component({
  templateUrl: 'editsub.html',
  providers:[EditSubService]
})
export class EditSubPage {
  moduleconfigList = [];
  subModulelist = [];
  endModule = null;
  activeModuleList = null;
  tabModule = {
    displayName: '更新新店信息'
  }
  brand = 'kfc';
  shopInfo = {
    shopName: null,
    shopBrand: 'KFC',
    shopCode: null,
    shopVersion: null,
    shopContent: []
  };
  valueContent = [];
  hardWareList = [];
  hardwareData=null
  constructor(public navCtrl: NavController,private navParams:NavParams,private moduleConfigService:ModuleConfigService, public menuCtrl: MenuController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public alertCtrl: AlertController,
    private http: wyHttpService,public popoverCtrl: PopoverController,editsubservice:EditSubService) {

  }
  ngOnInit() {
    console.log(this.navParams.data.editModuleList)
    //商店信息
    this.moduleconfigList = this.navParams.data.editModuleList;
    //商店硬件信息
    this.hardwareData = this.navParams.data.hardwareData;
    // this.tab1Click(this.moduleconfigList[0])
    this.endModule = this.moduleconfigList[0].children[0];
    this.activeModuleList = this.moduleconfigList;
    // // this.moduleConfigService.getModuleHtml();
    // // this.showRadio();
    this.getHardWareList();
  }

  tab1Click(module) {
    console.log(module)
    // if (module.isActive) return;
    // this.moduleconfigList.forEach(module => module.isActive = false)
    // module.isActive = true;
    this.tabModule = module;
    this.moduleconfigList.forEach(element => {
      if (module.id != element.id) {
        element.isActive = false
      } else {
        console.log(element)
        module.isActive = !module.isActive;
      }
    })
    if (module.children) this.subModulelist = module.children;
    this.activeModuleList = module.children;

    this.moduleConfigService.initNagtive(module.children, 'nagtive');
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
    if (!module.children||fatherModule.id=='0801'||module.id=='0801') {
      this.closeMenu();
      return
    };
    this.subModulelist = module.children;
    this.activeModuleList = module.children;

    this.moduleConfigService.initNagtive(module.children, 'nagtive');
  }
  cardClick(module) {
    if (!module.children) {
      console.log(module)
      this.subModulelist = [];
      this.endModule = module;
    } else {
      this.subModulelist.forEach(sub => {
        if (sub.id != module.id) {
          sub.isActive = false
        } else {
          module.isActive = true;
        }
      })
      this.subModulelist = module.children;
    }
  }
  itemModule(module) {
    if (module.children) {
      this.activeModuleList = module.children;
    } else {
      console.log(module)
      // this.endModule=module;
    }
  }
  openMenu() {
    console.log('open')
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
  fileCountCheck(module){
    let count=this.moduleconfigList[11]['pictureCount'].filter(count=>count.id==module.id)[0]
    console.log(count)
    if(module.value.length==count.count){
      const alert = this.alertCtrl.create({
        // title: '提示',
        subTitle: `最多上传${count.count}张图片，是否覆盖图片`,
        buttons: [
          {
            text: '确认',
            handler: data => {
              this.fileAction(module,count.count)
            }
          },
          {
            text: '取消',
            handler: data => {
            }
          }
        ]
      });
      alert.present();
    }else{
      this.fileAction(module,count)      
    }
  }
  fileAction(module,count) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture(module, 1)
          }
        }, {
          text: '从相册选取',
          handler: () => {
            console.log('Archive clicked');
            this.takePicture(module, 0)
          }
        },
        {
          text: '无此设备',
          role: '无此设备',
          handler: () => {
            console.log('无此设备',count);
            if(module.value.length<count.count){
              module.value.push('无此设备')
            }else{
              module.value[count.count-1]='无此设备'
            }
          }
        },
         {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  takePicture(module, type) {
    let _self=this;
    let count=this.moduleconfigList[11]['pictureCount'].filter(count=>count.id==module.id)[0]
    const options = {
      quality: 10,
      sourceType: type,
      allowEdit:true,
      destinationType: 0,
      encodingType: 0,
      saveToPhotoAlbum: true,
      // mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      // console.log('ok', base64Image)
      // console.log(base64Image.slice(11))
      if(module.value.length<count.count){
        module.value.push(base64Image)
      }else{
        module.value[count.count-1]=base64Image
      }
      _self.valueChange(module)
    }, (err) => {
      // Handle error
      console.log(err)
    });
  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('选取品牌');

    alert.addInput({
      type: 'radio',
      label: 'KFC',
      value: 'kfc',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '必胜客',
      value: 'bishengke',
      checked: false
    });
    // alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        // this.testRadioOpen = false;
        // this.testRadioResult = data;
        console.log(data)
        if (data != this.brand) {
          this.brandChange(data);
        }
      }
    });
    alert.present();
  }
  brandChange(brand) {
    console.log(brand)
  }
  openModal() {
    let _self = this;
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '提交',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            _self.updateModule();
          }
        }, {
          text: '返回',
          handler: () => {
            console.log('Archive clicked');
            _self.moduleConfigService.initNagtive(this.moduleconfigList,'init')
            _self.navCtrl.pop();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  getSelectValue(id) {
    let length = this.moduleconfigList.length;
    // console.log(this.moduleconfigList)
    // console.log(this.moduleconfigList[length-1]['selectedValue'].filter(element => element.id==id)[0]['list'])
    let valueList = this.moduleconfigList[length - 1]['selectedValue'].filter(element => element.id == id)[0]['list'];
    return valueList ? valueList : [];
  }
  async updateModule() {
    let _self=this;
    console.log(this.moduleconfigList)
    this.moduleconfigList.forEach(module => {
      //新店代码
      if(module.id=='01'){
        module.children.forEach(child => {
          if (child.id=='0103') {
            this.shopInfo.shopCode = child.value[0]
          } 
        })
      }
     
    })
   
    if(!this.shopInfo.shopCode){
      alert('请输入新店代码')
      return;
    }
    this.pingPu(this.moduleconfigList)
    console.log(this.valueContent)
    this.moduleconfigList.forEach(module => {
      // module.id==
      let moduleContent = [];
      this.valueContent.forEach(value => {
        // console.log(value.id.slice(0,2))
        if (module.id == value.id.slice(0, 2)) {
          moduleContent.push(value)
        }
      })
      if (module.id) {
        this.shopInfo.shopContent.push({
          id: module.id,
          content: moduleContent
        })
      }
    })
    console.log(this.shopInfo)
    // this.updateHardware()
    await this.http.updateModule(this.shopInfo)
    await this.updateHardware().then(data => {
      console.log(data)
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '保存成功',
        buttons: [
          {
            text: 'Save',
            handler: data => {
              // console.log('Saved clicked');
            // _self.moduleConfigService.initNagtive(this.moduleconfigList,'init')
            // _self.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }).catch(err=>{
      const alert = this.alertCtrl.create({
        // title: '提示',
        subTitle: '保存失败',
        buttons: [
          {
            text: '确认',
            handler: data => {
             
            }
          }
        ]
      });
      alert.present();
    })
  }
  pingPu(children) {
    children.forEach((module) => {
      if (module.id&&module.id!='08') {
        if (!module['children']) {
          // console.log(module)
          this.valueContent.push({
            id: module.id,
            value: module.value,
            docType: "",
            type: module.type
          })
        } else {
          this.pingPu(module.children)
        }
      }
    })
  }
  addhardware(e,module) {
    console.log(module)
    // this.hardwareList=
    let popover = this.popoverCtrl.create(HardwarePage,{'hardware':module,'moduleConfigList':this.moduleconfigList});
    popover.present({
      ev: e
    });
  }
  getHardWareList() {
    if(this.moduleConfigService.hardWareList.length==0){
      this.moduleConfigService.getHardWareList().then(()=>{
        this.hardWareList=this.moduleConfigService.hardWareList;
      })
    }else{
      this.hardWareList=this.moduleConfigService.hardWareList;      
    }
  }
  //更新硬件列表
  async updateHardware(){
    console.log(this.hardwareData)
    console.log(this.moduleconfigList)
    let updatehardware={
      id:'0801',
      content:[]
    }
    this.moduleconfigList.forEach(module=>{
      if(module.id=='08'){
        module.children[0].children.forEach(hard=>{
          let mapCid=this.hardwareData.content.map(d=>d.id+d.subId)
          console.log(mapCid)
          //添加
          if(mapCid.indexOf(hard.cId)<0){
            updatehardware.content.push(Object.assign({},{
              id:hard.id,
              subId:'a'+hard.subId,
              value:hard.value
            }))
          }else{
          //更新            
            updatehardware.content.push(Object.assign({},{
              id:hard.id,
              subId:hard.subId,
              value:hard.value
            }))
          }
        })
        //移除硬件
        // this.hardwareData.content.forEach(data=>{
        //   let cIdmap=module.children[0].children.map(m=>m.cId)
        //   if(cIdmap.indexOf(data.id+data.cId)<0){
        //     updatehardware.content.push(Object.assign({},{
        //       id:data.id,
        //       subId:'r'+data.subId,
        //       value:[]
        //     }))
        //   }
        // })
      }
    })
    console.log(updatehardware)
    return this.http.updatahardware({
      shopcode:this.shopInfo.shopCode,
      content:updatehardware
    })
  }
  valueChange(v){
    console.log(v)
    if(v.value.length>0&&v.value[0]){
      v.finish=true;
    }else{
      v.finish=false;
    }
    this.valueCheck(this.moduleconfigList)
  }
  valueCheck(v){
    v.forEach(module=>{
      if(module.children){
        this.valueCheck(module.children)
        module.finish=true;
        module.children.forEach(child=>{
          if(!child.finish){
            module.finish=false;
          }
        })
        this.valueCheck(module.children)
      }else{

      }
    })
  }
  selectValueChange(m){
    console.log('mm',m)
    if(!m.children){
      m.children=[];
      m.finish=false;
      return;
    }
    if(m.children.length==0){
      m.finish=false;
      return;
    }
    for(let i=0;i<m.children.length;i++){
      if(m.children[i].value.length>0){
        m.children[i].finish=true;
      }
    }
    m.finish=true;    
    for(let i=0;i<m.children.length;i++){
      if(!m.children[i].finish){
        m.finish=false;
      }
    }
    this.moduleconfigList.forEach(module=>{
      if(module.id=='08'){
        module.finish=m.finish;        
      }
    })
  }
  //递归判定是 for完成
}
