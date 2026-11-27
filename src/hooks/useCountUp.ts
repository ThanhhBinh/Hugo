import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const PLAIN_NUMBER = /^\d+(\.\d+)?$/

/** Counts a plain number up from 0 once `active`. Anything else (like "4–6") is shown as it is. */
export function useCountUp(target: string, active: boolean, ms = 1100): string {
  const reduced = useReducedMotion()
  const numeric = PLAIN_NUMBER.test(target)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!numeric || !active || reduced) return
    const to = Number(target)
    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const k = Math.min(1, (now - start) / ms)
      setValue(to * (1 - (1 - k) ** 3))
      if (k < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [target, numeric, active, reduced, ms])

  if (!numeric) return target
  if (reduced) return target
  const decimals = target.split('.')[1]?.length ?? 0
  return value >= Number(target) ? target : value.toFixed(decimals)
}
