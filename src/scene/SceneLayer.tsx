import { Component, lazy, Suspense, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Scene = lazy(() => import('./Scene'))

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** If the 3D code fails for any reason, show nothing: the page works without it. */
class SilentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/** Fixed, full-screen layer behind the content that holds the 3D scene. */
export function SceneLayer() {
  const reduced = useReducedMotion()
  const [webgl] = useState(hasWebGL)
  if (reduced || !webgl) return null

  return (
    <div className="scene-layer" aria-hidden="true">
      <SilentBoundary>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </SilentBoundary>
    </div>
  )
}
