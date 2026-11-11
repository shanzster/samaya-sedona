import { CONTACT_EMAIL, OPENING_YEAR } from '../config.js'

// Plain-language terms, same voice as the privacy policy. This copy is
// mirrored in emails/founders-confirmation.html — keep the two in sync.
const SECTIONS = [
  [
    'What you are buying',
    'A Founders’ List tier is a one-time membership in the launch of Samaya Sedona. It buys the perks listed on the tier you chose — access, updates, and priority — not a stay, not a booking, and not a share of the property. Nothing renews and nothing auto-charges.',
  ],
  [
    'The house is not finished',
    `Samaya Sedona is under renovation. We are targeting an opening in ${OPENING_YEAR}, but that date is a target, not a promise — construction, permitting, and weather all get a vote. By joining, you acknowledge that you are backing a property that is not yet open and that the opening date may move.`,
  ],
  [
    'All payments are non-refundable',
    'Every Founders’ List payment is final. Once your payment is processed, it cannot be refunded, in whole or in part, for any reason other than the single exception below. You confirm this explicitly at checkout before any payment link is sent.',
  ],
  [
    'If the opening date slips',
    'A delay does not change what you bought. Your place in line, your updates, your early-access window, and your launch perks all carry forward unchanged to the new opening date. A later opening is not grounds for a refund — it is the risk you accepted when you backed an unfinished house, and it is why we document the build honestly every two weeks.',
  ],
  [
    'The one exception: if we never open',
    'If Samaya Sedona is permanently cancelled — not delayed, cancelled — every Founders’ List payment is refunded in full to the original payment method within 30 days of our announcement. That is the only circumstance in which a refund is issued.',
  ],
  [
    'Chargebacks and disputes',
    'At checkout you confirm — with a recorded timestamp — that you read these terms and understood the payment is non-refundable. That record is what we present to the card networks if a payment is disputed. If something feels wrong, email us first: we read everything and reply like people, and most problems are solved in one conversation.',
  ],
  [
    'Upgrades and transfers',
    'You can upgrade to a higher tier at any time by paying the difference — your original place in line is kept. Tier benefits are tied to you, but if you want to pass your spot to someone else, email us and we will move it once, free, before opening day.',
  ],
  [
    'Perks, pricing, and the calendar',
    'Tier perks — early booking windows, launch pricing, the first-stay perk — apply to bookings made once the calendar opens, subject to availability. Nightly rates are set at launch; “launch pricing” means the Founders’ rate offered before public rates, not a fixed number promised today.',
  ],
  [
    'Changes to these terms',
    'If we change these terms, the version you accepted at checkout is the one that governs your payment. We will email members about any material change.',
  ],
  [
    'Governing law and contact',
    `These terms are governed by the laws of the State of Arizona. Questions, concerns, or anything in between: ${CONTACT_EMAIL}. Every booking — and every question about the fine print — begins with a real conversation.`,
  ],
]

export default function Terms() {
  return (
    <>
      <section className="page-hero container stack">
        <p className="eyebrow">The fine print, in plain language</p>
        <h1 className="display">Terms &amp; refund policy</h1>
        <p className="lead">
          The short version: Founders&rsquo; List payments are one-time and
          non-refundable, the house is not finished yet, and if the opening
          slips your perks carry forward. The one exception: if we never
          open, you get every dollar back.
        </p>
        <p className="small">Effective November 2026</p>
      </section>

      <section className="container" style={{ paddingBottom: 'var(--section-pad)' }}>
        <div className="privacy-body">
          {SECTIONS.map(([title, copy]) => (
            <article className="privacy-item stack-sm" key={title}>
              <h2 className="h3-heading">{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
