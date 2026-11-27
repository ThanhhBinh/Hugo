const EVENT = 'hugo:beat'

/** A small shared pulse: parts of the page that finish an animation call it, the 3D scene answers it. */
export function beat(): void {
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function onBeat(handler: () => void): () => void {
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
