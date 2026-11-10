import { useState } from 'react'
import Placeholder from '../components/Placeholder.jsx'
import { useReveal } from '../motion.js'
import { logo, illo } from '../brand.js'
import { FORM_ENDPOINT, PAYMENT_LINKS, CONTACT_EMAIL } from '../config.js'

const TIERS = [
  {
    id: 'entry',
    price: '$1',
    name: 'Founding Entry',
    flag: null,
    tagline: 'For the curious',
    blurb:
      'A dollar is a handshake. It puts your name on the list, ahead of the public, for less than a gas-station coffee.',
    perks: [
      'Your name on the Founders’ List — permanently',
      'The launch announcement before the public hears it',
      'Basic entry subscription to the rental: first in line when the calendar opens',
      'Founders-only launch pricing on your first stay',
    ],
  },
  {
    id: 'stories',
    price: '$5',
    name: 'Brand Stories',
    flag: 'Most popular',
    tagline: 'For the ones who want the whole story',
    blurb:
      'The build, documented honestly — the befores, the afters, and the weeks where nothing went right.',
    perks: [
      'Everything in Founding Entry',
      'Biweekly build updates — photos, floor plans, setbacks included',
      'The brand stories: why this house, why this hill, why Sedona',
      'Early looks at rooms before they reach the public gallery',
      'A say in the small calls — we poll members on finishes and details',
    ],
  },
  {
    id: 'early',
    price: '$10',
    name: 'Early Access',
    flag: 'Best value',
    tagline: 'For the trip leader',
    blurb:
      'If you already know who your eleven people are, this is the tier that gets you the good weekends.',
    perks: [
      'Everything in Brand Stories',
      '2-week early booking window before the public calendar opens',
      'First pick of opening-season dates — holidays and long weekends included',
      'The finished photography, delivered before it is published anywhere',
      'A personal heads-up email the day your window opens',
    ],
  },
]

// Comparison matrix — rows: [benefit, entry, stories, early]
const MATRIX = [
  ['Name on the Founders’ List', true, true, true],
  ['Launch announcement before the public', true, true, true],
  ['First in line when the calendar opens', true, true, true],
  ['Founders-only launch pricing', true, true, true],
  ['Biweekly build updates', false, true, true],
  ['Brand stories & behind-the-scenes', false, true, true],
  ['Member polls on finishes & details', false, true, true],
  ['2-week early booking window', false, false, true],
  ['First pick of opening-season dates', false, false, true],
  ['Finished photography, first', false, false, true],
]

const AFTER_PAY = [
  [
    '1. Instant confirmation',
    'You get one email confirming your tier and your spot on the list. That is the only email until there is something worth saying.',
  ],
  [
    '2. The updates begin',
    'Brand Stories and Early Access members start receiving the biweekly build update — the same honest account, every two weeks.',
  ],
  [
    '3. The date drops',
    'Founders hear the opening date before anyone. Early Access members get their booking window and a personal heads-up.',
  ],
  [
    '4. Doors open',
    'You book first, at Founders pricing. Then we meet you on the terrace.',
  ],
]

// TODO: client to confirm refund terms and payment processor before launch
const TIER_FAQS = [
  [
    'Is this a one-time payment or a subscription?',
    'One-time. One dollar, five, or ten — once. Nothing renews, nothing auto-charges, there is no fine print that says otherwise.',
  ],
  [
    'Can I get a refund?',
    'Yes. Any tier, any reason, any time before opening day — one email to hello@samayasedona.com and it comes back in full.',
  ],
  [
    'Can I upgrade later?',
    'Yes — pay the difference and keep your original place in line. Your spot on the list is set by when you first joined.',
  ],
  [
    'Is this a deposit toward a stay?',
    'No — it is membership in the launch, not a booking deposit. It buys access and first position, and launch pricing applies on top when you book.',
  ],
  [
    'How is payment handled?',
    'Through a standard secure payment processor. Your card details never touch our servers, and we never see them.',
  ],
]

function Check({ yes }) {
  return yes ? (
    <span className="matrix-yes" aria-label="included">
      &#10003;
    </span>
  ) : (
    <span className="matrix-no" aria-label="not included">
      &mdash;
    </span>
  )
}

export default function Campaign() {
  const [form, setForm] = useState({ name: '', email: '', tier: 'early' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const done = status === 'done'
  useReveal()

  async function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email address.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const tierName = TIERS.find((t) => t.id === form.tier)
    if (!FORM_ENDPOINT) {
      // No backend configured yet — hand off via a prefilled email so no
      // signup is ever silently lost.
      const subject = encodeURIComponent('Founders’ List — ' + tierName.name)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nTier: ${tierName.price} ${tierName.name}\n\nPlease add me to the Founders’ List.`,
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      setStatus('done')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          tier: `${tierName.price} ${tierName.name}`,
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const choose = (tier) => {
    setForm((f) => ({ ...f, tier }))
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  const field = (key, label, type = 'text') => (
    <div className={`field${errors[key] ? ' field-error' : ''}`}>
      <label htmlFor={`f-${key}`}>{label}</label>
      <input
        id={`f-${key}`}
        type={type}
        value={form[key]}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `f-${key}-err` : undefined}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
      {errors[key] && (
        <p className="error-msg" id={`f-${key}-err`} role="alert">
          <span aria-hidden="true">&#9888;</span> {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <>
      <section className="page-hero container stack">
        <p className="eyebrow">Pre-launch campaign</p>
        <h1 className="display">Before the doors open</h1>
        <p className="lead">
          Samaya Sedona opens soon. The Founders&rsquo; List is how we build
          it with you watching &mdash; a dollar gets you in the door, ten
          gets you through it two weeks before everyone else.
        </p>
        <p className="accent-line">built in the open, booked by the people watching</p>
      </section>

      {/* The tiers — full detail, because people are paying money */}
      <section className="container" style={{ paddingBottom: 'var(--section-pad)' }}>
        <div className="card-grid card-grid--3">
          {TIERS.map((t, i) => (
            <article
              className="card tier-card"
              key={t.id}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {t.flag && <p className="tier-flag">{t.flag}</p>}
              <p className="tier-price">
                {t.price}
                <span>{t.name}</span>
              </p>
              <p className="accent-line tier-tagline">{t.tagline}</p>
              <p className="small">{t.blurb}</p>
              <ul>
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="small tier-fine">
                One-time. Refundable until opening day.
              </p>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => choose(t.id)}
              >
                Choose {t.name}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Side-by-side matrix — the group-text decision table */}
      <section className="section section--pattern" style={{ paddingTop: 0 }}>
        <div className="container stack-lg">
          <div className="stack" data-reveal>
            <p className="eyebrow">Side by side</p>
            <h2 className="h2">Exactly what each dollar buys</h2>
          </div>
          <div className="matrix-wrap" data-reveal>
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Benefit</span>
                  </th>
                  <th scope="col">$1 Entry</th>
                  <th scope="col">$5 Stories</th>
                  <th scope="col">$10 Early</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(([benefit, a, b, c]) => (
                  <tr key={benefit}>
                    <th scope="row">{benefit}</th>
                    <td>
                      <Check yes={a} />
                    </td>
                    <td>
                      <Check yes={b} />
                    </td>
                    <td>
                      <Check yes={c} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What happens after you pay — remove the post-payment fear */}
      <section className="section" style={{ paddingTop: 'var(--sp-8)' }}>
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">After you join</p>
            <h2 className="h2">What happens with your money</h2>
            <p>
              No drip campaigns, no upsells, no countdown timers. Here is
              the entire sequence, start to finish.
            </p>
            <div className="trust-box stack-sm">
              <img
                className="illo"
                src={illo('rocks', 'canyon')}
                alt=""
                aria-hidden="true"
              />
              <p className="small">
                <strong>The promise:</strong> every tier is one-time, fully
                refundable until opening day, and processed by a secure
                payment provider &mdash; your card never touches our
                servers. Questions first?{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </div>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="card-grid">
            {AFTER_PAY.map(([title, copy], i) => (
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

      {/* Join form */}
      <section className="form-band dark-surface" id="join">
        <div className="container rail-layout">
          <div className="rail stack">
            <p className="eyebrow">Join</p>
            <h2 className="h2">The Founders&rsquo; List</h2>
            <p>
              Every booking begins with a real conversation &mdash; this one
              begins with your name.
            </p>
            <img
              className="illo illo--lg"
              src={logo('lockup date', 'sand')}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          {done ? (
            <div className="form-confirm stack fade-in" role="status">
              <p className="accent-line">welcome to the list</p>
              <p>
                You&rsquo;re in, {form.name.trim()}.{' '}
                {FORM_ENDPOINT
                  ? 'Watch your inbox — the first update is on its way.'
                  : 'Your email app just opened with your signup drafted — hit send and you’re done.'}
              </p>
              {PAYMENT_LINKS[form.tier] && (
                <p>
                  <a
                    className="btn btn--primary"
                    href={PAYMENT_LINKS[form.tier]}
                  >
                    Complete your {TIERS.find((t) => t.id === form.tier).price}{' '}
                    payment
                  </a>
                </p>
              )}
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={submit} noValidate>
              {field('name', 'Name')}
              {field('email', 'Email', 'email')}
              <div className="field">
                <label htmlFor="f-tier">Tier</label>
                <select
                  id="f-tier"
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value })}
                >
                  {TIERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.price} — {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  className="btn btn--primary"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Joining…' : 'Join the list'}
                </button>
              </div>
              {status === 'error' && (
                <p className="error-msg" role="alert">
                  <span aria-hidden="true">&#9888;</span> Something went wrong
                  on our end — please try again, or email {CONTACT_EMAIL}{' '}
                  directly.
                </p>
              )}
              <p className="small">
                Payment is collected after signup &mdash; we&rsquo;ll email
                you a secure link. One-time, refundable, no spam, no
                countdown timers, ever.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Tier FAQ — money questions answered before they're asked */}
      <section className="section">
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">Money questions</p>
            <h2 className="h2">Fair to ask</h2>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="faq" data-reveal>
            {TIER_FAQS.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* What you're backing */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rail-layout">
          <div className="rail stack" data-reveal>
            <p className="eyebrow">What you&rsquo;re backing</p>
            <h2 className="h2">The work so far</h2>
            <p>
              A preview of what Founders see every two weeks &mdash; the full
              set lives in the gallery.
            </p>
            <a className="btn btn--ghost" href="#/gallery">
              Browse the gallery
            </a>
          </div>
          <div className="rail-divider" aria-hidden="true"></div>
          <div className="card-grid">
            <Placeholder
              label="The lower deck — still a before, that’s the point"
              ratio="4 / 3"
              src="/Images/web/before-lower-deck.jpg"
            />
            <Placeholder
              label="First floor plan — beds 01–03, kitchen, bar"
              ratio="4 / 3"
              fit="contain"
              src="/Images/web/first-floor-general-layout.jpg"
            />
          </div>
        </div>
      </section>
    </>
  )
}
