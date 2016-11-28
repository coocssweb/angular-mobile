import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Injectable} from "@angular/core";
import {DOMAIN} from "../constant/config";

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
}
