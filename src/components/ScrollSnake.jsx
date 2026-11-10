import { useEffect, useRef } from 'react'
import { reducedMotion, onScrollFrame } from '../motion.js'

// A top-view snake in the brand-mark's line style (outline body, scale
// dots, forked tongue), recreated procedurally so it can actually slither:
// the spine is a sine wave whose phase advances with scroll, so the body
// undulates and travels like a real snake seen from above. Decorative only.

const N = 56 // spine samples
const TOP = 60
const STEP = 11.5
const CX = 120 // viewBox centerline

function circlePath(x, y, r) {
  return `M${(x + r).toFixed(1)} ${y.toFixed(1)}A${r} ${r} 0 1 0 ${(x - r).toFixed(1)} ${y.toFixed(1)}A${r} ${r} 0 1 0 ${(x + r).toFixed(1)} ${y.toFixed(1)}`
}

function build(phase) {
  const pts = []
  for (let i = 0; i <= N; i++) {
    const y = TOP + i * STEP
    const t = i / N
    const amp = 26 * (0.75 + 0.25 * Math.sin(Math.PI * t)) // calmer at ends
    pts.push({ x: CX + amp * Math.sin(y / 46 + phase), y, t })
  }

  // tangents and normals
  const seg = pts.map((p, i) => {
    const a = pts[Math.max(i - 1, 0)]
    const b = pts[Math.min(i + 1, N)]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    return { tx: dx / len, ty: dy / len, nx: -dy / len, ny: dx / len }
  })

  // body width: thin tail (top) -> full belly -> thin neck (bottom = head)
  const width = (t) =>
    3 + 13.5 * Math.sin(Math.PI * Math.min(Math.max(t, 0), 1)) ** 0.8

  const right = []
  const left = []
  pts.forEach((p, i) => {
    const w = width(p.t)
    right.push(`${(p.x + seg[i].nx * w).toFixed(1)} ${(p.y + seg[i].ny * w).toFixed(1)}`)
    left.push(`${(p.x - seg[i].nx * w).toFixed(1)} ${(p.y - seg[i].ny * w).toFixed(1)}`)
  })
  const body = `M${right.join('L')}L${left.reverse().join('L')}Z`

  // scale dots wandering slightly off the spine, like the logo's texture
  let spots = ''
  for (let i = 3; i < N - 3; i += 3) {
    const p = pts[i]
    const s = seg[i]
    const w = width(p.t) * 0.45
    const side = i % 2 ? 1 : -1
    spots += circlePath(p.x + s.nx * w * side, p.y + s.ny * w * side, 1.7)
  }

  // head at the bottom end, steering along the tangent
  const hp = pts[N]
  const hs = seg[N]
  const ang = (Math.atan2(hs.ty, hs.tx) * 180) / Math.PI - 90
  const head = `translate(${hp.x.toFixed(1)} ${hp.y.toFixed(1)}) rotate(${ang.toFixed(1)})`

  return { body, spots, head }
}

export default function ScrollSnake() {
  const svgRef = useRef(null)
  const bodyRef = useRef(null)
  const spotsRef = useRef(null)
  const headRef = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return undefined
    let lastY = -1
    const update = () => {
      // skip sub-pixel scroll events — rebuilding the path is the only
      // expensive part of this component
      if (Math.abs(window.scrollY - lastY) < 1) return
      lastY = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      const { body, spots, head } = build(-window.scrollY / 38)
      bodyRef.current.setAttribute('d', body)
      spotsRef.current.setAttribute('d', spots)
      headRef.current.setAttribute('transform', head)
      const travel = (p - 0.5) * window.innerHeight * 0.55
      svgRef.current.style.transform = `translateY(${travel.toFixed(1)}px)`
    }
    update()
    return onScrollFrame(update)
  }, [])

  return (
    <svg
      ref={svgRef}
      className="scroll-snake"
      viewBox="0 0 240 760"
      aria-hidden="true"
    >
      {/* body outline */}
      <path
        ref={bodyRef}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* scale dots */}
      <path ref={spotsRef} fill="currentColor" stroke="none" />
      {/* head, seen from above: skull, two eyes, forked tongue */}
      <g ref={headRef} fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M-8.5 -4 C-9.5 4, -5 12, 0 14 C5 12, 9.5 4, 8.5 -4 C7 -9, -7 -9, -8.5 -4 Z" />
        <circle cx="-4" cy="2" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="4" cy="2" r="1.6" fill="currentColor" stroke="none" />
        <path d="M0 14 l0 7 m0 -0.5 l-3.5 5 M0 20.5 l3.5 5" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}
