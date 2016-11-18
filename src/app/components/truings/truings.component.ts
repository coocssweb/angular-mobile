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

  photoInfoId = null

  //是否正在加载数据
  isLoadingData = false

  //是否查看大图
  isPreview: boolean = false

  //当前大图Index
  previewIndex: number = 1

  //图片列表
  truingList: any [] = []

  truing: any = null

  page: Page = new Page()

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
  constructor(private truingService: TruingService,
              private route: ActivatedRoute) {
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
    this.truingService.getTruingInfo(this.photoInfoId).then((infos: any)=>{

    })
  }

  onPreview(index,truing){
    this.isPreview = true
    this.previewIndex = index
    this.truing = truing
  }

  onClosePreview(){
    this.isPreview = false
  }

  /**
   * 反馈建议
   */
  onRemark(remarkObj){
    this.truingService.remark(this.photoInfoId, remarkObj.id, remarkObj.message).then((result)=>{
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
    this.truingService.getTruings(this.photoInfoId, this.page, this.sort.key, this.sort.order).then((photos: any) => {

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

}
