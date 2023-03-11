export default defineNuxtPlugin(() => {
  let app = $ref(null)

  return {
    provide: {
      webgl: app,
    },
  }
})
