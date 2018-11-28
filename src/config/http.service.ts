import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
// import { window } from 'rxjs/operator/window';
// if (process.env.IONIC_ENV === 'prod') { 
//     console.log('we got a production buildp'); 
// } else { 
//     console.log('we got a development build'); 
// }
// let baseUrl="http://127.0.0.1:8082"
let baseUrl="http://137.135.112.26:8080"
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // 'Accept': 'text/plain'
        // 'Content-Type': 'multipart/form-data;charset=UTF-8',
        // 'Content-Type': 'application/json'
    })
}
const resetParams = function (obj) {
    if (typeof (obj) != "object") {
        return {}
    }
    let newParamString = []
    for (let i in obj) {
        if(typeof(obj[i])=="object"){
            newParamString.push(i + "=" + JSON.stringify(obj[i]))
        }else{
         newParamString.push(i + "=" + obj[i])   
        }
    }
    return newParamString.join('&')
}
@Injectable()
export class wyHttpService {
    constructor(private http: HttpClient) {

    }
    //获取品牌配置文件
    getModuleConfig(brand){
        let data={
            name:brand
        }
    console.log(resetParams(data))
        
        // let p = new URLSearchParams();
        // p.append('name','kfc');
        let url=baseUrl+`/openshopreport/brand/getJson`
        return this.http.post(url,resetParams(data),httpOptions).toPromise().then(data=>{
        // return this.http.post(url,data).toPromise().then(data=>{
            // console.log(data)
            if(data&&data['code']==200){
                return Promise.resolve(data)  
            }else{
                return Promise.reject(data['message'])
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    //上传模块报告信息
    saveModule(data){
        let url=baseUrl+`/openshopreport/shop/addShop`
        return this.http.post(url,resetParams(data),httpOptions).toPromise().then(data=>{
        //    return this.http.post(url,data).toPromise().then(data=>{
            // console.log(data)
            if(data&&data['code']==200){
                return Promise.resolve(data)  
            }else{
                return Promise.reject(data['message'])
            }
        }).catch(error=>{
            console.log(error)
            return Promise.reject(data['message'])            
        })
            
    }
    //获取添加硬件列表
    getHardwareList(){
        let url=baseUrl+`/openshopreport/hardware/getConfig`
        return this.http.get(url).toPromise().then(data=>{
            console.log(data)
            return Promise.resolve(data)
        }).catch(error=>{
            console.log(error)
        }) 
    }
    //获取开店信息
    getShopInfo(code){
        let data={
            shopcode:code
        }
        let url=baseUrl+`/openshopreport/shop/getShop`        
        return this.http.post(url,resetParams(data),httpOptions).toPromise().then(data=>{
            console.log(data)
            return Promise.resolve(data)
        }).catch(error=>{
            console.log(error)
        }) 
    }
    //更新开店信息
    updateModule(data){
        let url=baseUrl+`/openshopreport/shop/updateShop`
        return this.http.post(url,resetParams(data),httpOptions).toPromise().then(data=>{
        //    return this.http.post(url,data).toPromise().then(data=>{
            // console.log(data)
            if(data&&data['code']==200){
                return Promise.resolve(data)  
            }else{
                return Promise.reject(data['message'])
            }
        }).catch(error=>{
            console.log(error)
            return Promise.reject(data['message'])            
        })
    }
    //生产报告
    generateReport(shopCode){
        // let data={"shopName":"kfc", "shopCode":"GZH524"}
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json'
        //     })
        // }
        let url=`http://137.135.112.26:9092/createreport/?shopCode=${shopCode}`
        return this.http.get(url).toPromise().then(data=>{
            console.log(data)
            return Promise.resolve(data)                        
            }).catch(error=>{
                console.log(error)
                return Promise.reject(error)            
            })
    }
}
