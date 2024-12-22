import Experience from '../Experience.js'
import Model from './Model.js'
import {MeshStandardMaterial} from "three";

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.model = new Model({
        modelName: 'cameraModel',
        size: { x: 1, y: 1, z: 1 },
        position: { x: 0, y: -1.5, z: 0 }
      })
    })
  }

  update() {
    if (this.model) this.model.update()
  }
}
