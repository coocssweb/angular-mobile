import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Injectable} from "@angular/core";

/**
 * 认证服务
 */
@Injectable()
export class AuthService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  authLogin(): Promise<any> {
    let authCheckUrl = "/login/qrCode/authCheck"
    return this.get(authCheckUrl)
  }

  loginByAccessPwd(accessPwd,photoInfoId):Promise<any>{
    let authCheckUrl = "/login/accessPwd?accessPwd="+accessPwd+"&photoInfoId="+photoInfoId
    return this.get(authCheckUrl)
  }
}
