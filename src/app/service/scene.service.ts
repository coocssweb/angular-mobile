import { Injectable } from '@angular/core';

export class Scene {
  constructor(public id: number,
              public sceneName: string,
              public rawNum:number
  ) { }
}


let SCENES = [
  new Scene(1, '海边',10),
  new Scene(2, '室内',20),
  new Scene(3, '公园',10),
  new Scene(4, '游艇',10)
];

let scenesPromise = Promise.resolve(SCENES);

@Injectable()
export class SceneService {
  getScenes() { return scenesPromise; }

  getScene(id: number | string) {
    return scenesPromise
      .then(scenes => scenes.find(scene => scene.id === +id));
  }
}

