/**
 * 品牌信息
 * @description :: 定义用户信息数据原型
 */

export class Brand {
  constructor(public id: number,
              public name: string,
              public bannerLogo: string,) {

  }

  public get blackBannerLogo() {
    return this.bannerLogo.substring(0, this.bannerLogo.lastIndexOf(".")) + "_black" + this.bannerLogo.substring(this.bannerLogo.lastIndexOf("."))
  }
}
