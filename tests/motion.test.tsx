import { act, render, renderHook, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { Terminal } from '../src/components/ui/Terminal'
import { useCountUp } from '../src/hooks/useCountUp'
import { beat, onBeat } from '../src/lib/beat'

declare const stubMatchMedia: (m?: (q: string) => boolean) => void
const reduce = () => stubMatchMedia((q) => q === '(prefers-reduced-motion: reduce)')

const lines = [
  { cmd: 'whoami', out: 'hugo' },
  { cmd: 'cat role.txt', out: 'Front-end Lead' },
]

afterEach(() => vi.useRealTimers())

describe('beat', () => {
  test('listeners hear a beat and stop after unsubscribing', () => {
    const heard = vi.fn()
    const off = onBeat(heard)
    beat()
    off()
    beat()
    expect(heard).toHaveBeenCalledTimes(1)
  })
})

describe('Terminal', () => {
  test('with reduced motion shows every command and output at once and finishes', () => {
    reduce()
    const done = vi.fn()
    render(<Terminal lines={lines} onDone={done} />)
    expect(screen.getByText('whoami')).toBeInTheDocument()
    expect(screen.getByText('Front-end Lead')).toBeInTheDocument()
    expect(done).toHaveBeenCalledTimes(1)
  })

  test('types one character at a time, then calls onDone once', () => {
    vi.useFakeTimers()
    const done = vi.fn()
    render(<Terminal lines={lines} onDone={done} />)
    expect(screen.queryByText('whoami')).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(200))
    expect(screen.queryByText('whoami')).not.toBeInTheDocument()
    expect(screen.getByTestId('terminal').textContent).toMatch(/\$ wh/)
    expect(done).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(20000))
    expect(screen.getByText('Front-end Lead')).toBeInTheDocument()
    expect(done).toHaveBeenCalledTimes(1)
  })
})

describe('Terminal on re-render', () => {
  test('new output text replaces the old without typing again or finishing twice', () => {
    vi.useFakeTimers()
    const done = vi.fn()
    const { rerender } = render(<Terminal lines={lines} onDone={done} />)
    act(() => vi.advanceTimersByTime(20000))
    expect(done).toHaveBeenCalledTimes(1)
    rerender(<Terminal lines={[lines[0]!, { cmd: 'cat role.txt', out: 'Trưởng nhóm Front-end' }]} onDone={done} />)
    expect(screen.getByText('Trưởng nhóm Front-end')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(20000))
    expect(done).toHaveBeenCalledTimes(1)
  })
})

describe('useCountUp', () => {
  test('reduced motion shows the final number immediately', () => {
    reduce()
    const { result } = renderHook(() => useCountUp('9.12', true))
    expect(result.current).toBe('9.12')
  })
  test('text that is not a plain number is shown as is', () => {
    const { result } = renderHook(() => useCountUp('4–6', true))
    expect(result.current).toBe('4–6')
  })
  test('starts at zero while inactive', () => {
    const { result } = renderHook(() => useCountUp('17', false))
    expect(result.current).toBe('0')
  })
})
