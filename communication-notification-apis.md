# Communication & Notification APIs for Indie Hackers (2026)

A comprehensive guide to messaging, notification, and communication APIs — covering pricing, free tiers, TypeScript SDK availability, and best use cases.

---

## 1. Transactional Email

| Service | Free Tier | Paid Starting | Pricing Model | TS SDK | React Email | Best For |
|---------|-----------|---------------|---------------|--------|-------------|----------|
| **[Resend](https://resend.com/pricing)** | 3,000 emails/mo | $20/mo (50K) | Volume-based | Yes (first-class) | Native support | Best DX, React Email creator |
| **[Postmark](https://postmarkapp.com/pricing)** | 100 emails/mo | $15/mo (10K) | Volume + overage ($1.30–1.80/1K) | Yes | No native | Highest deliverability |
| **[Amazon SES](https://aws.amazon.com/ses/pricing/)** | 3,000/mo (12 mo) | $0.10/1K emails | Pure pay-per-use | Yes (AWS SDK) | No | Cheapest at scale |
| **[Plunk](https://www.useplunk.com/pricing)** | 1,000–3,000/mo | $0.001/email | Pay-per-email | Yes (Node) | No | Self-hostable (AGPL-3.0) |
| **[SendGrid](https://sendgrid.com/en-us/pricing)** | 100/day forever | $19.95/mo (50K) | Volume tiers | Yes | No native | Legacy, massive ecosystem |
| **[Mailgun](https://www.mailgun.com/pricing/)** | 100/day | $15/mo (10K) | Volume tiers | Yes | No | Email validation included |
| **[Loops](https://loops.so/pricing)** | 1,000 contacts, 4K emails/mo | $49/mo (5K contacts) | Contact-based, unlimited sends | Yes | No | SaaS transactional + marketing unified |

### Deliverability & DX Comparison

- **Resend** — Built by the React Email team. First-class TypeScript SDK, best developer docs, native React Email support. Good deliverability with dedicated IPs available at $30/mo on Scale plan.
- **Postmark** — Industry-leading deliverability. Separates transactional from marketing streams. 3-hour support response on all paid plans. Less modern DX.
- **Amazon SES** — Cheapest at scale ($0.10/1K) but requires more setup. No built-in templates or preference management. Hidden costs (Virtual Deliverability Manager adds $0.07/1K).
- **Plunk** — Open-source alternative built on AWS SES. Self-hostable. Unlimited contacts stored free. Smaller community.

**Verdict:** **Resend** for DX. **Postmark** for deliverability. **Amazon SES** for cost at scale.

---

## 2. Marketing Email / CRM

| Service | Free Tier | Paid Starting | Pricing Model | API-First? | Best For |
|---------|-----------|---------------|---------------|------------|----------|
| **[Loops](https://loops.so/pricing)** | 1K contacts | $49/mo (5K contacts) | Contact-based, unlimited sends | Yes | SaaS email (transactional + marketing unified) |
| **[Customer.io](https://customer.io/pricing)** | 14-day trial | $100/mo (5K profiles) | Profile-based | Yes | Event-driven automation, API-first CRM |
| **[Kit (ConvertKit)](https://kit.com)** | 10K subscribers | $39/mo (1K subs) | Subscriber-based | Yes | Creator newsletters, landing pages |
| **[Brevo](https://www.brevo.com/pricing/)** | 300/day (~9K/mo) | $9/mo (5K emails) | Email volume, unlimited contacts | Partial | Budget marketing + transactional combo |
| **[Mailchimp](https://mailchimp.com/pricing/)** | 250 contacts | $13/mo (500 contacts) | Contact-based | Partial | Legacy, huge template library |
| **[Beehiiv](https://www.beehiiv.com/pricing)** | 2,500 subs | $43/mo (1K subs) | Subscriber-based | Partial | Newsletter monetization, 0% commission |

### API-First Picks

- **Customer.io** — Full API, webhooks, event-driven workflows. Supports email, SMS, push, in-app. Starts at $100/mo which is steep for early-stage.
- **Loops** — Built specifically for SaaS. Clean API. One tool for transactional + marketing. $49/mo for 5K contacts with unlimited sends.

**Mailchimp** and **Brevo** are UI-first with APIs bolted on. Brevo is significantly cheaper than Mailchimp (often less than half at scale) and includes transactional emails in the base plan.

**Beehiiv** stands out for newsletter creators — 0% commission on paid subscriptions, built-in monetization tools, and a generous free tier of 2,500 subscribers.

**Indie hacker pick:** **Loops** if you want one tool for transactional + marketing. **Beehiiv** if newsletter-focused with monetization.

---

## 3. SMS & WhatsApp

| Service | SMS (US) per msg | WhatsApp per msg | Free Tier | TS SDK | Best For |
|---------|------------------|------------------|-----------|--------|----------|
| **[Twilio](https://www.twilio.com/en-us/sms/pricing/us)** | $0.0083 + carrier fees | $0.005 markup + Meta fees | Pay-as-you-go (no free) | Yes (first-class) | Most mature, best docs |
| **[Vonage](https://www.vonage.com/communications-apis/sms/pricing/)** | $0.00809 | ~$0.005 markup + Meta fees | Pay-as-you-go | Yes | Simpler API |
| **[Bird (MessageBird)](https://bird.com/en/pricing)** | $0.008 | $0.0147 (US) | Pay-as-you-go | Yes | Aggressive pricing, unified platform |
| **[Infobip](https://www.infobip.com/pricing)** | ~$0.01 | Varies by category | Enterprise minimums (~$600/mo) | Yes | Enterprise omnichannel |
| **[Sinch](https://www.sinch.com)** | $0.07 | Varies | Pay-as-you-go | Yes | Global carrier reach |

### WhatsApp Business API (Meta Direct)

Since July 2025, WhatsApp uses per-message pricing (no longer conversation-based):

| Category | Price Range (per msg) | Notes |
|----------|----------------------|-------|
| Marketing | $0.0109–$0.1323 | Varies by recipient country |
| Utility | $0.0008–$0.0456 | Order updates, account alerts |
| Authentication | $0.0008–$0.0456 | OTP, verification codes |
| Service (within 24h) | **Free** | Replies to customer messages |

Rates are determined by the **recipient's country**, not the sender's location. Messages via Click-to-WhatsApp ads get a 72-hour free window.

### Additional Costs

- **Twilio:** Phone number rental $1.15/mo (local), $2.15/mo (toll-free). Failed message fee $0.001/msg.
- **All providers:** Carrier surcharges apply on top of base rates.

**Indie hacker pick:** **Twilio** — best TS SDK, most tutorials, predictable pricing. For WhatsApp-only, consider Meta's API directly.

---

## 4. Push Notifications

| Service | Free Tier | Paid Starting | Multi-Channel? | TS SDK | Best For |
|---------|-----------|---------------|----------------|--------|----------|
| **[Firebase FCM](https://firebase.google.com/pricing)** | Unlimited (free) | N/A | Push only | Yes (Firebase SDK) | Free push, Google ecosystem |
| **[OneSignal](https://onesignal.com/pricing)** | Unlimited push subs, 10K emails | $19/mo + usage | Email, SMS, push, in-app | Yes | Easy setup, generous free push |
| **[Knock](https://knock.app/pricing)** | 10K notifications/mo | ~$0.005/msg beyond | Email, push, in-app, SMS, Slack | Yes | Workflow orchestration, preferences |
| **[Novu](https://novu.co/pricing/)** | 10K runs/mo (cloud), unlimited (self-host) | $30/mo (30K runs) | Email, push, in-app, SMS, chat | Yes | Open-source (MIT), self-hostable |
| **[Courier](https://www.courier.com/pricing)** | 10K notifications/mo | $99/mo | Email, push, SMS, in-app, Slack, Teams | Yes | Visual workflow builder, no-code routing |

### Multi-Channel Orchestration Comparison

| Feature | Knock | Novu | Courier | OneSignal |
|---------|-------|------|---------|-----------|
| Workflow builder | Code-first | Code-first | Visual (no-code) | Basic |
| Preference center | Excellent | Built-in | Good | Basic |
| Self-hostable | No | Yes (MIT) | No | No |
| In-app feed component | Yes (React) | Yes (React) | Yes (React, iOS, Android) | Limited |
| Channel fallback logic | Yes | Yes | Yes (best) | Limited |
| Price at 50K msgs/mo | ~$200 | $30 (self-host: $0) | $99+ | ~$19 + usage |

- **Knock** — Best preference management, clean API, ideal for SaaS notification centers
- **Novu** — Open-source, self-hostable, most flexible, best for budget-conscious teams
- **Courier** — Best visual workflow builder, but expensive ($99/mo minimum)
- **OneSignal** — Best free tier for pure push, weaker on orchestration
- **FCM** — Free but push-only, no orchestration layer

---

## 5. In-App Notifications

| Service | Free Tier | Paid Starting | Preference Center | TS SDK | Best For |
|---------|-----------|---------------|-------------------|--------|----------|
| **[Knock](https://knock.app/pricing)** | 10K/mo | ~$0.005/msg | Yes (excellent) | Yes | Best preference management + in-app feed |
| **[Novu](https://novu.co/pricing/)** | 10K/mo (cloud) | $30/mo | Yes (built-in) | Yes | Open-source, full control |
| **[Engagespot](https://engagespot.co/pricing)** | 10K notifications/mo | $20/mo | Yes | Yes | Budget alternative to MagicBell |
| **[MagicBell](https://www.magicbell.com/pricing)** | 100 MAU | $99/mo (2K MAU) | Yes | Yes | Polished UI, expensive |

### Notification Preferences Comparison

- **Knock** — Granular per-channel, per-category preferences. Drop-in preference center React component. Users can mute specific workflows or channels.
- **Novu** — Similar preference model to Knock. Advantage: self-hostable, so you own the data. In-app inbox component included.
- **Engagespot** — Good preference center at $20/mo. Best budget pick for in-app notifications.
- **MagicBell** — Polished UI out of the box, but at $99/mo for 2K MAU it's expensive for indie hackers. The 100 MAU free tier is very limited.

**Indie hacker pick:** **Knock** (free 10K/mo) or **Novu** (self-host for free) for the best preference management.

---

## 6. Chat & Real-Time Messaging

| Service | Free Tier | Paid Starting | Pricing Model | TS SDK | Best For |
|---------|-----------|---------------|---------------|--------|----------|
| **[Stream](https://getstream.io/chat/pricing/)** | Free (<5 team, <$10K MRR) | Custom (MAU-based) | MAU + connections + storage | Yes | Best chat UI components (React) |
| **[SendBird](https://sendbird.com/pricing/chat)** | 1K MAU (30-day trial) | Custom (MAU-based) | MAU-based | Yes | Enterprise chat, moderation |
| **[Ably](https://ably.com)** | 6M msgs/mo | $2.50/M msgs | Messages + connections + channels | Yes | Reliability (99.999% SLA) |
| **[Pusher](https://pusher.com)** | 200 connections | $49/mo (500 connections) | Connections-based | Yes | Simple real-time (events, presence) |
| **[PubNub](https://www.pubnub.com)** | 200 MAU | $98/mo (1K MAU) | MAU + messages | Yes | Low latency, IoT/gaming |
| **[Liveblocks](https://liveblocks.io/pricing)** | 500 monthly active rooms | $29/mo | Rooms-based | Yes | Collaborative features (cursors, comments) |

### When to Use What

- **Stream** — Full chat solution with pre-built React UI components. Free for startups (<5 team, <$10K MRR). Best option for adding chat to a SaaS product.
- **Ably** — Raw pub/sub with 99.999% uptime SLA. Use when you need reliable real-time data sync, not necessarily chat UI.
- **Pusher** — Simplest integration for basic real-time features (typing indicators, presence, live updates). Predictable pricing based on connections.
- **PubNub** — Lowest latency (<50ms globally). Best for gaming, IoT, or latency-critical applications. Expensive for chat use cases.
- **SendBird** — Enterprise-grade with moderation, translation, help desk. Expensive and less transparent pricing.
- **Liveblocks** — Not a chat tool. Use for collaborative features like Figma-style cursors, comments, and CRDT-based real-time editing.

**Indie hacker pick:** **Stream** (free for small startups) for full chat. **Pusher** for simple real-time features. **Ably** for reliability-critical pub/sub.

---

## 7. Webhooks (Sending to Customers)

| Service | Free Tier | Paid Starting | Open Source | TS SDK | Best For |
|---------|-----------|---------------|-------------|--------|----------|
| **[Svix](https://www.svix.com/pricing/)** | 50K msgs, 10 msg/s | $10/mo (100K msgs) | Yes (MIT) | Yes | Building webhook infra into your product |
| **[Hookdeck](https://hookdeck.com/pricing)** | 10K events/mo | $15/mo | No | Yes | Receiving & managing inbound webhooks |
| **[ngrok](https://ngrok.com)** | Free (limited) | $10/mo | Partial | Yes | Local dev/testing webhooks |

### Key Distinctions

- **Svix** = For products that **send** webhooks to customers (like Stripe does). Open-source (MIT), self-hostable. Handles retries, signing, delivery guarantees. SOC 2 Type II compliant.
- **Hookdeck** = For **receiving** and managing inbound webhooks reliably. Retry logic, transformation, fan-out. 75% cheaper than DIY infrastructure.
- **ngrok** = For **local development** — tunneling webhooks to your localhost during development.

**Indie hacker pick:** **Svix** if your product needs to send webhooks. Start with the free tier (50K msgs), upgrade to $10/mo. Self-host for free if needed.

---

## Cheapest Multi-Channel Notification Stack

### Option A: Fully Managed ($0/mo to start)

| Channel | Service | Cost | Limit |
|---------|---------|------|-------|
| Transactional Email | **Resend** Free | $0 | 3K emails/mo |
| Push Notifications | **Firebase FCM** | $0 | Unlimited |
| In-App Notifications | **Novu** Free (cloud) | $0 | 10K notifications/mo |

**Total: $0/mo** — Covers email + push + in-app with notification preferences.
**At scale:** Resend Pro ($20/mo) + Novu Pro ($30/mo) = **$50/mo**.

### Option B: Unified Orchestration ($0/mo, self-hosted)

| Channel | Service | Cost | Notes |
|---------|---------|------|-------|
| Orchestration | **Novu** (self-hosted) | $0 | MIT license, all channels |
| Email Provider | **Resend** or **Amazon SES** | $0–$20/mo | Bring your own provider |
| Push Provider | **Firebase FCM** | $0 | Free |

**Total: $0/mo** — Novu orchestrates everything, you bring your own delivery providers. Most control, some DevOps overhead.

### Option C: Zero DevOps ($0/mo to start)

| Channel | Service | Cost | Limit |
|---------|---------|------|-------|
| Orchestration + In-App | **Knock** Free | $0 | 10K notifications/mo |
| Email Delivery | **Resend** Free | $0 | 3K emails/mo |
| Push Delivery | **Firebase FCM** | $0 | Unlimited |

**Total: $0/mo** — Knock handles orchestration, preferences, and in-app feed. Best DX with minimal setup.

---

## TL;DR Recommendations

| Category | Top Pick | Runner-Up | Budget Pick |
|----------|----------|-----------|-------------|
| Transactional Email | **Resend** | Postmark | Amazon SES |
| Marketing Email | **Loops** | Customer.io | Brevo |
| Newsletter | **Beehiiv** | Kit | Loops |
| SMS | **Twilio** | Bird | Vonage |
| WhatsApp | **Twilio** | Bird | Meta direct |
| Push Notifications | **FCM** (free) | OneSignal | Novu |
| In-App Notifications | **Knock** | Novu | Engagespot |
| Multi-Channel Orchestration | **Knock** | Novu (self-host) | Courier |
| Chat/Real-Time | **Stream** | Pusher | Ably |
| Webhooks (sending) | **Svix** | — | Self-host Svix |

**Start with:** Resend + FCM + Knock (or Novu) = **$0/mo** multi-channel notifications with orchestration and preference management.
