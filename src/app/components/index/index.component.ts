/**
 * 入口页面
 * @description :: 入口页面
 */
import {Component, OnInit} from "@angular/core";
import {UserInfoService} from "../../modules/user-info/user-info.service";
import {Router} from "@angular/router";
import {QINIU_DOMAIN} from "../../constant/config";
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../shared/brand/brand.model";
import {Title} from "@angular/platform-browser";


@Component({
  selector: '<index></index>',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [UserInfoService]
})
export class IndexComponent implements OnInit {

  currentTab: string = 'raw'
  isTransform = false
  user: any = {}
  brand: Brand = new Brand("")
  qinuDomain = QINIU_DOMAIN + "/"

  constructor(private userInfoService: UserInfoService,private titleService:Title,
              private brandService: BrandService,
              private router: Router) {
    this.titleService.setTitle("首页")
  }

  ngOnInit(): void {
    let location = window.location.href
    this.initCustomer()
    this.initBrand()
    this.brandService.brandChange.subscribe((brand) => {
      this.brand = brand
      console.log(this.brand)
    })
  }

  onTab(tab, flag) {
    if (!flag) {
      return
    }
    this.currentTab = tab
  }

  onToggle(flag) {
    this.isTransform = flag
    if (this.isTransform && window.location.href.endsWith("/user-info")) {//在个人资料页面到此，个人资料可能已经改变，需从initCustomer
      this.initCustomer()
    }
  }

  initCustomer() {
    this.userInfoService.getUserInfo().then((resp: any) => {
      this.user = resp
    }, (erroResp: any) => {
        this.router.navigate(['/error',2]);
    })
  }

  initBrand() {
    this.brandService.getBrand().then((brand: Brand) => {
      console.log(brand)
      this.brand = brand
    }, (erroResp: any) => {
      this.router.navigate(['/error/',2]);
    })
  }
}
