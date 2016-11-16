import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Photo} from "./photo";
import {Scene} from "../scene/scene";
import {PhotoService} from "../../services/photos.service";
import {QINIU_DOMAIN} from "../../constant/config";
import {ActivatedRoute, Params} from "@angular/router";
import {Page} from "../../common/pagination/page";

@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService]
})
export class PhotosComponent implements OnInit {

  //排序项
  sort = {
    item: '',
    order: 'asc',
    key: ''
  }


  //是否正在加载数据
  isLoadingData = false


  //图片列表
  photoList: any [] = []


  //当前场景
  currentScene: Scene

  //是否查看大图
  isPreview: boolean = false

  //当前大图Index
  previewIndex: number


  photoInfoId: number

  page: Page = new Page()

  currentSceneId = null

  //是否显示提示
  isTip = false

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

  /**
   * 构造函数
   * @param photoService
   */
  constructor(private photoService: PhotoService,
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
  }


  afterContentLoad(){
    if(document.readyState == "complete"){
      this.photoList.map((item, index)=>{
        let height = document.getElementById('photo-item-'+item.id).offsetHeight
        console.log(height)
      })
    }
  }

  /**
   * 获取图片列表
   */
  getPhotos(): void {
    //设置正在加载数据状态
    this.isLoadingData = true

    //请求加载图片列表
    this.photoService.getPhotos(this.photoInfoId, this.currentSceneId, this.page, this.sort.key, this.sort.order).then((photos: any) => {

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
        this.loadImages(0)
      }
    })
  }



  loadImages(index){
    let image = new Image()
    let _self = this
    image.onload=function(){
      let height = image.height
      let width = image.width

      if(_self.photoCols.col1.height < _self.photoCols.col2.height){
        _self.photoCols.col1.list.push(_self.photoList[index])

        _self.photoCols.col1.height += height / width

      }else{
        _self.photoCols.col2.list.push(_self.photoList[index])

        _self.photoCols.col2.height += height / width
      }


      if(index< _self.photoList.length - 1){
        _self.loadImages(index+1)
      }else{
        _self.isLoadingData = false
      }
    }
    image.src = this.photoList[index].imgKey
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

    //设置当前原片场景
    this.currentScene = scene

    this.currentSceneId = scene.id
    //置空原片列表
    this.photoList = []
    //获取当前场景原片列表
    this.getPhotos()
  }

  /**
   * 查看当前大图
   * @param index
   */
  onPreview(index) {
    this.isPreview = true
    this.previewIndex = index
  }

  /**
   * 关闭当前大图
   */

  onClosePreview() {
    this.isPreview = false
  }

  onCloseTip(){
    this.isTip = false
  }



}
