import * as THREE from 'three'

import fragment from '../Shaders/Product/frag.glsl'
import vertex from '../Shaders/Product/vert.glsl'

export default class Product {
  constructor({ element, scene, sizes, time }) {
    this.scene = scene
    this.sizes = sizes
    this.time = time

    this.element = element

    this.dom = {
      Image: document.querySelector('img'),
    }

    this.loader = new THREE.TextureLoader()
    this.bounds = this.element.getBoundingClientRect()
    this.isAnimating = null

    this.createMesh()
    this.createBounds()
  }

  createMesh() {
    this.uniforms = {
      u_time: { value: 0 },
      u_texture: { value: null },
      u_alpha: { value: 0 },
    }

    this.geometry = new THREE.PlaneGeometry(this.bounds.width, this.bounds.height, 20, 20)
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  createBounds() {
    this.mesh.position.x = 10 - this.sizes.width / 2 + 480 / 2
    this.mesh.position.y = 0 - 10 + this.sizes.height / 2 - 600 / 2
  }

  show() {
    setTimeout(() => {
      this.uniforms.u_alpha.value = 1
      this.scene.add(this.mesh)
    }, 300)
  }

  hide() {
    this.uniforms.u_alpha.value = 0
    this.scene.remove(this.mesh)
  }

  resize() {}

  update() {}

  destroy() {}
}
