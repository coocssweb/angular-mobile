import {Headers, RequestOptions} from '@angular/http'
import {Response, Http} from '@angular/http'
import { DOMAIN } from '../constant/config'
import 'rxjs/add/operator/toPromise'

export class BaseService {
  private http:Http

  constructor(http:Http) {
    this.http = http
  }

  /**
   * get请求
   * @param url
   * @returns {Promise<T>|Promise<TResult|T>|Observable<R>|Promise<R>|any}
     */
  get(url):Promise<any> {
    let headers = new Headers()

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    return this.http.get(DOMAIN + url, {headers: headers})
      .toPromise()
      .then((res:any)=> {

        if (!res._body) {
          return {}
        }

        let body = res.json()
        return body || {}
      })
      .catch(this.handleError)
  }


  /**
   * post请求
   * @param url
   * @param body
   * @returns {Promise<T>|Promise<TResult|T>|Observable<R>|Promise<R>|any}
     */
  post(url, body):Promise<any> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    return this.http.post(DOMAIN + url, body, {headers: headers})
      .toPromise()
      .then((res:Response)=> {
        let body = res.json()
        return body || {}
      })
      .catch(this.handleError)
  }

  /**
   * delete请求
   * @param url
   * @param ids
   * @returns {Promise<*|{}>|Promise<T>|Promise<*|{}|T>|any<T>|Promise<R>|any}
     */
  delete(url, ids):Promise<any> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    let deleteUrl = DOMAIN + url
    if (ids) {
      deleteUrl += ids
    }

    return this.http.delete(deleteUrl, {headers: headers})
      .toPromise()
      .then((res:Response)=> {

        if (res.status.toString().startsWith('2')) {
          return {}
        }

      })
      .catch((error:any)=> {
        let body = error.json()
        return body || {}
      }).catch(this.handleError)
  }

  /**
   * put请求
   * @param url
   * @param body
   * @returns {Promise<T>|Promise<TResult|T>|Observable<R>|Promise<R>|any}
     */
  put(url, body):Promise<any> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    return this.http.put(DOMAIN + url, body, {headers: headers})
      .toPromise()
      .then((res:Response)=> {
        return res
      })
      .catch(this.handleError)
  }

  private handleError (error: Response | any) {

    var ua = navigator.userAgent.toLowerCase();
    console.log(ua);
    var isWeixin = ua.indexOf("micromessenger") >=0;
    if( error.status==403 || ( error.status ==419 && isWeixin ) ){
      window.location.href = "#/forbidden"
    }
    if(error.status ==419 && !isWeixin) {
      window.location.href = "#/forbidden"
    }
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg)
    return Promise.reject(errMsg);
  }

}

