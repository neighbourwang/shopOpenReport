import { ModuleConfigService } from '../../config/moduleConfigService';
import { wyHttpService } from '../../config/http.service'
import { Injectable } from '@angular/core';
@Injectable()
export class EditService{
  editModuleList=[];
  editValueModel=[];
  constructor(private moduleConfigService:ModuleConfigService,
  private http:wyHttpService){
    // this.editModuleList=JSON.parse(JSON.parse(this.moduleConfigService.modelJson))
  }
  async getEditModuleList(shopCode){
    this.editModuleList=JSON.parse(JSON.stringify(this.moduleConfigService.modelJson))
    await this.http.getShopInfo(shopCode).then(data => {
      console.log(data)
      if(data['code']==200){
        this.editValueModel=data['data'];
        this.recursiveJson(this.editModuleList)
        console.log(this.editModuleList)
      }else{
        return Promise.reject(data['message'])      
      }
    })
    // return this.editModuleList
  }
  recursiveJson(list){
    list.forEach(element => {
      element.isActive=false;
      if(element.children){
        element.finish=true;
        element.children.forEach(child=>{
          if(!child.finish){
            element.finish=false
          }
        })
        this.recursiveJson(element.children)
      }else{
        this.editValueModel.forEach(module=>{
          if(module.content){
            module.content.forEach(value=>{
              if(value.id==element.id){
                element.value=value.value;
                if(value.value.length==0){
                  element.finish=false;
                }else{
                  element.finish=true;
                }
              }
            })
          }
        })
      }
    });
  }
}