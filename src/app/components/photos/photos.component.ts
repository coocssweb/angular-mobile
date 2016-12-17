import {Component, OnInit, ViewChild} from "@angular/core";
import {Scene} from "../scene/scene";
import {PhotoService} from "../../services/photos.service";
import {SceneFormComponent} from "../scene/scene-form.component";
import {QINIU_DOMAIN} from "../../constant/config";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Page} from "../../common/pagination/page";
import {CacheService} from "../../services/cache.service";
import {ViewerComponent} from '../viewer/viewer.component'
import {PCViewerComponent} from '../pc-viewer/pc-viewer.component'

@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService]
})

export class PhotosComponent implements OnInit {
  @ViewChild(SceneFormComponent)
  sceneFormComponent: SceneFormComponent

  @ViewChild(PCViewerComponent)
  pCViewerComponent: PCViewerComponent

  @ViewChild(ViewerComponent)
  viewerComponent: ViewerComponent

  //排序项
  sort = {
    item: '',
    order: 'asc',
    key: ''
  }
  //当前状态 初选/精选
  currentStatus:string = ''

  //是否正在加载数据
  isLoadingData = false

  //图片列表
  photoList: any [] = []

  tempList: any[] = []

  //当前场景
  currentScene: Scene

  //是否查看大图
  isPreview: boolean = false

  //是否正在查看PC大图
  isPcPreview: boolean = false

  isShowConfirm: boolean = false

  isShowConfirmFinish: boolean = false

  isShowOverChoose: boolean = false

  isShowOkTip: boolean = false

  isShowOverTip: boolean = false

  photoIndex = -1

  //当前大图Index
  previewIndex: number

  //订单号
  photoInfoId: number

  //分页信息
  page: Page = new Page()

  //当前场景ID
  currentSceneId = null

  //是否显示提示
  isShowGuide = true

  isShowTip = false

  //是否显示PC端提示信息
  isShowPcGuide = true

  //是否显示成功提示
  isShowSuccess = false

  //瀑布布局
  photoCols = {
    col1: {
      height: 0,
      list: []
    },
    col2: {
      height: 0,
      list: []
    }
  }

  rawInfo: any = {
    busRawStatus: 1,
    cusRawStatus: 2,
    truingImgNum: 0,
    truingPrice: 0
  }

  isRender = false

  /**
   * 构造函数
   * @param photoService
   */
  constructor(private photoService: PhotoService,
              private cacheService:CacheService,
              private route: ActivatedRoute, private router: Router) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.photoInfoId = +params['photoinfoid'];
      this.currentStatus = +params['status']? params['status'] : ''
    });

    //缓存photoInfoId 和请求路径
    this.cacheService.setPhotoInfoId(this.photoInfoId);
    this.cacheService.setPrevUrl("/raw/" + this.photoInfoId);

    if(document.getElementById('html').offsetWidth > 769){
      this.isShowGuide = false
    }

    if(this.currentStatus === '1'){
      this.isShowGuide = false
    }

    this.getPhotos();
    this.photoService.getRawInfo(this.photoInfoId).then((result)=>{
      Object.assign(this.rawInfo, result)
    })
  }


  /**
   * 获取图片列表
   */
  getPhotos(): void {
    //设置正在加载数据状态
    this.isLoadingData = true

    //请求加载图片列表
    this.photoService.getPhotos(this.photoInfoId, this.currentSceneId, this.currentStatus, this.page, this.sort.key, this.sort.order).then((photos: any) => {

      this.page = photos;
      //设置返回数据
      let results = photos.results ? photos.results : []

      let list = []

      if (results && results.length) {
        results.map((item, index)=> {
          results[index].imgKey = QINIU_DOMAIN + '/' + item.imgKey + '-300'
          list.push(results[index])
        }, this)
        this.photoList = this.photoList.concat(list)
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
      }else{
        this.isLoadingData = false
      }

    })
  }

  loadImages(photoList: any[], index, col1, col2){
    let image = new Image()

    image.onload=function(){
      let height = image.height
      let width = image.width

      let photo = this.tempList[index]
      photo.listIndex = this.photoList.length - this.tempList.length + index

      if(this.photoCols.col1.height + col1.height <= this.photoCols.col2.height + col2.height){
        col1.list.push(photo)
        col1.height += height / width
      }else{
        col2.list.push(photo)
        col2.height += height / width
      }

      if(index < photoList.length - 1){
        this.loadImages(photoList, index+1, col1, col2)
      }else{

        this.photoCols.col1.list = this.photoCols.col1.list.concat(col1.list)
        this.photoCols.col2.list = this.photoCols.col2.list.concat(col2.list)

        this.photoCols.col1.height += col1.height
        this.photoCols.col2.height += col2.height
        this.isLoadingData = false
        document.getElementById('render').click()

      }
    }.bind(this)

    image.src = this.tempList[index].imgKey
  }


  render(){
    this.isRender = !this.isRender
  }

  /**
   * 切换原片场景
   * @param mold
   */
  onTabSceneCb(scene) {
    //选择当前场景
    if (this.currentScene && scene.id === this.currentScene.id) {
      return
    }

    this.page = new  Page()

    //设置当前原片场景
    this.currentScene = scene

    this.currentSceneId = scene.id
    //置空原片列表
    this.photoList = []

    this.photoCols = {
      col1: {
        height: 0,
        list: []
      },
      col2: {
        height: 0,
        list: []
      }
    }

    //获取当前场景原片列表
    this.getPhotos()
  }

  /**
   * 查看当前大图
   * @param index
   */
  onPreview(index, photo) {
    this.isPreview = true
    this.previewIndex = index
  }

  /**
   * 关闭当前大图
   */
  onClosePreview() {
    this.isPreview = false
  }


  /**
   * Pc端预览大图
   * @param index
   * @param photo
     */
  onPcPreview(index){
    this.isPcPreview = true
    this.previewIndex = index
  }

  /**
   * 关闭Pc端预览图片
   */
  onClosePcPreview(){
    this.isPcPreview = false
  }

  /**
   * 关闭提示框
   */
  onCloseTip(){
    this.isShowGuide = false
    this.isShowTip = false
  }

  onClosePcTip(){
    this.isShowPcGuide = false
  }

  /**
   * 关闭成功提示
   * @param photo
   */

  onCloseSuccess(){
    this.isShowSuccess = false
  }

  //原片选中
  onChoose(index){

    this.photoIndex = index
    if(this.currentStatus ==='1'){
      this.isShowConfirm = true
    } else {
      this.deleteConfirm('')
    }
  }

  /**
   * 进入精选
   */
  onNext(){
    if(this.sceneFormComponent.checkedNum<this.rawInfo.truingImgNum){
      return
    }else if(this.sceneFormComponent.checkedNum === this.rawInfo.truingImgNum){
      this.isShowOkTip = true
    }else{
      this.isShowOverTip = true
    }
  }

  /**
   * 确认提交
   */
  onFinish(){
    if(this.sceneFormComponent.checkedNum < this.rawInfo.truingImgNum){
      return
    }else if(this.sceneFormComponent.checkedNum>this.rawInfo.truingImgNum){
      this.isShowOverChoose = true
    }else{
      this.isShowConfirmFinish = true
    }
  }

  cancelFinish(){
    this.isShowConfirmFinish = false
  }

  confirmFinish(){
    this.photoService.finish(this.photoInfoId).then((result)=>{
      this.isShowConfirmFinish = false
      this.isShowOverChoose = false
      Object.assign(this.rawInfo, result)
      this.sceneFormComponent.getScenes()
    })
  }

  onBack(){
    this.router.navigate(['/raw', this.photoInfoId])
  }

  deleteConfirm(device){

    let index = this.photoIndex

    let photo = this.photoList[index]

    let status = photo.status == 1 ? 0 : 1

    this.photoService.check(this.photoInfoId, photo.id, status).then((result)=>{
      //重新获取场景信息
      this.sceneFormComponent.getScenes()
      photo.status = status
      //显示成功提示
      this.isShowSuccess = true


      //进入精选删除逻辑
      if(this.currentStatus == '1'){
        //删除最后一张图片,强制关闭大图查看器
        if(index === this.photoList.length - 1){
          this.isPcPreview = false
          this.isPreview = false
        }

        //从照片列表内一处内容

        if(device === "pc"){
          this.photoList.splice(index, 1)

          if(this.isPcPreview){
            this.pCViewerComponent.onNext()
          }

        }else if(this.isPreview){
          this.viewerComponent.onNext()
        }


        let aimDom = document.getElementById('photo-item-'+photo.id).parentNode
        let aimParentDom = aimDom.parentNode

        aimParentDom.removeChild( aimDom )

        //判断是否显示  提示剩余数量刚好等于 要求数量
        if(this.sceneFormComponent.checkedNum -1 === this.rawInfo.truingImgNum ){
          this.isShowTip = true
        }

      }

      //关闭删除确认框
      this.isShowConfirm = false
    })
  }

  deleteCancel(){
    this.isShowConfirm = false
  }

  cancelOverChoose(){
    this.isShowOverChoose = false
  }
  onCloseOkChoose(){
    this.isShowOkTip = false
    this.isShowOverTip = false
    this.router.navigate(['/raw/'+this.photoInfoId+"/", 1])
  }

  /**
   * 反馈建议
   */
  onRemark(remarkObj) {
    this.photoService.remark(this.photoInfoId, remarkObj.id, remarkObj.remark).then((result) => {
      this.isShowSuccess = true
      remarkObj.done()
    })
  }

}
