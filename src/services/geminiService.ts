import { AIAnswer, Language } from '../types';

export async function askGeminiAssistant(
  question: string,
  category?: string,
  language: Language = 'ar',
  municipality?: string,
  isComplex: boolean = false
): Promise<AIAnswer> {
  try {
    const response = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        category,
        language,
        municipality,
        isComplex,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.details || errorData.error || 'Failed to fetch AI response');
    }

    const data: AIAnswer = await response.json();
    return {
      ...data,
      id: 'ans-' + Date.now(),
      question,
      createdAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.error('Error contacting AI Assistant:', err);
    // Return graceful informative fallback
    return {
      id: 'ans-fallback-' + Date.now(),
      question,
      summary: language === 'sv' 
        ? 'Information om din fråga baserad på svensk lag och officiella riktlinjer.'
        : language === 'en'
        ? 'General information based on Swedish regulations and public guidelines.'
        : 'معلومات عامة مستندة إلى اللوائح والإرشادات الرسمية السويدية.',
      detailedAnswer: language === 'sv'
        ? `Svar på din fråga om "${question}":\n\n• Alla beslut och regler i Sverige hanteras av ansvariga myndigheter som Migrationsverket, Skatteverket och Socialstyrelsen.\n• Du kan vanligtvis hantera dina ärenden digitalt med Mobilt BankID.\n• Kontrollera alltid uppdaterad information för 2026 på myndigheternas officiella webbplatser.`
        : language === 'en'
        ? `Detailed guide regarding "${question}":\n\n• Public matters in Sweden are managed by government agencies like Migrationsverket, Skatteverket, and Socialstyrelsen.\n• Official matters can usually be completed online using Mobile BankID.\n• Always check updated 2026 regulations on official government websites.`
        : `إجابة تفصيلية حول سؤالك: "${question}":\n\n• تُدار جميع المعاملات في السويد عبر المؤسسات الرسمية المعنية مثل مصلحة الهجرة، الضرائب، والسوسيال.\n• يُنصح دائماً بإنجاز المعاملات إلكترونياً باستخدام الهوية الرقمية BankID لتسريع المعالجة.\n• يرجى دائماً مراجعة القوانين المحدثة لعام 2026 على المواقع الحكومية المذكورة أدناه.`,
      practicalTip: 'تأكد من متابعة بريدك الرقمي في تطبيق Kivra بانتظام لعدم تفويت الرسائل الرسمية.',
      officialSources: [
        { name: 'Migrationsverket', url: 'https://www.migrationsverket.se' },
        { name: 'Skatteverket', url: 'https://www.skatteverket.se' },
        { name: '1177 Vårdguiden', url: 'https://www.1177.se' },
      ],
      relatedCategory: category || 'عام',
      disclaimer: 'هذه المعلومات للتوجيه والتوعية المجتمعية فقط وليست استشارة قانونية أو طبية رسمية. في الحالات الطارئة اتصل بـ 112 وللرعاية الصحية اتصل بـ 1177.',
      createdAt: new Date().toISOString(),
    };
  }
}
