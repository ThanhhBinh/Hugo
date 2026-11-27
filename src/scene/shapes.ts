// Point sets for the 3D scene. Every shape has the same number of points, so a
// point can travel from one shape to the next.

export type Vec3 = [number, number, number]

/** Points spread evenly over a sphere (Fibonacci spiral). */
export function sphereShape(n: number, r: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    return [Math.cos(golden * i) * ring * r, y * r, Math.sin(golden * i) * ring * r]
  })
}

const H_STROKES: Array<[[number, number], [number, number]]> = [
  [[-1.5, -2.3], [-1.5, 2.3]], // left bar
  [[1.5, -2.3], [1.5, 2.3]], // right bar
  [[-1.5, 0], [1.5, 0]], // cross bar
]

/** Points along the three strokes of an "H", in two layers (z = ±0.35) for depth. */
export function hShape(n: number): Vec3[] {
  const lengths = H_STROKES.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]))
  const total = lengths.reduce((s, l) => s + l, 0)
  const front = Math.floor(n / 2)
  const points: Vec3[] = []
  for (const [count, z] of [[front, -0.35], [n - front, 0.35]] as const) {
    for (let i = 0; i < count; i++) {
      // Walk along all strokes as if they were one long line.
      let d = ((i + 0.5) / count) * total
      let s = 0
      while (s < H_STROKES.length - 1 && d > lengths[s]!) d -= lengths[s++]!
      const [a, b] = H_STROKES[s]!
      const t = Math.min(1, d / lengths[s]!)
      points.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z])
    }
  }
  return points
}

/** Points on a flat ring, alternating slightly in depth. */
export function ringShape(n: number, r: number): Vec3[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    return [Math.cos(a) * r, Math.sin(a) * r, i % 2 ? 0.18 : -0.18]
  })
}

/** Sort by height so every point makes a short, tidy trip between shapes. */
export function sortByHeight(points: Vec3[]): Vec3[] {
  return points.slice().sort((p, q) => p[1] - q[1] || p[0] - q[0])
}

/** Connect each point to its k nearest neighbours. Returns unique pairs. */
export function nearestLinks(points: Vec3[], k: number): Array<[number, number]> {
  const seen = new Set<string>()
  const links: Array<[number, number]> = []
  points.forEach((p, i) => {
    points
      .map((q, j) => ({ j, d: (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          links.push([i, j])
        }
      })
  })
  return links
}
