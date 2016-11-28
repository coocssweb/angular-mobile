import {Injectable} from "@angular/core";

/**
 * 日志打印服务
 */
@Injectable()
export class LoggerService {

  debug(msg) {
    console.info(msg)
  }

  info(msg) {
    console.info(msg)
  }

  error(msg) {
    console.error(msg)
  }

  warn(msg) {
    console.warn(msg)
  }

}
