/**
 * Created by zoushuiyun on 2016/12/13.
 */
/**
 * 字典对象
 * @description :: 定义字典对象数据原型
 */

//元 字典
export class Dictionary{
  private key:any
  private value:any
  constructor(key,value){
    this.key = key
    this.value = value
  }
}

//字典 key(string)  val(元字典数组) 做缓存用
export class Dictionarys{
  private dictionary:Dictionary[]=[]
  push(key,value){
    this.dictionary.push(key,value)
  }
}

