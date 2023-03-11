<template>
  <Sketch />

  <TheHeader />
  <slot />
</template>

<script setup>
const webglRender = useWebglRender()
</script>
