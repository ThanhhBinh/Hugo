import { describe, expect, test } from 'vitest'
import { hShape, nearestLinks, ringShape, sphereShape } from '../src/scene/shapes'
import { shapeWeights, targetShapeValue } from '../src/scene/shapeTarget'

const len = (p: number[]) => Math.hypot(...p)

describe('shapes', () => {
  test('sphere points lie on the sphere', () => {
    const pts = sphereShape(64, 2.6)
    expect(pts).toHaveLength(64)
    for (const p of pts) expect(len(p)).toBeCloseTo(2.6, 6)
  })
  test('H points stay inside the letter bounds', () => {
    const pts = hShape(64)
    expect(pts).toHaveLength(64)
    for (const [x, y] of pts) {
      expect(Math.abs(x)).toBeLessThanOrEqual(1.5 + 1e-6)
      expect(Math.abs(y)).toBeLessThanOrEqual(2.3 + 1e-6)
    }
  })
  test('ring points lie on the ring', () => {
    for (const [x, y] of ringShape(64, 2.6)) expect(Math.hypot(x, y)).toBeCloseTo(2.6, 6)
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
    expect(shapeWeights(0)).toEqual([1, 0, 0])
    expect(shapeWeights(1)).toEqual([0, 1, 0])
    expect(shapeWeights(2)).toEqual([0, 0, 1])
  })
  test('weights in between sum to one', () => {
    const w = shapeWeights(0.5)
    expect(w[0] + w[1] + w[2]).toBeCloseTo(1, 9)
  })
})

describe('targetShapeValue', () => {
  test('next section high on screen means its shape', () => {
    expect(targetShapeValue([{ shape: 'sphere', top: -800 }, { shape: 'h', top: 100 }], 800)).toBe(1)
  })
  test('next section still below the screen keeps the first shape', () => {
    expect(targetShapeValue([{ shape: 'sphere', top: 0 }, { shape: 'h', top: 800 }], 800)).toBe(0)
  })
  test('no sections means sphere', () => {
    expect(targetShapeValue([], 800)).toBe(0)
  })
})
