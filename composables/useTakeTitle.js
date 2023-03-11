export const useTakeTitle = (title) => {
  return useState('title', () => title)
}
