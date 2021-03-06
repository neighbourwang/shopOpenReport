import { wyHttpService } from './http.service'
import { Injectable } from '@angular/core'
import { deepClone } from './utils'
@Injectable()
export class ModuleConfigService {
    // module
    moduleConfiglistModel = [
        {
            "id": "01",
            "name": "title",
            "displayName": "标题",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0101",
                    "name": "customer",
                    "displayName": "客户",
                    "display": true,
                    "type": "select"
                },
                {
                    "id": "0102",
                    "name": "market",
                    "displayName": "市场",
                    "display": true,
                    "type": "select"
                },
                {
                    "id": "0103",
                    "name": "code",
                    "displayName": "新店代码",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0104",
                    "name": "date",
                    "displayName": "日期",
                    "display": true,
                    "type": "date"
                },
                {
                    "id": "0105",
                    "name": "report",
                    "displayName": "新店报告",
                    "display": true,
                    "type": "select"
                }
            ]
        },
        {
            "id": "02",
            "name": "version NO",
            "displayName": "版本号",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0201",
                    "name": "version NO",
                    "displayName": "版本号",
                    "display": true,
                    "type": "text"
                }
            ]
        },
        {
            "id": "03",
            "name": "introduction",
            "displayName": "引言",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0301",
                    "name": "introduction",
                    "displayName": "引言",
                    "display": true,
                    "type": "text"
                }
            ]
        },
        {
            "id": "04",
            "name": "basic information",
            "displayName": "新店基础信息表",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0401",
                    "name": "restaurant NO",
                    "displayName": "餐厅编号",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0402",
                    "name": "restaurant name",
                    "displayName": "餐厅名称",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0403",
                    "name": "restaurant phone",
                    "displayName": "餐厅电话",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0404",
                    "name": "brand",
                    "displayName": "品牌",
                    "display": true,
                    "type": "select"
                },
                {
                    "id": "0405",
                    "name": "open date",
                    "displayName": "开业日期",
                    "display": true,
                    "type": "date"
                },
                {
                    "id": "0406",
                    "name": "IT engineer",
                    "displayName": "IT调试工程师品牌",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0407",
                    "name": "POS",
                    "displayName": "POS数量",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0408",
                    "name": "ticket number",
                    "displayName": "票打数量",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0409",
                    "name": "camera number",
                    "displayName": "摄像头数量",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0410",
                    "name": "broadband number",
                    "displayName": "宽带线路数",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0411",
                    "name": "KDS number",
                    "displayName": "KDS数量",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0412",
                    "name": "AP NC",
                    "displayName": "无线AP、移动NC",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0413",
                    "name": "NC number",
                    "displayName": "NC数量",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0414",
                    "name": "DMB TV",
                    "displayName": "DMB TV数",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0415",
                    "name": "DMB NC",
                    "displayName": "DMB NC",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0416",
                    "name": "restaurant address",
                    "displayName": "餐厅地址",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0417",
                    "name": "broadband account",
                    "displayName": "宽带账号(Mail)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0418",
                    "name": "broadband password",
                    "displayName": "宽带密码(Mail)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0419",
                    "name": "wifi account",
                    "displayName": "宽带账号(Wi-Fi)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0420",
                    "name": "wifi password",
                    "displayName": "宽带密码(Wi-Fi)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0421",
                    "name": "DMB account",
                    "displayName": "宽带账号(DMB)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0422",
                    "name": "DMB password",
                    "displayName": "宽带密码(DMB)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0423",
                    "name": "delivery account",
                    "displayName": "宽带账号(外送)",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0424",
                    "name": "delivery password",
                    "displayName": "宽带密码(外送)",
                    "display": true,
                    "type": "text"
                }
            ]
        },
        {
            "id": "05",
            "name": "effective install time",
            "displayName": "有效安装时间统计表（小时）",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0501",
                    "name": "restaurant",
                    "displayName": "餐厅",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0502",
                    "name": "total time",
                    "displayName": "总时间",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0503",
                    "name": "CCTV",
                    "displayName": "CCTV",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0504",
                    "name": "POS",
                    "displayName": "POS",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0505",
                    "name": "POS printer",
                    "displayName": "POS打印机",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0506",
                    "name": "PC/Server",
                    "displayName": "PC/Server",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0507",
                    "name": "NC",
                    "displayName": "NC",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0508",
                    "name": "Soft",
                    "displayName": "Soft",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0509",
                    "name": "UPS",
                    "displayName": "UPS",
                    "display": true,
                    "type": "text"
                },
                {
                    "id": "0510",
                    "name": "Other",
                    "displayName": "Other",
                    "display": true,
                    "type": "text"
                }
            ]
        },
        {
            "id": "06",
            "name": "accept bill",
            "displayName": "验收单据（安装单据，Standby单据）",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0601",
                    "name": "install bill",
                    "displayName": "安装单据",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "0602",
                    "name": "standby bill",
                    "displayName": "Standby单据",
                    "display": true,
                    "type": "file"
                }
            ]
        },
        {
            "id": "07",
            "name": "vender",
            "displayName": "交接表（Vendor、营建、营运）",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0701",
                    "name": "vender",
                    "displayName": "交接表（Vendor、营建、营运）",
                    "display": true,
                    "type": "file"
                }
            ]
        },
        {
            "id": "08",
            "name": "hardware",
            "displayName": "硬件资产收集",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0801",
                    "name": "hardware",
                    "displayName": "硬件资产收集",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "0802",
                    "name": "checkList",
                    "displayName": "checkList",
                    "display": true,
                    "type": "file"
                }
            ]
        },
        {
            "id": "09",
            "name": "shop photos",
            "displayName": "新店现场照片",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "0901",
                    "name": "layout",
                    "displayName": "A区 经理室机柜走线及布局",
                    "display": true,
                    "type": "text",
                    "children": [
                        {
                            "id": "090101",
                            "name": "before install",
                            "displayName": "机柜安装前线路整理、捆扎照片",
                            "display": true,
                            "type": "text"
                        },
                        {
                            "id": "090102",
                            "name": "cable",
                            "displayName": "机柜进出线",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090103",
                            "name": "before install",
                            "displayName": "机柜安装前线路整理、捆扎照片",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090104",
                            "name": "open shop photo",
                            "displayName": "机柜设备安装后开门照",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090105",
                            "name": "firewall close up",
                            "displayName": "交换机、防火墙、宽带猫特写",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090106",
                            "name": "CCTV close up",
                            "displayName": "CCTV主机特写照",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090107",
                            "name": "close shop photo",
                            "displayName": "机柜关门照",
                            "display": true,
                            "type": "file"
                        }
                    ]
                },
                {
                    "id": "0902",
                    "name": "manager offcie",
                    "displayName": "B区 经理室",
                    "display": true,
                    "type": "text",
                    "children": [
                        {
                            "id": "090201",
                            "name": "NC photo",
                            "displayName": "NC侧面照",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090202",
                            "name": "behind printer",
                            "displayName": "后台打印机",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090203",
                            "name": "wireless AP",
                            "displayName": "无线AP",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090204",
                            "name": "mobile NC",
                            "displayName": "移动NC",
                            "display": true,
                            "type": "file"
                        },
                        {
                            "id": "090205",
                            "name": "clock photo",
                            "displayName": "卡钟整体照",
                            "display": true,
                            "type": "file"
                        }
                    ]
                },
                {
                    "id": "0903",
                    "name": "cashier system",
                    "displayName": "C区 收银出单系统",
                    "display": true,
                    "type": "text",
                    "children": [
                        {
                            "id": "090301",
                            "name": "POS",
                            "displayName": "POS",
                            "display": true,
                            "type": "text",
                            "children": [
                                {
                                    "id": "09030101",
                                    "name": "POS1",
                                    "displayName": "POS1",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030102",
                                    "name": "POS2",
                                    "displayName": "POS2",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030103",
                                    "name": "POS3",
                                    "displayName": "POS3",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030104",
                                    "name": "POS4",
                                    "displayName": "POS4",
                                    "display": true,
                                    "type": "file"
                                }
                            ]
                        },
                        {
                            "id": "090302",
                            "name": "intern printer",
                            "displayName": "内场打印机",
                            "display": true,
                            "type": "text",
                            "children": [
                                {
                                    "id": "09030201",
                                    "name": "KDS positive food",
                                    "displayName": "水吧打印机（1）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030202",
                                    "name": "KDS side food",
                                    "displayName": "小吃打印机（2）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030203",
                                    "name": "KDS positive hamburger",
                                    "displayName": "饼台打印机（3）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030204",
                                    "name": "KDS side hamburger",
                                    "displayName": "炒制打印机（4）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030205",
                                    "name": "KDS positive drink",
                                    "displayName": "烤制打印机（5）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030206",
                                    "name": "KDS side drink",
                                    "displayName": "岩烤打印机（6）",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "09030207",
                                    "name": "KDS side drink",
                                    "displayName": "沙拉打印机（7）",
                                    "display": true,
                                    "type": "file"
                                }
                            ]
                        },
                        {
                            "id": "0906",
                            "name": "CCTV monitor",
                            "displayName": "CCTV监控",
                            "display": true,
                            "type": "text",
                            "children": [
                                {
                                    "id": "090601",
                                    "name": "CCTV monitor frame",
                                    "displayName": "CCTV监控画面",
                                    "display": true,
                                    "type": "file"
                                }
                            ]
                        },
                        {
                            "id": "0907",
                            "name": "others",
                            "displayName": "其他",
                            "display": true,
                            "type": "text",
                            "children": [
                                {
                                    "id": "090701",
                                    "name": "SDCD",
                                    "displayName": "SDCD",
                                    "display": true,
                                    "type": "file"
                                },
                                {
                                    "id": "090702",
                                    "name": "UPS Posiive",
                                    "displayName": "UPS：UPS正面照",
                                    "display": true,
                                    "type": "file"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "10",
            "name": "functional acceptance",
            "displayName": "新店功能性验收",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "1001",
                    "name": "POS cashier printer",
                    "displayName": "每台POS的Ready打印单，收银机与打印机工作正常",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "1002",
                    "name": "sales report",
                    "displayName": "Compris数据清零后，打印Sales Report",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "1003",
                    "name": "report cashier",
                    "displayName": "POS交叉点餐纸带报表，对应位置正确出单，收银机、内外场打印机正常",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "1004",
                    "name": "print invoice test",
                    "displayName": "打印外送测发票",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "1005",
                    "name": "shop number address telephone",
                    "displayName": "餐条显示正确的门店编号、门店中文地址、门店电话",
                    "display": true,
                    "type": "file"
                }
            ]
        },
        {
            "id": "11",
            "name": "questions",
            "displayName": "新店安装过程问题汇总",
            "display": true,
            "type": "text",
            "children": [
                {
                    "id": "1101",
                    "name": "shop number",
                    "displayName": "门店代码",
                    "display": true,
                    "type": "file"
                },
                {
                    "id": "1102",
                    "name": "construction questions",
                    "displayName": "营建方面问题",
                    "display": true,
                    "type": "textarea"
                },
                {
                    "id": "1103",
                    "name": "shop questions",
                    "displayName": "门店方面问题",
                    "display": true,
                    "type": "textarea"
                },
                {
                    "id": "1104",
                    "name": "device questions",
                    "displayName": "设备方面问题",
                    "display": true,
                    "type": "textarea"
                },
                {
                    "id": "1105",
                    "name": "route questions",
                    "displayName": "线路方面问题",
                    "display": true,
                    "type": "textarea"
                },
                {
                    "id": "1106",
                    "name": "programmer questions",
                    "displayName": "工程师现场未完成/无法完成/等待时间超过2小时等事宜&建议 ",
                    "display": true,
                    "type": "textarea"
                }
            ]
        },
        {
            "selectedValue": [
                {
                    "id": "0101",
                    "list": []
                },
                {
                    "id": "0102",
                    "list": []
                },
                {
                    "id": "0105",
                    "list": []
                },
                {
                    "id": "0404",
                    "list": []
                }
            ],
            "longDesc": [
                {
                    "id": "090107",
                    "description": "机柜关门照 (关闭机柜门，锁好门，照片看到外部环境和线路走入情况"
                },
                {
                    "id": "090104",
                    "description": "机柜设备安装后开门照（要拍到每层设备放置位置及走线，请确保设备放置在对应的层）"
                },
                {
                    "id": "090601",
                    "description": "CCTV监控画面（Web访问截图）"
                },
                {
                    "id": "0907",
                    "description": "其他（SDCD、TVBOX、UPS）"
                },
                {
                    "id": "090702",
                    "description": "UPS：UPS正面照 (要拍到UPS主机、电池柜及前面板状态灯显示)"
                },
                {
                    "id": "1001",
                    "description": "每台POS的Ready打印单，收银机与打印机工作正常（适用于客户/客户/ED）"
                },
                {
                    "id": "1002",
                    "description": " Compris数据清零后，打印Sales Report【前日总结=0】(适用于客户/客户/ED)"
                },
                {
                    "id": "1003",
                    "description": "POS交叉点餐纸带报表，对应位置正确出单，收银机、内外场打印机正常（适用于客户）"
                },
                {
                    "id": "1004",
                    "description": "打印测试发票(适用于全品牌上发票打印系统的门店，不能使用正式发票)"
                },
                {
                    "id": "1102",
                    "description": "营建方面问题(如电源不是国标，CCTV飞线，没有UPS标识，无插座、模块等)(请具体描述)"
                },
                {
                    "id": "1103",
                    "description": "门店方面问题(请具体描述)"
                },
                {
                    "id": "1104",
                    "description": "设备方面问题（如设备DOA，或变形不影响使用，或未到齐等）(请具体描述)"
                },
                {
                    "id": "1105",
                    "description": "线路方面问题(如ADSL未开通)(请具体描述)"
                },
                {
                    "id": "1106",
                    "description": "工程师现场未完成/无法完成/等待时间超过2小时等事宜&建议 (请具体描述)"
                }
            ]
        }
    ]
    moduleConfiglist=[]
    modelJson:any;
    hardWareList=[];
    constructor(
        private http:wyHttpService
    ) {
        // this.moduleConfiglist.forEach(module=>{
        //     console.log(module.children)
        //     module.isActive=false;
        // })
        // this.pingPu(this.moduleConfiglistModel)
    }
    getInitConfig(brand){
        return this.http.getModuleConfig(brand).then((data:any)=>{
            console.log(data)
            if(data.code==200&&data.data){
                this.moduleConfiglist=data.data;
                this.modelJson=data.data
                console.log(this.modelJson)
                this.initNagtive(this.moduleConfiglist,'init');
                return Promise.resolve(deepClone(this.moduleConfiglist))
            }else{
                return Promise.reject('获取配置错误')                
            }
        })
    }
    getModuleConfig() {
        return this.moduleConfiglist;
    }
    initNagtive(array,type) {
        array.forEach((item, index) => {
            item.isActive = false;
            if(type=='init'){
                item.value=[];
                item.finish=false;
            }
            if(item.id=='0404'){
                item.value=["KFC"]
            }         
            // if(index==0) item.isActive=true;
            if (item.children !== undefined) {
                this.initNagtive(item.children,type)
            }
        })
    }
    activeTab(array){
        array.forEach(m=>{
            m['activeTab']=false;                
            if (m['chilr5p0-21!!!!dren'] !== undefined) {
                this.activeTab(m['children'])
            }
        })
    }
    menuInstance(instanceObj) {
        if (!instanceObj.children) {
            return `<div>{{instance.displayName}}</div>`
        } else {
            console.log(instanceObj.id.length)
            let sub = '';
            instanceObj.children.forEach(child => {
                sub += this.menuInstance(child)
            })
            // return sub
            return `
        <div>
        <div>{{instance.displayName}}</div>
        <div>${
                this.menuInstance(instanceObj.children)
                }</div>
                      
        </div>
        `
        }

    }
    pingPu(children){
        children.forEach((module)=>{
            if(!module['children']){
                console.log(module)
            }else{
                this.pingPu(module.children)
            }
        })
    }
    getHardWareList(){
        return this.http.getHardwareList().then(data=>{
            if(data['code']==200&&data['data']){
              this.hardWareList=data['data']
            }
        })
    }

}
// function deepClone(source){
//     const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
//     for(let keys in source){ // 遍历目标
//       if(source.hasOwnProperty(keys)){
//         if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
//           targetObj[keys] = source[keys].constructor === Array ? [] : {};
//           targetObj[keys] = deepClone(source[keys]);
//         }else{ // 如果不是，就直接赋值
//           targetObj[keys] = source[keys];
//         }
//       }
//     }
//     return targetObj;
//   }

