/**
 * 入口页面
 * @description :: 入口页面
 */
import { Component, OnInit } from '@angular/core'
import {CacheService} from "../../services/cache.service";
import {UserInfoService} from "../../modules/user-info/user-info.service";
import {Router} from "@angular/router";
import {QINIU_DOMAIN} from "../../constant/config";
import {isNull} from "util";


@Component({
    selector: '<index></index>',
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.css'],
  providers:[UserInfoService]
})
export class IndexComponent implements OnInit {

    currentTab: string = 'raw'
    photoInfoId: string
    isTransform = false
    user:any = {}
    brand:any={}
    qinuDomain = QINIU_DOMAIN+"/"
    blackLogo:any = ""//手机端头部图



  constructor(private userInfoService: UserInfoService,
              private cacheService:CacheService,
              private router: Router){}

    ngOnInit(): void {
      let location = window.location.href
      this.photoInfoId = location.substring(location.lastIndexOf('/'),location.length)
      this.initCustomer()
      this.initBrand()
    }


    onTab(tab, flag){
        if(!flag){
            return
        }
        this.currentTab = tab
    }

    onToggle(flag){
      this.isTransform =flag
      if(this.isTransform&&window.location.href.endsWith("/user-info")){//在个人资料页面到此，个人资料可能已经改变，需从initCustomer
        this.initCustomer()
      }
    }

  initCustomer(){
    if(isNull(this.cacheService.getCustomer())){
        this.userInfoService.getUserInfo().then((resp:any)=>{
          this.cacheService.setCustomer(resp)
          this.user =  resp
        },(erroResp:any)=>{
          console.log(erroResp)
          this.router.navigate(['/error']);
        })
    }else {
      this.user =  this.cacheService.getCustomer()
    }
  }
  initBrand(){
    if(isNull(this.cacheService.getBrand())){
      this.userInfoService.getBrand().then((resp:any)=>{
        this.cacheService.setBrand(resp)
        this.brand =  resp
        let logo = this.brand.bannerLogo
        this.blackLogo = logo.substring(0,logo.lastIndexOf("."))+"_black"+logo.substring(logo.lastIndexOf("."))
      },(erroResp:any)=>{
        console.log(erroResp)
        this.router.navigate(['/error']);
      })
    }else {
      this.brand =  this.cacheService.getBrand()
      let logo = this.brand.bannerLogo
      this.blackLogo = logo.substring(0,logo.lastIndexOf("."))+"_black"+logo.substring(logo.lastIndexOf("."))
    }
  }
}
