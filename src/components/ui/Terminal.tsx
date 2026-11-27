import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface TerminalLine {
  cmd: string
  out: ReactNode
}

interface Props {
  lines: TerminalLine[]
  title?: string
  onDone?: () => void
}

const KEY_MS = 70
const AFTER_CMD_MS = 250
const AFTER_OUT_MS = 350

/** A terminal window that types its commands one character at a time. Reduced motion shows everything at once. */
export function Terminal({ lines, title = 'hugo@portfolio — zsh', onDone }: Props) {
  const reduced = useReducedMotion()
  // line = command being typed, chars = how much of it is typed, outs = how many outputs are shown.
  const [state, setState] = useState({ line: 0, chars: 0, outs: 0 })
  const done = useRef(onDone)
  useEffect(() => {
    done.current = onDone
  })
  const last = lines[lines.length - 1]!
  const view = reduced ? { line: lines.length - 1, chars: last.cmd.length, outs: lines.length } : state

  useEffect(() => {
    if (reduced) {
      done.current?.()
      return
    }
    let timer = 0
    const run = (line: number, chars: number) => {
      const cmd = lines[line]!.cmd
      if (chars < cmd.length) {
        setState({ line, chars: chars + 1, outs: line })
        timer = window.setTimeout(() => run(line, chars + 1), KEY_MS)
      } else {
        timer = window.setTimeout(() => {
          setState({ line, chars, outs: line + 1 })
          if (line + 1 < lines.length) timer = window.setTimeout(() => run(line + 1, 0), AFTER_OUT_MS)
          else done.current?.()
        }, AFTER_CMD_MS)
      }
    }
    timer = window.setTimeout(() => run(0, 0), KEY_MS)
    return () => window.clearTimeout(timer)
  }, [reduced, lines])

  const finished = view.outs === lines.length
  return (
    <div className="window terminal">
      <div className="window-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{title}</span>
      </div>
      <div className="term" data-testid="terminal">
        {lines.map((l, i) => {
          if (i > view.line) return null
          const typed = i < view.line ? l.cmd : l.cmd.slice(0, view.chars)
          const complete = typed.length === l.cmd.length
          return (
            <div key={l.cmd}>
              <p className="term-cmd">
                <span className="prompt">$</span> {complete ? <span className="cmd">{typed}</span> : typed}
                {i === view.line && !finished && <span className="cursor" aria-hidden="true" />}
              </p>
              {i < view.outs && <p className="term-out">{l.out}</p>}
            </div>
          )
        })}
        {finished && (
          <p className="term-cmd">
            <span className="prompt">$</span> <span className="cursor" aria-hidden="true" />
          </p>
        )}
      </div>
    </div>
  )
}
