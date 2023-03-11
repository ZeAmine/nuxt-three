<template>
  <header class="header" ref="_headerEl">
    <div class="wrapper">
      <h4 data-split>{{ changeTitle }}</h4>
      <h4 data-split>Book 23, Art direction & Design</h4>
      <ul class="list">
        <li class="item">
          <NuxtLink to="/" data-split>Overview</NuxtLink>
        </li>
        <li class="item">
          <NuxtLink to="/selected" data-split>Selected</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const { isItemView } = useItemView();
const getTitle = useTakeTitle();

let _headerEl = $ref(null);

const changeTitle = computed(() => {
  if (isItemView.value) {
    return getTitle.value;
  } else {
    return "Catalogued Works";
  }
});

watch(isItemView, (newValue, oldValue) => {
  if (newValue === oldValue) return;

  if (newValue) {
    const words = Array.from(_headerEl.querySelectorAll(".line"));

    gsap.set(words, { willChange: "opacity", pointerEvents: "none" });
    gsap.to(words, {
      autoAlpha: 0,
      duration: 0.7,
      ease: "expo",
      onComplete: () => gsap.set(words, { willChange: "" }),
    });
  } else {
    const words = Array.from(_headerEl.querySelectorAll(".line"));

    gsap.set(words, { willChange: "opacity", pointerEvents: "" });
    gsap.to(words, {
      autoAlpha: 1,
      stagger: 0.05,
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => gsap.set(words, { willChange: "" }),
    });
  }
});

onMounted(() => {
  /* ------------ Split Text */
  const texts = Array.from(_headerEl.querySelectorAll("[data-split]"));
  texts.map((element) => {
    new SplitText(element, { type: "lines", linesClass: "line" });
  });

  /* ------------- AnimateIn */
  const words = Array.from(_headerEl.querySelectorAll(".line"));
  gsap.from(words, {
    yPercent: 110,
    stagger: 0.05,
    duration: 1.6,
    ease: "power4.inOut",
  });
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
