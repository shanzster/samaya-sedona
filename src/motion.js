import { useEffect } from 'react'

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// rAF-throttled scroll handler; returns a cleanup function.
export function onScrollFrame(update) {
  const raf = { id: 0 }
  const onScroll = () => {
    cancelAnimationFrame(raf.id)
    raf.id = requestAnimationFrame(update)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  return () => {
    cancelAnimationFrame(raf.id)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
}

// Soft rise-and-fade for every [data-reveal] element on the page.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
