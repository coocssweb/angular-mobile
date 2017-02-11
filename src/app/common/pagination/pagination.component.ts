import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Page} from "./page";

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  @Input() page: Page

  // 分页样式 loadmore:移动端分页  simple:pc端简单分页
  @Input() style: string = 'loadmore'

  // 是否正在加载数据
  @Input() loadingData: boolean = false

  //confirm框确认事件回调
  @Output() loadMore = new EventEmitter()

  ngOnInit(): void {
    this.addScrollListener();
  }

//确认事件
  onLoadMore() {
    if (this.page.hasNextPage) {
      this.page.pageNo += 1;
      this.loadMore.emit()
    }
  }

  addScrollListener() {
    let _self = this
    //由于选片精修只在outlet中滚动，因此需要监听该element的事件
    document.getElementById("list-content").onscroll = function () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = window.innerHeight
      // console.log(windowHeight + " " + document.body.clientHeight + " " + this.page.hasNextPage + " " + this.loadingData)
      if (scrollTop + windowHeight + 10 >= document.body.clientHeight && this.page.hasNextPage && !this.loadingData) {
        //不能直接调用onLoadMore方法，直接调用页面无效果
        document.getElementById('loadMoreBtn').click()
      }
    }.bind(this)



    document.getElementById("outlet").onscroll = function () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = window.innerHeight
      // console.log(windowHeight + " " + document.body.clientHeight + " " + this.page.hasNextPage + " " + this.loadingData)
      if (scrollTop + windowHeight + 10 >= document.body.clientHeight && this.page.hasNextPage && !this.loadingData) {
        //不能直接调用onLoadMore方法，直接调用页面无效果
        document.getElementById('loadMoreBtn').click()
      }
    }.bind(this)
  }

}
