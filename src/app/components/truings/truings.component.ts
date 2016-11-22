import {Component, OnInit, ViewChild} from "@angular/core";
import {TruingService} from "../../services/truings.service";
import {QINIU_DOMAIN} from "../../constant/config";
import {ActivatedRoute, Params} from "@angular/router";
import {Page} from "../../common/pagination/page";


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

  //加载更多组件
  page: Page = new Page()

  //显示操作成功
  isShowSuccess = false

  //是否显示PC端提示新秀
  isShowPcGuide = true

  //统计信息
  statistics: any = {
    totalCount: 0,
    confirmCount: 0,
    modifyCount: 0,
    unConfirmCount: 0
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

  /**
   * 构造函数
   * @param photoService
   */
  constructor(private truingService: TruingService, private route: ActivatedRoute) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.photoInfoId = +params['photoinfoid']
    });

    this.getPhotos()

    this.getTruingInfo()
  }

  /**
   * 获取精修片列表
   */
  getTruingInfo(){
    this.truingService.getTruingInfo(this.photoInfoId).then((info: any)=>{
      this.statistics = {
        totalCount: info.confirmPassNum + info.confirmModifyNum + info.unconfirmNum,
        confirmCount: info.confirmPassNum,
        modifyCount: info.confirmModifyNum,
        unConfirmCount: info.unconfirmNum
      }
    })
  }

  /**
   * 预览大图
   * @param index
   * @param truing
   */
  onPreview(index){
    this.isPreview = true
    this.previewIndex = index
  }

  /**
   * 关闭预览图
   */
  onClosePreview(){
    this.isPreview = false
  }


  /**
   * PC端预览大图
   * @param index
     */
  onPcPreview(index){
    this.isPcPreview =  true
    this.previewIndex = index
  }

  onClosePcPreview(){
    this.isPcPreview = false
  }

  /**
   * 反馈建议
   */
  onRemark(remarkObj){
    this.truingService.remark(this.photoInfoId, remarkObj.id, remarkObj.message).then((result)=>{
      this.isShowSuccess = true
      if(!this.truingList[remarkObj.index].status){
        this.statistics.unConfirmCount--
        this.statistics.modifyCount++
      }

      this.truingList[remarkObj.index].status = 1
      this.truingList[remarkObj.index].truings[0].remark = remarkObj.message
      remarkObj.done()
    })
  }

  /**
   * 接受
   */
  onAccept(valueObj){
    this.truingService.accept(this.photoInfoId, valueObj.id).then((result)=>{
      this.truingList[valueObj.index].status = 2
      this.isShowSuccess = true
      if(!this.truingList[valueObj.index].status){
        this.statistics.unConfirmCount--
        this.statistics.confirmCount++
      }else if(this.truingList[valueObj.index].status == 1){
        this.statistics.modifyCount --
        this.statistics.confirmCount++
      }

      //回调函数
      valueObj.done()
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

      this.page = photos;
      //设置返回数据
      let results = photos.results ? photos.results : []

      let list = []

      if (results && results.length) {
        results.map((item, index)=> {
          results[index].imgKey = QINIU_DOMAIN + '/' + item.imgKey + '-300'

          results[index].truings.map((truingItem, truingIndex)=>{
            results[index].truings[truingIndex].imgKey = QINIU_DOMAIN + '/' + truingItem.imgKey + '-300'
          })

          list.push(results[index])
        }, this)
        this.truingList = this.truingList.concat(list)
        this.loadImages(0)
      }else{
        this.isLoadingData = false
      }
    })
  }

  /**
   * 却换状态
   */

  onTabStatus(status){
    if(this.currentStatus === status){
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
  loadImages(index){
    let image = new Image()
    let _self = this
    image.onload=function(){
      let height = image.height
      let width = image.width

      let photo = _self.truingList[index]
      photo.listIndex = index

      if(_self.truingCols.col1.height <= _self.truingCols.col2.height){
        _self.truingCols.col1.list.push(photo)
        _self.truingCols.col1.height += height / width

      } else {
        _self.truingCols.col2.list.push(photo)
        _self.truingCols.col2.height += height / width
      }

      if(index< _self.truingList.length - 1){
        _self.loadImages(index+1)
      }else{
        _self.isLoadingData = false
      }
    }
    image.src = this.truingList[index].imgKey
  }

  /**
   *  提交
   */
  onFinish(){
    this.truingService.finish(this.photoInfoId).then((result)=>{
      this.isShowSuccess = true
    })
  }

  /**
   * 关闭成功提示
   */
  onCloseSuccess(){
    this.isShowSuccess = false
  }

  /**
   * 关闭PC端提示信息
   */
  onClosePcTip(){
    this.isShowPcGuide = false
  }



}
