import { describe, expect, test } from 'vitest'
import { dotsShape, nearestLinks, sphereShape } from '../src/scene/shapes'
import { fieldScale, sceneOpacity, shapeWeights, targetShapeValue } from '../src/scene/shapeTarget'

const len = (p: number[]) => Math.hypot(...p)

describe('shapes', () => {
  test('sphere points lie on the sphere', () => {
    const pts = sphereShape(64, 2.6)
    expect(pts).toHaveLength(64)
    for (const p of pts) expect(len(p)).toBeCloseTo(2.6, 6)
  })
  test('dots stay inside the box and are deterministic', () => {
    const pts = dotsShape(64, 16, 10, 4)
    expect(pts).toHaveLength(64)
    for (const [x, y, z] of pts) {
      expect(Math.abs(x)).toBeLessThanOrEqual(8)
      expect(Math.abs(y)).toBeLessThanOrEqual(5)
      expect(Math.abs(z)).toBeLessThanOrEqual(2)
    }
    expect(dotsShape(64, 16, 10, 4)).toEqual(pts)
  })
  test('links are unique pairs of different nodes', () => {
    const links = nearestLinks(sphereShape(20, 1), 2)
    const keys = links.map(([a, b]) => [Math.min(a, b), Math.max(a, b)].join('-'))
    expect(new Set(keys).size).toBe(keys.length)
    for (const [a, b] of links) expect(a).not.toBe(b)
  })
})

describe('shapeWeights', () => {
  test('pure shapes', () => {
    expect(shapeWeights(0)).toEqual([1, 0])
    expect(shapeWeights(1)).toEqual([0, 1])
  })
  test('weights in between sum to one', () => {
    const w = shapeWeights(0.5)
    expect(w[0] + w[1]).toBeCloseTo(1, 9)
  })
})

describe('sceneOpacity', () => {
  test('full on the sphere, faint (at most 0.35) once it is dots', () => {
    expect(sceneOpacity(0)).toBe(1)
    expect(sceneOpacity(1)).toBeLessThanOrEqual(0.35)
    expect(sceneOpacity(1)).toBeGreaterThan(0)
  })
})

describe('targetShapeValue', () => {
  test('next section high on screen means its shape', () => {
    expect(targetShapeValue([{ shape: 'sphere', top: -800 }, { shape: 'dots', top: 100 }], 800)).toBe(1)
  })
  test('next section still below the screen keeps the first shape', () => {
    expect(targetShapeValue([{ shape: 'sphere', top: 0 }, { shape: 'dots', top: 800 }], 800)).toBe(0)
  })
  test('no sections means sphere', () => {
    expect(targetShapeValue([], 800)).toBe(0)
  })
})

describe('fieldScale', () => {
  test('stretches the dots field to cover a tall phone screen and a wide desktop screen', () => {
    const [sx, sy] = fieldScale(6.2, 13.5, { w: 16, h: 10 })
    expect(sy).toBeGreaterThan(1.3)
    expect(sx * 16).toBeGreaterThanOrEqual(6.2)
    const [wx, wy] = fieldScale(17.7, 7.5, { w: 16, h: 10 })
    expect(wx * 16).toBeGreaterThanOrEqual(17.7)
    expect(wy * 10).toBeGreaterThanOrEqual(7.5)
  })
})
