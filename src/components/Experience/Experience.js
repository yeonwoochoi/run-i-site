import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Light from './World/Light.js'
import Resources from './Utils/Resources.js'
import Stats from './Utils/Stats.js'

import sources from './sources.js'

let instance = null

export default class Experience {
  constructor(_canvas) {
    /**Singleton */
    if (instance) {
      return instance
    }
    instance = this

    /**Global Access */
    window.experience = this

    /**Canvas*/
    this.canvas = _canvas

    /**Setup Classes */
    this.scene = new THREE.Scene()
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.stats = new Stats()
    this.light = new Light()

    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())

    this.light.createLight('AmbientLight', {
      color: 0xffffff,
      intensity: 0.5,
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    /**Begin analyzing frame */
    this.stats.active && this.stats.beforeRender()

    /**update everything */
    this.camera.update()
    this.world.update()
    this.renderer.update()

    /**Finish analyzing frame */
    this.stats.active && this.stats.afterRender()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // 장면(scene)을 순회하며 모든 자식 객체를 검사하면서 GPU에서 해제
    // texture, material, geometry 등 객체는 GPU에 데이터를 업로드하는데 자동해제되지 않기 때문에 직접 Dispose해주는거
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Mesh 객체의 geometry 데이터를 메모리에서 해제
        child.geometry.dispose()

        // Mesh 객체의 material 을 순회하며 각각의 속성을 검사
        for (const key in child.material) {
          const value = child.material[key]

          // 각 속성이 dispose 메서드를 가지는지 확인
          if (value && typeof value.dispose === 'function') {
            // 메모리에서 해당 속성의 데이터를 해제
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.ui.destroy()
    }

    if (this.stats.active) {
      this.stats.ui.destroy()
    }
  }
}
