import gsap from 'gsap'
import * as THREE from 'three'

import fragment from '../Shaders/Overview/frag.glsl'
import vertex from '../Shaders/Overview/vert.glsl'
import src from '/texture.jpg'

export default class Media {
  constructor({ element, index, geometry, product, scene, sizes, time, group }) {
    this.scene = scene
    this.sizes = sizes
    this.time = time

    this.element = element
    this.index = index
    this.geometry = geometry
    this.group = group
    this.product = product

    this.dom = {
      image: this.element.querySelector('img'),
    }

    this.loader = new THREE.TextureLoader()
    this.isAnimating = null

    this.opacity = {
      current: 0,
      target: 0,
      ease: 0.1,
      multiplier: 1,
    }

    this.createMesh()
    this.createBounds()
  }

  createMesh() {
    this.uniforms = {
      u_time: { value: this.time },
      u_texture: { value: this.loader.load(this.dom.image.src) },
      u_position: { value: 0 },
      u_alpha: { value: 1 },
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.group.add(this.mesh)
    this.scene.add(this.group)

    /* ------------ Animation In */
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: 'expo' },
    })

    tl.from(this.uniforms.u_position, { value: -600, delay: this.index * 0.02 })
  }

  createBounds(scroll = 0, sizes) {
    const { top, left, width, height } = this.element.getBoundingClientRect()

    this.mesh.position.x = left - this.sizes.width / 2 + width / 2
    this.mesh.position.y = scroll - top + this.sizes.height / 2 - height / 2
  }

  /**
   * Animations.
   */
  show() {
    this.scene.add(this.group)
    this.uniforms.u_alpha.value = 1
  }

  hide(currentEl) {
    if (currentEl === this.element) {
      this.product.uniforms.u_texture.value = this.uniforms.u_texture.value
    }

    this.scene.remove(this.group)
    this.uniforms.u_alpha.value = 0
  }

  /**
   * Resize.
   */
  resize(scroll, sizes) {
    this.createBounds(scroll, sizes)
  }

  /**
   * Update.
   */
  update(scroll, index) {
    this.createBounds(scroll)
  }
}
