export const useWebglApp = (object) => {
  const webglApp = useState('webglApp', () => object)

  return { webglApp }
}
