<template>
  <div class="product" :onclick="onClick" ref="_section">
    <div class="wrapper">
      <figure class="media" ref="_mediaEl">
        <img :src="picture" alt="product" />
      </figure>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

import picture from '/images/01.jpg'

gsap.registerPlugin(SplitText)

const { isItemView, toggleItemView } = useItemView()
let _section = $ref(null)
let _mediaEl = $ref(null)
let _isAnimating = $ref(null)

const onClick = () => {
  if (!isItemView.value) return

  toggleItemView()
}

// watch(isItemView, (newValue, oldValue) => {
//   if (newValue === oldValue) return

//   if (newValue) {
//     _section.style.opacity = 1
//   } else {
//     _section.style.opacity = 0
//   }
// })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

<!-- 
  if (_isAnimating) {
   _isAnimating.kill()
    _isAnimating = null
   }

   const tl = gsap.timeline({
     defaults: { delay: 0.4, duration: 0.7, ease: 'power3' },
   })

   _isAnimating = tl

  tl.to(_section, { autoAlpha: 1 }) 
-->
