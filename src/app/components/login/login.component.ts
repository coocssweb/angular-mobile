import {Component, OnInit, OnDestroy} from "@angular/core";
import StringUtils from "../../utils/stringUtils";
import {AuthService} from "../../services/auth.service";
import {DOMAIN} from "../../constant/config";
import {Router} from "@angular/router";
import {LoggerService} from "../../services/logger.service";
import {CacheService} from "../../services/cache.service";
import {BrandService} from "../../services/brand.service";
import {Title} from "@angular/platform-browser";

/**
 * 二维码登录页面 访问路径要为：/login/qrCode?pid=5&type=raw
 * @description :: 二维码登录页面
 */
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit, OnDestroy {
  private qrCodeUrl: string
  private checkIntervalId
  private loginWay: number = 1  //1 微信二维码 2 口令登录
  private accessPwd: string
  private errMsg: string
  private toShow: boolean = false

  constructor(private authService: AuthService,private titleService:Title,
              private cacheService: CacheService,
              private logger: LoggerService,
              private brandService: BrandService,
              private router: Router) {
    this.titleService.setTitle("登录")
  }

  ngOnInit(): void {
    let location = window.location.href
    let photoInfoId = StringUtils.getUrlQuery(location, "pid")
    if (!photoInfoId) {
      photoInfoId = this.cacheService.getPhotoInfoId()
    }
    let targetPath = this.cacheService.getPrevUrl()
    let viewType = StringUtils.getUrlQuery(location, "type")
    if (viewType && photoInfoId) {
      targetPath = `/${viewType}/${photoInfoId}`
    }
    this.logger.debug(`photoInfoId:${photoInfoId} viewType:${viewType} targetPath:${targetPath}`)
    if (!photoInfoId || !targetPath) {
      alert("登录页面访问参数错误，请使用合法的登录地址访问")
    } else {
      this.brandService.getBrandByPid(photoInfoId)
      //需要先调用一次auth以便生成jsessionid cookie,否则img取图片时的session和auth的session会不一致
      this.authService.authLogin().then(resp => {
        this.qrCodeUrl = `${DOMAIN}/login/qrCode?pid=${photoInfoId}`
        this.checkIntervalId = setInterval(() => {
            if (this.loginWay == 1) {
              this.authService.authLogin().then(resp => {
                  if (resp.result) {
                    clearInterval(this.checkIntervalId)
                    if (!targetPath.startsWith("#")) {
                      targetPath = `#${targetPath}`
                    }
                    window.location.href = targetPath
                  }
                }
              )
            }
        }, 1000);
      });
    }
  }


  ngOnDestroy(): void {
    this.stopInterval()
  }

  showErrImg() {
    this.qrCodeUrl = "/images/qrcode_err.jpg"
    this.stopInterval()
  }

  stopInterval() {
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId)
    }
  }

  changeLoginWay(way) {
    this.loginWay = way
    this.toShow = false
    this.accessPwd = null
  }

  loginByAccessPwd() {
    let location = window.location.href
    let photoInfoId = StringUtils.getUrlQuery(location, "pid")
    if (!photoInfoId) {
      photoInfoId = this.cacheService.getPhotoInfoId()
    }
    let targetPath = this.cacheService.getPrevUrl()
    let viewType = StringUtils.getUrlQuery(location, "type")
    if (viewType && photoInfoId) {
      targetPath = `/${viewType}/${photoInfoId}`
    }

    if (!photoInfoId || !targetPath) {
      alert("登录页面访问参数错误，请使用合法的登录地址访问")
    } else {
      if (!targetPath.startsWith("#")) {
        targetPath = `#${targetPath}`
      }
      // this.authService.loginByAccessPwd(this.accessPwd,photoInfoId)
      this.qrCodeUrl = `${DOMAIN}/login/qrCode?pid=${photoInfoId}`

      this.authService.loginByAccessPwd(this.accessPwd, photoInfoId).then(resp => {
        if (resp.result) {
          setInterval(this.checkIntervalId)
          if (!targetPath.startsWith("#")) {
            targetPath = `#${targetPath}`
          }
          this.logger.info("targetPath:" + targetPath)
          window.location.href = targetPath
        } else {
          this.toShow = true;
          this.errMsg = resp.msg;
        }
      })
    }
  }


}
