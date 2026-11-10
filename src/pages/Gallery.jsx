import { useEffect, useState } from 'react'
import Placeholder from '../components/Placeholder.jsx'
import Parallax from '../components/motion.jsx'
import { useReveal } from '../motion.js'
import { logo, PATTERN } from '../brand.js'

const IMG = (name) => `/Images/web/${name}.jpg`

// The gallery as an exhibition: four chapters, scrolled like a story.
// TODO: floor-plan paragraphs to be rewritten in the founders' brand voice
// (possibly a personal note from the founders) — wording from Yash/Khush.
const PLANS = [
  {
    label: 'First floor — beds 01–03, kitchen, bar, living',
    src: IMG('first-floor-general-layout'),
    wide: true,
    text: 'Three bedrooms, the kitchen, the bar and the living room share one floor — so mornings start together and nobody is ever far from the coffee.',
  },
  {
    label: 'Second floor',
    src: IMG('second-floor-general-layout'),
    text: 'Two more bedrooms, two baths and the sound lounge — a second living room built for records, late conversations and slow nights.',
  },
  {
    label: 'House dimensions',
    src: IMG('floor-plan-with-house-dimensions'),
    text: 'The full footprint with measurements — how much house there actually is, wall to wall.',
  },
  {
    label: 'Top view — plan sections',
    src: IMG('top-view-floor-plan-sections'),
    text: 'The whole plan from above, cut into sections — how the rooms connect and where the light comes in.',
  },
  {
    label: 'Dining & sound lounge — furniture plan',
    src: IMG('dining-and-sound-lounge'),
    text: 'The long table and the listening corner, drawn piece by piece — a furniture plan for the rooms where everyone ends up.',
  },
]

// Order per Nov 6 touchbase: Sound Lounge first (rendering may not be
// final), upper deck next, then the rest.
// TODO (waiting on Yash/Khush):
//  - Coffee bar "before" should be the pantry — photo coming.
//  - Exterior before/after using the matching "before" angle from the
//    shared photos link, plus paragraphs.
//  - Missing "before" shots (back rooms) from the Matterport link in the
//    design deck or Yash's remodel photos.
const PAIRS = [
  ['The sound lounge', 'sound-lounge-before', 'sound-lounge-after'],
  ['The upper deck', 'before-upper-deck', 'after-upper-deck-renderings'],
  ['The backyard — wellness garden', 'before-lower-deck', 'recreational-area'],
  ['The living room', 'living-room-1-before', 'living-room-1-after'],
  ['The lounge', 'living-room-2-before', 'living-room-2-after'],
  ['The dining room', 'dining-room-before', 'dining-room-after'],
  ['The bar', 'bar-before', 'bar-after'],
  ['Bedroom 01', 'bedroom-1-before', 'bedroom-1-after'],
  ['Bedroom 01 — second angle', 'bedroom-1-before-other-pov', 'bedroom-1-after-other-pov'],
  ['Bedroom 02', 'bedroom-2-before', 'bedroom-2-after'],
  ['Bedroom 03', 'bedroom-3-before', 'bedroom-3-after'],
  ['Bedroom 03 — second angle', 'bedroom-3-other-pov-before', 'bedroom-3-other-pov-after'],
  ['Bedroom 04', 'bedroom-4-before', 'bedroom-4-after'],
  ['Bedroom 05', 'bedroom-5-before', 'bedroom-5-after'],
]

// These are renderings, not "concepts" — renamed per Nov 6 touchbase.
const RENDERINGS = [
  { label: 'The entry — SAMAYA sign', src: IMG('concept') },
  { label: 'Sound lounge — rendering II', src: IMG('sound-lounge-after-2') },
  { label: 'Bedroom 05 — rendering II', src: IMG('bedroom-5-after-2') },
  { label: 'Wellness garden — furniture', src: IMG('recreational-area-furnitures') },
]

const EXTERIORS = [
  {
    label: 'The whole hillside — aerial',
    src: IMG('the-view-different-angle-floorplan'),
    wide: true,
    text: 'The house sits alone on its hillside — nothing between the decks and the red mountains.',
  },
  {
    label: 'Top view — the property',
    src: IMG('top-view-general-layout'),
    text: 'The property from directly above — house, decks and wellness garden in one frame.',
  },
  {
    label: 'The upper deck',
    src: IMG('after-upper-deck-renderings-2'),
    text: 'The upper deck faces the view straight on — morning coffee, golden hour, and everything in between.',
  },
  {
    label: 'Upper deck — dining end',
    src: IMG('after-upper-deck-renderings-3'),
    text: 'The dining end of the deck — built for long dinners that keep going after the sun drops.',
  },
  {
    label: 'Wellness garden — sauna & cold plunge',
    src: IMG('recreational-area'),
    wide: true,
    text: 'Sauna, cold plunge and open sky — the wellness garden is a ritual, not an amenity.',
  },
  {
    label: 'Wellness garden — entrance',
    src: IMG('recreational-area-entrance'),
    text: 'The path into the garden — tucked below the house, quiet by design.',
  },
  {
    label: 'Aerial — from the view side',
    src: IMG('the-view-different-angle-floor-plan'),
    text: 'Seen from the view side — the whole house opens toward the mountains.',
  },
  {
    label: 'Aerial — second angle',
    src: IMG('general-view-different-angle-floorplan'),
    text: 'A second pass from the air — the decks stepped into the slope of the hill.',
  },
  {
    label: 'The lower deck — still a before',
    src: IMG('before-lower-deck'),
    text: 'The lower deck, still untouched — the next chapter of the build.',
  },
]

const CHAPTERS = [
  {
    id: 'plans',
    num: '01',
    title: 'Floor plans',
    blurb: 'How the house is laid out — and where your group lands in it.',
  },
  {
    id: 'before-after',
    num: '02',
    title: 'Before & after',
    blurb: 'What we found, and what we made of it. Drag the line.',
  },
  {
    id: 'renderings',
    num: '03',
    title: 'Renderings',
    blurb: 'The rooms as they will be — scroll sideways through the renderings.',
  },
  {
    id: 'exterior',
    num: '04',
    title: 'Exterior',
    blurb: 'The hillside, the decks, the wellness garden, the view.',
  },
]

function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Draggable before/after comparison — the line follows the slider.
function BeforeAfter({ label, before, after }) {
  const [v, setV] = useState(50)
  return (
    <figure className="ba" data-reveal>
      <div className="ba-stage">
        <Placeholder label={`${label} — before`} ratio="16 / 9" src={before} />
        <div className="ba-top" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <Placeholder label={`${label} — after`} ratio="16 / 9" src={after} />
        </div>
        <div className="ba-handle" style={{ left: `${v}%` }} aria-hidden="true">
          <span>&#8596;</span>
        </div>
        <input
          className="ba-range"
          type="range"
          min="0"
          max="100"
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label={`Compare before and after — ${label}`}
        />
      </div>
      <figcaption className="exhibit-caption">
        {label} &mdash; drag to compare
      </figcaption>
    </figure>
  )
}

function Frames({ items }) {
  return (
    <div className="container">
      {items.map((item, i) => (
        <div
          className={`exhibit-item${i % 2 ? ' exhibit-item--right' : ''}${item.wide ? ' exhibit-item--wide' : ''}`}
          key={item.label}
          data-reveal
        >
          <div className="exhibit-figure">
            <Parallax speed={0.04 + (i % 3) * 0.03}>
              <Placeholder
                label={item.label}
                ratio={item.ratio || '16 / 9'}
                src={item.src}
                fit={item.fit}
              />
            </Parallax>
            {!item.text && <p className="exhibit-caption">{item.label}</p>}
          </div>
          {item.text && (
            <div className="exhibit-side">
              <h3 className="exhibit-side-title">{item.label}</h3>
              <p className="exhibit-side-text">{item.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Chapter({ chapter, children }) {
  return (
    <section className="exhibit-chapter" id={chapter.id}>
      <header className="exhibit-head container" data-reveal>
        <p className="exhibit-num">{chapter.num}</p>
        <div>
          <h2 className="display">{chapter.title}</h2>
          <p className="lead">{chapter.blurb}</p>
        </div>
      </header>
      {children}
    </section>
  )
}

export default function Gallery() {
  const [active, setActive] = useState('')
  useReveal()

  // Track which chapter is on screen for the progress rail
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="exhibit dark-surface">
      {/* Cinematic intro */}
      <section
        className="exhibit-intro"
        style={{ '--exhibit-pattern': `url("${PATTERN}")` }}
      >
        <div className="container stack">
          <img
            className="band-badge"
            style={{ marginInline: 0 }}
            src={logo('lockup date', 'sand')}
            alt=""
            aria-hidden="true"
          />
          <h1 className="hero-title">The build</h1>
          <p className="accent-line">
            two years, one view, documented honestly
          </p>
          <p className="lead">
            Labeled floor plans, honest befores beside their afters,
            renderings and the hillside itself. All images are renderings and
            subject to change &mdash; final photography lands closer to
            opening.
          </p>
          <div className="exhibit-toc">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="btn btn--ghost"
                onClick={() => scrollToChapter(c.id)}
              >
                {c.num} {c.title}
              </button>
            ))}
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <i></i>
        </div>
      </section>

      {/* Chapter progress rail */}
      <nav className="exhibit-rail" aria-label="Gallery chapters">
        {CHAPTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={active === c.id ? 'is-active' : ''}
            onClick={() => scrollToChapter(c.id)}
          >
            <span className="exhibit-rail-num">{c.num}</span>
            <span className="exhibit-rail-label">{c.title}</span>
          </button>
        ))}
      </nav>

      {/* 01 — Floor plans */}
      <Chapter chapter={CHAPTERS[0]}>
        <Frames
          items={PLANS.map((p) => ({ ...p, ratio: '1 / 1', fit: 'cover' }))}
        />
      </Chapter>

      {/* 02 — Before & after: draggable comparisons */}
      <Chapter chapter={CHAPTERS[1]}>
        <div className="container exhibit-ba-list">
          {PAIRS.map(([label, before, after]) => (
            <BeforeAfter
              key={label}
              label={label}
              before={IMG(before)}
              after={IMG(after)}
            />
          ))}
        </div>
      </Chapter>

      {/* 03 — Renderings: horizontal filmstrip */}
      <Chapter chapter={CHAPTERS[2]}>
        <div
          className="filmstrip"
          role="group"
          aria-label="Renderings — scrolls sideways"
        >
          {RENDERINGS.map((item) => (
            <figure className="filmstrip-panel" key={item.label}>
              <Placeholder label={item.label} ratio="1 / 1" src={item.src} />
              <figcaption className="exhibit-caption">{item.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="container small exhibit-hint" aria-hidden="true">
          scroll sideways &rarr;
        </p>
      </Chapter>

      {/* 04 — Exterior */}
      <Chapter chapter={CHAPTERS[3]}>
        <Frames items={EXTERIORS} />
      </Chapter>

      {/* Closing CTA */}
      <section className="band dark-surface">
        <div className="container stack">
          <p className="accent-line">want the next chapter before anyone else?</p>
          <p>
            <a className="btn btn--secondary" href="#/founders">
              Join the Founders&rsquo; List
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
