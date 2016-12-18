/**
 * Created by zoushuiyun on 2016/12/13.
 */
import {OnInit, Injectable} from "@angular/core";
/**
 * 字典对象
 * @description :: 定义字典对象数据原型
 */

//元 字典
export class Dictionary{
   key:any
   value:any
  constructor(key,value){
    this.key = key
    this.value = value
  }
}

//字典 key(string)  val(元字典数组) 做缓存用
export class Dictionarys{
   dictionarys:Dictionary[]=[]
  push(key,value){
    let dict = new Dictionary(key,value)
    this.dictionarys.push(dict)
  }
}


export const _SHOOTTYPES: Dictionary[] = [
  {key: 1, value: '婚纱照'},
  {key: 2, value: '儿童照'},
  {key: 3, value: '孕妇照'},
  {key: 4, value: '写真'},
];

export const _SEX: Dictionary[] = [
  new Dictionary(1,'男'),
  new Dictionary(2,'女'),
];


//以下有问题
@Injectable()
export class DictionarysService implements OnInit {
  dictionarys:Dictionarys = new Dictionarys()

  constructor(){
    this.dictionarys.push("shoot_types",_SHOOTTYPES)
    this.dictionarys.push("sex",_SEX)
  }

  ngOnInit(): void {
  }

  getDict(key){
    let result = null
    console.log(this.dictionarys)
    this.dictionarys.dictionarys.forEach(dictionary=>{
      if(dictionary.key==key){
        result = dictionary
      }
    })
    return result
  }

}
