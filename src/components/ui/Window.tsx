import type { ReactNode } from 'react'

/** A card styled as an editor window: title bar with a file name. */
export function Window({ file, children }: { file: string; children: ReactNode }) {
  return (
    <div className="window">
      <div className="window-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{file}</span>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}
