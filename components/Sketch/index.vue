<template>
  <canvas id="webgl" ref="_canvas" />
</template>

<script setup>
import Sketch from '@/webgl/Experience'

// stocker le webgl dans l'app ??
let { $webgl } = useNuxtApp()

// stocker le webgl dans un composable ??
let { webglApp } = useWebglApp()

let _canvas = $ref(null)

onMounted(() => {
  webglApp.value = new Sketch(_canvas)
})

onBeforeUnmount(() => {
  if (webglApp.value) {
    webglApp.value.destroy()
    webglApp.value = null
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils/functions';

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: z('canvas');
}
</style>
