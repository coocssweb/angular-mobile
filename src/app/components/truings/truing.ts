/**
 * 精修片信息
 * @description :: 定义图片信息数据原型
 */

class version{
  constructor(
    public id: number,
    public imgKey: string,
    public imgSize: number,
    public imgVersion: number,
    public remark: string,
    public scrawlImgKey: string,
    public status: number
  ){

  }
}

export class Truing{
  constructor(
    public imgIndex: number,
    public imgKey: string,
    public imgName: string,
    public imgSize: number,
    public imgVersion: number,
    public status: number,
    public truings: version[]
  ){

  }
}
