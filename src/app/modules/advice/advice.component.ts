import { Component,OnInit } from '@angular/core';
import {AdviceService} from "./advice.service";
import {isUndefined} from "util";
import {isNull} from "util";
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
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private adviceService:AdviceService) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
  }

  addAdvice(){
    if(isUndefined(this.content)||isNull(this.content)||this.content.trim().length<=0){
      this.message = "意见不能为空，请输入您的宝贵意见"
      this.isShowTip = true
      return
    }
    let params = {
      content: this.content
    }
    this.adviceService.addAdvice(params).then((resp:any)=>{
      this.content = ""
      this.message = "谢谢反馈！"
      this.isShowTip = true
    })
  }

  onCloseTip(){
    this.isShowTip = false
  }
}
