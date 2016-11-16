/**
 * 用户信息
 * @description :: 定义用户信息数据原型
 */

export class Customer{
  constructor(
      public id: number,
      public name: string,
      public groupId: number,
      public headImage: string
  ){

  }
}
