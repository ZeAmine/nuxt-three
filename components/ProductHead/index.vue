<template>
  <section class="product_head" ref="_section">
    <div class="wrapper">
      <div class="title">
        <h1>
          <div data-split>Overview</div>
          <br />
          <div data-split>50 Images</div>
        </h1>
      </div>
      <div class="title">
        <h1>
          <div data-split>2014 -</div>
          <br />
          <div data-split>Ongoing</div>
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

let _section = $ref(null)
let _isAnimating = $ref(null)

const { isItemView } = useItemView()

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

    tl.set(lines, { willChange: 'transform' })
    tl.to(lines, { yPercent: -110 })
  } else {
    const lines = Array.from(_section.querySelectorAll('.line'))

    if (_isAnimating) {
      _isAnimating.kill()
      _isAnimating = null
    }

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: 'power3' },
      onComplete: () => gsap.set(lines, { willChange: '' }),
    })

    _isAnimating = tl

    tl.set(lines, { willChange: 'transform' })
    tl.to(lines, { yPercent: 0 })
  }
})

onMounted(() => {
  /* ------------ Split Text */
  const texts = Array.from(_section.querySelectorAll('[data-split]'))
  texts.forEach((texts) => new SplitText(texts, { type: 'lines', linesClass: 'line' }))

  /* ------------ AnimateIn */
  const lines = Array.from(_section.querySelectorAll('.line'))

  if (_isAnimating) {
    _isAnimating.kill()
    _isAnimating = null
  }

  const tl = gsap.timeline({
    defaults: { delay: 0.2, duration: 1.8, ease: 'power4.inOut' },
    onComplete: () => gsap.set(element, { willChange: '' }),
  })

  _isAnimating = tl

  tl.set(element, { willChange: 'transform' })
  tl.from(element, { yPercent: 110, stagger: 0.01 })
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
