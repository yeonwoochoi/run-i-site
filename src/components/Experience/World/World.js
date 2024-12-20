import Experience from '../Experience.js'
import Model from './Model.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.fox = new Model()
    })
  }

  update() {
    if (this.fox) this.fox.update()
  }
}
