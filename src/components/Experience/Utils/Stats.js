import StatsLibrary from 'stats.js';

export default class Stats {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.activate();
    }
  }

  activate() {
    this.instance = new StatsLibrary(); // StatsLibrary 사용
    this.instance.showPanel(0);
    document.body.appendChild(this.instance.dom);
  }

  update() {
    if (this.instance) {
      this.instance.update(); // 프레임 업데이트
    }
  }

  beforeRender() {
    if (this.instance) {
      this.instance.begin();
    }
  }

  afterRender() {
    if (this.instance) {
      this.instance.end();
    }
  }
}
