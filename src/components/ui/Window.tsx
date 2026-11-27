import type { ReactNode } from 'react'

/** A card styled as an editor window: title bar with a file name. */
export function Window({ file, className = '', children }: { file: string; className?: string; children: ReactNode }) {
  return (
    <div className={`window ${className}`.trim()}>
      <div className="window-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{file}</span>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}
