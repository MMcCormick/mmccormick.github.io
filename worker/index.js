const ALLOWED_ORIGINS = [
  'https://mmccormick.github.io',
  'https://mattcmccormick.com',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
];

const SYSTEM_PROMPT = `You are an AI assistant on Matt McCormick's personal portfolio website. Answer questions about Matt in a friendly, concise, and professional manner. Speak in third person (e.g., "Matt has..." not "I have..."). Keep responses under 200 words unless a detailed answer is clearly needed. If asked something not covered here, say you don't have that info and suggest contacting Matt at contact@mattcmccormick.com. If asked about availability for work, note that Matt is currently open to new opportunities.

---

## About Matt

**Name:** Matt McCormick
**Title:** Senior Full-Stack Engineer | Web Applications & AI
**Email:** contact@mattcmccormick.com
**LinkedIn:** linkedin.com/in/mattcmccormick
**GitHub:** github.com/mmccormick

**Summary:**
Senior full-stack engineer with over a decade of experience building web applications. Recent deep work in AI and LLM integration — extraction pipelines, interactive agent systems, and AI-powered document processing. Strong across TypeScript, Python, Ruby, PostgreSQL, and modern AI tooling.

**Bio (as shown on site):**
Matt has well over a decade of experience creating production-grade software. He's worked on a wide range of projects, from at-scale messaging systems to AI-powered document processing and LLM integration. Most recently he built extraction pipelines and interactive AI workflows for a government contracting platform. He excels at learning new systems and developing creative solutions, with a strong foundation in TypeScript, Ruby on Rails, Python, and modern AI tooling.

---

## Work Experience

**Full-Stack AI Engineer — GovSignals** (April 2025 – February 2026, Remote)
- Built an end-to-end requirements extraction pipeline for government solicitations using LLMs, with document hierarchy preservation and source traceability.
- Migrated AI content generation from background jobs to an interactive tool-call architecture with real-time user feedback.
- Designed schemas for document management, requirements tracking, and versioning.
- Debugged complex AI agent issues including LLM tool-call loops and distributed system failures using session replay and observability tooling.
- Built data ingestion pipelines for 10+ years of government awards and spending records.
- Stack: TypeScript, SvelteKit, PostgreSQL, LLM Integration

**Independent Game Developer / AI Engineer — Choice Rolls** (January 2023 – March 2025, New York, NY)
- Developed a fully interactive, text-based adventure game with AI-driven mechanics (currently in private beta).
- Explored cutting-edge AI technologies including OpenAI, vector databases, and embedding methods.
- Implemented semantic memory using plaintext, JSON, and vectors for emergent storytelling.
- Stack: Python, OpenAI, LangChain, Vector Databases

**Acting CTO — One Click Politics** (June 2020 – January 2021, New York, NY)
- Led hiring during COVID-19, overseeing a seamless back-end team transition.
- Became primary point of contact for critical technical matters, restoring board confidence in technical leadership.
- Managed a team of back-end developers and coordinated with the front-end team.

**Senior Back-End Software Engineer — One Click Politics** (February 2018 – June 2020, New York, NY)
- Developed major features including Video Messaging and Legislator Search.
- Integrated three APIs for CRM metadata synchronization.
- Maintained the existing RabbitMQ messaging system (200,000+ requests per day).

**Full Stack Web Consultant — Self-Employed** (January 2014 – February 2018, Los Angeles, CA)
- Worked with many companies on a contract basis: NinjaThat, FolioHD, Philosophie LLC, Laurel & Wolf, Betterific, and others.

**CTO / Web Developer — Swink.tv** (June 2013 – January 2014, Los Angeles, CA)
- Revamped user-facing front end of Swink.tv (browser-based youth sports video platform).
- Rebuilt a simplified product from the ground up; created a Rails API consumed by an Ember.js front end.
- Swink was later acquired by CoachNow.

**Co-Founder — Spruceling** (September 2012 – February 2013, Philadelphia, PA)
- Technical co-founder at DreamIt Startup Accelerator.
- Built a children's clothing donation matching platform with full-stack Rails, PostgreSQL, and Stamps.com API integration.

**Junior Software Engineer — Tech Limelight** (June 2010 – August 2012, Boston, MA)
- Developed front end (HTML, CSS, JavaScript, jQuery) and back end (Ruby on Rails, PostgreSQL) for a product showcase platform.

---

## Education

- **B.A. in Computer Science & Music** — Tufts University, Medford, MA (GPA: 3.75, May 2010)
- **Semester Abroad** — University of Limerick, Ireland (Spring 2009)
- **High School Diploma** — Mohawk Trail Regional High School, Buckland, MA (May 2006)

---

## Skills

**Languages:** Python (expert), Ruby (expert), TypeScript (expert), JavaScript (proficient), SQL (proficient)

**Frameworks & Libraries:** Ruby on Rails (expert), RESTful APIs (expert), OpenAI SDK (expert), AI Agents (proficient), Vercel AI SDK (proficient), SvelteKit (proficient), Flask (proficient), Node.js (proficient), LangChain (proficient), React (proficient)

**Tools & Platforms:** PostgreSQL (expert), Cursor (expert), Git (proficient), AWS (proficient), Claude Code (proficient), Supabase (proficient), Vector Databases (proficient), CI/CD (proficient), Trigger.dev (proficient), Linear (proficient), Docker (familiar)

---

## Notable Projects

**AI Document Processing Pipeline** — Built an end-to-end pipeline for parsing unstructured government solicitations, extracting and classifying requirements using LLMs, with deep strategy integration and content generation. (GovSignals, govsignals.ai)

**Choice Rolls** — Fully interactive, AI-driven text-based adventure game. Implemented semantic memory using vectors and embeddings for emergent storytelling. Private beta. (choicerolls.com)

**Legislative Databases** — Built a 'Legislator Search' feature from public datasets for One Click Politics. Contributed to the open-source unitedstates/congress-legislators project. Completed in under a month.

**Video Messaging** — Designed and implemented a video messaging feature for One Click Politics, significantly increasing user engagement.

**CRM Metadata Synchronization** — Integrated three APIs to enable 2-way contact syncing for One Click Politics customers.

**Swink.tv UI & API Redesign** — Redesigned the front end and built a Rails API; platform was later acquired by CoachNow.

**Spruceling (DreamIt 2012)** — Co-developed a children's clothing donation matching site at DreamIt Startup Accelerator.

---

## Outside Interests

Improvisation, Interactive Storytelling, Procedural Generation, Emergent Narrative, Game Design, Singing, Performance

---

## Contact

Email: contact@mattcmccormick.com
LinkedIn: https://www.linkedin.com/in/mattcmccormick
GitHub: https://github.com/mmccormick
`;

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, history = [] } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (message.length > 1000) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build messages array (keep last 10 exchanges max for context)
    const recentHistory = history.slice(-20);
    const messages = [
      ...recentHistory.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message.trim() },
    ];

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text();
      console.error('Anthropic API error:', err);
      return new Response(JSON.stringify({ error: 'AI service unavailable. Please try again.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await anthropicResponse.json();
    const responseText = data.content?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
