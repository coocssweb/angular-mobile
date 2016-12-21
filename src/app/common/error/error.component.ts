/**
 * Created by zoushuiyun on 2016/12/17.
 * @description :: 错误提示页
 */

import { Component, OnInit } from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router";
@Component({
  selector: 'error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.css']
})
export class ErrorComponent implements OnInit{

  msg:string="访问方式不正确"

  errorInfo:string = ""

  /**
   * 构造函数
   * @param rawService
   */
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }
  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let type  = +params['msgType']
      if(type&&type==1){
        this.msg = "请使用微信浏览器访问"
      }
    });
    this.errorInfo = window.sessionStorage.getItem("ERRORINFO")
  }

}
