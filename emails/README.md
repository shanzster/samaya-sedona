# Confirmation email

`founders-confirmation.html` is the email sent the moment someone joins the
Founders' List. It deliberately **restates the non-refundable terms in
writing** — together with the timestamped checkout confirmation
(`termsAccepted` / `termsAcceptedAt` fields the form submits), this is the
evidence pack for any card dispute.

The refund language mirrors `src/pages/Terms.jsx`. If the terms page
changes, change this email to match — the two must never disagree.

## Wiring it up (Klaviyo + Stripe — decided Nov 11)

Signups are pushed to Klaviyo directly from the browser (`src/leads.js`)
once `KLAVIYO.companyId` / `KLAVIYO.listId` are filled in `src/config.js` —
see the setup steps in that file. Each profile arrives with custom
properties: `founders_tier`, `sms_opt_in`, `terms_accepted`,
`terms_accepted_at`, `terms_version`.

To send this email from Klaviyo:

1. Flows → Create Flow → trigger **"Added to list"** on the Founders' List.
2. Add an Email action and paste this HTML into the source editor.
3. Swap the placeholders for Klaviyo tags:
   `{{name}}` → `{{ first_name }}`,
   tier → `{{ person|lookup:'founders_tier' }}`,
   `{{terms_url}}` → the live `https://<domain>/#/terms`,
   `{{payment_link}}` → the tier's Stripe Payment Link (use a conditional
   split on `founders_tier` to pick the right link per tier, or three email
   variants).
4. Set the flow live *before* the site goes live, so signup #1 gets it.

**Stripe side:** Stripe's receipt email goes out on payment but does not
restate the refund terms — this Klaviyo email at signup is still required.
In each Payment Link's settings, enable the custom consent checkbox pointed
at `/#/terms` so acceptance is also recorded on the Stripe record.

`FORM_ENDPOINT` (Formspree) remains available as an optional backup — if
both are set, leads go to both.

## Plain-text version

Providers should also send a text alternative:

```
You're in, {name}.

Your spot on the Founders' List is confirmed at the {tier_price}
{tier_name} tier. One-time, never monthly — nothing renews, nothing
auto-charges.

Complete your payment: {payment_link}

THE TERMS, ONE MORE TIME
Samaya Sedona is still being built, and our 2027 opening is a target, not
a promise. Your payment is one-time and NON-REFUNDABLE — you confirmed
this at checkout. If the opening date slips, your place in line and all
your perks carry forward unchanged. The one exception: if the project is
ever permanently cancelled, every dollar is refunded in full within 30
days. Full terms: {terms_url}

Questions? Reply to this email, or write to hello@samayasedona.com.

— Samaya Sedona · Sedona, Arizona
Every booking begins with a real conversation.
```
