/**
 * 品牌信息
 * @description :: 定义用户信息数据原型
 */

export class Brand {
  constructor(public bannerLogo: string) {

  }

  //TODO 监听之才可直接使用
  public get blackBannerLogo() {
      return this.bannerLogo.substring(0, this.bannerLogo.lastIndexOf(".")) + "_black" + this.bannerLogo.substring(this.bannerLogo.lastIndexOf("."))
  }
}
