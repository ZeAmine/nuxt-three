import * as THREE from 'three'

import Experience from './Experience.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
  }

  setInstance() {
    const fov = 2 * Math.atan(this.sizes.height / 2 / 600) * (180 / Math.PI)
    this.instance = new THREE.PerspectiveCamera(fov, this.sizes.width / this.sizes.height, 10, 1000)
    this.instance.position.set(0, 0, 600)
    this.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {}
}
