import GSAP from 'gsap'

export function lerp(p1, p2, t) {
  return GSAP.utils.interpolate(p1, p2, t)
}

export function clamp(min, max, number) {
  return GSAP.utils.clamp(min, max, number)
}

export function random(min, max) {
  return GSAP.utils.random(min, max)
}

export function map(valueToMap, inMin, inMax, outMin, outMax) {
  return GSAP.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap)
}

export function on(events, className, handler) {
  if (Array.isArray(events)) {
    events.forEach((event) => addListener(event))
  } else {
    addListener(events)
  }

  function addListener(event) {
    document.addEventListener(
      event,
      function (e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
          if (target.classList.contains(className)) {
            handler.call(target, e)
            break
          }
        }
      },
      false,
    )
  }
}
