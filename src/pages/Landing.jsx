import Placeholder from '../components/Placeholder.jsx'
import ScrollSnake from '../components/ScrollSnake.jsx'
import Parallax from '../components/motion.jsx'
import { useReveal } from '../motion.js'
import { logo, illo } from '../brand.js'
import { HERO, FOUNDERS_VIDEO_URL, OPENING_YEAR, SLEEPS } from '../config.js'

// TODO: client to confirm house facts (pool, spa, sauna, suites, acreage)
const FACTS = [
  `Sleeps ${SLEEPS}`,
  'Five suites',
  'Heated pool & spa',
  'Barrel sauna',
  'Sound social lounge',
  'Chef’s kitchen',
  'Private hillside',
]

// TODO: placeholder — replace with the real year-by-year timeline from
// Yash/Khush (bought → full rebuild → big upgrade → complete remodel).
// Must be factual; years below are placeholders, not confirmed.
const STORY = [
  {
    year: '· · ·',
    title: 'We bought the house',
    copy: 'A tired house on the best view we had ever seen. Everyone said tear it down and flip it. We kept it instead.',
  },
  {
    year: '· · ·',
    title: 'The full rebuild',
    copy: 'Every wall that blocked the mountains came down. The long table, the deck, the pool — all of it now faces the same horizon.',
  },
  {
    year: '· · ·',
    title: 'The big upgrade',
    copy: 'The house grew into what the hill deserved — the befores and afters live in the gallery.',
  },
  {
    year: 'Now',
    title: 'A complete remodel',
    copy: 'We are finishing the last rooms now, documenting the whole way — setbacks included.',
  },
  {
    year: OPENING_YEAR,
    title: 'The doors open',
    copy: 'Founders hear the date first and Early Access members book before anyone else. The first dinner on the deck is already planned — we just don’t know your name yet.',
  },
]

const RITUALS = [
  {
    time: 'First light',
    art: 'kettle',
    copy: 'Coffee on the deck while the mountains shift from shadow to rust. Nobody is in a hurry, because there is nowhere better to be.',
  },
  {
    time: 'Midday',
    art: 'rocks',
    copy: 'A trail, the pool, or a book and a patch of shade. The afternoon is yours to spend slowly — the house asks nothing of you.',
  },
  {
    time: 'Golden hour',
    art: 'drink',
    copy: 'Drinks outside as the red mountains do the thing they are famous for. This is the hour people fly in for.',
  },
  {
    time: 'After dark',
    art: 'bowl',
    copy: 'One long table, one long dinner, and the kind of conversation that only happens when no one has anywhere to be tomorrow.',
  },
]

// Icon mapping fixed per Nov 6 touchbase: the 'bowl' illo is a sound bowl
// (now on the Sound Social Lounge) and 'brush' is a matcha brush (moved off
// "Quiet corners"). TODO: confirm final icon-to-item mapping with Khush;
// only seven illustrations exist, so 'rocks' repeats once.
const ACTIVITIES = [
  [
    'towel',
    'Pool, spa & sauna',
    'A heated pool, a hot tub off the upper deck, and a barrel sauna with a view. The pool is the showstopper.',
  ],
  [
    'bowl',
    'The Sound Social Lounge',
    'Downstairs, phones away: vinyl records, mahjong, board games and cards in a room with a 1970s soul — the lost art of talking with friends again.',
  ],
  [
    'brush',
    'Yoga on the deck',
    'Mats out at first light, slow stretches facing the red mountains before the house wakes up.',
  ],
  [
    'kettle',
    'Cook together',
    'A chef’s kitchen built for group cooking and dinners that run past midnight.',
  ],
  [
    'rocks',
    'Hike the ridge',
    'Trails start where the garden ends — up the hill for the full red-mountain panorama.',
  ],
  [
    'drink',
    'Golden hour',
    'The west deck at six. Bring a drink, watch the mountains turn red.',
  ],
  [
    'cup',
    'The putting green',
    'A tucked-in green below the pool deck for slow, competitive afternoons.',
  ],
  [
    'rocks',
    'Quiet corners',
    'Reading nooks, shaded decks, a hammock under the pines — places to disappear.',
  ],
]

const VIEWPOINTS = [
  ['01', 'The pool deck', 'Swim with the mountains at eye level.'],
  ['02', 'The upper deck', 'The widest view in the house — sunset front row.'],
  ['03', 'The fire pit', 'Red rock by day, star field by night.'],
  ['04', 'The long table', 'Dinner faces the horizon through floor-to-ceiling glass.'],
  ['05', 'The primary suite', 'Wake up to the range without lifting your head.'],
]

const GATHERINGS = [
  ['bowl', 'Friend groups', 'The reunion the group text keeps postponing.'],
  ['cup', 'Couples', 'A quiet reset, two people, no itinerary.'],
  ['drink', 'Celebrations', 'Milestone birthdays done well, not loud.'],
  ['kettle', 'Milestones', 'Three generations, one long table.'],
]

const STEPS = [
  [
    '1. Join the list',
    'Pick a tier — a dollar is enough to be first in line when the calendar opens.',
  ],
  [
    '2. A real conversation',
    'Every booking starts with a chat about why you’re gathering, so the house is set up for exactly that.',
  ],
  [
    '3. The weekend is yours',
    'One group at a time. The whole house, the whole view, nobody else.',
  ],
]

// TODO: client to confirm pricing, refund policy, and opening window
const FAQS = [
  [
    'When does Samaya open?',
    `${OPENING_YEAR} — we are finishing the last rooms now. Founders hear the exact date first, and Early Access members get the calendar before the public.`,
  ],
  [
    'How many people does it sleep?',
    `${SLEEPS === 11 ? 'Eleven' : SLEEPS}, comfortably, across five suites. The long table seats everyone at once — that is the point.`,
  ],
  [
    'Where exactly is it?',
    'On a private hillside in Sedona, Arizona, facing the red mountains. The exact address is shared when you book.',
  ],
  [
    'How much does it cost?',
    'Nightly rates will run roughly $1,000–2,500 depending on season. Split across a full house, that is less per person than most hotels — for all of this.',
  ],
  [
    'Is the Founders’ List payment one-time?',
    'Yes — one-time, never monthly. Nothing renews, nothing auto-charges. If you change your mind before we open, email us and we will refund it.',
  ],
  [
    'Is this a hotel?',
    'No. One house, one group at a time, and every booking begins with a real conversation.',
  ],
]

// Hero media slot — renders whichever mode is configured in config.js so a
// video or collage can drop in without touching this page.
function HeroMedia() {
  if (HERO.mode === 'video' && HERO.video.src) {
    return (
      <video
        className="hero-video"
        src={HERO.video.src}
        poster={HERO.video.poster}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }
  if (HERO.mode === 'collage') {
    return (
      <div className="hero-collage" aria-hidden="true">
        {HERO.collage.map((src) => (
          <img key={src} src={src} alt="" loading="eager" />
        ))}
      </div>
    )
  }
  // default: single placeholder image (to be replaced with updated renderings)
  return (
    <Parallax speed={0.1} className="hero-media-inner">
      <img
        src={HERO.image.src}
        srcSet={HERO.image.srcSet}
        sizes="100vw"
        fetchPriority="high"
        alt=""
      />
    </Parallax>
  )
}

export default function Landing() {
  useReveal()

  return (
    <>
      <ScrollSnake />
      {/* Hero slot — placeholder image for now; a Higgsfield montage video
          or rendering collage drops in via HERO in config.js once the
          updated renderings arrive. */}
      <section className="hero dark-surface">
        <div className="hero-media" aria-hidden="true">
          <HeroMedia />
        </div>
        <div className="hero-scrim" aria-hidden="true"></div>
        <img
          className="hero-badge"
          src={logo('lockup date', 'sand')}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-content container">
          <p className="accent-line">
            Restored, Together
          </p>
          <h1 className="hero-title">
            Samaya <span className="hero-title-accent">Sedona</span>
          </h1>
          <p className="hero-sub eyebrow">
            Sedona, Arizona &mdash; facing the red mountains
          </p>
          <p className="hero-sub lead">
            The view, the deck, and the pool &mdash; a high-desert house built
            around them, for the people you don&rsquo;t see often enough.
            Opening {OPENING_YEAR} &mdash; join the Founders&rsquo; List for
            first access.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#/founders">
              Join the Founders&rsquo; List
            </a>
            <a className="btn btn--secondary" href="#/gallery">
              See the house
            </a>
          </div>
        </div>
      </section>

      {/* Manifesto — the repositioning, stated plainly */}
      <section className="section section--pattern">
        <div className="container stack" data-reveal>
          <p className="eyebrow">What Samaya is</p>
          <h2 className="display">An experience that happens to sleep eleven</h2>
          <p className="lead">
            Anyone can rent you a house. Samaya is a weekend with its own
            rhythm &mdash; slow mornings, open afternoons, golden hours, long
            dinners &mdash; staged against the red mountains of Arizona. The
            beds are excellent. They are also the least interesting part.
          </p>
          <p className="accent-line">you don&rsquo;t book a room, you book a pace</p>
        </div>
      </section>

      {/* Scannable facts — the group-text answer sheet */}
      <div className="facts-strip" data-reveal>
        <div className="container">
          <ul>
            {FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Brand story — build-in-public timeline */}
      <section className="section">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">The story</p>
            <h2 className="h2">Built slow, like the weekends it&rsquo;s for</h2>
            <p>
              Samaya isn&rsquo;t a flip. It&rsquo;s a two-year rebuild of one
              house around one view, documented the whole way &mdash;
              setbacks included. Brand Stories members get the full account
              every two weeks.
            </p>
            <a className="btn btn--ghost" href="#/founders">
              Follow the brand stories
            </a>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div>
            {STORY.map((s, i) => (
              <article
                className="timeline-item"
                key={s.year}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className="timeline-year">{s.year}</p>
                <div className="stack-sm">
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </div>
              </article>
            ))}
            <p className="accent-line" style={{ marginTop: 'var(--sp-6)' }}>
              see you on the deck
            </p>
          </div>
        </div>
      </section>

      {/* A day at Samaya — the experience, hour by hour.
          Background: Khush wants to try the house mural here instead of the
          current background (tentative). Drop the mural file in /public and
          set --rituals-mural on .section--rituals in App.css. */}
      <section className="section section--rituals" style={{ paddingTop: 0 }}>
        <div className="container stack-lg">
          <div className="stack" data-reveal>
            <p className="eyebrow">The shape of a day</p>
            <h2 className="h2">A day at Samaya</h2>
          </div>
          <div className="ritual-grid">
            {RITUALS.map((r, i) => (
              <article
                className="ritual"
                key={r.time}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <img
                  className="illo"
                  src={illo(r.art, 'canyon')}
                  alt=""
                  aria-hidden="true"
                />
                <p className="eyebrow">{r.time}</p>
                <p>{r.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What to do — the activity menu */}
      <section className="section section--pattern">
        <div className="container stack-lg">
          <div className="stack" data-reveal>
            <p className="eyebrow">What to do</p>
            <h2 className="h2">Plenty, or nothing at all</h2>
          </div>
          <div className="card-grid card-grid--3">
            {ACTIVITIES.map(([art, title, copy], i) => (
              <article
                className="card card--fill tier-card"
                key={title}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <img
                  className="card-illo"
                  src={illo(art, 'canyon')}
                  alt=""
                  aria-hidden="true"
                />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The view + the five viewpoints */}
      <section className="section">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">The view</p>
            <h2 className="h2">Where the mountains find you</h2>
            <p>
              Samaya is known for one thing before anything else: an unbroken
              view of the red mountains. The house is oriented around it, and
              it never looks the same twice in a day. Five places to catch
              it, ranked by argument potential.
            </p>
            <a className="btn btn--ghost" href="#/gallery">
              See the view
            </a>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div>
            {VIEWPOINTS.map(([num, name, copy], i) => (
              <div
                className="viewpoint"
                key={num}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="viewpoint-num">{num}</p>
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
            <div className="stack-lg" style={{ marginTop: 'var(--sp-7)' }}>
              <Parallax speed={0.05}>
                <Placeholder
                  label="The upper deck — facing the horizon"
                  ratio="16 / 9"
                  src="/Images/web/after-upper-deck-renderings-2.jpg"
                />
              </Parallax>
              <Parallax speed={0.1}>
                <Placeholder
                  label="The wellness garden — sauna & cold plunge"
                  ratio="16 / 9"
                  src="/Images/web/recreational-area.jpg"
                />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* Statement band — one inverted section mid-page (§4.4) */}
      <section className="band dark-surface">
        <div className="container stack" data-reveal>
          <img
            className="band-badge"
            src={logo('lockup date', 'sand')}
            alt=""
            aria-hidden="true"
          />
          <p className="accent-line">every booking begins with a real conversation</p>
        </div>
      </section>

      {/* Signature rail layout (§5.3) — the house */}
      <section className="section">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">The house</p>
            <h2 className="h2">Built for the whole group</h2>
            <p>
              Room for everyone at one table, light that moves across plaster
              walls all day, and that horizon you will think about for
              months. We are finishing the last rooms now &mdash; the gallery
              tracks every step from floor plan to final light.
            </p>
            <a className="btn btn--ghost" href="#/gallery">
              Follow the build
            </a>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="stack-lg">
            <Parallax speed={0.04}>
              <Placeholder
                label="The living room"
                ratio="16 / 9"
                src="/Images/web/living-room-1-after.jpg"
              />
            </Parallax>
            <Parallax speed={0.08}>
              <Placeholder
                label="Bedroom 01"
                ratio="16 / 9"
                src="/Images/web/bedroom-1-after.jpg"
              />
            </Parallax>
            <Parallax speed={0.12}>
              <Placeholder
                label="The bar"
                ratio="16 / 9"
                src="/Images/web/bar-after.jpg"
              />
            </Parallax>
          </div>
        </div>
      </section>

      {/* A word from the founders — video to be recorded; placeholder frame
          until FOUNDERS_VIDEO_URL is set in config.js */}
      <section className="section section--pattern">
        <div className="container stack-lg">
          <div className="stack" data-reveal>
            <p className="eyebrow">From the founders</p>
            <h2 className="h2">Why we built this</h2>
          </div>
          <div data-reveal>
            {FOUNDERS_VIDEO_URL ? (
              <video
                className="founders-video"
                src={FOUNDERS_VIDEO_URL}
                controls
                preload="metadata"
              />
            ) : (
              <div className="founders-video founders-video--placeholder">
                <p className="accent-line">a word from the founders</p>
                <p className="small">
                  We&rsquo;re recording a short video about the house, the
                  hill, and why we didn&rsquo;t tear it down. It will live
                  here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gathering types (§9) — teaser only for prelaunch */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container stack-lg">
          <div className="stack" data-reveal>
            <p className="eyebrow">Who gathers here</p>
            <h2 className="h2">Four kinds of weekend</h2>
          </div>
          <div className="card-grid card-grid--4">
            {GATHERINGS.map(([art, title, copy], i) => (
              <article
                className="card tier-card"
                key={title}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <img
                  className="card-illo"
                  src={illo(art, 'clay')}
                  alt=""
                  aria-hidden="true"
                />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How booking works — the differentiator, step by step */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="h2">Booking, the Samaya way</h2>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="card-grid card-grid--3">
            {STEPS.map(([title, copy], i) => (
              <article
                className="card card--fill tier-card"
                key={title}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — remove every doubt before the ask */}
      <section className="section section--pattern">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="h2">Asked often, answered honestly</h2>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="faq" data-reveal>
            {FAQS.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Prelaunch CTA */}
      <section className="section">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">Before the doors open</p>
            <h2 className="h2">Be first through them</h2>
            <p>
              The Founders&rsquo; List is our version of a launch campaign
              &mdash; one dollar, one time, gets you in line before the
              public. Higher tiers get the full story and the first pick of
              dates.
            </p>
            <a className="btn btn--primary" href="#/founders">
              See the tiers
            </a>
            <p className="small">
              What happens next: we email rarely, and only about the house
              &mdash; the launch date, your early access, the occasional
              story. No spam, ever.
            </p>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <Parallax speed={0.07}>
            <Placeholder
              label="The entry — SAMAYA sign rendering"
              ratio="16 / 9"
              src="/Images/web/concept.jpg"
            />
          </Parallax>
        </div>
      </section>
    </>
  )
}
