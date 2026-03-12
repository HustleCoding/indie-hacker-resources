# Communication & Notification APIs for Indie Hackers

**A practical 2026 guide to email, SMS, OTP, push, in-app notifications, support inboxes, chat, and webhook delivery for TS/Next.js builders — March 12, 2026**

Prices change fast. `URL` links point to official pricing/docs pages.

---

## 1. Transactional Email

> Transactional email is where DX and deliverability both matter. Most indie teams should optimize for fast template iteration first, then optimize cost later.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Resend](https://resend.com)** | [Pricing](https://resend.com/pricing) | 3,000 emails/mo | Pro from $20/mo for 50K emails | Excellent | Best TS and React Email DX |
| **[Postmark](https://postmarkapp.com)** | [Pricing](https://postmarkapp.com/pricing) | 100 emails/mo developer tier | From $15/mo for 10K emails | Good | Highest deliverability and boring reliability |
| **[Amazon SES](https://aws.amazon.com/ses/)** | [Pricing](https://aws.amazon.com/ses/pricing/) | 3,000 emails/mo for 12 months on new-account free tier | About $0.10 per 1K emails | Good | Cheapest at real scale |
| **[Loops](https://loops.so)** | [Pricing](https://loops.so/pricing) | 1,000 contacts and 4,000 emails/mo | From $49/mo for 5K contacts | Good | One tool for transactional plus lifecycle email |
| **[Plunk](https://www.useplunk.com)** | [Pricing](https://www.useplunk.com/pricing) | Small free tier | About $0.001 per email on pay-as-you-go | Good | Self-hostable or indie-friendly email send |

### Email read

- **Use Resend first.** Best docs, best TS SDK, best template workflow.
- **Use Postmark** if inbox placement is your real business risk.
- **Use SES** only once volume makes the complexity worth it.

---

## 2. Marketing Email & Newsletter

> “Marketing email” splits into two jobs: event-driven lifecycle CRM for SaaS, and newsletter/media distribution. They should not be treated like the same purchase.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Loops](https://loops.so)** | [Pricing](https://loops.so/pricing) | 1,000 contacts | From $49/mo | Good | SaaS lifecycle email with a clean API |
| **[Customer.io](https://customer.io)** | [Pricing](https://customer.io/pricing) | 14-day trial | From $100/mo | Good | Event-driven customer messaging across channels |
| **[Beehiiv](https://www.beehiiv.com)** | [Pricing](https://www.beehiiv.com/pricing) | Up to 2,500 subscribers | Paid from about $43/mo yearly on Scale entry | Partial | Newsletter-first businesses and monetized media |
| **[Brevo](https://www.brevo.com)** | [Pricing](https://www.brevo.com/pricing/) | 300 emails/day | Paid from $9/mo | Partial | Cheapest all-in-one marketing email start |

### Marketing read

- **Loops** is the best API-first choice for SaaS lifecycle work.
- **Customer.io** is stronger, but the price floor is real.
- **Beehiiv** is for newsletter businesses, not normal SaaS onboarding.
- **Brevo** is the budget pick when “good enough” wins.

---

## 3. OTP & Verify APIs

> This section was missing, and it matters. Many indie products should not build phone verification by hand on top of raw SMS APIs.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Twilio Verify](https://www.twilio.com/verify)** | [Pricing](https://www.twilio.com/en-us/verify/pricing) | Trial credits, no durable free production tier | SMS verification from about 5c per successful verify plus channel fees; WhatsApp and email flows also available | Excellent | Default OTP and phone verification API |
| **[Vonage Verify](https://www.vonage.com/communications-apis/verify/)** | [Pricing](https://www.vonage.com/communications-apis/verify/pricing/) | Trial credits | Usage-based by country and channel | Good | Competitive phone verification without Twilio sprawl |
| **[Stytch](https://stytch.com)** | [Pricing](https://stytch.com/credits) | Free up to 10K MAUs | Pay-as-you-go after free MAU allowance | Good | Auth-native OTP, magic links, passkeys, and MFA |

### OTP read

- **Use Twilio Verify** if you truly need SMS or WhatsApp verification.
- **Use Stytch** if verification is really part of auth, not a comms feature.
- **Do not build OTP on raw SMS endpoints** unless you enjoy rate limits, fraud, resend logic, and template headaches.

---

## 4. SMS & WhatsApp

> SMS bills are never just the headline per-message fee. Carrier fees, number rental, and country-specific WhatsApp pricing all matter.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Twilio](https://www.twilio.com)** | [US messaging pricing](https://www.twilio.com/en-us/sms/pricing/us) | No real free production tier | US SMS about $0.0083 plus carrier fees; WhatsApp adds Twilio markup plus Meta fees | Excellent | Most mature messaging API and docs |
| **[Vonage](https://www.vonage.com)** | [SMS pricing](https://www.vonage.com/communications-apis/sms/pricing/) | Trial credits | US SMS about $0.00809; WhatsApp usage-based | Good | Simpler alternative to Twilio |

### WhatsApp reality

- **WhatsApp is now per-message, not conversation-priced.**
- **Meta direct can be cheaper,** but Twilio and Vonage save integration time.
- **Service replies inside the support window can be effectively free,** so support use cases price differently from outbound marketing.

---

## 5. Push, In-App, and Notification Infrastructure

> Push and in-app should be one decision, not two separate shopping trips. The real question is whether you only need a delivery pipe, or a full notification system with preferences, feeds, and channel routing.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Firebase FCM](https://firebase.google.com)** | [Pricing](https://firebase.google.com/pricing) | Free | Free | Good | Free push delivery pipe |
| **[OneSignal](https://onesignal.com)** | [Pricing](https://onesignal.com/pricing) | Free push and limited messaging | Paid from $19/mo plus usage | Good | Easiest managed push start |
| **[Novu](https://novu.co)** | [Pricing](https://novu.co/pricing/) | Cloud free tier; OSS/self-host free | Paid cloud from $30/mo; self-host stays free | Good | Best open-source notification infrastructure |
| **[Knock](https://knock.app)** | [Guide](https://knock.app/manuals/notification-infrastructure/how-to-choose-a-notification-infrastructure-platform) | 10K notifications/mo | Paid plans jump fast from the free tier; best used when notification UX matters | Excellent | Best managed notification workflows and preferences |
| **[Engagespot](https://engagespot.co)** | [Pricing](https://engagespot.co/pricing) | 10K notifications/mo | Paid from $20/mo | Good | Cheapest managed in-app plus notification center |

### Notification read

- **FCM is a pipe, not a notification product.**
- **Novu is the best $0 answer** if you can self-host or live with its cloud limits.
- **Knock is the best managed product** if user preferences, digests, and in-app feeds are core UX.
- **OneSignal** stays great for push-heavy apps that do not need much workflow logic.

---

## 6. Support Chat & Shared Inbox

> This section was also missing. It matters because support tooling is often the first real communication surface users notice.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Crisp](https://crisp.chat)** | [Pricing](https://crisp.chat/en/pricing/) | Free basic live chat | Paid from $95/mo on Essentials | Good | Cheapest serious shared inbox plus chat |
| **[Plain](https://www.plain.com)** | [Pricing](https://www.plain.com/pricing) | No permanent free tier | From $39 per seat/mo | Good | API-native B2B support infrastructure |
| **[Front](https://front.com)** | [Pricing](https://front.com/pricing) | No free tier | From $29 per seat/mo annual | Partial | Polished shared inbox for small support teams |
| **[Intercom](https://www.intercom.com)** | [Pricing archive](https://www.intercom.com/pricing-archive/p5-0) | No normal free tier | Essential from $39 per seat/mo; advanced plans climb quickly | Partial | Support plus in-app messaging if you can use startup discounts |

### Support read

- **Crisp** is the best “cheap but real” support inbox.
- **Plain** is the best fit for modern B2B support workflows, APIs, and internal tooling.
- **Intercom** only makes indie sense with startup pricing or if you deeply want its integrated support stack.

---

## 7. Chat, Realtime, and Webhooks

> Full chat, pub/sub, collaboration, and webhook delivery are different purchases. Treat them separately.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Stream](https://getstream.io)** | [Chat pricing](https://getstream.io/chat/pricing/) | Startup-friendly free access exists for small teams and small revenue | Paid plans are usage and MAU based | Excellent | Full chat UI and backend fast |
| **[Ably](https://ably.com)** | [Pricing](https://ably.com/docs/platform/pricing) | 6M messages/mo | Paid from $2.50 per million messages | Excellent | Reliable realtime pub/sub |
| **[Liveblocks](https://liveblocks.io)** | [Pricing](https://liveblocks.io/pricing) | 500 monthly active rooms | Paid from $29/mo | Excellent | Collaborative comments, presence, and multiplayer UX |
| **[Svix](https://www.svix.com)** | [Pricing](https://www.svix.com/pricing/) | Free tier | Pro starts high; self-host exists | Good | Sending webhooks to your customers |
| **[Hookdeck](https://hookdeck.com)** | [Pricing](https://hookdeck.com/pricing) | Free tier | Team from $39/mo; usage above free | Good | Receiving and managing inbound webhooks |

### Realtime read

- **Stream** is for product chat.
- **Ably** is for raw realtime sync.
- **Liveblocks** is for collaborative product UX.
- **Svix** is for outbound webhooks.
- **Hookdeck** is for inbound webhook sanity.

---

## 8. The Best $0 to Low-Cost Communication Stack

> The cheapest stack is usually one email provider, one notification layer, and zero extra vendors until the product proves it needs them.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the tables below.

### My default stack

| Layer | Pick | Why |
|------|------|-----|
| Transactional email | **Resend** | Best TS DX and a real free tier |
| Push delivery | **Firebase FCM** | Free forever |
| In-app and orchestration | **Novu** | Real free path, OSS exit hatch |
| OTP | **Stytch** or **Twilio Verify only when needed** | Do not pay SMS tax too early |
| Support inbox | **Crisp** | Cheapest real support stack |
| Realtime | **Ably** | Free tier lasts and the DX is strong |

### Final take

- **Start with Resend + FCM + Novu.**
- **Add Twilio Verify only when phone auth is clearly required.**
- **Buy Plain or Intercom later.** Most early SaaS apps do not need them on day 1.
