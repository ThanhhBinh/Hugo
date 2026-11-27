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

/** A scattered field of points filling a w × h × depth box (low-discrepancy, so no random and no clumps). */
export function dotsShape(n: number, w: number, h: number, depth: number): Vec3[] {
  return Array.from({ length: n }, (_, i) => {
    const k = i + 1
    return [
      (((k * 0.7548776662466927) % 1) - 0.5) * w,
      (((k * 0.5698402909980532) % 1) - 0.5) * h,
      (((k * 0.4301597090019468) % 1) - 0.5) * depth,
    ]
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
