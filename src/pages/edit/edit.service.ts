import { ModuleConfigService } from '../../config/moduleConfigService';
import { wyHttpService } from '../../config/http.service'
import { Injectable } from '@angular/core';
@Injectable()
export class EditService {
  editModuleList = [];
  editValueModel = [];
  hardWareList=[];
  constructor(private moduleConfigService: ModuleConfigService,
    private http: wyHttpService) {
    // this.editModuleList=JSON.parse(JSON.parse(this.moduleConfigService.modelJson))
  }
  async getEditModuleList(shopCode) {
    this.editModuleList = (this.moduleConfigService.modelJson).slice(0)
    if(this.moduleConfigService.hardWareList.length==0){
      await this.moduleConfigService.getHardWareList().then(()=>{
        this.hardWareList=this.moduleConfigService.hardWareList;
      })
    }else{
      this.hardWareList=this.moduleConfigService.hardWareList;      
    }
    await this.http.getShopInfo(shopCode).then(data => {
      console.log(data)
      if (data['code'] == 200) {
        this.editValueModel = data['data'];
        this.recursiveJson(this.editModuleList)
        this.isFinish(this.editModuleList)
        console.log(this.editModuleList)
      } else {
        return Promise.reject(data['message'])
      }
    })
    // return this.editModuleList
  }
  recursiveJson(list) {
    list.forEach(element => {
      element.isActive = false;
      if (!element.children) {
        this.editValueModel.forEach(module => {
          if (module.content) {
            module.content.forEach(value => {
              if (value.id == element.id) {
                if (!value.value) {
                  console.log(module)
                  value.value = []
                }
                element.value = value.value;
                if (value.value.length == 0) {
                  element.finish = false;
                } else {
                  element.finish = true;
                }
              }
            })
          }
        })
        //0801硬件列表
        if(element.id=='0801'){
          element.children=[];
          this.editValueModel.forEach(value=>{
            if(value.id=='08'){
              value.content.forEach(cc=>{
                this.hardWareList.forEach(hard=>{
                  if(cc.id==hard.id){
                    hard.value=cc.value;
                    // element.children
                    element.children.push(hard)
                    console.log(cc)
                    console.log(hard)
                  }
                })
              })
            }
          })
          console.log('0801',element)
          console.log('0801',this.editModuleList)
          console.log('0801',this.editValueModel)
        }
      } else {
        // element.finish = true;
        // element.children.forEach(child => {
        //   if (!child.finish) {
        //     element.finish = false
        //   }
        // })
        this.recursiveJson(element.children)
      }
    });
  }
  isFinish(list){
    list.forEach(module=>{
      if(module.children){
        module.finish=true;
        module.children.forEach(child=>{
          if(!child.finish){
            module.finish=false;
          }
        })
        this.isFinish(module.children)
      }else{
        if(module.value&&module.value.length>0){
          module.finish=true;
        }
      }
    })
  }
}