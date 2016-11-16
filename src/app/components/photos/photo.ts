/**
 * 图片信息
 * @description :: 定义图片信息数据原型
 */

export class Photo{
  constructor(
      public id: number,
      public imgIndex: number,
      public imgName: string,
      public imgKey: string,
      public imgSize: number,
      public imgShootTime: string,
      public remark: string,
      public isSuccess: boolean
  ){

  }
}
