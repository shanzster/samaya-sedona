// Launch configuration — fill these in before going live.
// Everything a client call can change lives here so copy/amounts swap
// without touching components.

// Form backend (e.g. Formspree: https://formspree.io → 'https://formspree.io/f/XXXXXXXX').
// While empty, signups fall back to a prefilled email to CONTACT_EMAIL so no
// lead is ever silently lost.
export const FORM_ENDPOINT = ''

// Stripe Payment Links per tier (https://dashboard.stripe.com/payment-links).
// TODO: Stripe API keys pending from Yash/Khush.
// While empty, the confirmation screen says the link arrives by email.
export const PAYMENT_LINKS = {
  entry: '',
  stories: '',
  early: '',
}

export const CONTACT_EMAIL = 'hello@samayasedona.com'
export const INSTAGRAM_URL = 'https://instagram.com/samayasedona' // TODO: confirm handle

export const OPENING_YEAR = '2027'
export const SLEEPS = 11 // TODO: confirm final sleep count with Yash/Khush

// ---------------------------------------------------------------------------
// Hero slot — the first thing visitors see. Replace the placeholder image
// with either a video (Higgsfield montage / virtual tour) or a collage once
// the updated renderings arrive from the design team.
//   mode: 'image' | 'video' | 'collage'
export const HERO = {
  mode: 'image',
  // mode 'image' — single placeholder render (to be replaced)
  image: {
    src: '/Images/hero-bg-1600.jpg',
    srcSet: '/Images/hero-bg-800.jpg 800w, /Images/hero-bg-1600.jpg 1312w',
  },
  // mode 'video' — drop in an mp4/webm URL; poster shows while it loads
  video: {
    src: '',
    poster: '/Images/hero-bg-1600.jpg',
  },
  // mode 'collage' — 3–5 images shown as a grid collage
  collage: [
    '/Images/web/after-upper-deck-renderings-2.jpg',
    '/Images/web/recreational-area.jpg',
    '/Images/web/living-room-1-after.jpg',
    '/Images/web/sound-lounge-after.jpg',
  ],
}

// Founders talking about the house — to be recorded. While empty, the
// section shows a placeholder frame.
export const FOUNDERS_VIDEO_URL = ''

// ---------------------------------------------------------------------------
// Founders' List tiers — amounts NOT final (Steph to review).
// Direction from Nov 6 touchbase: $1 / $10 / $50, with the $50 tier
// including a perk worth ~$100 (a free upgrade or similar — not a discount).
// Alternative under discussion: $1 / $5 / $10 with the $50 upsell moved to
// the email chain.
export const TIERS = [
  {
    id: 'entry',
    price: '$1',
    name: 'Founding Entry',
    flag: null,
    tagline: 'For the curious',
    blurb:
      'A dollar is a handshake. One-time — never monthly — it puts your name on the list ahead of the public.',
    perks: [
      'Your name on the Founders’ List — permanently',
      'The launch announcement before the public hears it',
      'First in line when the calendar opens',
      'Founders-only launch pricing on your first stay',
    ],
  },
  {
    id: 'stories',
    price: '$10',
    name: 'Brand Stories',
    flag: 'Most popular',
    tagline: 'For the ones who want the whole story',
    blurb:
      'The remodel, documented honestly — the befores, the afters, and the weeks where nothing went right.',
    perks: [
      'Everything in Founding Entry',
      'Build updates — photos, floor plans, setbacks included',
      'The brand stories: why this house, why this hill, why Sedona',
      'Early looks at rooms before they reach the public gallery',
    ],
  },
  {
    id: 'early',
    price: '$50',
    name: 'Early Access',
    flag: 'Best value',
    tagline: 'For the trip leader',
    blurb:
      'If you already know who your people are, this is the tier that gets you the good weekends — plus a launch perk worth about $100.',
    perks: [
      'Everything in Brand Stories',
      'A launch perk worth about $100 — a free upgrade on your first stay', // TODO: final perk from Yash/Khush
      'Early booking window before the public calendar opens',
      'First pick of opening-season dates — holidays included',
      'A personal heads-up email the day your window opens',
    ],
  },
]

// Comparison matrix — rows: [benefit, entry, stories, early]
export const TIER_MATRIX = [
  ['Name on the Founders’ List', true, true, true],
  ['Launch announcement before the public', true, true, true],
  ['First in line when the calendar opens', true, true, true],
  ['Founders-only launch pricing', true, true, true],
  ['Build updates & brand stories', false, true, true],
  ['Early looks at finished rooms', false, true, true],
  ['Launch perk worth ~$100', false, false, true],
  ['Early booking window', false, false, true],
  ['First pick of opening-season dates', false, false, true],
]
