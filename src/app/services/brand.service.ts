import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {CacheService} from "./cache.service";
import {Brand} from "../shared/brand/brand.model";
import {Observer, Observable} from "rxjs";

@Injectable()
export class BrandService extends BaseService {

  brandChange: Observable<any>
  private brandChangeObserver: Observer<Brand>

  constructor(http: Http, private cacheService: CacheService) {
    super(http)
    this.brandChange = new Observable((observer: Observer<Brand>) => {
        this.brandChangeObserver = observer;
      }
    )
  }


  /**
   * 获取brand图标
   *
   * @returns {Promise<any>}
   */
  getBrand(): Promise<Brand> {
    let brand = this.cacheService.getBrand()
    if (brand) {
      return Promise.resolve(brand)
    } else {
      let url = '/weixinfans/actions/getBrand'
      let brandPromise = this.get(url).then((resp: any) => {
        brand = new Brand(resp.bannerLogo)
        this.brandChangeObserver.next(brand)
        this.cacheService.setBrand(brand)
        return brand;
      })
      return brandPromise
    }
  }

  /**
   * 获取原片场景列表
   * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
   */
  getBrandByPid(photoInfoId): Promise<Brand> {
    // 设置到cacheService缓存中
    let brand = this.cacheService.getBrand()//正常不会有
    if (brand) {
      return Promise.resolve(brand)
    } else {
      let url = '/weixinfans/actions/getBrandByPid/'+photoInfoId
      let brandPromise = this.get(url);
      brandPromise.then((resp: any) => {
        brand = new Brand(resp.bannerLogo)
        this.brandChangeObserver.next(brand)
        this.cacheService.setBrand(brand)
        return brand;
      })
      return brandPromise
    }
  }

}

