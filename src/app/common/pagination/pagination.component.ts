import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Page} from "./page";

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  @Input() page: Page

  @Input() style: string = 'loadmore'

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
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = window.innerHeight
      if (scrollTop + windowHeight == document.body.clientHeight && this.page.hasNextPage && !this.loadingData) {
        //不能直接调用onLoadMore方法，直接调用页面无效果
        document.getElementById('loadMoreBtn').click()
      }
    }.bind(this)
  }

}
