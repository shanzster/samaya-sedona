import { useEffect, useRef } from 'react'
import { reducedMotion, onScrollFrame } from '../motion.js'

// Shifts its children against scroll by `speed` — positive drifts slower
// than the page (reads distant), negative drifts against it.
export default function Parallax({ speed = 0.08, className, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return undefined
    const el = ref.current
    const update = () => {
      const r = el.getBoundingClientRect()
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * speed
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`
    }
    update()
    return onScrollFrame(update)
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
