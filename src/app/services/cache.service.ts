import {OnInit, Injectable} from "@angular/core";
import {Brand} from "../shared/brand/brand.model";

/**
 * 缓存服务  将ajax请求的一些状态数据存储到sessionStorage中，避免系统中频繁请求提升用户体验
 */
@Injectable()
export class CacheService implements OnInit {

  static PHOTO_INFO_ID_KEY: string = "PHOTO_INFO_ID"
  static BRAND_KEY: string = "BRAND"
  static CUSTOMER_KEY: string = "CUSTOMER"
  static RAW_INFO_KEY: string = "RAW_INFO"
  static TRUING_INFO_KEY: string = "TRUING_INFO"
  static PREV_URL: string = "PREV_URL"

  ngOnInit(): void {
    if (typeof window.localStorage == 'undefined') {
      alert("请使用chrome或更高版本的IE浏览器")
    }
  }

  private add(key, obj) {
    if (obj) {
      if (typeof obj === 'object') {
        //storage中只能存储字符串，所以将json对象转换成字符串
        let objStr = JSON.stringify(obj)
        window.sessionStorage.setItem(key, objStr);
      } else {
        window.sessionStorage.setItem(key, obj);
      }
    }
  }

  private get(key) {
    let objStr = window.sessionStorage.getItem(key)
    if (objStr) {
      try {
        //重新转换为对象
        return JSON.parse(objStr)
      } catch (err) {

      }
    }
    return objStr;
  }

  clear() {
    window.sessionStorage.removeItem(CacheService.PHOTO_INFO_ID_KEY)
    window.sessionStorage.removeItem(CacheService.BRAND_KEY)
    window.sessionStorage.removeItem(CacheService.CUSTOMER_KEY)
    window.sessionStorage.removeItem(CacheService.RAW_INFO_KEY)
    window.sessionStorage.removeItem(CacheService.TRUING_INFO_KEY)
    window.sessionStorage.removeItem(CacheService.PREV_URL)
  }

  setPhotoInfoId(photoInfoId) {
    this.add(CacheService.PHOTO_INFO_ID_KEY, photoInfoId)
  }

  /**
   * 获取照片主信息ID
   */
  getPhotoInfoId() {
    return this.get(CacheService.PHOTO_INFO_ID_KEY)
  }

  /**
   * 获取跳转地址
   */
  getPrevUrl() {
    return this.get(CacheService.PREV_URL)
  }

  setPrevUrl(prevUrl) {
    this.add(CacheService.PREV_URL, prevUrl)
  }

  setBrand(brand: Brand) {
    this.add(CacheService.BRAND_KEY, brand)
  }

  /**
   * 获取品牌信息
   */
  getBrand(): Brand {
    let brandJson = this.get(CacheService.BRAND_KEY);
    if (brandJson) {
      return new Brand(brandJson.bannerLogo)
    }
    return null;
  }

  setCustomer(customer) {
    this.add(CacheService.CUSTOMER_KEY, customer);
  }

  /**
   * 获取客户数据
   * @returns {any|any}
   */
  getCustomer() {
    return this.get(CacheService.CUSTOMER_KEY)
  }

  updateCustomer(customer) {
    window.sessionStorage.removeItem(CacheService.CUSTOMER_KEY)
    this.add(CacheService.CUSTOMER_KEY, customer);
  }

  setRawInfo(rawInfo) {
    this.add(CacheService.RAW_INFO_KEY, rawInfo)
  }

  /**
   * 获取原片状态信息
   * @returns {any|any}
   */
  getRawInfo() {
    return this.get(CacheService.RAW_INFO_KEY)
  }

  setTruingInfo(truingInfo) {
    this.add(CacheService.TRUING_INFO_KEY, truingInfo)
  }

  /**
   * 获取精修状态信息
   * @returns {any|any}
   */
  getTruingInfo() {
    return this.get(CacheService.TRUING_INFO_KEY)
  }

}
