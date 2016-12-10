import {Component, OnInit} from "@angular/core";
import {TruingService} from "../../services/truings.service";
import {QINIU_DOMAIN} from "../../constant/config";
import {ActivatedRoute, Params} from "@angular/router";
import {Page} from "../../common/pagination/page";
import {CacheService} from "../../services/cache.service";


@Component({
  selector: 'truings',
  templateUrl: 'truings.component.html',
  styleUrls: ['./truings.component.css'],
  providers: [TruingService]
})

export class TruingsComponent implements OnInit {

  //排序项
  sort = {
    item: '',
    order: 'asc',
    key: ''
  }

  //当前photoInfo
  photoInfoId = null

  //当前状态
  currentStatus = -1

  //是否正在加载数据
  isLoadingData = false

  //是否查看大图
  isPreview = false

  isPcPreview = false

  //当前大图Index
  previewIndex: number = 1

  //图片列表
  truingList: any [] = []
  tempList: any []  = []

  //加载更多组件
  page: Page = new Page()

  //显示操作成功
  isShowSuccess = false

  //是否显示PC端提示新秀
  isShowPcGuide = true

  //精修初始化信息
  truingInfo: any = {
    totalCount: 0,
    confirmPassNum: 0,
    confirmModifyNum: 0,
    unconfirmNum: 0,
    truingVersionNum: 0,
    period: 50
  }

  //精修片显示
  truingCols = {
    col1: {
      height: 0,
      list: []
    },
    col2: {
      height: 0,
      list: []
    }
  }

  totalCount = -2


  isRender = false

  isShowConfirm = false

  /**
   * 构造函数
   * @param photoService
   */
  constructor(private truingService: TruingService,
              private cacheService: CacheService,
              private route: ActivatedRoute) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.photoInfoId = +params['photoinfoid']
    });
    //缓存photoInfoId 和请求路径
    this.cacheService.setPhotoInfoId(this.photoInfoId);
    this.cacheService.setPrevUrl("/truing/" + this.photoInfoId);

    this.getPhotos()

    this.getTruingInfo()
  }

  /**
   * 获取精修片初始化状态
   */
  getTruingInfo() {
    this.truingService.getTruingInfo(this.photoInfoId).then((info: any) => {
      this.truingInfo = info
      this.truingInfo.totalCount = info.confirmPassNum + info.confirmModifyNum + info.unconfirmNum
    })
  }

  /**
   * 预览大图
   * @param index
   * @param truing
   */
  onPreview(index) {
    this.isPreview = true
    this.previewIndex = index
  }

  /**
   * 关闭预览图
   */
  onClosePreview() {
    this.isPreview = false
  }


  /**
   * PC端预览大图
   * @param index
   */
  onPcPreview(index) {
    this.isPcPreview = true
    this.previewIndex = index
  }

  onClosePcPreview() {
    this.isPcPreview = false
  }

  /**
   * 反馈建议
   */
  onRemark(remarkObj) {
    this.truingService.remark(this.photoInfoId, remarkObj.id, remarkObj.message).then((result) => {
      this.isShowSuccess = true
      if (!this.truingList[remarkObj.index].status) {
        this.truingInfo.unconfirmNum--
        this.truingInfo.confirmModifyNum++
      } else if (this.truingList[remarkObj.index].status == 2) {
        this.truingInfo.confirmPassNum--
        this.truingInfo.confirmModifyNum++
      }
      this.truingList[remarkObj.index].status = 1
      this.isPreview = false
      this.isPcPreview = false
      if (this.currentStatus > -1 && this.currentStatus != this.truingList[remarkObj.index].status) {
        if(remarkObj.isPc){
          this.truingList.splice(this.previewIndex, 1)
        }else{
          let aimDom = document.getElementById('photo-item-'+remarkObj.id).parentNode
          let aimParentDom = aimDom.parentNode
          aimParentDom.removeChild( aimDom )
        }
      } else {
        this.truingList[remarkObj.index].truings[0].remark = remarkObj.message
        remarkObj.done()
      }
    })
  }

  /**
   * 接受
   */
  onAccept(valueObj) {
    this.truingService.accept(this.photoInfoId, valueObj.id).then((result) => {
      this.isShowSuccess = true
      if (!this.truingList[valueObj.index].status) {
        this.truingInfo.unconfirmNum--
        this.truingInfo.confirmPassNum++
      } else if (this.truingList[valueObj.index].status == 1) {
        this.truingInfo.confirmModifyNum--
        this.truingInfo.confirmPassNum++
      }
      this.truingList[valueObj.index].status = 2
      this.isPreview = false
      this.isPcPreview = false
      if (this.currentStatus > -1 && this.currentStatus != this.truingList[valueObj.index].status) {

        if(valueObj.isPc){
          this.truingList.splice(this.previewIndex, 1)
        }else{
          let aimDom = document.getElementById('photo-item-'+valueObj.id).parentNode
          let aimParentDom = aimDom.parentNode
          aimParentDom.removeChild( aimDom )
        }
      } else {
        //回调函数
        valueObj.done()
      }




    })
  }


  /**
   * 获取图片列表
   */
  getPhotos(): void {
    //设置正在加载数据状态
    this.isLoadingData = true

    //请求加载图片列表
    this.truingService.getTruings(this.photoInfoId, this.page, this.sort.key, this.sort.order, this.currentStatus).then((photos: any) => {
      if (this.currentStatus === -1) {
        this.totalCount = photos.totalCount
      }
      this.page = photos;
      //设置返回数据
      let results = photos.results ? photos.results : []

      let list = []

      if (results && results.length) {
        results.map((item, index) => {
          results[index].imgKey = QINIU_DOMAIN + '/' + item.imgKey + '-300'

          results[index].truings.map((truingItem, truingIndex) => {
            results[index].truings[truingIndex].imgKey = QINIU_DOMAIN + '/' + truingItem.imgKey + '-300'
          })

          list.push(results[index])
        }, this)
        this.truingList = this.truingList.concat(list)
        this.tempList = list
        let col1 = {
          list: [],
          height: 0
        }

        let col2 = {
          list: [],
          height: 0
        }
        this.loadImages(list, 0, col1, col2)
      } else {
        this.isLoadingData = false
      }
    })
  }

  /**
   * 却换状态
   */

  onTabStatus(status) {
    if (this.currentStatus === status) {
      return
    }
    this.truingList = []
    this.truingCols = {
      col1: {
        height: 0,
        list: []
      },
      col2: {
        height: 0,
        list: []
      }
    }
    this.currentStatus = status
    this.page = new Page()
    this.getPhotos()
  }

  /**
   * 加载图片
   * @param index
   */
  loadImages(truingList: any[], index, col1, col2) {
    let image = new Image()
    image.onload = function () {
      let height = image.height
      let width = image.width

      let photo = this.tempList[index]

      photo.listIndex = this.truingList.length - this.tempList.length + index

      if (this.truingCols.col1.height + col1.height <= this.truingCols.col2.height + col2.height) {
        col1.list.push(photo)
        col1.height += height / width

      } else {
        col2.list.push(photo)
        col2.height += height / width
      }


      if (index < truingList.length - 1) {
        this.loadImages(truingList, index + 1, col1, col2)
      } else {
        this.truingCols.col1.list = this.truingCols.col1.list.concat(col1.list)
        this.truingCols.col2.list = this.truingCols.col2.list.concat(col2.list)
        this.truingCols.col1.height += col1.height
        this.truingCols.col2.height += col2.height
        this.isLoadingData = false
        document.getElementById('render').click()
      }
    }.bind(this)
    image.src = truingList[index].imgKey
  }

  render() {
    this.isRender = !this.isRender
  }

  /**
   *  提交
   */
  onFinish() {
    //还有未反馈的不允许提交
    if (this.truingInfo.unconfirmNum > 0) {
      return;
    }
    this.isShowConfirm = true
  }

  onFinishConfirm(){
    this.truingService.finish(this.photoInfoId).then((info) => {
      this.isShowConfirm = false
      this.truingInfo = info
      this.onTabStatus(-1)
    })
  }

  cancelFinish(){
    this.isShowConfirm = false
  }



  /**
   * 关闭成功提示
   */
  onCloseSuccess() {
    this.isShowSuccess = false
  }

  /**
   * 关闭PC端提示信息
   */
  onClosePcTip() {
    this.isShowPcGuide = false
  }


}
