// Lead capture — where signups actually go.
//
// Priority: Klaviyo (once the account exists) → FORM_ENDPOINT (Formspree
// etc.) as a backup/fallback → mailto handoff so no lead is ever silently
// lost. Klaviyo's /client/ endpoints are public-key, CORS-enabled, and meant
// to be called from the browser — no backend required on this static site.
import { KLAVIYO, FORM_ENDPOINT } from './config.js'

// Klaviyo rejects the entire request if phone_number isn't valid E.164, so
// we only pass it as a real phone when it normalizes cleanly; otherwise it
// rides along as a custom property and the signup still lands.
function toE164(phone) {
  const digits = phone.replace(/[^\d+]/g, '')
  if (/^\+\d{8,15}$/.test(digits)) return digits
  if (/^\d{10}$/.test(digits)) return `+1${digits}` // bare US number
  if (/^1\d{10}$/.test(digits)) return `+${digits}`
  return null
}

async function sendToKlaviyo(lead) {
  const e164 = toE164(lead.phone)
  const attributes = {
    profile: {
      data: {
        type: 'profile',
        attributes: {
          email: lead.email,
          first_name: lead.name,
          ...(e164 ? { phone_number: e164 } : {}),
          properties: {
            founders_tier: lead.tier,
            sms_opt_in: lead.textOptIn,
            phone_as_entered: lead.phone,
            terms_accepted: true,
            terms_accepted_at: lead.termsAcceptedAt,
            terms_version: lead.termsVersion,
            source: 'prelaunch-site',
          },
        },
      },
    },
    custom_source: "Founders' List — prelaunch site",
  }

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO.companyId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes,
          ...(KLAVIYO.listId
            ? {
                relationships: {
                  list: { data: { type: 'list', id: KLAVIYO.listId } },
                },
              }
            : {}),
        },
      }),
    },
  )
  return res.ok // Klaviyo answers 202 Accepted on success
}

function sendToFormEndpoint(lead) {
  return fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(lead),
  })
}

// Returns true if the lead was captured by at least one configured backend;
// false means nothing is configured (caller falls back to mailto) or every
// configured backend failed (caller shows the error state).
export async function submitLead(lead) {
  const targets = []
  if (KLAVIYO.companyId) targets.push(sendToKlaviyo(lead))
  if (FORM_ENDPOINT)
    targets.push(sendToFormEndpoint(lead).then((r) => r.ok))
  if (targets.length === 0) return false

  const results = await Promise.allSettled(targets)
  return results.some((r) => r.status === 'fulfilled' && r.value)
}

export const HAS_BACKEND = Boolean(KLAVIYO.companyId || FORM_ENDPOINT)
