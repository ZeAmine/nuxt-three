<template>
  <section class="selected_hero" ref="_section">
    <ul class="list" ref="_listEl">
      <li v-for="(item, index) in 56" :key="index" class="item" ref="_itemEl">
        <figure class="item_media">
          <!-- <img :src="item.image" :alt="item.name" /> -->
        </figure>
      </li>
    </ul>
    <figure class="media" ref="_mediaEl">
      <!-- <img :src="data[0].image" :alt="data[0].name" /> -->
    </figure>
  </section>
</template>

<script setup>
import gsap from 'gsap'

let _section = $ref(null)
let _listEl = $ref(null)
let _itemEl = $ref(null)
let _mediaEl = $ref(null)
let _scroll = $ref({
  target: 0,
  current: 0,
  limit: 3920,
  ease: 0.05,
})

const handleScroll = (e) => {
  _scroll.target += e.deltaY

  _scroll.target = gsap.utils.clamp(0, _scroll.limit, _scroll.target)
  _scroll.current = gsap.utils.interpolate(_scroll.current, _scroll.target, _scroll.ease)

  _listEl.style.transform = `translate(-${_scroll.current}px, 0)`
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll)

  /* ---------- Animate In Images */
  const tl = gsap.timeline({
    defaults: { delay: 1, duration: 1.4, ease: 'power4' },
  })

  tl.from(_itemEl, { yPercent: -100, stagger: 0.01 }, 0)
  tl.fromTo(
    _mediaEl,
    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.6,
    },
    0,
  )
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
