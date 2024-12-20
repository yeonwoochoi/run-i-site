import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    this.updateSizes()

    window.addEventListener("resize", () => {
      this.updateSizes()
      this.trigger("resize")
    })
  }

  updateSizes() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2) // 화면 해상도를 2로 제한해서 최적화
  }
}
