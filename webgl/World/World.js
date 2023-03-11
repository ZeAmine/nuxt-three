import imagesLoaded from 'imagesloaded'

import Experience from '../Experience.js'
import Overview from './Overview/Overview.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.time = this.experience.time

    /* ---------- Preload Images */
    const preloadImages = (selector = 'img') => {
      return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve)
      })
    }

    /* ---------- Instantiated */
    preloadImages().then(() => {
      this.addOverview()
    })
  }

  addOverview() {
    this.overview = new Overview({
      scene: this.scene,
      camera: this.camera,
      sizes: this.sizes,
      time: this.time,
    })
  }

  resize() {
    this.overview?.resize()
  }

  update() {
    this.overview?.update()
  }
}
