import * as THREE from 'three'
import { clamp, lerp } from '~~/webgl/Utils/Math'

import Media from './Media'
import Product from './Product'

export default class Overview {
  constructor({ scene, camera, sizes, time }) {
    this.scene = scene
    this.camera = camera.instance
    this.sizes = sizes
    this.time = time

    this.dom = {
      body: document.body,
      productDiv: document.querySelector('.product'),
      productMedia: document.querySelector('.product figure'),
      medias: Array.from(document.querySelectorAll('.gallery_item_media')),
    }

    this.group = new THREE.Group()
    this.isVisible = false

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: 0.07,
    }

    this.createGeometry()
    this.createProduct()
    this.createMedia()
    this.bindEvents()
  }

  createGeometry() {
    const bounds = this.dom.medias[0].getBoundingClientRect()
    this.geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 20, 20)
  }

  createProduct() {
    this.product = new Product({
      element: this.dom.productMedia,
      scene: this.scene,
      sizes: this.sizes,
      time: this.time,
    })
  }

  createMedia() {
    this.medias = this.dom.medias.map((element, index) => {
      return new Media({
        element,
        index,
        geometry: this.geometry,
        product: this.product,
        group: this.group,
        scene: this.scene,
        sizes: this.sizes,
        time: this.time,
      })
    })
  }

  /**
   * Events.
   */
  onScroll(e) {
    this.scroll.target += e.deltaY * 0.4
  }

  show(e) {
    this.isVisible = true

    this.scroll.target = 0
    this.scroll.current = 0

    this.dom.body.style.overflow = 'visible'
    this.medias.forEach((media) => media.show())
    this.dom.productDiv.classList.remove('is-active')
    this.product.hide()
  }

  hide(e) {
    this.isVisible = false

    this.currentEl = e.currentTarget

    this.dom.body.style.overflow = 'hidden'
    this.medias.forEach((media) => media.hide(this.currentEl))
    this.dom.productDiv.classList.add('is-active')
    this.product.show()
  }

  /**
   * Listeners.
   */
  bindEvents() {
    window.addEventListener('wheel', this.onScroll.bind(this))

    this.medias.map((media) => {
      media.element.addEventListener('click', this.hide.bind(this))
    })

    this.dom.productDiv.addEventListener('click', this.show.bind(this))
  }

  /**
   * Resize.
   */
  resize() {
    this.medias.forEach((media) => media.resize(this.scroll.current, this.sizes))
  }

  /**
   * Update.
   */
  update() {
    this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target)
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    this.scroll.current = Math.floor(this.scroll.current * 100) / 100

    this.medias.forEach((media, index) => media.update(this.scroll.current, index))
  }

  /**
   * Destroy.
   */
  destroy() {
    this.scene.removeChild(this.group)
  }
}
