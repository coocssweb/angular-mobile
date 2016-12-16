/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Component, OnInit} from "@angular/core";
import {OrdersService} from "../shared/orders.service"
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";
@Component({
  selector: 'order-flow',
  templateUrl: 'order-flow.component.html',
  styleUrls: ['./order-flow.component.css'],
  providers: [OrdersService]
})
export class OrderFlowComponent implements OnInit {

  private orderId:number

  private orderFlow:any = {}

  private isShowTip: boolean = false
  private message:string
  //是否正在加载数据
  isLoadingData = false
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.orderId = +params['orderId']
    });
    this.getOrderFlow()
  }

  getOrderFlow(){
    this.isLoadingData = true
    this.ordersService.getOrderFlow(this.orderId).then((resp:any)=>{
      this.orderFlow = resp
      this.orderFlow.flowNodes.forEach(flowNode => {
        let isEvaluated = true
        if(flowNode.status == 2){
          flowNode.workers.forEach(worker => {
            if(isUndefined(worker.serviceLevel)){
              isEvaluated = false
              return
            }
          });
        }else {
          isEvaluated = false
        }
        flowNode.isEvaluated = isEvaluated
      });
      this.isLoadingData = false
    })
  }

  /**
   *进行评价
   */
  evaluating(flowNode){
     flowNode.evaluating = true
  }

  /**
   * 评星（服务等级）事件
   */
  evaluateStar(flowNode,workerIndex,startNum){
    flowNode.workers[workerIndex].serviceLevel = startNum
    let canSubmit =  true
    flowNode.workers.forEach(worker => {
      if(isUndefined(worker.serviceLevel)){
        canSubmit = false
        return
      }
    });
    flowNode.submit = canSubmit
  }

  /**
   * 保存评价
   */
  saveEvaluate(flowNode){
    flowNode.workers.forEach(worker => {
      worker.content = flowNode.content
    });
    let params = {
      state: flowNode.state,
      workers: flowNode.workers
    }
    this.ordersService.saveEvaluate(this.orderId,params).then((resp:any)=>{
      this.message = "评价成功！"
      this.isShowTip = true
      flowNode.evaluating = false
      flowNode.isEvaluated = true
      flowNode.evaluatedResult = true
    })
  }
  onCloseTip(){
    this.isShowTip = false
  }
  /**
   * 展示评价结果
   */
  showEvaluatedResult(flowNode){
    flowNode.evaluatedResult = true
  }
  /**
   * 隐藏评价结果
   */
  hideEvaluatedResult(flowNode){
    flowNode.evaluatedResult = false
    flowNode.evaluating = false
  }
  goPhotos(flowNode){
      if(flowNode.name=="客户选片"&&this.orderFlow.cusRawStatus!=0){
        this.router.navigate(['/raw', this.orderFlow.photoInfoId]);
      }else if(flowNode.name=="原片精修"&&this.orderFlow.cusTruingStatus!=0){
        this.router.navigate(['/truing', this.orderFlow.photoInfoId]);
      }else {
        return
      }
  }
}
