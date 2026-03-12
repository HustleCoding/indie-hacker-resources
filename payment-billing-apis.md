# Payment & Billing APIs for Indie Hackers

**A practical 2026 guide to processors, merchant-of-record platforms, usage billing, payouts, tax, and SaaS finance tools for TS/Next.js builders — March 2026**

Prices change fast. `URL` links point to official pricing/docs pages.

---

## 1. Payment Processing & Merchant of Record

> The first real decision is not Stripe vs Paddle. It is: do you want the lowest raw processing fee, or do you want a Merchant of Record to own tax, remittance, and checkout compliance for you?

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Stripe](https://stripe.com)** | [Pricing](https://stripe.com/pricing) | No monthly fee | 2.9% + 30c domestic cards; +1.5% international cards; +1% currency conversion | Excellent | Best general gateway if you will own tax/compliance |
| **[Paddle](https://www.paddle.com)** | [MoR pricing](https://www.paddle.com/paddle-101) | No monthly fee | 5% + 50c all-in; separate pricing exists for invoicing and some low-price transactions | Good | Most proven Merchant of Record for global SaaS |
| **[Lemon Squeezy](https://www.lemonsqueezy.com)** | [Pricing](https://www.lemonsqueezy.com/pricing) | No monthly fee | 5% + 50c all-in | Good | Fastest MoR path for solo digital-product SaaS |
| **[Polar](https://polar.sh)** | [Fees](https://docs.polar.sh/merchant-of-record/fees) | No monthly fee | 4% + 40c; +0.5% subscriptions; +1.5% international cards; Stripe payout fees separate | Excellent | TS-first MoR for dev tools, SaaS, and OSS monetization |
| **[PayPal](https://www.paypal.com)** | [Business pricing](https://www.paypal.com/us/business/pricing) | No monthly fee | Card checkout from 2.89% + 29c; PayPal and Venmo from 3.49% + 49c | Good | Extra checkout option, not your only billing stack |

### How I would choose

- **Use Stripe** if you want the best API surface and can handle tax registration, filings, and checkout ownership.
- **Use Paddle** if you want the most battle-tested MoR for a global B2B SaaS.
- **Use Lemon Squeezy** if speed to first dollar matters more than edge-case platform features.
- **Use Polar** if you want MoR plus strong developer ergonomics and better indie-friendly economics than older incumbents.

### Important correction

- **Polar belongs in the main comparison.** It is no longer a side note.
- **MoR fees often look expensive only on paper.** Once you add tax tooling, filings, and founder attention, Stripe is not always actually cheaper early.

---

## 2. Subscription & Usage-Based Billing

> This category matters more in 2026 because AI SaaS pricing is increasingly seat + usage + prepaid credits, not just monthly subscriptions.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Stripe Billing](https://stripe.com/billing)** | [Pricing](https://stripe.com/billing/pricing) | No monthly minimum on pay-as-you-go | 0.7% of billing volume PAYG; annual plans from $620/mo; includes usage-based billing and 100M meter events/mo | Excellent | Default choice for SaaS subscriptions plus AI usage metering |
| **[Metronome](https://metronome.com)** | [Pricing](https://metronome.com/pricing) | Starter plan | Starter free; paid plans are custom | Good | Complex credits, commits, and enterprise-style contracts |
| **[Orb](https://withorb.com)** | [Overview](https://withorb.com) | No public self-serve free plan | Custom pricing | Good | High-scale metering with finance-heavy requirements |
| **[Lago](https://getlago.com)** | [Pricing](https://getlago.com/pricing) | OSS/self-host free | Cloud plans vary; OSS/self-host stays free | Good | Open-source billing and entitlements without revenue share |

### Billing read

- **Stripe Billing is good enough for most indie SaaS.** Especially if you need usage records, credits, or AI metering without buying a second system.
- **Metronome and Orb are later-stage buys.** Amazing products, rarely the right month-1 choice.
- **Lago is the best open-source exit hatch.** Good if you want control without giving up usage billing entirely.

---

## 3. Marketplaces & Payouts

> The old guide missed this. If you run a marketplace, creator platform, affiliate network, or “pay many people” product, this section matters as much as checkout.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Stripe Connect](https://stripe.com/connect)** | [Pricing](https://stripe.com/connect/pricing) | No monthly platform minimum when Stripe handles connected-account pricing | If you handle pricing: $2 per active account/mo, 0.25% volume, 25c per payout; Instant Payouts 1% | Excellent | Default choice for SaaS platforms and marketplaces |
| **[Trolley](https://trolley.com)** | [Pricing](https://trolley.com/trolley-pricing/) | No real free production tier | Pay plan from $49/mo; ACH $1; SEPA, FPS, EFT, NPP about $4; wires $10-$25 | Good | Mass creator, affiliate, contractor, and seller payouts |
| **[Wise Platform](https://wise.com/platform/)** | [Overview](https://wise.com/platform/) | No public self-serve free tier | Custom pricing | Good | Cross-border disbursements with better FX transparency |
| **[Adyen](https://www.adyen.com)** | [Platforms](https://www.adyen.com/platforms) | No public free tier | Custom pricing | Good | Larger marketplaces needing global payments plus embedded finance |

### Marketplace read

- **Stripe Connect is the default.** Most indie platforms should start there.
- **Trolley solves payout ops, not checkout.** Great when your real pain is sending money, tax forms, and payout support.
- **Wise Platform and Adyen skew bigger.** Useful to know about, rarely day-1 indie picks.

---

## 4. Revenue Analytics & Accounting

> Metrics tools are only useful if they stay cheap long enough to become habit.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[ChartMogul](https://chartmogul.com)** | [Pricing](https://chartmogul.com/pricing/) | Free below about $120K ARR | Pro from $99/mo annual or $119/mo monthly | Good | Best free-to-paid SaaS metrics path |
| **[Baremetrics](https://baremetrics.com)** | [Pricing](https://baremetrics.com/pricing) | No permanent free tier | From $75/mo | Limited | Fast MRR, churn, and recovery dashboards |
| **[Stripe Revenue Recognition](https://stripe.com/revenue-recognition)** | [Pricing](https://stripe.com/revenue-recognition/pricing) | 30-day trial | Monthly from $25; annual from $190/mo; additional volume percentage on top | Good | ASC 606 and IFRS 15 inside Stripe |

### Important corrections

- **Stripe Revenue Recognition is not bundled in.** It is a separate paid product.
- **ChartMogul is the obvious first stop.** The free tier lasts long enough to matter.
- **Baremetrics is useful, but not “cheap starter tooling” anymore.**

---

## 5. Tax & Compliance

> The previous guide badly understated Stripe Tax. This is the section where a lot of indie hackers accidentally choose the wrong stack.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Stripe Tax](https://stripe.com/tax)** | [Pricing](https://stripe.com/tax/pricing) | No monthly minimum on Basic | Tax Basic: 0.5% on taxed transactions from Billing, Checkout, or Payment Links; API-created taxed transactions are 50c each and include 10 calculation calls; Tax Complete from $90/mo annual | Excellent | Stripe users that want built-in tax calculation |
| **[TaxJar](https://www.taxjar.com)** | [Pricing](https://www.taxjar.com/pricing) | 30-day trial | Starter from $39/mo; Professional from $99/mo; AutoFile is extra | Limited | US sales-tax reporting and filing workflows |
| **[Paddle](https://www.paddle.com)** | [MoR pricing](https://www.paddle.com/paddle-101) | Included if you use Paddle | Included in the 5% + 50c MoR fee | Good | Global tax fully handled for you |
| **[Polar](https://polar.sh)** | [Fees](https://docs.polar.sh/merchant-of-record/fees) | Included if you use Polar | Included in the base MoR fee; payout fees separate | Excellent | Dev-first MoR with tax fully handled |

### Tax read

- **Stripe Tax is much pricier on API-created payment flows than the old guide implied.** It is not just a universal 5c calculation fee.
- **TaxJar is fine for US-first businesses.** It is not a Merchant of Record replacement for global SaaS.
- **If you are solo and global, MoR usually wins on total headache.**

---

## 6. Affiliate & Referral

> Add affiliate tooling after you have a conversion motion worth amplifying, not before.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Rewardful](https://www.rewardful.com)** | [Pricing overview](https://www.rewardful.com/use-cases/financial-tools) | No permanent free tier | Starter from $49/mo; Managed Payouts adds 3% of payout volume if used | Limited | Stripe-first SaaS affiliate programs |
| **[Tolt](https://tolt.io)** | [Pricing](https://tolt.io/pricing) | 14-day trial | From $49/mo; more as affiliate-driven revenue grows | Limited | Fast affiliate and referral setup for Stripe or Paddle |
| **[FirstPromoter](https://firstpromoter.com)** | [Pricing](https://firstpromoter.com/pricing) | 14-day trial | $49, $99, or $149 per month by plan | Limited | Recurring SaaS commissions and partner workflows |

### Referral read

- **Rewardful and Tolt are the easiest first picks.**
- **FirstPromoter is stronger once recurring subscription logic gets more complex.**
- **Do not start here.** Start once one channel already converts.

---

## 7. The Best Indie-Hacker Billing Stacks

> The best stack depends on whether your biggest risk is compliance, usage billing, or payouts.

### My default picks

| Scenario | Stack | Why |
|------|------|-----|
| Global SaaS, solo founder | **Polar** or **Paddle** + **ChartMogul** | MoR removes tax/compliance drag; ChartMogul stays free for a long time |
| AI SaaS with credits or token billing | **Stripe Payments** + **Stripe Billing** + **ChartMogul** | Best API surface for usage, credits, and custom pricing logic |
| Marketplace or “pay many people” product | **Stripe Connect** + **Trolley** | Best combo for onboarding sellers plus handling payouts at scale |

### Final take

- **If you sell globally and want boring ops:** choose a Merchant of Record.
- **If usage billing is the product:** Stripe is still the strongest default.
- **If you run payouts:** add a payout product early instead of duct-taping exports and bank files.
