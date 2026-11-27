import { useEffect, useRef, useState } from 'react'

/** True from the first time the element is at least `threshold` visible. Without IntersectionObserver it is always true. */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(() => !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (seen || !el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, threshold])
  return [ref, seen] as const
}
