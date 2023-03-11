export default ({ title, description }) => {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },

      { property: 'og:title', content: title },
      { property: 'og:description', content: description },

      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },

      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  })
}
