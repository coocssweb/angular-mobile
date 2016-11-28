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
              private logger: LoggerService,
              private router: Router) {

  }

  ngOnInit(): void {
    let location = window.location.href
    let groupId = StringUtils.getUrlQuery(location, "gid");
    let photoInfoId = StringUtils.getUrlQuery(location, "pid");
    let viewType = StringUtils.getUrlQuery(location, "type");
    this.logger.debug(`groupId:${groupId} photoInfoId:${photoInfoId} viewType:${viewType}`)
    if (!groupId || !photoInfoId || (viewType != "raw" && viewType != "truing")) {
      alert("登录页面访问参数错误，请使用合法的登录地址访问")
    } else {
      this.qrCodeUrl = `${DOMAIN}/login/qrCode?gid=${groupId}`
      this.checkIntervalId = setInterval(() => {
        this.authService.authLogin().then(resp => {
          if (resp.result) {
            clearInterval(this.checkIntervalId)
            if ("raw" == viewType) {
              this.router.navigate(['/raw', photoInfoId]);
            } else if ("truing" == viewType) {
              this.router.navigate(['/truing', photoInfoId]);
            }
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
