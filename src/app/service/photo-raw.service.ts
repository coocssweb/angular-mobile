import { Injectable } from '@angular/core';

let photoRawList : any = [
  {"id":1, "imgIndex":1,"imgKey":"FRK_3199.jpg","imgName":"FRK_3199.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":2, "imgIndex":2,"imgKey":"FRK_3200.jpg","imgName":"FRK_3200.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":1},
  {"id":3, "imgIndex":3,"imgKey":"FRK_3209.jpg","imgName":"FRK_3209.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":4, "imgIndex":4,"imgKey":"FRK_3079.jpg","imgName":"FRK_3079.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":5, "imgIndex":5,"imgKey":"FRK_3182.jpg","imgName":"FRK_3182.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":6, "imgIndex":6,"imgKey":"FRK_3087.jpg","imgName":"FRK_3087.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":7, "imgIndex":7,"imgKey":"FRK_3222.jpg","imgName":"FRK_3222.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":8, "imgIndex":8,"imgKey":"F24A7678.JPG","imgName":"F24A7678.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
  {"id":9, "imgIndex":9,"imgKey":"F24A7731.JPG","imgName":"F24A7731.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
  {"id":10, "imgIndex":10,"imgKey":"F24A7683.JPG","imgName":"F24A7683.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
];
let photoRaw2List : any = [
  {"id":6, "imgIndex":6,"imgKey":"FRK_3087.jpg","imgName":"FRK_3087.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":7, "imgIndex":7,"imgKey":"FRK_3222.jpg","imgName":"FRK_3222.jpg","imgSize":123123,"photoSceneId":1,"shootTime":"","status":0},
  {"id":8, "imgIndex":8,"imgKey":"F24A7678.JPG","imgName":"F24A7678.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
  {"id":9, "imgIndex":9,"imgKey":"F24A7731.JPG","imgName":"F24A7731.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
  {"id":10, "imgIndex":10,"imgKey":"F24A7683.JPG","imgName":"F24A7683.JPG","imgSize":123123,"photoSceneId":2,"shootTime":"","status":0},
];
let photoRawListPromise = Promise.resolve(photoRawList);

let photoRaw2ListPromise = Promise.resolve(photoRaw2List);

@Injectable()
export class PhotoRawService {

  //初选：性查询所有的原片
  getPhotoRawList() {
    return photoRawListPromise;
  }

  //细选：查询已选的原片
  getPhotoRaw2List(){
    return photoRaw2ListPromise;
  }
}

