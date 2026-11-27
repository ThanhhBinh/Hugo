import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress() {
  useScrollProgress()
  return <div className="scroll-progress" aria-hidden="true" />
}
