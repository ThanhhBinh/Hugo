interface Props {
  index: string
  title: string
  id: string
}

/** "01 — About me" style heading. The number is decoration only. */
export function SectionHeading({ index, title, id }: Props) {
  return (
    <h2 className="section-title" id={id}>
      <span className="section-index" aria-hidden="true">{index}</span>
      {title}
    </h2>
  )
}
