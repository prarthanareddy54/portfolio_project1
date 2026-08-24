import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Groq client
const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

// Default to Qwen 3.6 27b as requested, with fallback configuration
const DEFAULT_MODEL = process.env.GROQ_MODEL || 'qwen/qwen3.6-27b';

/**
 * In-Memory Knowledge Base for RAG (Ingested directly from portfolio content)
 */
const PORTFOLIO_KNOWLEDGE_BASE = [
  {
    id: 'personal-bio',
    category: 'Bio & Overview',
    keywords: ['prarthana', 'reddy', 'about', 'who', 'role', 'title', 'location', 'summary', 'background'],
    content: `PRARTHANA REDDY is an AI/ML Developer and Full-Stack Web Developer based in Gangavathi, Karnataka, India.
Graduating with a Bachelor of Computer Applications (BCA) in 2026 from KLE College.
Summary: Motivated BCA graduate with a solid foundation in Artificial Intelligence, Machine Learning, and Web Development. Passionate about solving complex data problems and building scalable software solutions. Hands-on experience developing custom NLP models and predictive analytics pipelines using Python. Eager to leverage technical skills in an entry-level AI/ML Developer role.
Philosophies:
1. Algorithmic Precision: Writing optimized, clean code that values computational efficiency and mathematical soundness.
2. End-to-End Scalability: Bridging standalone ML models and production-ready web APIs with robust backend architectures.
3. User-Centric Architecture: Creating lightning-fast web interfaces (sub-1.2s load times) that make complex data intuitive.`,
  },
  {
    id: 'project-grok-nlp',
    category: 'Project: Custom Grok-Inspired AI NLP Model',
    keywords: ['grok', 'nlp', 'model', 'tokenization', 'natural language', 'regex', 'text normalization', 'context retrieval', 'semantic evaluation'],
    content: `Project 1: Custom Grok-Inspired AI NLP Model
- Tagline: Custom Python Language Processing Model for Context Retrieval
- Category: AI / Machine Learning (NLP Architecture)
- Tech Stack: Python, NLP, Custom Tokenization, Text Normalization, Semantic Evaluation, Regex.
- Workflow & Architecture:
  1. Engineered a custom AI language processing model in Python to optimize context retrieval and query execution.
  2. Implemented tokenization, text normalization, and semantic evaluation pipelines to process 10,000+ text data points efficiently.
  3. Fine-tuned hyperparameters to improve response relevance and accurate keyword match rates by +28%.
- Metrics: 10,000+ data points processed, +28% keyword match accuracy boost.`,
  },
  {
    id: 'project-ml-pipeline',
    category: 'Project: ML Predictive Analytics Pipeline',
    keywords: ['predictive', 'analytics', 'pipeline', 'scikit-learn', 'classification', 'machine learning', 'etl', 'pandas', 'numpy', 'accuracy'],
    content: `Project 2: ML Predictive Analytics Pipeline
- Tagline: End-to-End Machine Learning Classification & Automated ETL Pipeline
- Category: Data Science & ML
- Tech Stack: Python, Scikit-Learn, Pandas, NumPy, ETL Pipelines, Feature Engineering.
- Workflow & Architecture:
  1. Developed an end-to-end machine learning pipeline using Python and Scikit-Learn to process, clean, and model complex datasets.
  2. Executed feature engineering and applied classification algorithms, achieving an overall prediction accuracy rate of 92%.
  3. Built automated ETL scripting and dynamic pipeline architectures that reduced data preprocessing overhead by 35%.
- Metrics: 92% prediction accuracy, -35% ETL preprocessing overhead reduction.`,
  },
  {
    id: 'project-portfolio-website',
    category: 'Project: Interactive UI/UX Portfolio Website',
    keywords: ['portfolio', 'website', 'react', 'node', 'express', 'supabase', 'postgresql', 'lighthouse', 'load time', 'frontend'],
    content: `Project 3: Interactive UI/UX Portfolio Website & Full-Stack System
- Tagline: High-Performance, Sub-1.2s Load Time Portfolio & Full-Stack System
- Category: Web Development
- Tech Stack: React.js (Vite), Node.js, Express.js, Supabase, PostgreSQL, Vanilla CSS3, Helmet, Rate Limiting.
- Workflow & Architecture:
  1. Built a responsive full-stack portfolio web application utilizing React and Node.js REST API to showcase software projects and ML workflows.
  2. Integrated Supabase PostgreSQL database for persistent contact inquiries with server-side validation.
  3. Optimized web assets and script bundling to achieve a sub-1.2 second page load time and a 98/100 Google Lighthouse performance score.
- Metrics: 98/100 Lighthouse score, < 1.2s page load time, React + Express + Supabase architecture.`,
  },
  {
    id: 'skills-overview',
    category: 'Technical Skills & Proficiencies',
    keywords: ['skills', 'python', 'javascript', 'html', 'css', 'react', 'node', 'express', 'sql', 'supabase', 'git', 'tools', 'scikit-learn', 'ml'],
    content: `Technical Skills Matrix for Prarthana Reddy:
- Programming Languages: Python (Advanced - NLP, ML, ETL, Algorithms), JavaScript (Proficient - ES6+, Async/Await, React, Node.js), HTML5 (Expert - Semantic Web, Accessibility), CSS3 (Expert - Responsive Design, Grid, Flexbox, Micro-animations).
- AI/ML & Data Science: Machine Learning (Supervised, Classification, Regression), NLP (Tokenization, Text Normalization, Semantic Matching), Scikit-Learn (Pipelines, Feature Engineering, Hyperparameter Tuning), Predictive Modeling (Time-Series, Classification 92% accuracy).
- Full-Stack Web Development: Frontend Development (React.js, Component Architecture, State Management), Backend Development (Node.js, Express.js REST APIs, CORS, Helmet, Rate Limiting), Databases (Supabase & PostgreSQL, RLS Policies, SQL Queries), UI/UX (Visual Hierarchy, Performance Optimization, Sub-1.2s load).
- Developer Tools: Git, GitHub, VS Code, npm, Vite, Postman, Render Cloud Deployment.`,
  },
  {
    id: 'education-certifications',
    category: 'Education & Certifications',
    keywords: ['education', 'college', 'degree', 'bca', 'kle', 'certifications', 'genai', 'coursework', 'graduation', 'qualifications'],
    content: `Education & Professional Certifications:
- Degree: Bachelor of Computer Applications (BCA) at KLE College, Gangavathi, Karnataka (Graduation Year: 2026).
  - Coursework: Data Structures & Algorithms, DBMS, OOP, Artificial Intelligence, Machine Learning, Full-Stack Web Systems.
- Certifications:
  1. Machine Learning & Frontend Development Certificate (2025) - Supervised Learning, Model Evaluation, Component Architecture.
  2. Generative AI (GenAI) Fundamentals (2025) - LLMs, Prompt Engineering, NLP Foundations, Contextual Embeddings.
  3. Professional UI/UX Design Certificate (2024) - User Flows, Design Systems, Responsive Micro-Interactions.`,
  },
  {
    id: 'contact-details',
    category: 'Contact & Social Links',
    keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'linkedin', 'github', 'message', 'collaborate', 'location'],
    content: `Contact Information for Prarthana Reddy:
- Email: prarthanareddy54@gmail.com
- Phone: +91 9482164328
- Location: Gangavathi, Karnataka, India
- LinkedIn: https://linkedin.com/in/prarthana-reddy-02a602377/
- GitHub: https://github.com/prarthanareddy54
- Contact Form: Visitors can send a direct message on the portfolio's /contact page which securely records messages to Supabase PostgreSQL.`,
  },
  {
    id: 'ui-navigation',
    category: 'Portfolio UI Navigation & Structure',
    keywords: ['pages', 'navigation', 'ui', 'sections', 'home', 'about', 'projects', 'skills', 'resume', 'contact'],
    content: `Portfolio Website UI Structure and Navigation:
- Home (/) - Hero presentation, key highlights, core philosophies, quick statistics.
- About (/about) - Extended biography, education details, career objective, and industry philosophies.
- Skills (/skills) - Categorized skills matrix with proficiency badges, category filters, and practical tags.
- Projects (/projects) - Interactive project gallery showcasing NLP Model, ML Predictive Pipeline, and Portfolio System with metrics and GitHub links.
- Contact (/contact) - Interactive glassmorphism form with live Supabase integration, field validation, and celebration confetti.
- Resume (/resume) - Embedded high-fidelity PDF resume viewer with instant download options.`,
  },
];

/**
 * Lightweight RAG Semantic Scorer / Retriever
 * Tokenizes the query and computes relevance score across knowledge chunks
 */
export function retrieveContext(query, topK = 3) {
  if (!query || typeof query !== 'string') return '';

  const queryTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (queryTerms.length === 0) {
    // Return bio and projects by default
    return PORTFOLIO_KNOWLEDGE_BASE.slice(0, 3)
      .map((item) => `[${item.category}]\n${item.content}`)
      .join('\n\n');
  }

  const scored = PORTFOLIO_KNOWLEDGE_BASE.map((item) => {
    let score = 0;
    const lowerContent = item.content.toLowerCase();
    const lowerCategory = item.category.toLowerCase();

    queryTerms.forEach((term) => {
      // Keyword match (high weight)
      if (item.keywords.some((k) => k.includes(term) || term.includes(k))) {
        score += 5;
      }
      // Category match
      if (lowerCategory.includes(term)) {
        score += 3;
      }
      // Content occurrence match
      const occurrences = (lowerContent.match(new RegExp(`\\b${term}`, 'g')) || []).length;
      score += Math.min(occurrences, 4);
    });

    return { item, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top K matches (or at least top 2 relevant)
  const topMatches = scored.filter((s) => s.score > 0).slice(0, topK);

  if (topMatches.length === 0) {
    // Fallback to top 2 general items
    return PORTFOLIO_KNOWLEDGE_BASE.slice(0, 2)
      .map((s) => `[${s.category}]\n${s.content}`)
      .join('\n\n');
  }

  return topMatches
    .map((s) => `[${s.item.category}]\n${s.item.content}`)
    .join('\n\n---\n\n');
}

/**
 * Generate Chat Response using Groq API and Grounded RAG Context
 */
export async function generateChatReply({ message, conversationHistory = [] }) {
  // 1. Retrieve grounded portfolio context
  const retrievedKnowledge = retrieveContext(message);

  // 2. Build system instructions
  const systemPrompt = `You are the official, friendly, and highly intelligent AI Portfolio Assistant for Prarthana Reddy.
Your job is to answer visitor questions accurately, concisely, and politely, grounded EXCLUSIVELY in Prarthana Reddy's portfolio information, programming workflows, project details, skills, and UI content provided below.

### PORTFOLIO KNOWLEDGE BASE:
${retrievedKnowledge}

### INSTRUCTIONS & BEHAVIORAL GUIDELINES:
1. Grounding: Answer based ONLY on the provided context about Prarthana Reddy. Never invent degrees, projects, or experiences not mentioned.
2. Tone: Professional, enthusiastic, polite, and concise. Speak positively about Prarthana's abilities in AI/ML (Python, NLP, Scikit-Learn) and Full-Stack Web Development (React, Node.js, Supabase).
3. Formatting: Use concise bullet points and bold text for readability. Keep replies between 2 to 4 concise paragraphs or bullet sets.
4. Call to Action: If a visitor asks how to hire or contact Prarthana, provide her email (prarthanareddy54@gmail.com) and direct them to the /contact page or LinkedIn profile.
5. Out of Scope: If asked general unrelated questions (e.g. general trivia, unrelated code tutorials), politely answer in one brief sentence and steer the conversation back to Prarthana's portfolio, AI projects, or technical skills.`;

  // 3. If Groq API key is not configured, return an informative fallback
  if (!groq) {
    console.warn('⚠️ GROQ_API_KEY is not set in backend/.env. Returning fallback preview response.');
    return {
      reply: `Hello! I am Prarthana Reddy's AI Assistant. Currently, the \`GROQ_API_KEY\` is not configured in \`backend/.env\`, but I can confirm Prarthana specializes in **AI/ML Development** (NLP tokenization & Scikit-Learn pipelines) and **Full-Stack Web Development** (React, Express, Supabase). Feel free to explore the **Projects** and **Contact** pages or reach out to **prarthanareddy54@gmail.com**!`,
      model: DEFAULT_MODEL,
      demoMode: true,
    };
  }

  // 4. Format messages for Groq Chat Completion
  const messages = [
    { role: 'system', content: systemPrompt },
    // Include past 4 messages from history for conversational continuity
    ...conversationHistory.slice(-4).map((msg) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: String(msg.content || ''),
    })),
    { role: 'user', content: message },
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: DEFAULT_MODEL,
      temperature: 0.5,
      max_tokens: 650,
      top_p: 0.9,
    });

    const reply =
      chatCompletion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response. Please try again.";

    return {
      reply,
      model: DEFAULT_MODEL,
      usage: chatCompletion.usage,
      demoMode: false,
    };
  } catch (err) {
    console.error('❌ Groq API Error:', err.message);

    // If specific model is unavailable, try standard fallback model
    if (err.message && err.message.includes('model')) {
      try {
        console.log('🔄 Retrying with fallback model llama-3.3-70b-versatile...');
        const fallbackCompletion = await groq.chat.completions.create({
          messages,
          model: 'llama-3.3-70b-versatile',
          temperature: 0.5,
          max_tokens: 650,
        });

        return {
          reply: fallbackCompletion.choices[0]?.message?.content,
          model: 'llama-3.3-70b-versatile',
          demoMode: false,
        };
      } catch (fallbackErr) {
        console.error('❌ Fallback model also failed:', fallbackErr.message);
      }
    }

    throw new Error(err.message || 'Failed to communicate with Groq AI service.');
  }
}
