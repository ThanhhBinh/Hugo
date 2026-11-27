type Kind = 'radar' | 'campaigns' | 'audit'

/** Abstract illustration for a project card. Decorative only; the caption says it is not a screenshot. */
export function ProjectArt({ kind }: { kind: Kind }) {
  return (
    <svg className="project-art" viewBox="0 0 240 160" role="presentation" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="238" height="158" rx="14" fill="none" stroke="var(--line)" strokeWidth="2" />
      {kind === 'radar' && (
        <g fill="none" stroke="var(--accent)" strokeWidth="2">
          <circle cx="120" cy="80" r="22" opacity="0.9" />
          <circle cx="120" cy="80" r="44" opacity="0.55" />
          <circle cx="120" cy="80" r="66" opacity="0.28" />
          <path d="M120 80 L186 52" strokeLinecap="round" />
          <circle cx="164" cy="60" r="5" fill="var(--accent)" stroke="none" />
          <circle cx="88" cy="104" r="4" fill="var(--accent)" stroke="none" />
          <circle cx="140" cy="118" r="3.5" fill="var(--accent)" stroke="none" />
        </g>
      )}
      {kind === 'campaigns' && (
        <g fill="var(--accent)">
          <rect x="34" y="96" width="26" height="40" rx="5" opacity="0.4" />
          <rect x="72" y="72" width="26" height="64" rx="5" opacity="0.6" />
          <rect x="110" y="52" width="26" height="84" rx="5" opacity="0.8" />
          <rect x="148" y="34" width="26" height="102" rx="5" />
          <rect x="186" y="60" width="26" height="76" rx="5" opacity="0.7" />
        </g>
      )}
      {kind === 'audit' && (
        <g fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 46 H200 M40 80 H200 M40 114 H200" stroke="var(--line)" />
          <path d="M52 46 l8 8 l14 -16" />
          <path d="M52 80 l8 8 l14 -16" />
          <path d="M52 114 l8 8 l14 -16" opacity="0.5" />
          <path d="M96 46 H170 M96 80 H150 M96 114 H182" opacity="0.7" />
        </g>
      )}
    </svg>
  )
}
