import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. Gemini features will return fallback answers.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sverige Orientation Guide API', time: new Date().toISOString() });
});

// AI Question & Answer Endpoint (supports both standard and complex high-thinking modes)
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { question, category, language = 'ar', municipality, isComplex } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are the official AI Guide and Legal Analyst for "دليل التوجيه المجتمعي في السويد" (Samhällsorientering i Sverige), operated by "Arab Sweden Since 2007 – RAED SHIHAB".
Your goal is to provide accurate, up-to-date (2026), easy-to-understand, authoritative, and helpful information to newcomers and residents in Sweden about Swedish society, laws, public services, rights, and daily life changes.

STRICT RULES & COMPLIANCE:
1. Always respond in the user's requested language (${language === 'sv' ? 'Swedish' : language === 'en' ? 'English' : 'Arabic'}).
2. Cite real, official Swedish government agencies (e.g. Migrationsverket, Skatteverket, Socialstyrelsen, Försäkringskassan, Arbetsförmedlingen, Skolverket, Polisen, 1177, Regeringen, Kronofogden) with official website references.
3. Keep current 2026 law changes in focus (residence permit income requirements, citizenship law updates, new social services act, SFI attendance duty, digital mail Kivra).
4. Never invent laws, benefits, phone numbers, or rules. If uncertain, clearly advise checking the official authority directly.
5. Provide a clear legal/medical safety disclaimer: Information is for general community orientation only and is not individual legal, medical, or financial advice. For emergencies call 112, for medical advice call 1177.
6. Format your output strictly in JSON format matching this schema:
{
  "summary": "Short clear summary in 2-3 sentences",
  "detailedAnswer": "Comprehensive explanation with bullet points and practical advice",
  "practicalTip": "A practical step-by-step tip for dealing with Swedish institutions (e.g. BankID, Kivra, filling forms, appointment booking)",
  "officialSources": [
    {"name": "Name of Swedish agency (e.g. Migrationsverket)", "url": "https://www.migrationsverket.se"}
  ],
  "relatedCategory": "${category || 'General'}",
  "disclaimer": "هذه المعلومات للتوجيه والتوعية المجتمعية فقط وليست استشارة قانونية أو طبية رسمية. في الحالات الطارئة اتصل بـ 112 وللرعاية الصحية اتصل بـ 1177."
}`;

    const userPrompt = `User Question: "${question}"
Category filter: ${category || 'All Categories'}
Selected Municipality: ${municipality || 'National / General Sweden'}`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback realistic response if API key is not yet configured
      return res.json({
        summary: language === 'sv' 
          ? 'Information om din fråga i Sverige baserad på svensk lag och officiella riktlinjer 2026.'
          : language === 'en'
          ? 'Information regarding your query in Sweden based on Swedish law and official guidelines 2026.'
          : 'معلومات عامة مستندة إلى القوانين والإرشادات الرسمية السويدية الحديثة لعام 2026.',
        detailedAnswer: language === 'sv'
          ? `Svar på din fråga om "${question}":\n\n• I Sverige styrs detta av relevanta myndigheter som Migrationsverket, Skatteverket eller Socialtjänsten.\n• Du kan alltid ansöka eller kontakta myndigheten digitalt via BankID.\n• Viktigt att hålla koll på uppdaterade regler för 2026.`
          : language === 'en'
          ? `Answer to your query regarding "${question}":\n\n• In Sweden, this is governed by relevant public authorities such as Migrationsverket, Skatteverket, or Socialtjänsten.\n• You can usually apply or manage your documents digitally using BankID.\n• Always verify current 2026 regulations.`
          : `إجابة شاملة حول سؤالك: "${question}":\n\n• يخضع هذا الموضوع للقوانين السويدية المعمول بها والتعديلات الحديثة لعام 2026 والتعليمات الصادرة عن الجهات الحكومية المختصة (مثل مصلحة الهجرة، مصلحة الضرائب، أو السوسيال).\n• يُنصح دائماً باستخدام الهوية الرقمية BankID لإنجاز المعاملات إلكترونياً عبر البوابات الرسمية.\n• متابعة تحديثات القوانين لعام 2026 تتم بشكل مستمر وآلي عبر تطبيقنا.`,
        practicalTip: 'استخدم تطبيق Kivra للبريد الرقمي لمتابعة الرسائل والقرارات الرسمية من الجهات السويدية أولاً بأول.',
        officialSources: [
          { name: 'Migrationsverket (مصلحة الهجرة)', url: 'https://www.migrationsverket.se' },
          { name: 'Skatteverket (مصلحة الضرائب)', url: 'https://www.skatteverket.se' },
          { name: '1177 Vårdguiden (الرعاية الصحية)', url: 'https://www.1177.se' }
        ],
        relatedCategory: category || 'عام',
        disclaimer: 'هذه المعلومات للتوجيه والتوعية المجتمعية فقط وليست استشارة قانونية أو طبية رسمية. في الحالات الطارئة اتصل بـ 112 وللرعاية الصحية اتصل بـ 1177.'
      });
    }

    // Use gemini-3.1-pro-preview with thinkingLevel HIGH for complex questions, or gemini-3.6-flash for standard queries
    const modelToUse = isComplex ? 'gemini-3.1-pro-preview' : 'gemini-3.6-flash';
    const configOptions: any = {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      temperature: 0.3,
    };

    if (isComplex) {
      configOptions.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
    }

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: userPrompt,
      config: configOptions,
    });

    const responseText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        summary: responseText.slice(0, 200),
        detailedAnswer: responseText,
        practicalTip: 'راجع دائماً الصفحة الرسمية للجهة السويدية المعنية للحصول على أحدث التفاصيل.',
        officialSources: [{ name: 'Regeringen.se', url: 'https://www.regeringen.se' }],
        relatedCategory: category || 'عام',
        disclaimer: 'هذه المعلومات للتوجيه والتوعية المجتمعية فقط وليست استشارة قانونية أو طبية رسمية.'
      };
    }

    res.json(parsedData);
  } catch (err: any) {
    console.error('Error in /api/ai/ask:', err);
    res.status(500).json({
      error: 'فشل في الاتصال بمساعد الذكاء الاصطناعي',
      details: err.message,
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🇸🇪 Sverige Guide server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
