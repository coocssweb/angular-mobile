import {Injectable} from "@angular/core";

/**
 * 日志打印服务
 */
@Injectable()
export class LoggerService {

  debug(msg) {
    console.log(msg)
  }

  info(msg) {
    console.log(msg)
  }

  error(msg) {
    console.error(msg)
  }

  warn(msg) {
    console.warn(msg)
  }

}
