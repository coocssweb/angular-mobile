import { Component,OnInit } from '@angular/core';
import {ShopService} from "./shop.service";
@Component({
  selector: 'shop',
  templateUrl: 'shop.component.html',
  styleUrls: ['shop.component.css'],
  providers: [ShopService]
})
export class ShopComponent implements OnInit {

  private shops : any[]=[]
  //是否正在加载数据
  isLoadingData = false

  /**
   * 构造函数
   * @param rawService
   */
  constructor(private shopService:ShopService) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.getShops()
  }

  getShops(){
    this.isLoadingData = true
    this.shopService.getShops().then((resp:any)=>{
      this.shops = resp
      this.isLoadingData = false
    })
  }
}
