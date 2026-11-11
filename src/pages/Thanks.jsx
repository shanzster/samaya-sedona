import Placeholder from '../components/Placeholder.jsx'
import { PAYMENT_LINKS, TIERS } from '../config.js'
import { HAS_BACKEND } from '../leads.js'

export default function Thanks() {
  // Campaign.jsx stashes the signup here right before navigating over.
  let signup = null
  try {
    signup = JSON.parse(sessionStorage.getItem('samaya-signup'))
  } catch {
    /* direct visit — fall back to the generic welcome */
  }
  const tier = TIERS.find((t) => t.id === signup?.tier)

  return (
    <>
      <section className="page-hero container stack">
        <p className="eyebrow">You&rsquo;re in</p>
        <h1 className="display">Welcome to the list</h1>
        {signup ? (
          <p className="lead">
            Thank you, {signup.name} &mdash; your spot on the Founders&rsquo;
            List is held at the {tier?.price} {tier?.name} tier.{' '}
            {HAS_BACKEND
              ? 'A confirmation email is on its way.'
              : 'Your email app just opened with your signup drafted — hit send and you’re done.'}
          </p>
        ) : (
          <p className="lead">
            Thank you for joining the Founders&rsquo; List. Watch your inbox
            &mdash; your confirmation is on its way.
          </p>
        )}
        <p className="accent-line">see you in the high desert</p>
      </section>

      <section className="container stack-lg" style={{ paddingBottom: 'var(--section-pad)' }}>
        {tier && PAYMENT_LINKS[tier.id] ? (
          <p>
            <a className="btn btn--primary" href={PAYMENT_LINKS[tier.id]}>
              Complete your {tier.price} payment
            </a>
          </p>
        ) : (
          <p>
            Your secure payment link arrives by email &mdash; nothing is
            charged until you use it.
          </p>
        )}

        <div className="trust-box stack-sm">
          <p className="small">
            <strong>One more time, in writing:</strong> your Founders&rsquo;
            List payment is one-time, never monthly, and non-refundable
            &mdash; if the opening slips, your perks carry forward; if we
            never open, you get every dollar back. The full{' '}
            <a href="#/terms">Terms &amp; Refund Policy</a> has the details,
            and your confirmation email repeats them.
          </p>
        </div>

        <div className="card-grid">
          <Placeholder
            label="The upper deck"
            ratio="4 / 3"
            src="/Images/web/after-upper-deck-renderings-2.jpg"
          />
          <Placeholder
            label="The wellness garden"
            ratio="4 / 3"
            src="/Images/web/recreational-area.jpg"
          />
        </div>
        <p>
          <a className="btn btn--secondary" href="#/gallery">
            See what you just backed &rarr; the gallery
          </a>
        </p>
      </section>
    </>
  )
}
