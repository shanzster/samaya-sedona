// TODO: have counsel review before launch — this is a plain-language draft.
const SECTIONS = [
  [
    'What we collect',
    'When you join the Founders’ List we collect your name, email address, and the tier you chose. If you send an inquiry, we also keep what you wrote to us. That is the whole list — no profiles, no tracking pixels in emails.',
  ],
  [
    'How we use it',
    'We use your email to send what you signed up for: the launch announcement, early-access windows, and — for Brand Stories members — the biweekly updates. We do not sell, rent, or trade your information with anyone, ever.',
  ],
  [
    'Payments',
    'Tier payments are processed by a third-party payment processor. Your card details go to them directly and never touch our servers. We only receive confirmation that a payment happened, along with your name and email.',
  ],
  [
    'Cookies & analytics',
    'This site uses no advertising cookies and no third-party trackers. We may use privacy-respecting, aggregate analytics to see how many people visit — never to follow individuals around the internet.',
  ],
  [
    'How long we keep it',
    'We keep your information while the Founders’ List is active and while you have an account or booking relationship with us. Unsubscribe or ask us to delete your data and we will — fully, within 30 days.',
  ],
  [
    'Your rights',
    'You can ask us at any time what we hold about you, ask us to correct it, or ask us to delete it. One email is enough. If you are in a jurisdiction with specific privacy rights (GDPR, CCPA), those rights apply and we honor them.',
  ],
  [
    'Contact',
    'Questions about this policy or your data: hello@samayasedona.com. We read everything and reply like people, because every booking — and every question — begins with a real conversation.',
  ],
]

export default function Privacy() {
  return (
    <>
      <section className="page-hero container stack">
        <p className="eyebrow">The fine print, in plain language</p>
        <h1 className="display">Privacy policy</h1>
        <p className="lead">
          The short version: we collect the minimum, we never sell it, and
          you can leave any time. The longer version is below.
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
