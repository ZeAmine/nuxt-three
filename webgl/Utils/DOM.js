export const DOMScale = (
  size = { x: window.innerWidth, y: window.innerHeight },
  screen = { x: window.innerWidth, y: window.innerHeight },
) => {
  const x = size.x / screen.x
  const y = size.y / screen.y

  return { x, y, z: 1 }
}

export const DOMPosition = (
  pos = { x: 0, y: 0 },
  screen = { x: window.innerWidth, y: window.innerHeight },
  scale = { x: 1, y: 1 },
) => {
  const x = pos.x - screen.x / 2 + scale.x / 2
  const y = -pos.y + screen.y / 2 - scale.y / 2

  return { x, y }
}
