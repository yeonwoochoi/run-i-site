import * as THREE from 'three'
import Experience from '../Experience.js'

/**
 * 생성자 parameter 예시
 * this.cameraModelInstance = new Model({
      modelName: 'cameraModel',
      size: { x: 1, y: 1, z: 1 }, // 예시 사이즈
      position: { x: 0, y: 1, z: 0 }, // 예시 위치
      animations: this.resources.items.cameraModel.animations,
      material: new THREE.MeshStandardMaterial({ color: 0xffffff })
    });
 */
export default class Model {
  // sources.js에서 설정한 name을 parameter로 줘야 읽을 수 있음
  constructor({
                modelName,
                size = { x: 0.1, y: 0.1, z: 0.1 },
                position = { x: 0, y: 0, z: 0 },
                animations = [],
                material = new THREE.MeshStandardMaterial()
              }) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(modelName)
    }

    // Resource
    this.resource = this.resources.items[modelName]

    this.setModel(size, position)
    this.setMaterial(material)
    this.setAnimation(animations)
  }

  setModel(size, position) {
    this.model = this.resource.scene
    this.model.scale.set(size.x, size.y, size.z)
    this.model.position.set(position.x, position.y, position.z)
    this.scene.add(this.model)
  }

  setMaterial(material) {
    this.material = material
    this.model.traverse((child) => {
      child.material = this.material
    })
  }

  setAnimation(animations) {
    this.animation = {}

    // If no animations, exit early
    if (animations.length === 0) return

    this.animation.mixer = new THREE.AnimationMixer(this.model)

    this.animation.actions = {}

    animations.forEach((clip) => {
      this.animation.action[clip.name] = this.animation.mixer.clipAction(clip)
    })

    this.animation.actions.current = animations[0]
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    // Debug
    if (this.debug.active) {
      const debugObject = animations.reduce((obj, animation) => {
        obj[`play${animation.name}`] = () => {
          this.animation.play(animation.name)
        }
        return obj
      }, {})
      Object.keys(debugObject).forEach(key => {
        this.debugFolder.add(debugObject, key)
      })
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001)
  }
}

