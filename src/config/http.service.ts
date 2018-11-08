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
            return Promise.resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    }
    //上传模块报告
    saveModule(data){
        let url=baseUrl+`/openshopreport/shop/addShop`
        return this.http.post(url,resetParams(data),httpOptions).toPromise().then(data=>{
        //    return this.http.post(url,data).toPromise().then(data=>{
            // console.log(data)
            return Promise.resolve(data)
        }).catch(error=>{
            console.log(error)
        })
            
    }
}
