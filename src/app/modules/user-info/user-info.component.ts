import {Component, OnInit} from "@angular/core";
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserInfoService} from "./user-info.service";
import {CacheService} from "../../services/cache.service";
import {isNull} from "util";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'personal',
  templateUrl: 'user-info.component.html',
  styleUrls: ['user-info.component.css'],
  providers:[UserInfoService]
})
export class UserInfoComponent  implements OnInit{

  private user:any = {}

  private codeInner:boolean = false

  private orgMobile:number


  private isShowTip: boolean = false
  private message:string

  private errMsg: string
  private toShowErr:boolean = false

  //是否正在加载数据
  isLoadingData = false
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private userInfoService: UserInfoService,private titleService:Title,
              private cacheService:CacheService,
              private route: ActivatedRoute,
              private router: Router) {
    this.titleService.setTitle("个人资料")
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
      this.isLoadingData = true
      this.userInfoService.getUserInfo().then((resp:any)=>{
        this.user = resp
        this.isLoadingData = false
        this.orgMobile = this.user.mobile
      })
  }

  mobileBlur(){
    if(this.orgMobile != this.user.mobile){
      this.codeInner = true
    }else {
      this.codeInner = false
    }
  }

  updateUserInfo(){
    if(this.validated()) {
      this.userInfoService.updateUserInfo(this.user).then((resp: any) => {
        //保存成功。。。
        this.message = "保存成功！"
        this.isShowTip = true
        this.codeInner = false
        this.cacheService.updateCustomer(this.user)//同时更新缓存
      })
    }else{
      setTimeout((resp:any)=>{
        this.toShowErr = false
      }, 3000)
    }
  }

  validated(){
    //姓名验证
    if (this.user.name.trim().length < 1) {
      this.errMsg = "姓名不能为空"
      this.toShowErr = true
      return false
    }
    //手机验证
    if(isNull(this.user.mobile)||this.user.mobile.trim().length<1){
      this.errMsg = "手机号码不能为空"
      this.toShowErr = true
      return false
    }else if (!/^1[34578]\d{9}$/.test(this.user.mobile) || this.user.mobile.trim().length != 11) {
      this.errMsg = "手机号码格式不正确"
      this.toShowErr = true
      return false
    }
    //验证码非空验证
    if (this.codeInner){
      if (this.user.code.trim().length < 1) {
        this.errMsg = "验证码不能为空"
        this.toShowErr = true
        return false
      } else if (this.user.code.length != 6 || !/^\d+$/.test(this.user.code)) {
        this.errMsg = "验证码错误"
        this.toShowErr = true
        return false
      }
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

  onCloseTip(){
    this.isShowTip = false
  }
  getCode(){
    if(isNull(this.user.mobile)||this.user.mobile.trim().length<1){
      this.errMsg = "手机号码不能为空"
      this.toShowErr = true
      return false
    }else if (!/^1[34578]\d{9}$/.test(this.user.mobile) || this.user.mobile.trim().length != 11) {
      this.errMsg = "手机号码格式不正确"
      this.toShowErr = true
      return false
    }
    this.settime(document.getElementById('getCode'))
    this.userInfoService.getCodeByMobile(this.user.mobile).then((resp:any)=>{
     console.log("获取验证码成功,reap[()}=>"+resp)
    })
  }

  //获取验证倒计时
  private  countdown:number = 60;
  settime(obj) {
    if (this.countdown == 0) {
      obj.disabled = false
      obj.innerHTML="获取验证码"
      this.countdown = 60;
      return;
    } else {
      obj.disabled = true
      obj.innerHTML="重新发送(" + this.countdown + ")"
      this.countdown--;
    }
    setTimeout((resp:any)=>{
      this.settime(obj)
    }, 1000)
  }

}
