import { Canvas } from '@react-three/fiber'
import { NetworkShape } from './NetworkShape'

/** The WebGL canvas. Loaded lazily so the text shows up first. */
export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 45, position: [0, 0, 9], near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
    >
      <NetworkShape />
    </Canvas>
  )
}
