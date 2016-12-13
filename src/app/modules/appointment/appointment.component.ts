/**
 * Created by zoushuiyun on 2016/12/10.
 */
import { Component,OnInit } from '@angular/core';
import {AppointmentService} from "./appointment.service";
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
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private appointmentService:AppointmentService) {
  }
  //addAppoint
  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.user.name =""
    this.user.sex = 1
    this.user.mobile = ""
    this.user.email = ""
  }

  updateUserInfo(){
    if(this.validated()) {
      this.appointmentService.addAppoint(this.user).then((resp: any) => {
        //预约成功。。。
        console.log(resp)
        this.message = "预约成功,我们的工作人员会尽快联系你，请保持电话畅通！"
        this.isShowTip = true
        this.user.name =""
        this.user.sex = 1
        this.user.mobile = ""
        this.user.email = ""
      })
    }else{
      setTimeout((resp:any)=>{
        this.toShowErr = false
      }, 3000)
    }
  }

  onCloseTip(){
    this.isShowTip = false
  }
  validated(){
    //姓名验证
    if (this.user.name.trim().length < 1) {
      this.errMsg = "姓名不能为空"
      this.toShowErr = true
      return false
    }
    //手机验证
    if(this.user.mobile.trim().length<1){
      this.errMsg = "手机号码不能为空"
      this.toShowErr = true
      return false
    }else if (!/^1[34578]\d{9}$/.test(this.user.mobile) || this.user.mobile.length != 11) {
      this.errMsg = "手机号码格式不正确"
      this.toShowErr = true
      return false
    }
    //邮箱验证
    if (this.user.email.trim().length < 1) {
      this.errMsg = "邮箱不能为空"
      this.toShowErr = true
      return false
    } else if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user.email)) {
      this.errMsg = "邮箱格式不正确"
      this.toShowErr = true
      return false
    }
    return true
  }
}
