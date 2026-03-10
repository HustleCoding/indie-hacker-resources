# AI & LLM API Landscape for Indie Hackers (2025-2026)

A comprehensive reference for solo developers building AI-powered SaaS with TypeScript/Next.js. Prices current as of March 2026. All token prices are per 1M tokens unless noted.

---

## 1. LLM Providers

The core decision. Price is per 1M tokens (input/output).

| Name | Free Tier | Price (Input / Output per 1M tokens) | TS SDK | Best For |
|------|-----------|--------------------------------------|--------|----------|
| **Anthropic Claude** | None (pay-as-you-go) | Haiku 4.5: $0.25/$1.25 · Sonnet 4.6: $3/$15 · Opus 4.6: $5/$25 (fast mode: $30/$150) | `@anthropic-ai/sdk` — excellent, first-class TS | Complex reasoning, 1M context (Opus 4.6), tool use, coding. Best docs in the space. |
| **OpenAI** | $5 free credits (expire 3mo) | GPT-4o: $2.50/$10 · GPT-5.2: $1.75/$14 · GPT-5.4: from $2.50 · o3 Pro: $150/MTok | `openai` — gold standard TS SDK | Broadest ecosystem, function calling, multimodal. Batch/Flex/Standard/Priority tiers. |
| **Google Gemini** | Yes — 15 RPM, 1K/day, no card | Flash-Lite 2.5: $0.10/$0.40 · Flash 2.5: $0.30/varies · Pro 2.5: $1.25/$10 · 3.1 Pro: $2/$12 | `@google/generative-ai` — decent | Best free tier for prototyping. Massive 1M+ context window. Batch mode 50% off. |
| **Mistral** | None | Nemo: $0.02/$0.02 · Ministral-8b: $0.10/$0.10 · Medium 3: $0.40/$2 · Large 3: $0.50/$1.50 | `@mistralai/mistralai` — good | European hosting (GDPR). Nemo at $0.02/MTok is absurdly cheap for small tasks. |
| **Groq** | Yes — free tier, rate-limited | $0.05-$0.90/MTok depending on model (hosts open-source models on LPU hardware) | OpenAI-compatible API | Ultra-fast inference (LPU hardware). Best for latency-sensitive apps. |
| **Together AI** | None | Open-source models from $0.05/MTok. Llama, Qwen, DeepSeek hosted. | OpenAI-compatible API | Running open-source models without infra. 200+ models, one API. |
| **Fireworks AI** | None | Small models ~$0.20/MTok · DeepSeek V3.2: $0.56/$1.68 | OpenAI-compatible API | Fast open-source inference. Good fine-tuning support (no extra serving cost). |
| **DeepSeek** | Limited free credits | V3.1: $0.15/MTok · V3.2: $0.28/$0.42 · R1: $0.50/$2.18 (off-peak 50-75% off) | OpenAI-compatible API | Absurdly cheap. V3.2 unifies chat + reasoning. Off-peak discounts are wild. |
| **Cohere** | Trial (1K calls/mo) | Command R: $0.15/$0.60 · Command R+: $2.50/$10 · Embed 4: $0.12/MTok · Rerank: $2/1K | `cohere-ai` — good TS SDK | Enterprise RAG pipelines (Embed + Rerank + Command in one vendor). |
| **xAI Grok** | $25 free credits + $150/mo data-sharing program | Grok 4.1 Fast: $0.20/$0.50 · Grok 4: $3/$15 | OpenAI-compatible API | Real-time X/Twitter data access. Most generous free credits via data sharing. |

### Price/Performance Sweet Spots

- **Cheapest production-grade:** DeepSeek V3.1 ($0.15/MTok) or Gemini Flash-Lite ($0.10/$0.40) or Mistral Nemo ($0.02/$0.02)
- **Best all-rounder:** Claude Sonnet 4.6 ($3/$15) or GPT-5.2 ($1.75/$14)
- **Fastest inference:** Groq (any model) or Fireworks AI
- **Best free prototyping:** Google Gemini free tier or xAI ($25 free + $150/mo data-sharing)

### Gotchas

- **DeepSeek:** Hosted in China; intermittent outages; data residency concerns. Use via Together/Fireworks for reliability.
- **Groq:** Inference only — no fine-tuning. Rate limits on free tier are tight.
- **Gemini free tier:** Google slashed quotas 50-80% in Dec 2025. Not viable for production anymore.
- **OpenAI:** Model names change frequently; pin versions. GPT-4o is now legacy. Now has 4 pricing tiers (Batch, Flex, Standard, Priority). Batch = 50% off; cached inputs = 90% off. Model naming is still confusing.
- **Anthropic:** No free tier — but Batch API (50% off) and prompt caching (90% savings on cache hits) are powerful cost levers. Opus 4.6 now has 1M context window.
- **xAI:** $25 free credits on signup, plus $150/mo if you opt into data sharing — most generous free program, but read the data terms carefully.

---

## 2. LLM Orchestration & Routing

These sit between you and the LLM providers, adding observability, fallbacks, caching, or cost optimization.

| Name | Free Tier | Price | TS SDK | Best For |
|------|-----------|-------|--------|----------|
| **OpenRouter** | Free models available (rate-limited) | 5% markup on base provider costs. No minimums, no expiration. | OpenAI-compatible API | Single API for 290+ models. Automatic fallbacks. Best for model-hopping. |
| **LiteLLM** | Open source (self-host free) | Free OSS; hosted proxy plans available | Python-first, but OpenAI-compatible REST | Unified OpenAI-format proxy for 100+ providers. Great if you self-host. |
| **Portkey** | Free tier (10K requests/mo) | From $49/mo | `portkey-ai` — good TS SDK | AI gateway with caching, load balancing, guardrails. Production-grade. |
| **Helicone** | Free tier (100K requests/mo) | Usage-based beyond free tier | 1-line integration (proxy URL) | Observability & logging. Easiest setup — just change the base URL. |
| **Braintrust** | Free tier available | Usage-based | TS SDK available | LLM evaluation & experiments. Best for systematic prompt optimization. |

### What They Add (and When You Need Them)

- **Day 1 (solo dev):** You probably don't need any of these. Call providers directly.
- **When you have 2+ LLM providers:** OpenRouter simplifies billing and adds fallbacks.
- **When debugging costs/latency:** Helicone — dead simple, generous free tier.
- **When you need guardrails/caching in production:** Portkey.
- **When optimizing prompts systematically:** Braintrust.

### Gotchas

- **OpenRouter:** 5% markup adds up. Adds a middleman — slightly higher latency. Some models lag behind direct provider availability.
- **LiteLLM:** Python-native; TS usage is via REST proxy. Self-hosting means you own uptime.
- **Portkey:** $49/mo minimum feels steep for a solo dev with low traffic.

---

## 3. Embedding & Vector Search

For RAG, semantic search, and similarity features. Pricing is per 1M tokens embedded.

| Name | Free Tier | Price (per 1M tokens) | Dimensions | Best For |
|------|-----------|----------------------|------------|----------|
| **OpenAI Embeddings** | $5 free credits | Small: $0.02 · Large: $0.13 | 1536 / 3072 | Default choice. Cheapest at scale. Huge ecosystem. |
| **Voyage AI** | 200M free text tokens per account | Voyage-4: ~$0.06/MTok · Multimodal models also available | Up to 2048 | Top MTEB scores. Best quality for code & legal. Now part of Anthropic. |
| **Cohere Embed** | Trial (1K calls/mo) | Embed v3: $0.10/MTok · Embed 4: $0.12/MTok | 1024 | Pairs with Cohere Rerank ($2/1K searches) for best RAG results. |
| **Jina Embeddings** | Generous free tier (millions of tokens) | Usage-based (competitive) | Up to 8192 | jina-embeddings-v4: 3.8B unified model. Text + images. Outperforms proprietary on doc retrieval. |
| **Mixedbread** | Free tier | Competitive with OpenAI | Variable | Strong MTEB performer. Good for multilingual search. |

### Recommendations

- **Start with:** OpenAI text-embedding-3-small at $0.02/MTok. It's absurdly cheap and good enough.
- **Upgrade to:** Voyage AI if you need top retrieval quality (especially for code or specialized domains).
- **For RAG:** Pair any embedding with Cohere Rerank 3.5 for a big relevance boost.

### Gotchas

- **Voyage AI:** Was acquired by Anthropic in 2025. Integration into Claude platform ongoing — pricing may change.
- **Embedding lock-in:** Switching embedding models means re-embedding your entire corpus. Choose carefully upfront.
- **OpenAI small vs large:** The small model is 6.5x cheaper and nearly as good for most use cases. Start there.

---

## 4. Speech & Audio

STT = Speech-to-Text, TTS = Text-to-Speech.

| Name | Type | Free Tier | Price | TS SDK | Best For |
|------|------|-----------|-------|--------|----------|
| **OpenAI Whisper API** | STT | $5 free credits | $0.006/min ($0.36/hr) · GPT-4o Mini Audio: $0.003/min | `openai` SDK | GPT-4o Mini Audio undercuts everyone at $0.003/min. 99+ languages. |
| **Deepgram** | STT + TTS | $200 free credits | STT Nova-3: ~$0.0059/min · TTS Aura-2: $0.030/1K chars | `@deepgram/sdk` — excellent TS | Real-time STT for voice agents. Flux model has built-in end-of-turn detection. |
| **AssemblyAI** | STT | Free tier available | ~$0.37/hr (volume discounts to $0.27/hr) | `assemblyai` — good TS SDK | Best speaker diarization & audio intelligence. Slam-1 speech-language model. |
| **ElevenLabs** | TTS + STT | Free tier (10K chars/mo) | TTS Flash v2.5: $0.050/1K chars · STT Scribe v2: competitive | `elevenlabs` — good TS SDK | Most natural-sounding voices. Voice cloning. 75ms time-to-first-audio. |
| **PlayHT** | TTS | Limited free | From $31/mo · 829 voices, 142 languages | REST API | Largest voice library. Good for content creation at scale. |
| **Cartesia** | TTS + STT | Developer sandbox | TTS: $38/1M chars · STT (Ink): $0.13/hr — cheapest STT on market | REST + WebSocket API | Ultra-low latency TTS (~40ms). Ink STT undercuts Whisper at $0.13/hr vs $0.36/hr. |

### Recommendations

- **Budget STT:** Cartesia Ink at $0.13/hr is now the cheapest. GPT-4o Mini Audio at $0.003/min ($0.18/hr) is the runner-up.
- **Real-time voice agents:** Deepgram Flux (STT, built-in turn detection) + Cartesia (TTS, ~40ms latency).
- **Best voice quality:** ElevenLabs Flash v2.5 for TTS — 75ms first audio, best naturalness.
- **Full audio intelligence:** AssemblyAI for summarization, sentiment, topic detection on top of transcription.

### Gotchas

- **Whisper API:** No real-time streaming. 25MB file limit (~30 min). Batch only.
- **ElevenLabs:** Expensive at scale. Free tier is tiny (10K chars = ~2 minutes of audio).
- **Deepgram:** Free credits are generous ($200) but expire. Lock-in risk if you build on their proprietary models.

---

## 5. Image Generation

| Name | Free Tier | Price per Image | API Available? | Best For |
|------|-----------|----------------|----------------|----------|
| **OpenAI GPT Image** | $5 free credits | GPT Image 1 Mini: $0.005 (low) to $0.017 (high) · Full: $0.04-$0.17 | Yes — via `openai` SDK | Cheapest option (Mini). Good quality. Easy integration. |
| **DALL-E 3** | $5 free credits | ~$0.04/image (standard) | Yes — legacy, via `openai` SDK | Legacy. Use GPT Image instead. |
| **Black Forest Labs (FLUX)** | None | Kontext Pro: $0.04 · FLUX.2 Pro: $0.03/megapixel · Pro 1.1: $0.04 · Kontext Max: $0.08 | Yes — REST API | Best open-model quality. Kontext models for image editing. Enterprise self-hosted from $999/mo. |
| **Stability AI** | Free credits on signup | ~$0.02-$0.06/image (varies by model) | Yes — REST API | Open-source ecosystem (Stable Diffusion). Self-hostable. |
| **Ideogram** | Free tier (limited) | ~$0.04/image via API · Plans from $20/mo | Yes — API available | Best text rendering in images. Logos and typography. |
| **Leonardo AI** | Free tier (150 tokens/day) | Plans from $10/mo (8.5K tokens/mo) | Yes — REST API | Design-focused. Good UI for non-developers. Fine-tuning. |
| **Midjourney** | None | Plans from $10/mo | No official public API | Best artistic quality — but no API makes it useless for SaaS. |

### Recommendations

- **For SaaS integration:** FLUX (best quality-per-dollar) or GPT Image 1 Mini (cheapest).
- **For text in images:** Ideogram is uniquely good at this.
- **Skip:** Midjourney (no API), DALL-E 3 (superseded by GPT Image).

### Gotchas

- **Midjourney:** Still no official API. Third-party wrappers violate ToS and risk bans.
- **FLUX:** No free tier. But at $0.015/image (Schnell), the cost is negligible.
- **Content policies:** All providers reject certain content. Test your use case early.

---

## 6. Video Generation

The youngest and most expensive category. API availability is limited.

| Name | Free Tier | Price | API Available? | Best For |
|------|-----------|-------|----------------|----------|
| **Runway** | Limited free trial | From $12/mo (Gen-4.5) | Yes — API for enterprise | Cinematic quality. Most mature platform. |
| **Pika** | Free tier (limited) | From $8/mo | Limited API | Quick social media clips. Most affordable entry. |
| **Kling** | Free tier | From $6.99/mo | API available | Strong motion quality. Cheapest paid tier. |
| **Luma (Dream Machine)** | Free tier (limited) | Unlimited plan: $29.99/mo | API available (Ray2) | Best value for unlimited generation. Good 3D understanding. |
| **Synthesia** | Free trial | From $29/mo | Yes — REST API | AI avatar videos. Training/marketing content. |
| **HeyGen** | Free trial | From ~$29/mo | Yes — REST API | AI avatar + voice cloning. Personalized video at scale. |

### Recommendations

- **For a SaaS product:** Most video APIs are immature for programmatic use. Proceed with caution.
- **Avatar videos (training/marketing):** Synthesia or HeyGen have the most reliable APIs.
- **Creative/cinematic:** Runway if budget allows; Kling for budget-conscious.
- **Honest take:** Unless video generation IS your product, skip this category for now. Costs are high, quality is inconsistent, and APIs are unstable.

### Gotchas

- **Cost:** Video generation is 100-1000x more expensive per unit than text or images.
- **API maturity:** Most "APIs" are thin wrappers around async job queues. Expect 30s-5min generation times.
- **Quality variance:** Results are unpredictable. Budget for re-generations.

---

## 7. AI Agent Infrastructure

Frameworks and tools for building autonomous AI agents.

| Name | Free Tier | Price | TS SDK | Best For |
|------|-----------|-------|--------|----------|
| **Vercel AI SDK** | Open source (free) | Free (pay for LLM usage only) | `ai` — best-in-class TS/Next.js DX | Best DX for React/Next.js. Streaming-first. 25+ provider integrations. Native edge support. |
| **LangChain / LangGraph** | Open source (free) | LangSmith from $39/mo for tracing | `langchain` + `@langchain/core` — TS support | Most complete agent ecosystem. Graph-based workflows. 47M+ PyPI downloads. |
| **Anthropic Agent SDK** | Free (uses Claude API credits) | Pay for Claude API usage only | Yes — TS SDK | Lightweight, opinionated. MCP support for tool ecosystem. Best on Claude. |
| **CrewAI** | Open source (free) | Enterprise plans available | Python-first (no native TS) | Multi-agent role-based systems. 44K+ GitHub stars. Easy to learn. |
| **Composio** | Free tier (1K executions/mo) | Usage-based beyond free | `composio-core` — good TS | Tool/API integration layer. 250+ tools, 500+ apps. Works with all major frameworks. |
| **Microsoft AutoGen (AG2)** | Open source (free) | Free | Python-first | Multi-agent conversations. Merging with Semantic Kernel. |

### Recommendations

- **Solo dev with Next.js:** Vercel AI SDK is the no-brainer starting point. Best React/streaming DX, native edge support, works with every provider.
- **Agents with tools:** Vercel AI SDK + tool calling, or Anthropic Agent SDK if you're on Claude. Keep it simple.
- **Complex multi-agent workflows:** LangGraph is the production standard but has a learning curve.
- **Need lots of tool integrations:** Composio saves massive time connecting to external APIs.
- **MCP (Model Context Protocol):** Anthropic's standard for agent-to-tool connections is becoming ubiquitous. Frameworks that support MCP get access to a growing ecosystem of pre-built integrations.

### Gotchas

- **LangChain:** Notorious for breaking changes and abstraction overhead. LangGraph (the graph runtime) is the good part.
- **CrewAI:** Python only. No TS SDK. Skip for a TS/Next.js stack.
- **AutoGen:** Being merged into AG2/Semantic Kernel. Unstable target for new projects.
- **Vercel AI SDK:** Only useful for the application layer — doesn't have LangGraph-level orchestration primitives.
- **Agent frameworks in general:** Most indie SaaS apps need a simple tool-calling loop, not a framework. Don't over-engineer.

---

## 8. AI-Powered Features

Specialized APIs that give your app superpowers.

| Name | What It Does | Free Tier | Price | TS SDK | Best For |
|------|-------------|-----------|-------|--------|----------|
| **Firecrawl** | Web scraping & crawling optimized for LLMs | Free tier (500 credits) | ~$0.83/1K pages. Plans from $19/mo | `@mendable/firecrawl-js` — good TS | Cleanest web-to-markdown pipeline. Built for RAG. |
| **Browserbase** | Managed headless browser infrastructure | Free tier available | Usage-based | TS SDK available | Running browser agents at scale. Handles anti-bot, sessions. |
| **Exa** | Neural search engine (finds similar content) | 1,000 free credits | Usage-based | `exa-js` — good TS SDK | Semantic web search. Finds content by meaning, not keywords. |
| **Tavily** | Search API built for AI agents | Free tier (1K searches/mo) | $0.008/credit, from $30/mo | `@tavily/core` — good TS | Quick factual answers for agents. Purpose-built for LLM tool use. |
| **Perplexity Sonar API** | Search + LLM answer in one call | None | Sonar: $5/1K searches + $0.30/MTok · Pro: $5/1K + $3/MTok. Citation tokens now free. | REST API (OpenAI-compatible) | Grounded answers with citations. Citation tokens no longer billed (2026 change). |
| **Unstructured** | Document parsing (PDF, DOCX, images to text) | Free OSS library | Hosted API: usage-based | Python-first; REST API for TS | Extract structured data from messy documents. ETL for RAG. |

### Recommendations

- **Web scraping for RAG:** Firecrawl is the clear winner. Clean markdown output, handles JS rendering.
- **Search for agents:** Tavily for free tier; Perplexity Sonar for cited answers.
- **Document parsing:** Unstructured (self-host the OSS version to save money).
- **Browser automation:** Browserbase if you need persistent sessions and anti-bot handling.

### Gotchas

- **Firecrawl:** Expensive at high volume compared to self-hosted solutions. But the DX saves hours.
- **Tavily:** 1K free searches/month is generous for prototyping but burns fast in production.
- **Perplexity:** No free tier. The $5/1K searches cost adds up on top of token costs.
- **Unstructured:** The hosted API is pricey. Self-host the Python library if you can.

---

## Indie Hacker Must-Have Stack

If I were building an AI-powered SaaS today with TypeScript/Next.js, here's what I'd pick for maximum leverage at minimum cost:

### The Core Stack (5 APIs)

| Layer | Pick | Why | Monthly Cost (light usage) |
|-------|------|-----|---------------------------|
| **Primary LLM** | Anthropic Claude Sonnet 4.6 | Best coding + reasoning. Excellent TS SDK. Prompt caching saves 90%. | ~$10-50 |
| **Cheap/Fast LLM** | Google Gemini Flash (free tier) or DeepSeek V3.2 ($0.28/$0.42) | Prototyping on Gemini free tier, then DeepSeek for production bulk tasks. | $0-10 |
| **Embeddings** | OpenAI text-embedding-3-small | $0.02/MTok is essentially free. Good enough for 95% of RAG use cases. | ~$1-5 |
| **Web Scraping** | Firecrawl | Clean markdown output. Built for LLMs. Saves days of scraping infra work. | $0-19 |
| **Search** | Tavily | 1K free searches/mo. Dead simple agent tool integration. | $0-30 |

### Add When You Need Them

| Layer | Pick | When |
|-------|------|------|
| **App Framework** | Vercel AI SDK (`ai` package) | Day 1 if you're on Next.js — streaming, tool calling, provider switching for free |
| **Voice** | Deepgram Flux (STT) + Cartesia (TTS) | When you add voice features — lowest latency combo |
| **Images** | FLUX Kontext Pro ($0.04/img) | When you need image generation or editing |
| **Observability** | Helicone (free 100K req/mo) | When you need to debug costs/latency |
| **Agent tools** | Composio | When your agent needs to connect to 10+ external APIs |

### Total Monthly Budget: $15-100/month

That gets you a production AI SaaS with smart reasoning, RAG search, web data access, and room to grow. Scale up models and add capabilities as revenue comes in.

---

## Key Principles

1. **Start with 2 LLMs max.** One smart (Claude/GPT), one cheap (DeepSeek/Gemini). Route by task complexity.
2. **Don't add orchestration tools until you need them.** Direct API calls are fine for v1.
3. **Embeddings are commodity.** OpenAI small is cheap enough to not optimize.
4. **Voice and video are expensive.** Only add if they're core to your value prop.
5. **Use Batch APIs everywhere.** 50% discount for anything that doesn't need real-time response.
6. **Cache aggressively.** Anthropic prompt caching and OpenAI cached input tokens are free money.
7. **Pin your model versions.** Every provider ships breaking changes. Pin versions in production.

---

*Last updated: March 2026. Prices change frequently — always verify on provider websites before committing.*
