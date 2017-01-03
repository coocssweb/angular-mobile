import { Component,OnInit } from '@angular/core';
import {AdviceService} from "./advice.service";
import {isUndefined} from "util";
import {isNull} from "util";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'opinion',
  templateUrl: 'advice.component.html',
  styleUrls: ['advice.component.css'],
  providers:[AdviceService]
})
export class AdviceComponent implements OnInit{

  private content:string
  private isShowTip: boolean = false
  private message:string

  private isSubmit:boolean=false
  private submitText:string = "提交"
  private errMsg: string
  private toShowErr:boolean = false
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private adviceService:AdviceService,private titleService:Title) {
    this.titleService.setTitle("意见反馈")
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
  }

  addAdvice(){
    if(isUndefined(this.content)||isNull(this.content)||this.content.trim().length<=0){
      this.errMsg = "意见不能为空，请输入您的宝贵意见"
      this.toShowErr = true
      setTimeout((resp:any)=>{
        this.toShowErr = false
      }, 3000)
      return
    }
    let params = {
      content: this.content
    }
    this.isSubmit = true
    this.submitText = "提交中..."
    this.adviceService.addAdvice(params).then((resp:any)=>{
      this.content = ""
      this.message = "谢谢反馈！"
      this.isShowTip = true
      this.isSubmit = false
      this.submitText = "提交"
    })
  }

  onCloseTip(){
    this.isShowTip = false
  }
}
