/**
 * 二维码登录页面 访问路径要为：
 * @description :: 二维码登录页面
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import StringUtils from "../../utils/stringUtils"
import {AuthService} from "../../services/auth.service";
import {DOMAIN} from "../../constant/config";
import {Router} from "@angular/router";
import {LoggerService} from "../../services/logger.service";
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit, OnDestroy {

  private qrCodeUrl: string
  private checkIntervalId

  constructor(private authService: AuthService,
              private cacheService: CacheService,
              private logger: LoggerService,
              private router: Router) {

  }

  ngOnInit(): void {
    let location = window.location.href
    let photoInfoId = StringUtils.getUrlQuery(location, "pid");
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
      this.qrCodeUrl = `${DOMAIN}/login/qrCode?pid=${photoInfoId}`
      this.checkIntervalId = setInterval(() => {
        this.authService.authLogin().then(resp => {
          if (resp.result) {
            clearInterval(this.checkIntervalId)
            if (!targetPath.startsWith("#")) {
              targetPath = `#${targetPath}`
            }
            window.location.href = targetPath
          }
        })
      }, 500);
    }
  }

  ngOnDestroy(): void {
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId)
    }
  }
}
