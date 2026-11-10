// Launch configuration — fill these in before going live.

// Form backend (e.g. Formspree: https://formspree.io → 'https://formspree.io/f/XXXXXXXX').
// While empty, signups fall back to a prefilled email to CONTACT_EMAIL so no
// lead is ever silently lost.
export const FORM_ENDPOINT = ''

// Stripe Payment Links per tier (https://dashboard.stripe.com/payment-links).
// While empty, the confirmation screen says the link arrives by email.
export const PAYMENT_LINKS = {
  entry: '',
  stories: '',
  early: '',
}

export const CONTACT_EMAIL = 'hello@samayasedona.com'
export const INSTAGRAM_URL = 'https://instagram.com/samayasedona' // TODO: confirm handle
