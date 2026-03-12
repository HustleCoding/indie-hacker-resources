# Communication & Notification APIs for Indie Hackers

**Comprehensive guide to messaging, notifications, and real-time communication — March 2026**

---

## 1. Transactional Email

> **Key concept:** Transactional emails are triggered by user actions (password resets, receipts, onboarding). Deliverability is critical — your emails must reach the inbox, not spam. React Email support lets you build templates as React components with full TypeScript type safety.

| Platform | Free Tier | Paid From | Pricing Model | TS SDK | React Email | Best For |
|----------|-----------|-----------|---------------|--------|-------------|----------|
| **[Resend](https://resend.com)** | 3,000 emails/mo | $20/mo (50K) | Volume-based | ★★★★★ | Native | Best DX, React Email creator |
| **[Postmark](https://postmarkapp.com)** | 100 emails/mo | $15/mo (10K) | Volume + overage | ★★★★☆ | No | Highest deliverability |
| **[Amazon SES](https://aws.amazon.com/ses/)** | 3,000/mo (12 mo) | $0.10/1K emails | Pay-per-use | ★★★☆☆ | No | Cheapest at scale |
| **[Plunk](https://www.useplunk.com)** | 1,000–3,000/mo | $0.001/email | Pay-per-email | ★★★☆☆ | No | Self-hostable (AGPL-3.0) |
| **[SendGrid](https://sendgrid.com)** | 100/day forever | $19.95/mo (50K) | Volume tiers | ★★★★☆ | No | Legacy, massive ecosystem |
| **[Mailgun](https://www.mailgun.com)** | 100/day | $15/mo (10K) | Volume tiers | ★★★★☆ | No | Email validation included |
| **[Loops](https://loops.so)** | 1K contacts, 4K emails/mo | $49/mo (5K contacts) | Contact-based | ★★★★☆ | No | SaaS transactional + marketing |

### Details

**Resend** — Built by the React Email team. First-class TypeScript SDK, best developer docs, native React Email support. Dedicated IPs available at $30/mo on Scale plan. The gold standard for developer experience.

**Postmark** — Industry-leading deliverability. Separates transactional from marketing streams. 3-hour support response on all paid plans. Less modern DX but rock-solid delivery.

**Amazon SES** — Cheapest at scale ($0.10/1K) but requires more setup. No built-in templates or preference management. Virtual Deliverability Manager adds $0.07/1K. Hidden costs can push bills 15–70% higher than advertised.

**Plunk** — Open-source alternative built on AWS SES. Self-hostable. Unlimited contacts stored free. Smaller community but great for self-hosting enthusiasts.

**SendGrid** — Massive ecosystem with hundreds of integrations. The legacy choice — DX hasn't kept up with Resend or Postmark. Owned by Twilio.

**Mailgun** — Includes email validation (5,000 free on Scale). 5-day message log retention on Foundation. Good value for combined sending + validation.

**Loops** — Built specifically for SaaS companies. One tool for both transactional and marketing. Contact-based pricing with unlimited sends — great value if your list is small but sends are high.

> **Indie hacker takeaway:** Start with **Resend** for best DX and React Email support. Switch to **Amazon SES** when you outgrow 50K emails/mo and want to cut costs. Use **Postmark** if deliverability is your top priority (e.g., financial or medical notifications).

---

## 2. Marketing Email & CRM

> **Key concept:** API-first platforms let you trigger campaigns programmatically (on signup, on event, on attribute change). UI-first platforms are better for non-technical marketing teams but limit automation.

| Platform | Free Tier | Paid From | Pricing Model | API-First | Best For |
|----------|-----------|-----------|---------------|-----------|----------|
| **[Loops](https://loops.so)** | 1K contacts | $49/mo (5K contacts) | Contact-based, unlimited sends | Yes | SaaS transactional + marketing unified |
| **[Customer.io](https://customer.io)** | 14-day trial | $100/mo (5K profiles) | Profile-based | Yes | Event-driven automation, API-first CRM |
| **[Kit (ConvertKit)](https://kit.com)** | 10K subscribers | $39/mo (1K subs) | Subscriber-based | Yes | Creator newsletters, landing pages |
| **[Brevo](https://www.brevo.com)** | 300/day (~9K/mo) | $9/mo (5K emails) | Email volume | Partial | Budget marketing + transactional combo |
| **[Mailchimp](https://mailchimp.com)** | 250 contacts | $13/mo (500 contacts) | Contact-based | Partial | Legacy, template library |
| **[Beehiiv](https://www.beehiiv.com)** | 2,500 subs | $43/mo (1K subs) | Subscriber-based | Partial | Newsletter monetization |

### Details

**Loops** — Built specifically for SaaS. Clean API for triggering emails on events. One tool for transactional + marketing. $49/mo for 5K contacts with unlimited sends.

**Customer.io** — Full API, webhooks, event-driven workflows. Supports email, SMS, push, in-app. Powerful segmentation and automation. Starts at $100/mo which is steep for early-stage.

**Kit (ConvertKit)** — Rebranded from ConvertKit. Creator-focused with visual automations, landing pages, and commerce. 10K free subscribers is extremely generous. API is solid.

**Brevo** — Significantly cheaper than Mailchimp (often less than half at scale) and includes transactional emails in the base plan. 300 emails/day free with unlimited contacts stored.

**Mailchimp** — Massive template library and integrations but expensive per-contact and UI-first. Less flexible API compared to Loops or Customer.io.

**Beehiiv** — 0% commission on paid subscriptions. Built-in monetization (premium subscriptions, sponsorship marketplace, boosts). Best for newsletter-first businesses.

> **Indie hacker takeaway:** Use **Loops** to unify transactional + marketing in one API-first tool. Pick **Beehiiv** if your business model is newsletter-driven with paid subscriptions. **Brevo** is the budget king for basic marketing email.

---

## 3. SMS & WhatsApp

> **Key concept:** SMS pricing includes base rate + carrier surcharges. WhatsApp switched from conversation-based to per-message pricing in July 2025. Service replies within 24h are free on WhatsApp.

| Platform | SMS (US)/msg | WhatsApp/msg | Free Tier | TS SDK | Best For |
|----------|-------------|-------------|-----------|--------|----------|
| **[Twilio](https://www.twilio.com)** | $0.0083 + carrier | $0.005 + Meta fees | Pay-as-you-go | ★★★★★ | Most mature, best docs |
| **[Vonage](https://www.vonage.com)** | $0.00809 | ~$0.005 + Meta fees | Pay-as-you-go | ★★★★☆ | Simpler API |
| **[Bird (MessageBird)](https://bird.com)** | $0.008 | $0.0147 (US) | Pay-as-you-go | ★★★★☆ | Aggressive pricing, unified platform |
| **[Infobip](https://www.infobip.com)** | ~$0.01 | Varies by category | Enterprise (~$600/mo min) | ★★★☆☆ | Enterprise omnichannel |
| **[Sinch](https://www.sinch.com)** | $0.07 | Varies | Pay-as-you-go | ★★★☆☆ | Global carrier reach |

### WhatsApp Business API (Meta Direct) — Per-Message Pricing (2026)

| Category | Price Range | Notes |
|----------|-------------|-------|
| Marketing | $0.0109–$0.1323 | Promo, offers — varies by recipient country |
| Utility | $0.0008–$0.0456 | Order updates, account alerts |
| Authentication | $0.0008–$0.0456 | OTP codes, verification |
| Service (within 24h) | **Free** | Replies to customer-initiated messages |

Rates are determined by the **recipient's country**, not the sender's. Messages via Click-to-WhatsApp ads get a 72-hour free entry window.

### Details

**Twilio** — The industry standard for messaging APIs. Phone number rental $1.15/mo (local), $2.15/mo (toll-free). Failed message fee $0.001/msg. Best TypeScript SDK with complete type coverage. Largest tutorial/example ecosystem.

**Vonage** — Simpler API surface than Twilio. Good for teams that want a cleaner integration without Twilio's sprawling product surface. Competitive pricing.

**Bird (MessageBird)** — Rebranded to Bird. Aggressive pricing on SMS and WhatsApp. Unified inbox across channels. Good for multi-channel messaging at scale.

**Infobip** — Enterprise-focused with ~$600/mo minimums. Strong in EMEA and APAC markets. Best for companies needing global reach with local carrier relationships.

**Sinch** — Strongest global carrier network. Higher SMS rates ($0.07) but better deliverability in emerging markets. Good for international businesses.

> **Indie hacker takeaway:** Start with **Twilio** — best SDK, most docs, pay-as-you-go. At scale, evaluate **Bird** for lower per-message costs. For WhatsApp-only, consider going direct through Meta's API.

---

## 4. Push Notifications

> **Key concept:** Push notifications are sent to devices via platform services (APNs for iOS, FCM for Android/Web). Multi-channel orchestration tools manage delivery across push, email, SMS, and in-app from a single workflow.

| Platform | Free Tier | Paid From | Multi-Channel | TS SDK | Best For |
|----------|-----------|-----------|---------------|--------|----------|
| **[Firebase FCM](https://firebase.google.com)** | Unlimited (free forever) | N/A | Push only | ★★★★☆ | Free push, Google ecosystem |
| **[OneSignal](https://onesignal.com)** | Unlimited push, 10K emails | $19/mo + usage | Email, SMS, push, in-app | ★★★★☆ | Easy setup, generous free push |
| **[Knock](https://knock.app)** | 10K notifications/mo | ~$0.005/msg | Email, push, in-app, SMS, Slack | ★★★★★ | Workflow orchestration, preferences |
| **[Novu](https://novu.co)** | 10K/mo cloud, unlimited self-host | $30/mo (30K) | Email, push, in-app, SMS, chat | ★★★★☆ | Open-source (MIT), self-hostable |
| **[Courier](https://www.courier.com)** | 10K notifications/mo | $99/mo | Email, push, SMS, in-app, Slack | ★★★★☆ | Visual workflow builder, no-code |

### Multi-Channel Orchestration Comparison

**Knock** — Code-first workflow builder with best-in-class preference management. Clean API design. Drop-in React components for notification feeds. Ideal for SaaS notification centers.

**Novu** — Open-source (MIT) and self-hostable. Most flexible option. Full control over data and infrastructure. Best for budget-conscious teams willing to run their own infra.

**Courier** — Best visual (no-code) workflow builder. Drag-and-drop routing logic with channel fallback. Expensive at $99/mo minimum — better suited for well-funded startups.

**OneSignal** — Best free tier for pure push (unlimited subscribers). Weaker on orchestration and preferences compared to Knock/Novu. Good starting point that's easy to outgrow.

**Firebase FCM** — Completely free and unlimited but push-only. No orchestration, no preference management, no in-app feed. Combine with Knock or Novu for a complete stack.

> **Indie hacker takeaway:** Use **FCM** (free) as your push delivery provider, orchestrated by **Knock** (10K/mo free) or **Novu** (self-host for $0). This gives you multi-channel orchestration without paying for push delivery.

---

## 5. In-App Notifications

> **Key concept:** In-app notifications appear inside your product (notification bell, feed, toasts). A good preference center lets users control what they receive per channel and per category — critical for reducing churn and support tickets.

| Platform | Free Tier | Paid From | Preference Center | TS SDK | Best For |
|----------|-----------|-----------|-------------------|--------|----------|
| **[Knock](https://knock.app)** | 10K/mo | ~$0.005/msg | Excellent | ★★★★★ | Best preferences + in-app feed |
| **[Novu](https://novu.co)** | 10K/mo cloud | $30/mo | Built-in | ★★★★☆ | Open-source, full control |
| **[Engagespot](https://engagespot.co)** | 10K/mo | $20/mo | Yes | ★★★★☆ | Budget alternative to MagicBell |
| **[MagicBell](https://www.magicbell.com)** | 100 MAU | $99/mo (2K MAU) | Yes | ★★★★☆ | Polished UI, expensive |

### Notification Preferences Comparison

**Knock** — Granular per-channel, per-category preferences. Drop-in React preference center component. Users can mute specific workflows or channels. Best implementation of user-facing notification settings.

**Novu** — Similar preference model to Knock with the advantage of being self-hostable (MIT license). You own the data. In-app inbox component included.

**Engagespot** — Good preference center at $20/mo. Best budget pick for in-app notifications with real preference management.

**MagicBell** — Most polished out-of-the-box UI, but at $99/mo for 2K MAU it's prohibitively expensive for indie hackers. The 100 MAU free tier is too limited for production.

> **Indie hacker takeaway:** **Knock** for the best preference management with a generous free tier. **Novu** if you want to self-host and own everything. Skip **MagicBell** unless you have funding.

---

## 6. Chat & Real-Time Messaging

> **Key concept:** Chat APIs provide full conversation infrastructure (threads, reactions, typing indicators, read receipts). Pub/sub services (Ably, Pusher) give you raw real-time messaging primitives. Collaborative tools (Liveblocks) handle multiplayer features like cursors and presence.

| Platform | Free Tier | Paid From | Pricing Model | TS SDK | Best For |
|----------|-----------|-----------|---------------|--------|----------|
| **[Stream](https://getstream.io)** | Free (<5 team, <$10K MRR) | Custom (MAU-based) | MAU + connections + storage | ★★★★★ | Best chat UI components (React) |
| **[SendBird](https://sendbird.com)** | 1K MAU (30-day trial) | Custom (MAU-based) | MAU-based | ★★★★☆ | Enterprise chat, moderation |
| **[Ably](https://ably.com)** | 6M msgs/mo | $2.50/M msgs | Messages + connections | ★★★★★ | Reliability (99.999% SLA) |
| **[Pusher](https://pusher.com)** | 200 connections | $49/mo (500 connections) | Connections-based | ★★★★☆ | Simple real-time events |
| **[PubNub](https://www.pubnub.com)** | 200 MAU | $98/mo (1K MAU) | MAU + messages | ★★★★☆ | Low latency, IoT/gaming |
| **[Liveblocks](https://liveblocks.io)** | 500 monthly active rooms | $29/mo | Rooms-based | ★★★★★ | Collaborative features (cursors, CRDT) |

### When to Use What

**Stream** — Full chat solution with pre-built React UI components. Free for startups (<5 team, <$10K MRR via Maker program). Best option for adding customer-facing chat to a SaaS product. $100/mo free credit for qualifying makers.

**Ably** — Raw pub/sub with 99.999% uptime SLA. 6M free messages/mo is very generous. Use when you need reliable real-time data sync without pre-built chat UI.

**Pusher** — Simplest integration for basic real-time features (typing indicators, presence, live counters). Connection-based pricing is predictable. Not a full chat solution.

**PubNub** — Lowest latency (<50ms globally). Best for gaming, IoT, or latency-critical applications. Expensive for standard SaaS chat use cases.

**SendBird** — Enterprise-grade with moderation, translation, help desk features. Non-transparent pricing. Overkill for indie hackers.

**Liveblocks** — Not a chat tool. Purpose-built for collaborative features: Figma-style cursors, real-time comments, CRDT-based document editing. 500 free monthly active rooms.

> **Indie hacker takeaway:** **Stream** (free for small startups) for full chat. **Ably** (6M free msgs) for raw pub/sub. **Pusher** for simple real-time features. **Liveblocks** for multiplayer collaboration.

---

## 7. Webhooks (Sending to Customers)

> **Key concept:** If your product needs to send webhooks to customers (like Stripe or GitHub do), you need infrastructure for signing, retrying, and monitoring deliveries. Don't build this yourself — the edge cases around retry logic, idempotency, and security signatures are treacherous.

| Platform | Free Tier | Paid From | Open Source | TS SDK | Best For |
|----------|-----------|-----------|-------------|--------|----------|
| **[Svix](https://www.svix.com)** | 50K msgs, 10 msg/s | $10/mo (100K msgs) | Yes (MIT) | ★★★★★ | Sending webhooks to customers |
| **[Hookdeck](https://hookdeck.com)** | 10K events/mo | $15/mo | No | ★★★★☆ | Receiving & managing inbound webhooks |
| **[ngrok](https://ngrok.com)** | Free (limited) | $10/mo | Partial | ★★★☆☆ | Local dev/testing webhooks |

### Details

**Svix** — Purpose-built for products that send webhooks. Handles signatures, retries (exponential backoff), delivery monitoring, and customer-facing webhook management portal. Open-source (MIT), self-hostable. SOC 2 Type II compliant. Used by Clerk, Brex, and Liveblocks.

**Hookdeck** — Opposite of Svix: for receiving and managing inbound webhooks reliably. Transformation pipeline, fan-out, retry logic. Great for ingesting webhooks from Stripe, GitHub, etc.

**ngrok** — Local development tunneling. Expose localhost to the internet for webhook testing during development. Not a production webhook solution.

> **Indie hacker takeaway:** Use **Svix** if your product sends webhooks (50K free msgs). Use **Hookdeck** if you need reliable inbound webhook processing. Use **ngrok** during development.

---

## 8. Cheapest Multi-Channel Stack (Email + In-App + Push)

### Option A: Fully Managed — $0/mo to start

| Channel | Service | Cost | Limit |
|---------|---------|------|-------|
| **[Resend](https://resend.com)** | Transactional Email | $0 | 3K emails/mo |
| **[Firebase FCM](https://firebase.google.com)** | Push Notifications | $0 | Unlimited |
| **[Novu](https://novu.co)** | In-App + Orchestration | $0 | 10K notifications/mo |

**Total: $0/mo.** Scale to Resend Pro ($20) + Novu Pro ($30) = **$50/mo**.

### Option B: Self-Hosted Orchestration — $0/mo

| Channel | Service | Cost | Notes |
|---------|---------|------|-------|
| **[Novu](https://novu.co)** | All-in-one orchestration | $0 | MIT license, self-host |
| **[Resend](https://resend.com)** | Email provider | $0–$20/mo | Bring your own provider |
| **[Firebase FCM](https://firebase.google.com)** | Push provider | $0 | Free forever |

**Total: $0/mo.** Most control. Some DevOps overhead for hosting Novu.

### Option C: Zero DevOps — $0/mo to start

| Channel | Service | Cost | Limit |
|---------|---------|------|-------|
| **[Knock](https://knock.app)** | Orchestration + In-App | $0 | 10K notifications/mo |
| **[Resend](https://resend.com)** | Email delivery | $0 | 3K emails/mo |
| **[Firebase FCM](https://firebase.google.com)** | Push delivery | $0 | Unlimited |

**Total: $0/mo.** Knock handles orchestration, preferences, and in-app feed. Best DX.

> **Bottom line:** Start with **Resend** (email) + **FCM** (push) + **Knock or Novu** (in-app + orchestration) = **$0/mo** multi-channel notifications with full orchestration and preference management. Scale affordably as you grow.
