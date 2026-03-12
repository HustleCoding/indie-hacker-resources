# AI & LLM API Landscape for Indie Hackers

**A practical 2026 guide to LLMs, embeddings, evals, safety, OCR, and AI product APIs for TS/Next.js builders — March 12, 2026**

Prices change constantly. `URL` links point to official pricing/docs pages.

---

## 1. LLM Providers

> Trustworthy comparisons matter more than giant model lists. For most indie hackers, the real choices are: premium reasoning model, cheap workhorse model, and maybe one fallback.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Anthropic Claude](https://www.anthropic.com)** | [Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing) | No permanent free API tier | Sonnet 4.6: $3/$15 per 1M tokens; Opus 4.6: $15/$75 | Excellent | Best premium reasoning + coding |
| **[Claude Haiku 4.5](https://www.anthropic.com/claude/haiku)** | [Model page](https://www.anthropic.com/claude/haiku) | No permanent free API tier | $1/$5 per 1M tokens | Excellent | Cheapest Claude for agent flows |
| **[OpenAI](https://platform.openai.com)** | [Pricing](https://platform.openai.com/docs/pricing/) | No predictable free production tier | GPT-5.4: $3.50/$28 per 1M tokens; GPT-5.4-pro: $35/$280 | Excellent | Broadest ecosystem + strongest all-round platform |
| **[Google Gemini](https://ai.google.dev)** | [Pricing](https://ai.google.dev/pricing) | Yes, real free tier for testing | Gemini 3.0 Fast Preview: $0.20/$0.60; Gemini 3.0 Pro Preview: $0.50/$4.50 | Good | Cheap prototyping + huge context |
| **[Mistral](https://mistral.ai)** | [Pricing](https://mistral.ai/pricing) | Yes, `Experiment` API tier for eval/prototyping | Small 3.2: $0.10/$0.30; Medium 3.1: $0.40/$2.00 | Good | EU-hosted API + strong price/perf |
| **[DeepSeek](https://www.deepseek.com)** | [Pricing](https://api-docs.deepseek.com/quick_start/pricing/) | Limited credits / not a durable free tier | V3.2 chat: $0.28 input cache miss / $0.42 output | OpenAI-compatible | Cheapest serious production text model |
| **[Together AI](https://www.together.ai)** | [Pricing](https://www.together.ai/pricing) | No durable free tier | Model-dependent; open models from very low cost, eg. gpt-oss-20b $0.05/$0.20 | OpenAI-compatible | Open-model buffet without infra |
| **[Fireworks AI](https://fireworks.ai)** | [Pricing](https://fireworks.ai/pricing) | $1 free credit | DeepSeek V3 family: $0.56/$1.68; small text models from $0.10 | OpenAI-compatible | Fast hosted open models |
| **[xAI Grok](https://x.ai/api)** | [Pricing](https://x.ai/api) | No dependable free tier | Grok 4.1 Fast: $0.20/$0.50; Grok 4: $3/$15 | OpenAI-compatible | X/Grok-specific tooling + very large context |

### What actually matters

- **Best premium model:** Claude Sonnet 4.6 or OpenAI GPT-5.4.
- **Best cheap model:** DeepSeek V3.2 or Mistral Small 3.2.
- **Best Europe-friendly option:** Mistral.
- **Best open-model API layer:** Together or Fireworks.

### Gotchas

- **Do not trust old Anthropic numbers.** Current pricing is on Sonnet 4.6 and Opus 4.6, not older 4-era shorthand.
- **Gemini free tier is still for prototyping, not production planning.** The current pricing page now mixes newer 3.0 previews with older families.
- **OpenAI model naming is still messy.** The current flagship on the pricing page is GPT-5.4, not GPT-5.2.
- **DeepSeek is amazing on cost, but you may still want Fireworks/Together for ops comfort.**

---

## 2. Embeddings & Retrieval

> Most indie SaaS apps should start with cheap embeddings plus Postgres/pgvector, then add reranking before they add a dedicated vector stack.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)** | [Pricing](https://platform.openai.com/pricing) | No durable free tier | `text-embedding-3-small` $0.02 / 1M tokens; large $0.13 | Excellent | Default embedding choice |
| **[Voyage AI](https://www.voyageai.com)** | [Pricing](https://docs.voyageai.com/docs/pricing) | 200M free tokens on key models | `voyage-4` $0.06 / 1M; `voyage-4-large` $0.12 / 1M | Good | Best premium retrieval quality |
| **[Together Embeddings](https://www.together.ai)** | [Pricing](https://www.together.ai/pricing) | No durable free tier | BGE base $0.01 / 1M; BGE large $0.02 / 1M | Good | Cheap OSS embeddings |
| **[Voyage Rerank](https://www.voyageai.com)** | [Pricing](https://docs.voyageai.com/docs/pricing) | 200M free rerank tokens | `rerank-2.5` $0.05 / 1M rerank tokens | Good | Strong reranking without Cohere lock-in |
| **[Supabase pgvector](https://supabase.com/vector)** | [Pricing](https://supabase.com/pricing) | Included in free Supabase projects | No separate vector fee; use normal DB limits | Excellent | Cheapest “good enough” retrieval |

### Retrieval advice

- **Day 1:** `text-embedding-3-small` + pgvector.
- **When quality matters:** add reranking before adding a dedicated vector DB.
- **When docs/code retrieval is core product value:** Voyage is worth the premium.

### Correction

- **Voyage is not “part of Anthropic.”** Anthropic invested; Voyage is still its own company.

---

## 3. Gateways, Tracing & Evals

> Indie hackers usually need tracing and evals earlier than they need multi-agent frameworks.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenRouter](https://openrouter.ai)** | [Pricing](https://openrouter.ai/models) | Free models exist | About 5% markup on base model cost | OpenAI-compatible | Fast multi-model routing |
| **[Portkey](https://portkey.ai)** | [Pricing](https://portkey.ai/pricing) | Free forever, 10K logs/mo | Production from $49/mo | Good | Gateway + routing + observability |
| **[Helicone](https://www.helicone.ai)** | [Pricing](https://www.helicone.ai/pricing) | 10K free requests | Pro from $79/mo + usage | Good | Fastest tracing/monitoring setup |
| **[Braintrust](https://www.braintrust.dev)** | [Pricing](https://www.braintrust.dev/pricing) | Free: 1M trace spans | Pro $249/mo | Good | Evals + experiments |
| **[Langfuse](https://langfuse.com)** | [Home](https://langfuse.com/) | OSS/self-host free | Cloud pricing is less public; self-host remains the clearest entry path | Good | Open-source traces + eval workflows |

### Best picks

- **Simplest tracing:** Helicone.
- **Best open-source option:** Langfuse.
- **Best “control plane” product:** Portkey.
- **Best eval-first workflow:** Braintrust.

---

## 4. Guardrails & Moderation

> Safety is not just enterprise theater. If users can upload text, PDFs, screenshots, or prompts, you need some moderation story.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenAI Moderation](https://platform.openai.com/docs/guides/moderation)** | [Pricing](https://platform.openai.com/pricing) | Yes | `omni-moderation` is free | Excellent | Cheapest default moderation layer |
| **[Portkey Guardrails](https://portkey.ai)** | [Pricing](https://portkey.ai/pricing) | Free tier exists | From $49/mo in production plans | Good | Centralized guardrails + gateway rules |
| **[Together Moderation Models](https://www.together.ai)** | [Pricing](https://www.together.ai/pricing) | No durable free tier | Llama Guard / moderation models around $0.20 / 1M tokens | OpenAI-compatible | Cheap moderation on open models |

### Guardrails reality

- **Default stack:** OpenAI Moderation + schema validation + allowlists.
- **When you have many providers:** move safety policy into Portkey or your own middleware.
- **Most indie apps do not need a “guardrails platform” on day 1.**

---

## 5. Speech & Audio

> Audio pricing shifts fast. Re-check before shipping, especially if minutes are core to your margin.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenAI Audio](https://platform.openai.com)** | [Pricing](https://platform.openai.com/docs/pricing/) | No durable free tier | `gpt-4o-mini-transcribe` about $0.003 / min; Whisper remains $0.006 / min | Excellent | Cheapest current OpenAI transcription path |
| **[Deepgram](https://deepgram.com)** | [Pricing](https://deepgram.com/pricing) | Free credits | STT from about $0.0059 / min | Excellent | Real-time voice agents |
| **[AssemblyAI](https://www.assemblyai.com)** | [Pricing](https://www.assemblyai.com/pricing/) | Free credits | From $0.15 / hr | Good | Transcription + audio intelligence |
| **[ElevenLabs](https://elevenlabs.io)** | [API pricing](https://elevenlabs.io/pricing/api/) | Free plan | TTS Flash from $0.08 / 1K chars; STT from $0.40 / hr on low tiers | Good | Best voice quality |
| **[Cartesia](https://cartesia.ai)** | [Pricing](https://cartesia.ai/pricing) | Free plan credits | Credit-based plans from $4/mo | Good | Ultra-low-latency voice apps |

### Best picks

- **Best budget transcription:** AssemblyAI at current public entry pricing.
- **Best real-time stack:** Deepgram + Cartesia.
- **Best voice quality:** ElevenLabs, but it is not the cheapest anymore.

---

## 6. Image Generation

> The current best indie-hacker pattern is one cheap image model for product features and one premium model only if image quality is core value.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenAI GPT Image Latest](https://platform.openai.com/docs/guides/image-generation)** | [Pricing](https://platform.openai.com/docs/pricing/) | No durable free tier | 1024x1024: $0.009 low, $0.034 medium, $0.133 high | Excellent | Best all-round product image API |
| **[OpenAI GPT Image 1 Mini](https://platform.openai.com/docs/models/gpt-image-1-mini/)** | [Model page](https://platform.openai.com/docs/models/gpt-image-1-mini/) | No durable free tier | 1024x1024: $0.005 low, $0.011 medium, $0.036 high | Excellent | Cheapest OpenAI image API |
| **[Black Forest Labs / FLUX](https://blackforestlabs.ai)** | [API/pricing](https://blackforestlabs.ai) | No free API tier | Model/quality dependent; still a strong quality-per-dollar pick | REST | Best open-model image quality |
| **[Ideogram](https://ideogram.ai)** | [Pricing](https://ideogram.ai/pricing) | Limited free tier | API/plan pricing from paid tiers | API available | Best text rendering in images |
| **[Stability AI](https://stability.ai)** | [Pricing](https://stability.ai/pricing) | Trial credits | Usage-based | REST | SD ecosystem + self-host option |

### Corrections

- **OpenAI image pricing changed.** `gpt-image-1-mini` high quality is now $0.036 for 1024x1024, not the old lower number.
- **Do not recommend DALL-E 3 as the default in 2026.** GPT Image is the better reference point now.

---

## 7. OCR & Document Parsing

> This deserves its own section. Upload-to-insight SaaS products live or die on parsing quality.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[LlamaParse](https://www.llamaindex.ai/llamaparse)** | [Overview](https://www.llamaindex.ai/llamaparse) | Free plan exists | Pricing evolves by plan; see current LlamaParse page | Good | Best indie-hacker OCR/parsing default |
| **[Unstructured](https://unstructured.io)** | [Pricing](https://unstructured.io/pricing) | 15,000 free pages, no expiry | PAYG $0.03/page | API-first | Messy enterprise documents |
| **[Mistral OCR 3](https://docs.mistral.ai/models/ocr-3-25-12)** | [Model page](https://docs.mistral.ai/models/ocr-3-25-12) | No permanent free tier | $2 / 1,000 pages | Good | Cheap OCR with structured extraction |

### Best picks

- **Best default:** LlamaParse.
- **Cheapest clean OCR math:** Mistral OCR.
- **Best for ugly enterprise docs:** Unstructured.

---

## 8. Search, Scraping & Browser APIs

> These tools often create more user value than adding yet another frontier model.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[Firecrawl](https://www.firecrawl.dev)** | [Pricing](https://www.firecrawl.dev/pricing) | Free credits | From paid plans around $19/mo | Good | Clean web-to-markdown for RAG |
| **[Tavily](https://tavily.com)** | [Pricing](https://tavily.com/pricing) | 1K searches/mo | Paid from ~$30/mo | Good | Agent web search |
| **[Exa](https://exa.ai)** | [Pricing](https://exa.ai/pricing) | Free credits | Usage-based | Good | Semantic web search |
| **[Browserbase](https://www.browserbase.com)** | [Pricing](https://www.browserbase.com/pricing) | Free tier | Usage-based | Good | Managed browser agents |
| **[Perplexity Sonar API](https://docs.perplexity.ai)** | [Models](https://docs.perplexity.ai/docs/agent-api/models) | No durable free tier | `perplexity/sonar` from $0.25 / 1M input tokens and $2.50 / 1M output tokens | OpenAI-compatible | Grounded answers with citations |

### Best picks

- **Web pages into RAG:** Firecrawl.
- **Search tool for agents:** Tavily.
- **Browser automation:** Browserbase.

---

## 9. Video APIs (Usually Skip)

> This is the lowest-signal category for most indie hackers. If video is not the product, skip it.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the table below.

| Name | URL | Free Tier | Pricing | TS SDK | Best For |
|------|-----|-----------|---------|--------|----------|
| **[OpenAI Sora 2](https://platform.openai.com/pricing)** | [Pricing](https://platform.openai.com/docs/pricing/) | No free production tier | $0.10/s, $0.30/s, or $0.50/s depending on mode and resolution | Excellent | Most API-native current option |

### Reality check

- Most other “video APIs” are still credit-plan or enterprise-sales products.
- Treat video as a special-case feature, not a default SaaS add-on.

---

## 10. The Best Indie-Hacker AI Stack

> Keep the stack boring. Add evals and safety before you add framework complexity.

Last verified: March 12, 2026.
Sources: official pricing/docs links in the tables below.

### My default 2026 stack

| Layer | Pick | Why |
|------|------|-----|
| Smart model | **Claude Sonnet 4.6** | Best premium reasoning/coding value |
| Cheap model | **DeepSeek V3.2** or **Mistral Small 3.2** | Best cost floor for bulk work |
| Embeddings | **OpenAI text-embedding-3-small** | Still absurdly cheap |
| Retrieval | **pgvector first** | Avoid extra infra early |
| OCR / parsing | **LlamaParse** | Best practical doc ingestion default |
| Web ingest | **Firecrawl** | Fastest path to usable markdown |
| Tracing | **Helicone** | Easiest drop-in |
| Evals | **Braintrust** or **Langfuse** | Add once prompts matter |
| Moderation | **OpenAI Moderation** | Free, easy default |

### Rules I’d follow

- **Do not build around free-tier Gemini quotas for production.**
- **Do not add LangGraph/CrewAI/AutoGen until simple tool-calling actually breaks down.**
- **Do not skip moderation/evals just because the app is small.**
- **Do not pay for a vector DB before pgvector actually hurts.**

### Final take

For most indie hackers, the winning setup in 2026 is:

- **Claude Sonnet 4.6 or GPT-5.4** for premium work
- **DeepSeek V3.2 or Mistral Small 3.2** for cheap work
- **OpenAI embeddings**
- **LlamaParse + Firecrawl**
- **Helicone + OpenAI Moderation**

That stack ships faster than a “clever” agent stack and is easier to keep profitable.
