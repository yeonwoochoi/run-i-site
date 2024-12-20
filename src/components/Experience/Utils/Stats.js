import Stats from "three/examples/jsm/libs/stats.module"

export default class Stats {
  constructor() {
    this.active = window.location.hash === "#debug"

    if (this.active) {
      this.activate()
    }
  }

  activate() {
    this.instance = new Stats();
    this.instance.showPanel(0);
    document.body.appendChild(this.instance.dom)
  }

  update() {
    this.instance.update(); // 프레임 업데이트
  }

  beforeRender() {
    this.instance.begin()
  }

  afterRender() {
    this.instance.end();
  }
}
