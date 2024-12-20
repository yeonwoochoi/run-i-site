import * as dat from 'lil-gui'

export default class Debug {
  constructor() {
    this.active = window.local.hash === "#debug"

    if (this.active) {
      this.ui = new dat.GUI()
    }
  }
}
