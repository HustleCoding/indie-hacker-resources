# Payment & Billing APIs for Indie Hackers

**Comprehensive guide for Next.js SaaS builders — March 2026**

---

## 1. Payment Processing

> **Key concept: Merchant of Record (MoR)** means the provider handles sales tax collection, remittance, fraud, and chargebacks on your behalf. Non-MoR (gateway) means you're legally the seller and must handle tax yourself.

| Platform | Fees | MoR? | Tax Built-in | Global Coverage | TS/Next.js | Docs | Best For |
|----------|------|------|-------------|----------------|------------|------|----------|
| **[Stripe](https://stripe.com)** | 2.9% + $0.30 | No | Add-on ($0.05/calc) | 195+ countries | ★★★★★ | ★★★★★ | Growth → Scale |
| **[Paddle](https://paddle.com)** | 5% + $0.50 | **Yes** | **Included** | 200+ countries | ★★★★☆ | ★★★★☆ | Growth → Scale |
| **[LemonSqueezy](https://lemonsqueezy.com)** | 5% + $0.50 | **Yes** | **Included** | Global | ★★★★☆ | ★★★★☆ | Early → Growth |
| **[Gumroad](https://gumroad.com)** | 10% + $0.50 | **Yes** (2025+) | **Included** | Global | ★★☆☆☆ | ★★★☆☆ | Early / Creators |
| **[PayPal](https://paypal.com)** | 2.99–4.99% + $0.49 | No | No | 200+ countries | ★★★★☆ | ★★★½☆ | Scale |
| **[Braintree](https://braintreegateway.com)** | 2.9% + $0.30 | No | No | Established markets | ★★★☆☆ | ★★★☆☆ | Scale → Enterprise |

### Details

**Stripe** — The industry benchmark for developer experience. Official TypeScript SDK with full type safety, best-in-class interactive docs, and the largest ecosystem of integrations. Not a Merchant of Record, so you handle tax compliance (or add Stripe Tax). International cards incur an additional +1.5%, currency conversion +1%. No monthly fees.

**Paddle** — Full Merchant of Record handling payments, subscriptions, tax compliance (200+ countries), and fraud. The 5% + $0.50 all-inclusive fee covers everything — no surprise charges for tax handling, fraud protection, or support. Official Node.js SDK with TypeScript definitions. Custom pricing available for sub-$10 products. Recently rebuilt developer experience.

**LemonSqueezy** — MoR platform focused on creators and software companies. Same pricing as Paddle. Automatic VAT/GST/sales tax globally. Official JavaScript SDK with TypeScript support. Acquired by Stripe in 2024, ensuring long-term infrastructure backing and a smooth future migration path to Stripe. Includes email marketing (free up to 500 subscribers).

**Gumroad** — Became a Merchant of Record in January 2025. Direct sales at 10% + $0.50; marketplace discovery sales at 30% flat. Simple but expensive. Minimal official TypeScript support — relies on community SDKs. Best for individual creators selling digital products rather than recurring SaaS.

**PayPal** — Global payment giant. Standard card transactions at 2.99% + $0.49, international at 4.99% + $0.49. Not a MoR; no built-in tax handling. PayPal has been actively improving developer experience (2025–2026) with new API tools. Full advanced checkout in 37 countries only despite 200+ country reach. Disputes cost $15–30 each.

**Braintree** — Enterprise-grade gateway owned by PayPal. Standard cards at 2.9% + $0.30, ACH at 0.75% (capped at $5). TypeScript types via `@types/braintree`. Advanced pricing (interchange++) available for established merchants. No built-in tax handling. Best for high-volume businesses already in the PayPal ecosystem.

> **Indie hacker takeaway:** At $79/mo × global customers, Paddle or LemonSqueezy save you weeks of tax/compliance work. Stripe is cheaper per-txn but you'll need Stripe Tax or a third-party tax solution. For a solo founder, MoR peace-of-mind usually outweighs the ~2% fee premium.

---

## 2. Subscription & Usage-Based Billing

### Stripe Billing — [stripe.com/billing](https://stripe.com/billing)

Full subscription lifecycle management with native 2026 AI/usage metering. Send granular usage events (tokens, API calls) and auto-charge with markup.

- **Pricing:** 0.7% of billing volume
- **Credit billing:** Excellent (native 2026 token metering)
- **TS SDK:** ★★★★★
- **Complexity:** Moderate
- **Tags:** subscriptions, usage-based, AI tokens, best ecosystem

### Orb — [withorb.com](https://withorb.com)

High-throughput metering and pricing engine. Ingests millions of events, transforms to billable metrics in real-time. Used by Vercel, Supabase, Replit.

- **Pricing:** Billings + events based (custom)
- **Credit billing:** Strong (ledger system)
- **TS SDK:** ★★★★☆
- **Complexity:** High
- **Tags:** usage-based, high volume, SQL metrics, enterprise

### Metronome — [metronome.com](https://metronome.com)

Monetization infra for complex contracts: prepaid credits, min spends, overages. Used by OpenAI. Being acquired by Stripe (announced Dec 2025).

- **Pricing:** Per-event + platform + % of billings
- **Credit billing:** Excellent (commit contracts)
- **TS SDK:** ★★★★☆
- **Complexity:** High
- **Tags:** enterprise, contracts, prepaid credits, Stripe acquisition

### Lago — [getlago.com](https://getlago.com) `Open Source`

Open-source metering and usage-based billing. Self-host for free or use cloud. No revenue cut. Used by Mistral.ai, PayPal.

- **Pricing:** Free (self-hosted) / Cloud tiers available
- **Credit billing:** Strong (prepaid wallets)
- **TS SDK:** ★★★★☆
- **Complexity:** Low–Moderate
- **Tags:** open source, self-host, free, data ownership

### Schematic — [schematichq.com](https://schematichq.com)

Feature management meets billing. Bi-directional Stripe sync, entitlements, credit burndown model. Change pricing without code deploys.

- **Pricing:** Free tier, then tiered plans
- **Credit billing:** Excellent (credit burndown)
- **TS SDK:** ★★★★☆
- **Complexity:** Low–Moderate
- **Tags:** feature flags, entitlements, credit burndown, no-code pricing

### Stigg — [stigg.io](https://stigg.io)

Monetization control layer and subscription middleware. Rapid plan rollout with entitlements, metering, and A/B pricing experiments.

- **Pricing:** From ~$448/mo ($5,376/yr)
- **Credit billing:** Yes (auto-recharge)
- **TS SDK:** ★★★★☆
- **Complexity:** Low
- **Tags:** middleware, pricing experiments, entitlements, no-code plans

> **Best for AI credit billing:** For an indie hacker selling AI credits, **Stripe Billing** (native 2026 token metering) or **Schematic** (credit burndown with free tier) are the best bets. Orb and Metronome are overkill unless you're at serious scale. Lago is great if you want to self-host and pay zero fees.

---

## 3. Checkout & Payment Links

| Platform | Fees | Type | TS Support | Best For |
|----------|------|------|-----------|----------|
| **[Stripe Checkout](https://stripe.com)** | 2.9% + $0.30 | Hosted / Embedded | ★★★★★ | SaaS, high-volume |
| **[Paddle Checkout](https://paddle.com)** | 5% + $0.50 (all-in) | Overlay / Inline | ★★★★☆ | Global SaaS (MoR) |
| **[Polar.sh](https://polar.sh)** | Low (dev-friendly) | API + Links | ★★★★★ | Indie devs, OSS |
| **[Buy Me a Coffee](https://buymeacoffee.com)** | 5% flat | Widget / Page | ★★☆☆☆ | Creators, tips |
| **[Ko-fi](https://ko-fi.com)** | 0% on donations | Widget / Page | ★★☆☆☆ | Hobby creators |

**Stripe Checkout** offers both hosted and embedded modes with Server Actions support in Next.js 2026. Extremely customizable. **Paddle Checkout** provides an overlay/inline checkout with MoR benefits baked in. **Polar.sh** is a newer dev-friendly platform with excellent TypeScript support, targeting indie developers and open-source monetization. **Buy Me a Coffee** and **Ko-fi** are better suited for creator tips and small donations than SaaS billing.

---

## 4. Revenue Analytics

### Paddle Retain (ProfitWell) — [paddle.com](https://paddle.com)

Churn reduction and payment recovery. Tactical card retries, pre-dunning, cancellation flows. Performance-based pricing — pay only when revenue is recovered.

- **Pricing:** Performance-based / ~$500+/mo
- **Stripe integration:** Via Paddle ecosystem
- **Best for:** $1M+ ARR with churn issues

### Baremetrics — [baremetrics.com](https://baremetrics.com)

28+ SaaS metrics dashboard (MRR, ARR, churn, LTV, ARPU) in real-time. One-click Stripe connection. Predictive LTV forecasting.

- **Pricing:** $50–69/mo
- **Stripe integration:** Native (one-click)
- **Best for:** Early SaaS wanting dashboards

### ChartMogul — [chartmogul.com](https://chartmogul.com) `Free <$10K MRR`

Multi-source subscription analytics with built-in CRM and CMRR forecasting. Aggregates Stripe, PayPal, Braintree, Recurly data.

- **Pricing:** Free → $100/mo → $599+/mo
- **Stripe integration:** Native
- **Best for:** Growth SaaS, multi-billing source

### Stripe Revenue Recognition — [stripe.com/revenue-recognition](https://stripe.com/revenue-recognition)

Automated accrual accounting and ASC 606 / IFRS 15 compliance. Records revenue when earned. CSV + API access.

- **Pricing:** Integrated in Stripe
- **Stripe integration:** Native
- **Best for:** $5M+ ARR, audit prep

> **Indie hacker takeaway:** Start with **ChartMogul free tier** (under $10K MRR). It gives you all the subscription metrics you need at zero cost. Graduate to paid tiers or Baremetrics as you grow.

---

## 5. Affiliate & Referral

| Platform | Pricing | Stripe Integration | Setup Effort | Best For |
|----------|---------|-------------------|-------------|----------|
| **[Rewardful](https://rewardful.com)** | Tiered plans | Native Stripe | Easy (dashboard) | SaaS starting affiliate program |
| **[FirstPromoter](https://firstpromoter.com)** | $49–149+/mo | Native Stripe (deep) | Easy (script-based) | Subscription SaaS, recurring commissions |
| **[Tolt](https://tolt.io)** | $49+/mo (by revenue tier) | Stripe + Paddle | Very easy | Startups, first affiliate program |
| **[PartnerStack](https://partnerstack.com)** | 5-figure/year | Enterprise API | Requires sales | Enterprise ($1M+ ARR) |

**Rewardful** and **Tolt** are the easiest to set up with tight Stripe integration. **FirstPromoter** offers deeper Stripe integration with recurring commission tracking, ideal for subscription SaaS. **PartnerStack** is enterprise-grade and overkill for indie hackers.

> **Indie hacker takeaway:** **Tolt** ($49/mo) or **Rewardful** are purpose-built for SaaS startups. Don't bother with affiliates until you have product-market fit and at least $5K MRR.

---

## 6. Invoicing & Tax

| Platform | Pricing | Coverage | Auto-filing | Setup | Best For |
|----------|---------|----------|------------|-------|----------|
| **[Stripe Tax](https://stripe.com/tax)** | $0.05/calculation | US + Intl VAT/GST | Basic (Tax Complete tier) | 1 line of code | Stripe users, growth stage |
| **[TaxJar](https://taxjar.com)** | $19–99+/mo | US-only | AutoFile (up to 12 states) | Low | US-centric small biz |
| **[Avalara (AvaTax)](https://avalara.com)** | ~$5K–70K/yr | US + Global + excise | Comprehensive | High (enterprise) | Enterprise, complex tax |
| **[Paddle (built-in)](https://paddle.com)** | Included in 5% + $0.50 | US + Global VAT/GST | Full (MoR handles all) | Zero (automatic) | Any SaaS selling globally |

**Stripe Tax** is the simplest add-on if you're already on Stripe — one line of code enables tax calculation for US and international transactions at $0.05 per calculation. **TaxJar** is US-focused with AutoFile in up to 12 states. **Avalara** is full enterprise tax compliance but starts at ~$5K/year. **Paddle's** built-in tax handling is arguably the strongest value prop for indie hackers — zero setup, global coverage, included in the base fee.

> **Indie hacker takeaway:** If you use Stripe, add **Stripe Tax** (minimal cost at low volume). If you want zero tax headaches, use **Paddle** — as MoR they handle everything. Avalara is overkill until you're doing millions.

---

## 7. Crypto / Alternative Payments

| Platform | Merchant Fee | Network Fee | TS Support | Setup | Worth It? |
|----------|-------------|-------------|-----------|-------|-----------|
| **[Coinbase Commerce](https://commerce.coinbase.com)** | 1% | <$0.01 (stablecoin) | ★★★★★ | Low | Only if 10%+ crypto audience |
| **[Solana Pay](https://solanapay.com)** | 0% | ~$0.0008 | ★★★★★ | Low–Moderate | Niche audience only |
| **[BTCPay Server](https://btcpayserver.org)** | 0% | <$0.01 | ★★☆☆☆ | High (self-host) | Too much overhead |
| **Strike / OpenNode** | 0% | <$0.01 | ★★☆☆☆ | Moderate | Not for SaaS yet |

**Coinbase Commerce** is the easiest crypto payment option with excellent TypeScript support and low fees. **Solana Pay** has near-zero fees but targets a very niche audience. **BTCPay Server** is open-source and free but requires self-hosting. Lightning Network APIs (Strike, OpenNode) offer near-instant Bitcoin payments but the SaaS billing use case is still immature.

> **Verdict for indie hackers:** Skip crypto payments unless your product specifically targets crypto-native users. The engineering effort vs. conversion rate doesn't justify it for a $79/mo SaaS. If you must, **Coinbase Commerce** is the easiest to add as a secondary option.

---

## Top 3 Picks: Solo Indie Hacker, $79/mo AI SaaS, Global Audience

### #1 — Paddle (All-in-One MoR)

At 5% + $0.50 per transaction ($4.45 per $79 charge), Paddle eliminates the need for separate tax, invoicing, and compliance tools. As Merchant of Record, they handle global VAT/GST/sales tax collection and remittance, fraud, chargebacks, and currency conversion. You get checkout, subscriptions, and tax in one integration. The TypeScript SDK is solid and docs are good.

- **Trade-off:** higher per-txn fee vs Stripe, less ecosystem flexibility
- **Worth it?** Yes — the time you save on tax compliance alone pays for the premium many times over when you're a solo founder

### #2 — Stripe + Stripe Tax + Stripe Billing (Maximum Flexibility)

At 2.9% + $0.30 per transaction ($2.59 per $79 charge) plus $0.05/tax calculation and 0.7% billing fee, the total lands around ~4% all-in — cheaper than Paddle at scale. Stripe's TypeScript SDK and docs are best-in-class. Native 2026 AI token metering makes it ideal for credit-based AI SaaS. The trade-off is more integration work and you'll need to manage tax registration yourself.

- **Best if:** you're comfortable with a bit more setup and want the richest developer ecosystem

### #3 — LemonSqueezy (Simplest Path to First Dollar)

Same MoR benefits and pricing as Paddle (5% + $0.50), but designed specifically for indie creators and small software teams. Now owned by Stripe (acquired 2024), so backed by serious infrastructure. Slightly simpler setup than Paddle, good TypeScript SDK, and includes email marketing tools.

- **Best if:** you're pre-PMF, want the absolute fastest time to launch, and plan to potentially migrate to Stripe later as you scale

### The "Add Later" Stack

Start with one of the above. Then layer on tools as you grow:

- **~$10K MRR:** Add **ChartMogul** (free tier) for subscription analytics
- **~$5K+ MRR with PMF:** Consider **Tolt** ($49/mo) for affiliates
- **Crypto:** Only add **Coinbase Commerce** if your users specifically ask for it
- **Skip until $100K+ ARR:** Avalara, Metronome, Orb, PartnerStack, Stigg

---

*Research compiled March 2026. Pricing and features change frequently — verify on vendor sites before committing.*
