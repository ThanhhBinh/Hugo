export type ShapeName = 'sphere' | 'h' | 'ring'
export const SHAPE_INDEX: Record<ShapeName, number> = { sphere: 0, h: 1, ring: 2 }

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Which shape the page wants: 0 = sphere, 1 = H, 2 = ring, fractions in between.
 * The shape of the next section blends in while its top moves from 90% to 35% of the screen.
 */
export function targetShapeValue(sections: Array<{ shape: ShapeName; top: number }>, viewportH: number): number {
  if (!sections.length) return 0
  let value = SHAPE_INDEX[sections[0]!.shape]
  for (let i = 1; i < sections.length; i++) {
    const prev = SHAPE_INDEX[sections[i - 1]!.shape]
    const next = SHAPE_INDEX[sections[i]!.shape]
    value += (next - prev) * smoothstep(viewportH * 0.9, viewportH * 0.35, sections[i]!.top)
  }
  return value
}

/** How much of each shape to mix in: [sphere, H, ring], always summing to 1. */
export function shapeWeights(v: number): [number, number, number] {
  const sphere = Math.min(1, Math.max(0, 1 - v))
  const ring = Math.min(1, Math.max(0, v - 1))
  return [sphere, 1 - sphere - ring, ring]
}

/** Read the shapes of the sections on the page (elements with data-shape). */
export function readSections(): Array<{ shape: ShapeName; top: number }> {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-shape]')).map((el) => ({
    shape: (el.dataset.shape as ShapeName) in SHAPE_INDEX ? (el.dataset.shape as ShapeName) : 'sphere',
    top: el.getBoundingClientRect().top,
  }))
}
