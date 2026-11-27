import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  MathUtils,
  NormalBlending,
  PerspectiveCamera,
  PointsMaterial,
} from 'three'
import { dotsShape, nearestLinks, sortByHeight, sphereShape } from './shapes'
import { fieldScale, readSections, sceneOpacity, shapeWeights, targetShapeValue } from './shapeTarget'

const NODES = 64
const RADIUS = 2.6
const PACKETS = 10
const LINK_STRENGTH = 0.42
const WIDE = 960
const FIELD = { w: 16, h: 10, depth: 4 }

function makeDot(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new CanvasTexture(canvas)
}

/** Colours and blending per theme: glowing (additive) on dark, solid gold on light. */
function themeLook() {
  const dark = document.documentElement.dataset.theme !== 'light'
  return {
    color: new Color(dark ? '#ffc21a' : '#b47c00'),
    packet: new Color(dark ? '#ffffff' : '#7a4f00'),
    blending: dark ? AdditiveBlending : NormalBlending,
  }
}

export function NetworkShape() {
  const group = useRef<Group>(null)
  const nodeMat = useRef<PointsMaterial>(null)
  const packetMat = useRef<PointsMaterial>(null)
  const { size } = useThree()
  const [look, setLook] = useState(themeLook)

  // Static data: the sphere and the dots field, the sphere's links, its neighbour lists.
  // Only the sphere has links; the dots field is just faint points.
  const data = useMemo(() => {
    const shapes = [sortByHeight(sphereShape(NODES, RADIUS)), sortByHeight(dotsShape(NODES, FIELD.w, FIELD.h, FIELD.depth))]
    const links = nearestLinks(shapes[0]!, 3).map(([a, b]) => ({ a, b }))
    const neighbours: number[][] = Array.from({ length: NODES }, () => [])
    for (const { a, b } of links) {
      neighbours[a]!.push(b)
      neighbours[b]!.push(a)
    }
    return { shapes, links, neighbours }
  }, [])

  const geo = useMemo(() => {
    const nodes = new BufferGeometry().setAttribute('position', new BufferAttribute(new Float32Array(NODES * 3), 3))
    const lines = new BufferGeometry()
      .setAttribute('position', new BufferAttribute(new Float32Array(data.links.length * 6), 3))
      .setAttribute('color', new BufferAttribute(new Float32Array(data.links.length * 8), 4))
    const packets = new BufferGeometry().setAttribute('position', new BufferAttribute(new Float32Array(PACKETS * 3), 3))
    return { nodes, lines, packets, dot: makeDot() }
  }, [data])

  const state = useRef({
    value: 0,
    opacity: '',
    spin: 0,
    time: 0,
    tilt: { x: 0, y: 0 },
    pointer: { x: 0, y: 0 },
    // Deterministic spread (no Math.random during render).
    packets: Array.from({ length: PACKETS }, (_, i) => {
      const from = (i * 37) % NODES
      const nb = data.neighbours[from]!
      return { from, to: nb[i % nb.length] ?? from, t: (i * 0.618) % 1, speed: 0.4 + ((i * 0.381) % 1) * 0.4 }
    }),
  })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      state.current.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      state.current.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onTheme = () => setLook(themeLook())
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('themechange', onTheme)
    state.current.value = targetShapeValue(readSections(), window.innerHeight)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('themechange', onTheme)
    }
  }, [])

  useFrame((frame, delta) => {
    const s = state.current
    // Keep the whole shape visible on narrow screens.
    const cam = frame.camera as PerspectiveCamera
    const z = size.width >= WIDE ? 9 : Math.max(9, 7.5 / (size.width / size.height))
    if (cam.position.z !== z) {
      cam.position.z = z
      cam.updateProjectionMatrix()
    }
    const dt = Math.min(delta, 0.05)
    s.time += dt
    s.value = MathUtils.lerp(s.value, targetShapeValue(readSections(), window.innerHeight), 1 - Math.pow(0.002, dt))
    const w = shapeWeights(s.value)
    const opacity = sceneOpacity(w[1]).toFixed(2)
    if (opacity !== s.opacity) {
      s.opacity = opacity
      document.documentElement.style.setProperty('--scene-opacity', opacity)
    }
    if (nodeMat.current) nodeMat.current.size = MathUtils.lerp(0.2, 0.13, w[1])
    if (packetMat.current) packetMat.current.opacity = w[0]

    // Mix the shapes. The sphere spins on its own; the dots drift upward slowly as you scroll.
    s.spin += dt * 0.25
    const drift = window.scrollY * 0.002
    const cos = Math.cos(s.spin)
    const sin = Math.sin(s.spin)
    const pos = geo.nodes.getAttribute('position') as BufferAttribute
    const p = pos.array as Float32Array
    const visibleH = 2 * Math.tan(MathUtils.degToRad(cam.fov / 2)) * cam.position.z
    const [sx, sy] = fieldScale(visibleH * cam.aspect, visibleH, FIELD)
    const [S, D] = data.shapes as [typeof data.shapes[0], typeof data.shapes[0]]
    for (let i = 0; i < NODES; i++) {
      const a = S[i]!
      const d = D[i]!
      // Wrap the drifting dots inside the field so they never leave the screen.
      const dy = ((((d[1] + drift + FIELD.h / 2) % FIELD.h) + FIELD.h) % FIELD.h) - FIELD.h / 2
      p[i * 3] = w[0] * (a[0] * cos - a[2] * sin) + w[1] * d[0] * sx
      p[i * 3 + 1] = w[0] * a[1] + w[1] * dy * sy
      p[i * 3 + 2] = w[0] * (a[0] * sin + a[2] * cos) + w[1] * d[2]
    }
    pos.needsUpdate = true

    // Links of every shape share one buffer; their alpha follows how active their shape is.
    const lp = (geo.lines.getAttribute('position') as BufferAttribute).array as Float32Array
    const lc = (geo.lines.getAttribute('color') as BufferAttribute).array as Float32Array
    const { color } = look
    data.links.forEach(({ a, b }, k) => {
      for (let c = 0; c < 3; c++) {
        lp[k * 6 + c] = p[a * 3 + c]!
        lp[k * 6 + 3 + c] = p[b * 3 + c]!
      }
      const alpha = w[0] * LINK_STRENGTH
      lc.set([color.r, color.g, color.b, alpha, color.r, color.g, color.b, alpha], k * 8)
    })
    geo.lines.getAttribute('position').needsUpdate = true
    geo.lines.getAttribute('color').needsUpdate = true

    // Packets hop along the sphere's links and fade out with it.
    const pp = (geo.packets.getAttribute('position') as BufferAttribute).array as Float32Array
    for (let i = 0; i < PACKETS; i++) {
      const pk = s.packets[i]!
      pk.t += pk.speed * dt
      if (pk.t >= 1) {
        const nb = data.neighbours[pk.to]!
        const options = nb.filter((n) => n !== pk.from)
        const pick = options.length ? options : nb
        pk.from = pk.to
        pk.to = pick[Math.floor(Math.random() * pick.length)] ?? pk.from
        pk.t = 0
      }
      for (let c = 0; c < 3; c++) pp[i * 3 + c] = MathUtils.lerp(p[pk.from * 3 + c]!, p[pk.to * 3 + c]!, pk.t)
    }
    geo.packets.getAttribute('position').needsUpdate = true

    // Right half on wide screens (behind the hero avatar), centred on phones.
    const g = group.current
    if (g) {
      const visibleW = 2 * Math.tan(MathUtils.degToRad(cam.fov / 2)) * cam.position.z * cam.aspect
      g.position.x = MathUtils.lerp(g.position.x, size.width >= WIDE ? visibleW * 0.24 * w[0] : 0, 0.08)
      s.tilt.x = MathUtils.lerp(s.tilt.x, s.pointer.y * 0.3, 0.05)
      s.tilt.y = MathUtils.lerp(s.tilt.y, s.pointer.x * 0.4, 0.05)
      g.rotation.x = s.tilt.x * (1 - 0.6 * w[1]) + w[0] * 0.2
      g.rotation.y = s.tilt.y * (1 - 0.6 * w[1]) + w[1] * Math.sin(s.time * 0.3) * 0.08
    }
  })

  return (
    <group ref={group}>
      <points geometry={geo.nodes}>
        <pointsMaterial ref={nodeMat} size={0.2} map={geo.dot} color={look.color} transparent depthWrite={false} blending={look.blending} />
      </points>
      <lineSegments geometry={geo.lines}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={look.blending} />
      </lineSegments>
      <points geometry={geo.packets}>
        <pointsMaterial ref={packetMat} size={0.26} map={geo.dot} color={look.packet} transparent depthWrite={false} blending={look.blending} />
      </points>
    </group>
  )
}
