# Data, Storage & Infrastructure APIs for Indie Hackers

**Databases, storage, queues, search, and infra APIs for TS/Next.js SaaS builders — March 12, 2026**

Prices change fast. `URL` links point to official pricing/docs pages.

Vector estimate rule used below: **1M vectors = ~1,536 dims, float32, ~6GB raw, single replica, no metadata, no query cost.**

Search normalization rule used below: if a vendor does not publish per-query pricing, the comparison uses **100K searches/mo** on the cheapest managed plan and calls it out as an estimate.

---

## 1. Databases (Managed)

> Serverless DX matters more than raw benchmarks early. The big split in 2026: all-in-one BaaS, true scale-to-zero Postgres, edge SQLite, and “not really indie-priced” enterprise DBs.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Supabase](https://supabase.com)** | [Pricing](https://supabase.com/pricing) | 2 projects, 500MB DB, pauses after ~1 week idle | $25/mo Pro + usage | Excellent | Full BaaS: Postgres + auth + storage + realtime |
| **[PlanetScale](https://planetscale.com)** | [Pricing](https://planetscale.com/pricing) | No permanent free tier | Postgres from $5/mo | Driver-based | MySQL/Postgres w/ safe schema changes |
| **[Neon](https://neon.com)** | [Pricing](https://neon.com/pricing) | 100 projects, 100 CU-hours + 0.5GB per project | Usage-based; Launch typically ~$15/mo, storage $0.35/GB-mo | Excellent | True serverless Postgres that scales to zero |
| **[Turso](https://turso.tech)** | [Pricing](https://turso.tech/pricing) | 5GB, 500M row reads, 10M row writes | Developer from $4.99/mo | Excellent | Edge SQLite / libSQL |
| **[Xata](https://xata.io)** | [Pricing](https://xata.io/pricing) | Trial credit, not a durable free production tier | Standard from $0.012/hr + storage | Good | Branchable Postgres w/ data platform DX |
| **[CockroachDB](https://www.cockroachlabs.com)** | [Cloud docs](https://www.cockroachlabs.com/docs/cockroachcloud/free-trial) | Trial credits + monthly usage allowance | Usage-based; more enterprise than indie | Driver-based | Global distributed SQL |
| **[Convex](https://convex.dev)** | [Limits](https://docs.convex.dev/production/state/limits) | 1M function calls, 0.5GiB DB, 1GiB files | Free, then PAYG Starter; team plans on top | Excellent | TS-native reactive backend |
| **[MongoDB Atlas](https://www.mongodb.com/atlas)** | [Pricing](https://www.mongodb.com/pricing) | M0 shared cluster, 512MB forever | Flex roughly $8-$30/mo capped; dedicated higher | Excellent | Managed document DB |

### DX / pricing read

- **Best all-in-one:** Supabase. Fastest way to get DB + auth + files + vectors in one place.
- **Best true scale-to-zero Postgres:** Neon. Best answer if you want “pay nothing while idle” without free-plan pausing.
- **Best edge/local-first feel:** Turso. SQLite mental model, much better free storage than most serverless DBs.
- **Watch-outs:** PlanetScale no longer has a meaningful free path, Xata’s old generous free tier is gone, CockroachDB is great tech but rarely the cheapest first DB.

---

## 2. Vector Databases

> In 2026, most indie apps still should not start with a dedicated vector DB. If you are under roughly 100K chunks, Postgres + pgvector is usually enough.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Pinecone](https://www.pinecone.io)** | [Pricing](https://www.pinecone.io/pricing/) | Starter project w/ limited serverless capacity | Standard starts at $50/mo minimum; est. ~$50+ to hold ~1M 1536-d vectors | Excellent | Zero-ops managed vector DB |
| **[Weaviate](https://weaviate.io)** | [Pricing](https://weaviate.io/pricing) | 14-day sandbox / trial style access | Flex starts at $45/mo; est. ~$45+ per ~1M vectors before query cost | Good | Hybrid search: keyword + vector |
| **[Qdrant](https://qdrant.tech)** | [Pricing](https://qdrant.tech/pricing/) | 1GB free forever on Cloud | Paid is CPU/RAM/disk calculator-based; small prod is usually low-tens/mo, not a clean per-vector list price | Good | Best open-source/managed balance |
| **[Milvus / Zilliz](https://zilliz.com/cloud)** | [Serverless pricing](https://docs.zilliz.com/docs/serverless-cluster-cost) | 5GB free cluster, good for small tests | Serverless is usage-based; 1M 1536-d vectors usually exceed the free cluster | Good | Large-scale ANN on Milvus |
| **[Chroma Cloud](https://www.trychroma.com)** | [Pricing](https://www.trychroma.com/pricing) | $5 free credit | Writes $2.50/GiB, storage $0.33/GiB-mo; 1M-vector raw write is roughly ~$15, storage ~$2/mo | Good | Simple hosted vector + retrieval |
| **[Supabase pgvector](https://supabase.com/vector)** | [Pricing](https://supabase.com/pricing) | Included in Supabase free projects | No extra vector service fee; once you outgrow free DB limits, think Pro plan + DB storage/compute | Excellent | Cheapest if already on Postgres/Supabase |
| **[Turbopuffer](https://turbopuffer.com)** | [Pricing log](https://turbopuffer.com/docs/pricing-log) | No obvious public free tier | Calculator-based object-storage model; directionally very cheap at scale, query-priced separately | Good | Very large vector/search workloads |

### Price-per-million-vectors reality

- **Cheapest practical start:** pgvector inside your main Postgres.
- **Cheapest dedicated hosted entry:** Chroma Cloud looks strong on raw storage/write math, but it is less battle-tested than Pinecone/Qdrant.
- **Best mature managed option:** Pinecone, but the $50/mo floor matters.
- **Best open-source exit hatch:** Qdrant or Milvus/Zilliz.

---

## 3. File & Media Storage

> Raw storage is cheap. Egress is where bills explode. For public downloads, avatars, user uploads, backups, and AI files, egress policy matters more than storage price.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)** | [Pricing](https://developers.cloudflare.com/r2/pricing/) | 10GB, 1M Class A ops, 10M Class B ops | $0.015/GB-mo, **$0 egress** | Good | General object storage w/ zero egress |
| **[Supabase Storage](https://supabase.com/storage)** | [Pricing](https://supabase.com/pricing) | 1GB storage on Free | Usage billed above plan quota; strongest when paired with Supabase auth/RLS | Excellent | App files behind auth rules |
| **[AWS S3](https://aws.amazon.com/s3/)** | [Pricing](https://aws.amazon.com/s3/pricing/) | New accounts get AWS Free Tier credits, not the old simple forever-free style | Standard ~ $0.023/GB-mo + roughly $0.09/GB public egress | Good | Max ecosystem compatibility |
| **[Backblaze B2](https://www.backblaze.com/cloud-storage)** | [Pricing](https://www.backblaze.com/cloud-storage/pricing) | 10GB free | $0.006/GB-mo; free egress up to 3x average stored data, then ~$0.01/GB | Good | Cheapest raw object storage |
| **[UploadThing](https://uploadthing.com)** | [Pricing](https://uploadthing.com/pricing) | 2GB free | $10/mo starter paid tier; bandwidth included | Excellent | Best file-upload DX for Next.js |
| **[Cloudinary](https://cloudinary.com)** | [Pricing](https://cloudinary.com/pricing) | 25 monthly credits shared across storage/bandwidth/transforms | Plus from $99/mo | Good | Heavy image/video transformation APIs |
| **[ImageKit](https://imagekit.io)** | [Pricing](https://imagekit.io/pricing) | 20GB bandwidth + 3GB storage | Usage-based paid plans / savings plans | Good | Faster-cheaper Cloudinary-style image CDN |

### Egress read

- **Best default:** R2. Zero egress changes the entire cost curve.
- **Best cheap raw storage:** Backblaze B2, especially if you can route traffic through a CDN.
- **Worst for public downloads:** S3, unless you already need AWS-native everything.
- **Bundled-delivery tools:** UploadThing, Cloudinary, ImageKit hide some egress pain inside product pricing.

---

## 4. Caching & KV

> “Serverless-friendly” now mostly means HTTP APIs, edge-safe auth, and no always-on Redis box to babysit.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Upstash Redis](https://upstash.com/redis)** | [Pricing](https://upstash.com/pricing/redis) | 256MB, 500K commands/mo | $0.20/100K requests + storage/bandwidth | Excellent | Serverless Redis |
| **[Vercel KV](https://vercel.com/storage/kv)** | [Status](https://vercel.com/changelog/vercel-kv) | Legacy / sunset product | Not a new bet in 2026; migrate to other storage | Deprecated | Existing Vercel apps still unwinding |
| **[Cloudflare KV](https://www.cloudflare.com/developer-platform/products/kv/)** | [Pricing](https://developers.cloudflare.com/kv/platform/pricing/) | 1GB, 100K reads/day, 1K writes/day | Workers Paid starts at $5/mo; KV read/write/storage fees on top | Good | Global eventually consistent KV |
| **[Momento](https://www.gomomento.com)** | [Pricing](https://www.gomomento.com/pricing) | No meaningful indie free tier on current public pricing | Current public entry is enterprise-ish; poor fit for tiny SaaS | Good | Large-scale managed cache, not bootstrapped SaaS |
| **[DragonflyDB](https://www.dragonflydb.io)** | [Pricing](https://www.dragonflydb.io/pricing) | OSS self-host is free | Cloud roughly from single-digit $/GB-mo; always-on model | Driver-based | Redis replacement when you control infra |

### Serverless-friendliness

- **Best serverless Redis:** Upstash.
- **Best if you are already on Workers:** Cloudflare KV.
- **Not a great 2026 indie choice:** Momento, mainly because public pricing moved up-market.
- **Not actually serverless:** DragonflyDB. Great tech, different ops model.

---

## 5. Search

> Hosted search still splits into two camps: per-search billing (Algolia) and fixed-resource billing (Meilisearch Cloud, Typesense, Elastic). For small SaaS apps, the cheapest answer is often “no extra search service yet.”

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Algolia](https://www.algolia.com)** | [Pricing](https://www.algolia.com/pricing/) | Build: 10K search requests/mo, 1M records | Then about $0.50 per extra 1K search requests on Grow | Excellent | Best hosted search DX |
| **[Meilisearch Cloud](https://www.meilisearch.com/cloud)** | [Pricing](https://www.meilisearch.com/pricing) | No permanent free cloud tier | Build starts at $30/mo; normalized roughly ~$0.30/1K at 100K/mo | Good | Open-source search w/ managed cloud |
| **[Typesense](https://typesense.org)** | [Cloud](https://typesense.org/cloud/) | No permanent cloud free tier; self-host is free | Resource-based cloud pricing; no per-search tax, effective low-tens/mo for tiny clusters | Good | Predictable hosted bills + easy self-host fallback |
| **[ElasticSearch / Elastic Cloud](https://www.elastic.co/elasticsearch)** | [Pricing](https://www.elastic.co/pricing/cloud-hosted) | Trial only on managed cloud | Hosted from about $99/mo, or use serverless usage pricing | Good | Search + logs + analytics in one stack |
| **[Orama](https://orama.com)** | [Pricing](https://orama.com/pricing) | 2 projects, 500 docs/project, unlimited searches | Build from $100/mo; unlimited searches within plan | Good | Edge/browser search without a server |

### Pricing-per-1K-searches read

- **Cheapest tiny hosted tier:** Algolia is still the easiest free place to start.
- **Best predictable paid bill:** Meilisearch Cloud or Typesense Cloud.
- **Best “no backend search server” angle:** Orama, but the free document cap is far smaller than older marketing implied.
- **Best advice for day 1:** use Postgres full-text search first unless search is core product value.

---

## 6. Background Jobs & Queues

> The pattern matters more than the logo. Event-driven workflows, cron, HTTP queueing, and Redis queues solve different problems.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Inngest](https://www.inngest.com)** | [Pricing](https://www.inngest.com/pricing) | 50K executions/mo | Pro from $75/mo | Excellent | Event-driven workflows |
| **[Trigger.dev](https://trigger.dev)** | [Pricing](https://trigger.dev/pricing) | $5 usage included on cloud | Usage-based; great for long-running work, AI jobs, browser automation | Excellent | Durable long-running jobs |
| **[QStash](https://upstash.com/qstash)** | [Pricing](https://upstash.com/pricing/qstash) | 1K messages/day | $1 per 100K requests | Excellent | HTTP queueing, retries, schedules |
| **[BullMQ](https://bullmq.io)** | [Pricing](https://bullmq.io/#pricing) | OSS core is free | Self-host free; BullMQ Pro from $139/mo if you want premium features | Good | Redis-backed job queues |
| **[Defer](https://defer.run)** | [Home](https://defer.run) | Public pricing is not clearly indexed in March 2026 | Treat pricing as unclear until you verify directly | Good | Minimal background functions if you like the model |

### Event-driven vs cron vs queue

- **Event-driven app workflows:** Inngest.
- **Long-running / AI / browser tasks:** Trigger.dev.
- **Simple async push w/ retries:** QStash.
- **Always-on worker + Redis queue:** BullMQ.

---

## 7. Edge / Serverless Compute

> Cold start matters only if requests are latency-sensitive. If your app is mostly user-facing HTTP, isolate-based edge runtimes still feel best.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Vercel Functions](https://vercel.com/docs/functions)** | [Pricing](https://vercel.com/pricing) | Hobby includes 1M invocations plus CPU/memory allowances | Pro $20/mo + usage above limits | Excellent | Best Next.js deployment DX |
| **[Cloudflare Workers](https://workers.cloudflare.com)** | [Pricing](https://developers.cloudflare.com/workers/platform/pricing/) | Free tier with generous daily request cap | Paid starts at $5/mo | Excellent | Zero-cold-start edge functions |
| **[Deno Deploy](https://deno.com/deploy)** | [Pricing](https://deno.com/deploy/pricing) | 1M requests/mo + 100GB egress | Pro $20/mo | Excellent | Web-standard edge runtime |
| **[Netlify Functions](https://www.netlify.com/platform/core/functions/)** | [Pricing](https://www.netlify.com/pricing/) | 125K requests + runtime hours on Free | Paid plans from $25/site/mo | Good | Netlify-hosted projects |
| **[AWS Lambda](https://aws.amazon.com/lambda/)** | [Pricing](https://aws.amazon.com/lambda/pricing/) | 1M requests + 400K GB-seconds | $0.20/M requests + compute | Good | Deep AWS integration |
| **[Fly.io](https://fly.io)** | [Pricing](https://fly.io/docs/about/pricing/) | No real free tier for new orgs | Pay-as-you-go VMs and bandwidth | Good | Persistent workers, WebSockets, custom processes |

### Cold-start read

- **Near-zero cold starts:** Cloudflare Workers, Deno Deploy.
- **Low but not zero:** Vercel Functions keeps getting better, especially with Fluid compute.
- **Most variable:** Lambda and Netlify, unless you pay for warm capacity / different architecture.
- **Not really “serverless”:** Fly.io. Great when you need a process that stays alive.

---

## 8. Feature Flags & Config

> For indie hackers, the best flag tool is usually the one already attached to analytics or the one you can self-host forever.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[LaunchDarkly](https://launchdarkly.com)** | [Plans](https://launchdarkly.com/docs/home/account/plans) | Developer free tier after trial, capped for small usage | Paid tiers are largely quote/custom shaped | Excellent | Enterprise governance and rollouts |
| **[Flagsmith](https://www.flagsmith.com)** | [Pricing](https://www.flagsmith.com/pricing) | 50K requests/mo, 1 team member | Startup from $45/mo | Good | Managed open-source-friendly flags |
| **[Flipt](https://www.flipt.io)** | [Pricing](https://www.flipt.io/pricing) | Free cloud tier; OSS self-host is free | Team cloud from about $50/mo; self-host free | Good | Git-native/self-hostable flags |
| **[GrowthBook](https://www.growthbook.io)** | [Pricing](https://www.growthbook.io/pricing) | Starter free up to 3 users; OSS self-host free | Pro from $40/user/mo | Good | Flags + experimentation on your own data |
| **[PostHog feature flags](https://posthog.com/feature-flags)** | [Pricing](https://posthog.com/pricing) | 1M flag requests/mo | $0.0001 per request after free | Excellent | Flags + analytics together |
| **[Vercel Feature Flags](https://vercel.com/docs/feature-flags)** | [Limits & pricing](https://vercel.com/docs/feature-flags/vercel-flags/limits-and-pricing) | Hobby includes 10K flag requests/mo | Pro: $30 per 1M requests | Excellent | Simple Next.js-native flags |

### Which one wins?

- **Best default for indie SaaS:** PostHog, because you usually want analytics anyway.
- **Best if you want OSS + self-host:** GrowthBook or Flipt.
- **Best if you are already deeply on Vercel:** Vercel Feature Flags.
- **Best if you need enterprise controls:** LaunchDarkly, but it is rarely the cheapest answer.

---

## 9. The Best $0/Month Stack

> The ultimate free-tier stack is the **smallest** stack. Do not add vector DB, hosted search, Redis, or queues on day 1 unless the product truly needs them.

### My pick: best true-$0 stack until traction

| Layer | Pick | Why |
|------|------|-----|
| Compute | **[Cloudflare Workers](https://workers.cloudflare.com)** | Zero-cold-start edge runtime, strong free tier |
| Database | **[Neon](https://neon.com)** | Real scale-to-zero Postgres, no free-plan pausing |
| Vector search | **Neon/Postgres + pgvector** | Keep vectors in the primary DB until it hurts |
| File storage | **[Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)** | Zero egress is the biggest cost win |
| Cache / rate limits | **[Upstash Redis](https://upstash.com/redis)** | HTTP API, edge-safe, easy free tier |
| Search | **Postgres FTS first**, then **[Algolia](https://www.algolia.com)** only if needed | Cheapest search bill is no search vendor |
| Jobs | **[Inngest](https://www.inngest.com)** | Generous free executions, good DX |
| Feature flags | **[PostHog](https://posthog.com/feature-flags)** | Flags + analytics on one free tier |

### Why this beats the “everything in one BaaS” stack

- **Neon + Workers + R2** stays truly cheap when idle.
- **Supabase** is still the fastest all-in-one DX choice, but the free-project pause makes it less ideal for a quietly-running production SaaS.
- **R2** removes the classic storage trap: S3 egress.
- **PostHog + Inngest + Upstash** each have real free tiers you can actually live on for a while.

### Best alternative: DX-first stack

If you want fewer vendors and faster setup, use:

- **Supabase** for DB + auth + storage + pgvector
- **Vercel** for app hosting
- **Inngest** for jobs
- **PostHog** for analytics + flags

It is a better builder experience. It is not the best “no surprise $0” stack.
