import { useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { beat } from '../../lib/beat'

interface Props {
  index: string
  title: string
  id: string
  /** Decorative file or command name shown next to the title, like an editor tab. */
  file: string
}

/** "01 About me // file" heading. It is also this section's "commit": it lights up once and sends a beat. */
export function SectionHeading({ index, title, id, file }: Props) {
  const [ref, seen] = useInView<HTMLHeadingElement>(0.6)
  useEffect(() => {
    if (seen) beat()
  }, [seen])
  return (
    <h2 className={`section-title${seen ? ' lit' : ''}`} id={id} ref={ref}>
      <span className="section-index" aria-hidden="true">{index}</span>
      {title}
      <span className="section-file" aria-hidden="true">{file}</span>
    </h2>
  )
}
