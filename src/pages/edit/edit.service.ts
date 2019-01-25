import { ModuleConfigService } from '../../config/moduleConfigService';
import { wyHttpService } from '../../config/http.service'
import { Injectable } from '@angular/core';
import { deepClone } from '../../config/utils'

@Injectable()
export class EditService {
  editModuleList: any;
  editValueModel = [];
  hardWareList = [];
  hardwareData = null;
  constructor(private moduleConfigService: ModuleConfigService,
    private http: wyHttpService) {
    // this.editModuleList=JSON.parse(JSON.parse(this.moduleConfigService.modelJson))
  }
  async getEditModuleList(shopCode) {
    this.editModuleList = deepClone(this.moduleConfigService.modelJson)
    if (this.moduleConfigService.hardWareList.length == 0) {
      await this.moduleConfigService.getHardWareList().then(() => {
        this.hardWareList = this.moduleConfigService.hardWareList;
      })
    } else {
      this.hardWareList = this.moduleConfigService.hardWareList;
    }
    await this.http.getShopInfo(shopCode).then(data => {
      console.log(data)
      if (data['data'] && data['code'] == 200) {
        this.editValueModel = data['data']['shopData']
        this.hardwareData = data['data']['hardwareData']
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
        if (element.id == '0801') {
          element.children = [];
          console.log('0801', element)
          console.log('0801', this.hardwareData)
          this.hardwareData.content.forEach(data => {
            this.hardWareList.forEach(hard => {
              if (data.id == hard.id) {
                let obj = Object.assign({}, hard, {
                  value: data.value,
                  finish: data.value.length > 0 ? true : false,
                  id: data.id,
                  subId:data.subId,
                  cId:data.id+data.subId
                })
                element.children.push(obj)
              }
            })
          })
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
  isFinish(list) {
    // for(let i=0;i<list.length;i++){
    //   if(list[i].children){

    //   }else{
    //     if(list[i].value&&list[i].value.length>0){
    //       list[i].finish=true;
    //     }
    //   }
    // }
    list.forEach(module => {
      if (module.id != '08' && module.id != '0801') {
        if (module.children) {
          module.finish = true;
          module.children.forEach(child => {
            if (!child.finish) {
              module.finish = false;
            }
          })
          this.isFinish(module.children)
        } else {
          if (module.value && module.value.length > 0) {
            module.finish = true;
          }
        }
      } else {
        if (module.id == '08') {
          if (!module.children[0].children || module.children[0].children.length == 0) {
            module.finish = false;
            module.children[0].finish = false;
          } else {
            module.finish = true;
            module.children[0].finish = true;
            module.children[0].children.forEach(child => {
              if (!child.value || child.value.length == 0) {
                module.finish = false;
                module.children[0].finish = false;
              }
            })
          }
        }
      }

      // if(module.children){

      // }else{
      //   if(module.value.length>0){
      //     module.finish=true;
      //   }
      // }
    })
  }
  // islastChildFinish(list,listChildren){
  //   let temobj={
  //     finish:true
  //   }
  //   if(module.children){
  //     module.finish=true;
  //     module.children.forEach(child=>{
  //       if(!child.finish){
  //         module.finish=false;
  //       }
  //     })
  //     this.isFinish(module.children)
  //   }else{
  //     if(module.value&&module.value.length>0){
  //       module.finish=true;
  //     }
  //   }
  //   for(let i=0;i<list.length;i++){
  //     if(list[i].children){
  //       this.islastChildFinish(list,list['children'])
  //     }else{
  //       list
  //     }
  //   }

  // }
}