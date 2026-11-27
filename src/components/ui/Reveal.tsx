import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Position in a list, used to stagger the animation a little. */
  index?: number
}

/** Fades its content in when it scrolls into view. Without IntersectionObserver it is simply visible. */
export function Reveal({ children, as: Tag = 'div', className = '', index = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (shown || !el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`.trim()} style={{ '--i': index % 6 } as React.CSSProperties}>
      {children}
    </Tag>
  )
}
