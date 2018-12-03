import { ModuleConfigService } from '../../config/moduleConfigService';
import { wyHttpService } from '../../config/http.service'
import { Injectable } from '@angular/core';
@Injectable()
export class EditSubService{
  editModuleList=[];
  constructor(private moduleConfigService:ModuleConfigService,
  private http:wyHttpService){

  }
  getEditModuleList(shopCode){
    this.editModuleList=(this.moduleConfigService.modelJson).slice(0)
    this.http.getShopInfo(shopCode).then(data => {
      console.log(data)
    }).catch(err => {
      console.log('error')
    })
  }
}