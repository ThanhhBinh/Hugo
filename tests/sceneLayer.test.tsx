import { render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { SceneLayer } from '../src/scene/SceneLayer'

declare const stubMatchMedia: (m?: (q: string) => boolean) => void

describe('SceneLayer', () => {
  test('renders nothing when the visitor prefers reduced motion', () => {
    stubMatchMedia((q) => q === '(prefers-reduced-motion: reduce)')
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as RenderingContext)
    const { container } = render(<SceneLayer />)
    expect(container.firstChild).toBeNull()
  })

  test('renders nothing without WebGL', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const { container } = render(<SceneLayer />)
    expect(container.firstChild).toBeNull()
  })
})
