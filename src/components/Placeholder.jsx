// Image placeholder — swap for real photography when assets land in /public.
// Simple mesa line-drawing stand-in; replace with the brand illustration set.
function MesaLines() {
  return (
    <svg viewBox="0 0 160 80" fill="none" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 64 L34 34 H64 L84 54 H120 L140 40 L156 64" />
      <path d="M4 72 H156" />
      <circle cx="126" cy="20" r="9" />
    </svg>
  )
}

export default function Placeholder({
  label,
  ratio = '4 / 3',
  dark = false,
  src,
  fit = 'cover',
}) {
  if (src) {
    return (
      <figure className="placeholder placeholder--img" style={{ aspectRatio: ratio }}>
        <img src={src} alt={label} loading="lazy" style={{ objectFit: fit }} />
      </figure>
    )
  }
  return (
    <figure
      className={`placeholder${dark ? ' placeholder--dark' : ''}`}
      style={{ aspectRatio: ratio }}
    >
      <MesaLines />
      <figcaption>{label}</figcaption>
    </figure>
  )
}
