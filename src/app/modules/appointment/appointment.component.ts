/**
 * Created by zoushuiyun on 2016/12/10.
 */
import { Component,OnInit } from '@angular/core';
import {AppointmentService} from "./appointment.service";
import {isUndefined} from "util";
import { _SHOOTTYPES} from "../../dictionarys";
import {isNull} from "util";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'appoint',
  templateUrl: 'appointment.component.html',
  styleUrls: ['appointment.component.css'],
  providers:[AppointmentService]
})
export class AppointmentComponent implements OnInit {

  private errMsg: string
  private toShowErr:boolean = false
  private user:any = {}
  private isShowTip: boolean = false
  private message:string
  private shootTypes = _SHOOTTYPES

  private isShowShootSelect: boolean = false
  private shootType = {}
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private appointmentService:AppointmentService,private titleSerivce:Title) {
    this.titleSerivce.setTitle("在线预约");
  }
  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.initUser()

    // var calendar = new LCalendar();
    // calendar.init({
    //   'trigger': '#shootdate', //标签id
    //   'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
    //   'minDate': '1900-1-1', //最小日期
    //   'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
    // });

  }

  initUser(){
    this.user.sex = 1
    //this.user.shootType = 1
  }

  addAppoint(){
    if(this.validated()) {
      this.appointmentService.addAppoint(this.user).then((resp: any) => {
        //预约成功。。。
        console.log(resp)
        this.message = "预约成功,我们的工作人员会尽快联系你，请保持电话畅通！"
        this.isShowTip = true
        this.initUser()
      })
    }else{
      setTimeout((resp:any)=>{
        this.toShowErr = false
      }, 3000)
    }
  }

  onOpenSelect(){
    this.isShowShootSelect = true
  }

  onSelect(option){
    this.isShowShootSelect = false
    this.user.shootType = option.key
    this.shootType =option
  }


  onCloseTip(){
    this.isShowTip = false
  }
  validated(){
    //姓名验证
    if (isUndefined(this.user.name)||this.user.name.trim().length < 1) {
      this.errMsg = "姓名不能为空"
      this.toShowErr = true
      return false
    }
    //手机验证
    if(isUndefined(this.user.mobile)||isNull(this.user.mobile)||this.user.mobile.trim().length<1){
      this.errMsg = "手机号码不能为空"
      this.toShowErr = true
      return false
    }else if (!/^1[34578]\d{9}$/.test(this.user.mobile) || this.user.mobile.trim().length != 11) {
      this.errMsg = "手机号码格式不正确"
      this.toShowErr = true
      return false
    }
    //邮箱验证
    if (isUndefined(this.user.email)||this.user.email.trim().length < 1) {
      this.errMsg = "邮箱不能为空"
      this.toShowErr = true
      return false
    } else if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user.email)) {
      this.errMsg = "邮箱格式不正确"
      this.toShowErr = true
      return false
    }
    // if (isUndefined(this.user.shootDateStr)||this.user.shootDateStr.trim().length < 1) {
    //   this.errMsg = "预约时间不能为空"
    //   this.toShowErr = true
    //   return false
    // }else{
    //   this.user.shootDate = Date.parse(this.user.shootDateStr)
    // }
    if (isUndefined(this.user.shootType)||this.user.shootType.length < 1) {
      this.errMsg = "预约项目不能为空"
      this.toShowErr = true
      return false
    }
    return true
  }

  //获取验证倒计时
  // private  countdown:number = 60;
  // settime(obj) {
  //   if (this.countdown == 0) {
  //     obj.disabled = false
  //     obj.innerHTML="获取验证码"
  //     this.countdown = 60;
  //     return;
  //   } else {
  //     obj.disabled = true
  //     obj.innerHTML="重新发送(" + this.countdown + ")"
  //     this.countdown--;
  //   }
  //   setTimeout((resp:any)=>{
  //     this.settime(obj)
  //   }, 1000)
  // }
}
