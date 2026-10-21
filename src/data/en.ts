// Traductions anglaises du contenu (providers, modèles, scénarios, niveaux).
// Chaque table est indexée par le même id que les données françaises.

export const EN_PROVIDERS: Record<
  string,
  { tagline: string; strengths: string[]; weaknesses: string[]; compliance: string }
> = {
  openai: {
    tagline: "The historical generalist, most mature ecosystem.",
    strengths: [
      "Huge tooling ecosystem",
      "Excellent at code and agents",
      "Text and image input; audio via dedicated Realtime models",
    ],
    weaknesses: ["Among the priciest", "Data processed outside the EU by default"],
    compliance:
      "GDPR (European data protection regulation) via DPA contract; EU residency optional on enterprise plans.",
  },
  google: {
    tagline: "The giant-context and native multimodal champion.",
    strengths: [
      "Huge context windows (1M+ tokens)",
      "Native video and audio",
      "Great value for money",
    ],
    weaknesses: ["Many parallel versions: choose carefully", "Sometimes shifting interface"],
    compliance: "GDPR via Google Cloud; European residency options.",
  },
  anthropic: {
    tagline: "The reference for careful reasoning and writing.",
    strengths: [
      "Excellent long reasoning",
      "Great at writing and analysis",
      "Reputation for reliability",
    ],
    weaknesses: ["Thinking mandatory on Fable and Opus", "No image generation"],
    compliance: "GDPR via DPA; no training on customer data.",
  },
  deepseek: {
    tagline: "Open-weights power at a bargain price.",
    strengths: [
      "Very low prices",
      "Open weights (downloadable, self-hostable)",
      "Strong at math and code",
    ],
    weaknesses: ["API hosted in China", "Fewer surrounding tools"],
    compliance:
      "GDPR caution: API hosted in China; self-host (run on your own servers) for compliance.",
  },
  mistral: {
    tagline: "The sovereign European choice.",
    strengths: ["Hosted in France/EU", "Open and efficient models", "Very fast"],
    weaknesses: ["Less powerful than US flagships on reasoning", "Smaller ecosystem"],
    compliance: "Ideal for EU compliance: European hosting, open weights.",
  },
  meta: {
    tagline: "Open weights (downloadable weights) to self-host.",
    strengths: ["Free (open weights)", "Full control when self-hosted", "Large community"],
    weaknesses: ["Requires your own infrastructure", "A notch below proprietary flagships"],
    compliance:
      "Self-hosting: data control; compliance still requires security, contracts and infrastructure.",
  },
  alibaba: {
    tagline: "Chinese open weights, very strong at code and multilingual.",
    strengths: [
      "Excellent at code",
      "Very good multilingual (incl. Asian languages)",
      "Open weights in several sizes",
    ],
    weaknesses: ["Model Studio API hosted in Singapore", "Less established brand in Europe"],
    compliance:
      "Model Studio Singapore API (USD prices): regulate transfers outside the EU. Qwen3.8 27B is self-hostable under Apache 2.0.",
  },
  cohere: {
    tagline: "The enterprise specialist for search and RAG.",
    strengths: [
      "Excellent at RAG (retrieval augmented by your documents)",
      "Private deployment possible",
      "Strong enterprise culture",
    ],
    weaknesses: ["Less generalist than flagships", "Smaller community"],
    compliance: "Deployable on your cloud (VPC): a solid compliance option.",
  },
};

export const EN_MODELS: Record<
  string,
  { bestFor: string; simpleNote: string; techNote: string; capabilities: string[] }
> = {
  "gpt-6-astra": {
    bestFor: "Complex, high-stakes problems.",
    simpleNote: "A big brain to save for decisions where mistakes are costly.",
    techNote:
      "Text and image input, text output (128K maximum). Audio uses dedicated GPT Realtime / GPT Audio models. GPT-6 offers six reasoning efforts (internal thinking time): none, low, medium, high, xhigh, max; the last two map to high here. Higher pricing above 272K input tokens (pieces of text).",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "gpt-6-sol": {
    bestFor: "Code, agents (chains of autonomous actions) and judgment.",
    simpleNote:
      "An all-round companion that gets things done without choosing the priciest option.",
    techNote:
      "Text and image input, text output (128K maximum). Audio uses dedicated GPT Realtime / GPT Audio models. GPT-6 offers six reasoning efforts (internal thinking time): none, low, medium, high, xhigh, max; the last two map to high here. Higher pricing above 272K input tokens (pieces of text).",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "gpt-6-luna": {
    bestFor: "High-volume classification, extraction and summaries.",
    simpleNote: "The quick little one: fast decisions on repetitive tasks at a rock-bottom price.",
    techNote:
      "Text and image input, text output (128K maximum). Audio uses dedicated GPT Realtime / GPT Audio models. GPT-6 offers six reasoning efforts (internal thinking time): none, low, medium, high, xhigh, max; the last two map to high here. Higher pricing above 272K input tokens (pieces of text).",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "gemini-4-argon": {
    bestFor: "Flagship reasoning, code and agents (autonomous actions).",
    simpleNote: "It takes time to make sense of both your documents and your videos.",
    techNote:
      "Text, image, audio, video and PDF input; text output (65K maximum). Thinking low/medium/high, no none. Gemini is the only family to ingest video and audio natively in the range compared here. Introductory price through November 30, 2026; $4/20 from December 1, 2026.",
    capabilities: ["Text", "Vision", "Audio", "Video", "Tools", "Code"],
  },
  "gemini-3-8-flash": {
    bestFor: "Speed, code and multimodal analysis (multiple media).",
    simpleNote: "It moves from text to videos without keeping you waiting too long.",
    techNote:
      "Text, image, audio, video and PDF input; text output (65K maximum). Thinking low/medium/high, no none. Gemini is the only family to ingest video and audio natively in the range compared here. Introductory price through December 31, 2026, doubling on January 1, 2027.",
    capabilities: ["Text", "Vision", "Audio", "Video", "Tools", "Code"],
  },
  "gemini-3-5-flash-lite": {
    bestFor: "Volume, triage and classification.",
    simpleNote: "It handles the first sorting pass when requests arrive by the thousand.",
    techNote:
      "Text, image, audio, video and PDF input; text output (65K maximum). Thinking low/medium/high, no none. Gemini is the only family to ingest video and audio natively in the range compared here. Low/medium/high levels need confirmation on the model page; this grid remains provisional.",
    capabilities: ["Text", "Vision", "Audio", "Video", "Tools", "Code"],
  },
  "claude-fable-5-1": {
    bestFor: "High-stakes analysis with reinforced safeguards.",
    simpleNote: "The cautious family member for examining the most delicate situations.",
    techNote:
      "Same base model as Mythos, restricted to verified organizations. Thinking always on, default high. Text and image input; text output, maximum 128K. No image generation or native audio/video.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "claude-opus-5-5": {
    bestFor: "Long analysis, legal work and careful reasoning.",
    simpleNote: "It digs into difficult files rather than rushing an answer.",
    techNote:
      "Thinking always on, default medium. Text and image input; text output, maximum 128K. No image generation or native audio/video.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "claude-sonnet-5-5": {
    bestFor: "Complex code, agents (autonomous actions) and analysis.",
    simpleNote: "The diligent colleague who helps untangle complicated work.",
    techNote:
      "Adaptive thinking (adjusted to the task). Text and image input; text output, maximum 128K. No image generation or native audio/video.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "claude-haiku-5-5": {
    bestFor: "Budget extraction, assistance and summaries.",
    simpleNote: "A lightweight helping hand for everyday small requests.",
    techNote:
      "Adaptive thinking (adjusted to the task). Text and image input; text output, maximum 128K. No image generation or native audio/video.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "deepseek-v4-1-flash": {
    bestFor: "Budget math and code; self-hosting possible.",
    simpleNote: "It thinks even on small tasks while staying affordable.",
    techNote:
      "552B parameters (internal model settings) MoE (only selected experts work per token). Current version: snapshot 1017 (October 17, 2026). Thinking on by default: low/high/max, max maps to high. Off-peak pricing doubles on weekdays 01-04 and 06-10 UTC. China-hosted API: GDPR (European data protection) caution; self-hosting available. Old deepseek-chat and deepseek-reasoner aliases retired July 24, 2026.",
    capabilities: ["Text", "Tools", "Code", "Math"],
  },
  "deepseek-v4-pro": {
    bestFor: "Budget math and code; self-hosting possible.",
    simpleNote: "A big brain on a small budget, if the processing location suits you.",
    techNote:
      "1600B parameters (internal model settings). Thinking on by default: low/high/max, max maps to high. Off-peak pricing doubles on weekdays 01-04 and 06-10 UTC. China-hosted API: GDPR (European data protection) caution; self-hosting available. Old deepseek-chat and deepseek-reasoner aliases retired July 24, 2026.",
    capabilities: ["Text", "Tools", "Code", "Math"],
  },
  "mistral-large-3": {
    bestFor: "Professional analysis, EU health data and self-hosting.",
    simpleNote: "The sturdy European option you can also run on your own premises.",
    techNote:
      "Apache 2.0; 675B MoE (specialized experts), 41B active. Mistral Large 4 is announced for late October 2026: not in this catalogue yet. Text and image input. EU API hosting. Text output; no effort setting.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "mistral-medium-3-5": {
    bestFor: "Professional apps and EU assistants.",
    simpleNote: "A balanced work partner with a Europe-based service.",
    techNote:
      "Open weights under a modified MIT license. EU API hosting. Text output; no effort setting.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "mistral-small-4": {
    bestFor: "High-volume EU triage, summaries and support.",
    simpleNote: "The small European option that handles many requests without a huge bill.",
    techNote:
      "Open weights; size not disclosed in the supplied catalogue. EU API hosting. Text output; no effort setting.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "devstral-2": {
    bestFor: "Code agent (assistant that edits and tests files).",
    simpleNote: "It gets into your files to help repair your software.",
    techNote:
      "Open weights under a modified MIT license; 123B parameters (internal settings), no adjustable effort. EU API hosting. Text output; no effort setting.",
    capabilities: ["Text", "Tools", "Code"],
  },
  "ministral-3-8b": {
    bestFor: "Small on-device model for offline notes and summaries.",
    simpleNote: "Small enough to travel with your device, even without the internet.",
    techNote:
      "Apache 2.0; 8B parameters (internal settings). Check quantization (compression) and available device memory. EU API hosting. Text output; no effort setting.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "llama-4-5-maverick": {
    bestFor: "Open weights (downloadable model weights) to self-host.",
    simpleNote: "A large model to run yourself, provided you have the right machines.",
    techNote:
      "Llama 4 community license, not strictly open source. 400B MoE (specialized experts), 17B active. Indicative Meta API price for Llama 4 Maverick: depends on the host.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "qwen3-8-max": {
    bestFor: "Code, judgment and multilingual apps.",
    simpleNote: "The most ambitious family member for tackling difficult requests.",
    techNote:
      "Text and image input. Closed Model Studio Singapore API, USD prices. Efforts none/medium/high: simplified grid.",
    capabilities: ["Text", "Vision", "Tools", "Code"],
  },
  "qwen3-8-flash": {
    bestFor: "Budget high-volume triage and summaries.",
    simpleNote: "It gets straight to the point when speed matters most.",
    techNote: "Model Studio Singapore API, USD prices. Closed model, no adjustable effort.",
    capabilities: ["Text", "Tools", "Code"],
  },
  "qwen3-8-27b": {
    bestFor: "Code and self-hosted customization.",
    simpleNote: "A manageable size that does very well at writing software.",
    techNote:
      "27B dense (all parameters participate), Apache 2.0. 262K context, extendable to 1M with YaRN (context extension). Excellent code for its size. Model Studio Singapore API, USD prices.",
    capabilities: ["Text", "Tools", "Code"],
  },
  "command-a-plus": {
    bestFor: "Document search, vision and enterprise assistants.",
    simpleNote: "It draws on your documents to build useful answers at work.",
    techNote:
      "Text and vision (image reading), tool calling (external functions), RAG (retrieval augmented by documents). No effort setting. Size undisclosed.",
    capabilities: ["Text", "Vision", "Tools", "RAG"],
  },
  "command-r": {
    bestFor: "Budget RAG (retrieval augmented by documents).",
    simpleNote: "It finds information in your documents without aiming for luxury.",
    techNote:
      "Text and tools, no native vision. RAG (retrieval augmentation) and citations. 35B parameters (internal settings).",
    capabilities: ["Text", "Tools", "RAG"],
  },
};

export const EN_SCENARIOS: Record<
  string,
  {
    title: string;
    story: string;
    explainSimple: string;
    explainTech: string;
    notes: Record<string, string>;
  }
> = {
  "support-bot": {
    title: "Customer support chatbot",
    story:
      "Your e-commerce site gets 50,000 questions a day: parcel tracking, returns, opening hours. Answers must be instant and costs under control.",
    explainSimple: "For simple answers, prefer a fast model and direct answers when offered.",
    explainTech: "GPT-6 Luna and Haiku 5.5: $0.10/0.50. Gemini and DeepSeek do not offer none.",
    notes: {
      "gpt-6-luna": "Low price and direct answers, with tools (external functions).",
      "claude-haiku-5-5": "Same price as Luna; a good assistant for simple questions.",
      "mistral-small-4": "EU hosting and downloadable weights; low cost.",
      "deepseek-v4-1-flash":
        "Budget off-peak option, but mandatory thinking and a China-hosted API.",
      "gpt-6-astra": "Too expensive for simple, repetitive answers.",
    },
  },
  "legal-docs": {
    title: "Legal contract analysis",
    story:
      "A law firm wants to analyze 300-page contracts and detect risky clauses. One mistake can cost millions.",
    explainSimple:
      "Choose a careful model and always have a legal professional review the results.",
    explainTech:
      "Fable, Opus, Astra or Argon with high; Mistral Large 3 has no adjustable effort when EU hosting matters most.",
    notes: {
      "claude-fable-5-1":
        "Reinforced safeguards and deep thinking, not a substitute for legal review.",
      "claude-opus-5-5": "Long, careful analysis at a lower price than Fable.",
      "gpt-6-astra": "Flagship reasoning; beware the higher long-input rate.",
      "gemini-4-argon": "Large context (text readable at once) for long contracts.",
      "mistral-large-3": "EU hosting or self-hosting; no effort setting.",
      "gpt-6-luna": "A fast model may miss subtle, high-stakes clauses.",
    },
  },
  "code-gen": {
    title: "Complex code generation",
    story:
      "Your team wants an assistant that refactors entire modules and fixes subtle bugs in a 15-year-old codebase.",
    explainSimple: "Hard code benefits from capable models and deep thinking.",
    explainTech:
      "Sonnet 5.5 or GPT-6.1 Sol with high; DeepSeek V4 Pro, Qwen3.8 27B and Devstral 2 are alternatives.",
    notes: {
      "claude-sonnet-5-5": "Good compromise for multi-file edits and reasoning about bugs.",
      "gpt-6-sol": "Code and agents (autonomous actions) at a mid-range price.",
      "deepseek-v4-pro": "Off-peak budget alternative; check where data is hosted.",
      "qwen3-8-27b": "Excellent code for 27B parameters (internal settings), self-hostable.",
      "devstral-2": "Specialized code agent; no effort setting.",
      "ministral-3-8b": "8B parameters (internal settings): too limited for this complexity.",
    },
  },
  "realtime-summary": {
    title: "Real-time summaries",
    story:
      "A news app summarizes every article in 3 sentences, on the fly, for millions of readers. Latency (delay before the answer) must stay under one second.",
    explainSimple:
      "A small fast model often suffices; measure actual speed, never infer a guarantee from a rating.",
    explainTech:
      "Luna or Haiku with none; Flash-Lite requires low. Latency (response delay) also depends on the service and volume.",
    notes: {
      "gpt-6-luna": "Low price and no thinking for three simple sentences.",
      "claude-haiku-5-5": "Same price as Luna, 1M context and direct answers.",
      "mistral-small-4": "Fast and hosted in the EU.",
      "command-r": "Economical for document summaries.",
      "gemini-3-5-flash-lite": "Large context, but mandatory minimal thinking and pricier output.",
      "claude-opus-5-5": "Expensive deep thinking is unnecessary for a simple summary.",
    },
  },
  "health-eu": {
    title: "European health data",
    story:
      "A French hospital wants an assistant to pre-fill medical reports. Patient data must never leave the European Union.",
    explainSimple: "Choose an EU deployment, then validate health and security requirements.",
    explainTech:
      "Mistral Large 3: Apache 2.0 and EU hosting. Self-hosting (your own servers) is possible; it does not automatically guarantee GDPR (data protection) compliance.",
    notes: {
      "mistral-large-3": "EU hosting or self-hosted Apache 2.0 weights; safeguard health data.",
      "llama-4-5-maverick":
        "On the hospital’s EU servers, with suitable infrastructure and licensing.",
      "mistral-small-4": "Budget EU option, with medical review of reports.",
      "mistral-medium-3-5": "EU deployment; check the modified MIT license for self-hosting.",
      "qwen3-8-max": "Singapore API: does not meet the requirement to remain in the EU.",
      "deepseek-v4-pro": "China-hosted API; only locally deployed weights change this risk.",
    },
  },
  "video-analysis": {
    title: "Video analysis",
    story:
      "A training platform wants to automatically index thousands of hours of course videos: transcription, chapters, quizzes.",
    explainSimple:
      "In this range, Gemini reads video and audio directly; other models need preprocessing.",
    explainTech:
      "Gemini is the only family to ingest video and audio natively in the range compared here. GPT-6 and Claude: text and image only, requiring upstream transcription and extracted frames.",
    notes: {
      "gemini-4-argon": "Native video and audio in the compared range, 1,048K context.",
      "gemini-3-8-flash": "Native video at a lower price for simple chaptering.",
      "gemini-3-5-flash-lite": "Native video for simple triage; thinking levels need confirmation.",
      "gpt-6-sol": "Possible after audio transcription and frame extraction (preprocessing).",
      "claude-opus-5-5": "Without preprocessing, text and image only: no native video or audio.",
      "deepseek-v4-1-flash": "Text only in this catalogue: cannot see or hear the courses.",
    },
  },
  "math-olympics": {
    title: "Competition-level math tutor",
    story:
      "An EdTech startup wants a tutor that solves olympiad-level math problems, on a very tight budget.",
    explainSimple:
      "DeepSeek V4 Pro remains a budget pick, with pricier alternatives from OpenAI and Anthropic.",
    explainTech: "High effort for hard problems; also compare peak pricing and hosting location.",
    notes: {
      "deepseek-v4-pro":
        "Budget reasoning at $0.66/1.98 off-peak; rates double during peak windows.",
      "gpt-6-sol": "Code and reasoning alternative at $2/10, more expensive.",
      "claude-sonnet-5-5": "Reasoning alternative at $2/10, with adaptive thinking.",
      "qwen3-8-max": "Multilingual alternative at $2/6, Singapore-hosted API.",
      "mistral-small-4": "Too limited for multi-step competition problems.",
    },
  },
  "on-device": {
    title: "Offline phone app",
    story:
      "You're building a notes app that must summarize text with no internet connection, directly on the user's device.",
    explainSimple:
      "You need downloadable weights and enough memory: Ministral 3 8B is the lightest candidate here.",
    explainTech:
      "Quantization (weight compression) and device testing are essential; 8B does not guarantee execution on every phone.",
    notes: {
      "ministral-3-8b":
        "8B, Apache 2.0: the lightest candidate; test memory and compression on the phone.",
      "mistral-small-4": "Open weights: an alternative only if available memory is sufficient.",
      "qwen3-8-27b":
        "27B: possible on a very powerful device after compression, not on every phone.",
      "llama-4-5-maverick": "400B total: unrealistic on a phone despite 17B active parameters.",
      "gemini-3-8-flash": "Remote API: without a connection, no answer.",
    },
  },
};

export const EN_EFFORTS = {
  none: {
    label: "None",
    simple: "Direct, instant answer. Perfect for simple tasks.",
    tech: "No reasoning chain (the model's internal thinking before answering): minimal latency, base cost.",
  },
  low: {
    label: "Low",
    simple: "The model 'thinks' a little before answering.",
    tech: "Short reasoning budget: +30% output tokens on average.",
  },
  medium: {
    label: "Medium",
    simple: "Good compromise for multi-step problems.",
    tech: "Intermediate reasoning: about 2x output tokens (produced text), noticeably higher latency.",
  },
  high: {
    label: "High",
    simple: "Deep thinking: slower and pricier, but far more reliable on hard problems.",
    tech: "Maximal reasoning budget: up to 4x output tokens (produced text), several extra seconds of latency.",
  },
} as const;

export const EN_TIER_LABELS = {
  fast: "Fast / budget",
  balanced: "Balanced",
  flagship: "Flagship",
} as const;

export const EN_VERDICT_LABELS = {
  ideal: "Ideal choice",
  valid: "Valid alternative",
  risky: "Not recommended",
} as const;

export const EN_GLOSSARY: Record<string, string> = {
  effort: "reasoning effort (the model's internal thinking time before answering)",
  openWeights: "open weights (freely downloadable model weights, self-hosting possible)",
  context: "context window (maximum amount of text the model can read at once)",
  latency: "latency (delay between the question and the answer)",
  token: "token (piece of text, the billing unit: about 0.75 word)",
  rgpd: "GDPR (European regulation on personal data protection)",
  multimodal: "multimodal (able to read text, images, audio or video)",
  rag: "RAG (retrieval-augmented generation: the model draws from your documents before answering)",
  finetuning: "fine-tuning (specialized re-training of the model on your data)",
  selfhost: "self-hosting (running the model on your own servers)",
};

export const EN_LEVELS: Record<
  number,
  {
    name: string;
    tagline: string;
    questions: { prompt: string; options: string[]; simple: string; tech: string }[];
  }
> = {
  1: {
    name: "The provider",
    tagline: "Each supplier has its personality",
    questions: [
      {
        prompt: "You need to analyze hours of training video. Which provider has a decisive edge?",
        options: ["OpenAI", "Google (Gemini)", "DeepSeek", "Meta (Llama)"],
        simple: "Gemini natively understands video and audio: that's its superpower.",
        tech: "Gemini is the only family to ingest video and audio natively in the range compared here, without external preprocessing.",
      },
      {
        prompt: "French health data must never leave the EU. The simplest pick?",
        options: ["OpenAI", "DeepSeek", "Mistral AI", "Google"],
        simple: "Mistral is French and hosts in Europe: compliance becomes simple.",
        tech: "Mistral Large 3: EU hosting and self-hostable Apache 2.0 weights. Health and security requirements still need validation.",
      },
      {
        prompt:
          "You want the best possible reasoning at a low price, with no compliance constraint.",
        options: ["DeepSeek", "Anthropic", "Meta (Llama)", "Mistral AI"],
        simple: "DeepSeek offers high-level reasoning for a fraction of the others' price.",
        tech: "DeepSeek V4 Pro: $0.66/1.98 off-peak, high effort; rates double during peak hours.",
      },
    ],
  },
  2: {
    name: "The model",
    tagline: "Small and fast, or big and powerful?",
    questions: [
      {
        prompt: "50,000 simple questions a day on customer support. Which type of model?",
        options: ["Flagship, to be safe", "Small fast model", "The biggest context possible"],
        simple: "Simple questions don't need a big brain: a small model costs 10 to 50x less.",
        tech: "Simple tasks + high volume = GPT-6 Luna, Claude Haiku 5.5 or Mistral Small 4, none effort.",
      },
      {
        prompt: "Detect risky clauses in 300-page contracts, with zero room for error.",
        options: ["Small fast model", "Mid-size model", "Top-tier flagship"],
        simple: "When a mistake costs millions, take the best model available.",
        tech: "Flagship + large context window (amount of text readable at once): cost is negligible versus legal risk.",
      },
      {
        prompt: "Summarize news articles in 3 sentences, on the fly, for millions of readers.",
        options: ["Flagship", "Small fast model", "Reasoning model"],
        simple:
          "Summarizing is easy: a small fast model is largely enough and holds latency (response delay).",
        tech: "Latency < 1s + massive volume: 'fast' model. Reasoning adds nothing to a simple summary.",
      },
    ],
  },
  3: {
    name: "The effort",
    tagline: "Make the model think… or not",
    questions: [
      {
        prompt:
          "What happens when you raise the reasoning effort (the model's internal thinking time)?",
        options: [
          "Quality ↑, cost ↑, latency ↑",
          "Quality ↑, cost ↓, latency ↓",
          "Quality ↓, cost ↑, latency ↑",
        ],
        simple: "Making the model think improves quality, but costs more and takes longer.",
        tech: "Reasoning generates internal tokens (pieces of thinking text): +cost, +latency, +reliability on hard tasks.",
      },
      {
        prompt: "GPT-6 Luna replies 'hello, what is your order number?'. Recommended effort?",
        options: ["High", "Medium", "None"],
        simple: "For simple, scripted answers, reasoning is pure waste.",
        tech: "'none' effort: minimal latency, base cost. Reasoning adds nothing to direct answers.",
      },
      {
        prompt: "Solve an olympiad-level math problem. Recommended effort?",
        options: ["None", "Low", "High"],
        simple: "Very hard problems demand deep thinking: that's where high effort shines.",
        tech: "Hard math/code: 'high' effort drastically improves the success rate.",
      },
    ],
  },
  4: {
    name: "The full combo",
    tagline: "Provider + model + effort, all at once",
    questions: [
      {
        prompt:
          "Code assistant to refactor a 15-year-old codebase. Best combo among these options?",
        options: [
          "Mistral Small 4, no effort",
          "Claude Sonnet 5.5 or GPT-6.1 Sol, high effort",
          "Ministral 3 8B, no effort",
        ],
        simple:
          "Hard code needs an excellent model with plenty of thinking. One avoided bug pays for the extra cost.",
        tech: "Flagship or reasoning + 'high' effort: chain of thought (step-by-step internal reasoning) excels at code.",
      },
      {
        prompt:
          "Offline mobile app that summarizes notes. Which combo can run locally among these options?",
        options: [
          "GPT-6 Astra, medium effort",
          "Gemini 3.8 Flash, low effort",
          "Ministral 3 8B open weights (downloadable weights), no effort",
        ],
        simple:
          "Without internet, you need a downloadable model that runs on the device: a small open model.",
        tech: "Ministral 3 8B, Apache 2.0; test quantization (compression) and available memory on the phone.",
      },
      {
        prompt:
          "Index thousands of hours of course videos without preprocessing. The winning combo?",
        options: [
          "Gemini 4 Argon, medium effort",
          "Claude Haiku 5.5, high effort",
          "DeepSeek V4.1 Flash, low effort",
        ],
        simple:
          "Gemini reads video natively: no conversion, no fragile pipeline. Medium effort for good chaptering.",
        tech: "Gemini 4 Argon reads video and audio natively in the range compared here. Medium effort for chaptering.",
      },
    ],
  },
};
