import { useEffect, useState } from 'react'
import { logo, COMBINATION_RATIO } from '../brand.js'

const LINKS = [
  { href: '#/', label: 'Home' },
  { href: '#/gallery', label: 'Gallery' },
  { href: '#/founders', label: 'Founders' },
]

// §6.4 — transparent over hero, Sand with hairline once scrolled past 80vh.
// On interior pages (no dark hero) the nav is always solid.
export default function Nav({ route, overHero, tone }) {
  const [pastHero, setPastHero] = useState(
    () => window.scrollY > window.innerHeight * 0.8,
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onScroll)
    }
  }, [])

  const scrolled = !overHero || pastHero
  const close = () => setOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}${
          !scrolled && tone === 'light' ? ' site-nav--ink' : ''
        }${tone === 'dark' ? ' site-nav--on-dark' : ''}`}
      >
        <div className="container">
          {/* Combination lockup as a CSS mask — inherits Sand/Deep Canyon from nav color */}
          <a className="nav-logo" href="#/" aria-label="Samaya Sedona — home">
            <span
              className="logo-mask"
              style={{
                maskImage: `url("${logo('combination', 'clay')}")`,
                width: `${Math.round(40 * COMBINATION_RATIO)}px`,
              }}
            ></span>
          </a>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={route === l.href.slice(1) ? 'page' : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="btn btn--primary" href="#/founders">
                  Join the list
                </a>
              </li>
            </ul>
          </nav>
          <div className="nav-mobile-actions">
            <a className="btn btn--primary nav-mobile-join" href="#/founders">
              Join
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-overlay dark-surface fade-in">
          <button type="button" className="nav-toggle" onClick={close}>
            Close
          </button>
          <nav aria-label="Mobile">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={close}>
                {l.label}
              </a>
            ))}
            <a
              className="btn btn--secondary"
              href="#/founders"
              onClick={close}
            >
              Join the Founders&rsquo; List
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
