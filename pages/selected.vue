<template>
  <main class="selected">
    <SelectedHero />
    <div class="foreground"></div>
  </main>
</template>

<script setup>
/* ----------- Meta */
useSimpleHead({ title: 'Selected', description: 'Awesome Website' })
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils/functions';
@import '@/assets/styles/utils/theme';
@import '@/assets/styles/shared/page';

main {
  display: block;
  width: 100%;
  height: 100%;
  background-color: theme($colors, 'white');
  overflow: hidden;
  pointer-events: none;
  z-index: z('main');

  .foreground {
    @extend %cover;
    background-color: rgba($color: #000000, $alpha: 0.8);
    opacity: 0;
    z-index: z('foreground');
  }
}
</style>
