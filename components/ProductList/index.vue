<template>
  <section class="product_list" ref="_section">
    <ul class="gallery">
      <li v-for="(project, index) in 50" :key="project.index" class="gallery_item" :onclick="revealProject">
        <p class="gallery_item_title" ref="_titleEl" data-split>AIR_{{ index }}.JPG</p>
        <figure class="gallery_item_media" ref="_mediasEl">
          <img :src="src" alt="picture" />
        </figure>
      </li>
    </ul>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

import src from '/images/01.jpg'

gsap.registerPlugin(SplitText)

const { isItemView, toggleItemView } = useItemView()

let _section = $ref(null)
let _titleEl = $ref(null)
let _mediasEl = $ref(null)
let _isAnimating = $ref(null)

const revealProject = (e) => {
  toggleItemView()

  const setTitle = useTakeTitle()
  setTitle.value = e.currentTarget.querySelector('p').textContent
}

watch(isItemView, (newValue, oldValue) => {
  if (newValue === oldValue) return

  if (newValue) {
    const lines = Array.from(_section.querySelectorAll('.line'))

    if (_isAnimating) {
      _isAnimating.kill()
      _isAnimating = null
    }

    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: 'power4' },
      onComplete: () => gsap.set(lines, { willChange: '' }),
    })

    _isAnimating = tl

    tl.addLabel('start', 0)
    tl.set(lines, { willChange: 'transform' })
    tl.set(_mediasEl, { pointerEvents: 'none' })
    tl.to(lines, { yPercent: -110 }, 'start')
    tl.to(_mediasEl, { autoAlpha: 0 }, 'start')
  } else {
    const lines = Array.from(_section.querySelectorAll('.line'))

    if (_isAnimating) {
      _isAnimating.kill()
      _isAnimating = null
    }

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: 'power3.out' },
      onComplete: () => gsap.set(lines, { willChange: '' }),
    })

    _isAnimating = tl

    tl.addLabel('start', 0)
    tl.set(lines, { willChange: 'transform' })
    tl.set(_mediasEl, { pointerEvents: '' })
    tl.to(lines, { yPercent: 0 }, 'start')
    tl.to(_mediasEl, { autoAlpha: 1, ease: 'power3' }, 'start')
  }
})

onMounted(() => {
  console.log('product list mounted')

  /* ------------ Split Text  */
  const texts = _section.querySelectorAll('[data-split]')
  texts.forEach((element) => new SplitText(element, { type: 'lines', linesClass: 'line' }))

  /* ------------ Animate In */
  gsap.from(_titleEl, {
    autoAlpha: 0,
    stagger: 0.02,
    delay: 1.2,
    duration: 1,
    ease: 'power4',
  })
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
