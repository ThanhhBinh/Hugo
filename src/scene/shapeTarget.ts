export type ShapeName = 'sphere' | 'dots'
export const SHAPE_INDEX: Record<ShapeName, number> = { sphere: 0, dots: 1 }

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Which shape the page wants: 0 = sphere, 1 = dots, fractions in between.
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

/** How much of each shape to mix in: [sphere, dots], always summing to 1. */
export function shapeWeights(v: number): [number, number] {
  const dots = Math.min(1, Math.max(0, v))
  return [1 - dots, dots]
}

/** Opacity of the whole 3D layer: full on the hero sphere, faint behind the content. */
export function sceneOpacity(dotsWeight: number): number {
  return 1 - 0.7 * Math.min(1, Math.max(0, dotsWeight))
}

/** Read the shapes of the sections on the page (elements with data-shape). */
export function readSections(): Array<{ shape: ShapeName; top: number }> {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-shape]')).map((el) => ({
    shape: (el.dataset.shape as ShapeName) in SHAPE_INDEX ? (el.dataset.shape as ShapeName) : 'sphere',
    top: el.getBoundingClientRect().top,
  }))
}
