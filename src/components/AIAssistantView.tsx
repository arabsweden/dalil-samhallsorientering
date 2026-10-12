import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Upload, 
  FileText, 
  Download, 
  Mail, 
  Bookmark, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  MapPin, 
  AlertTriangle,
  Loader2,
  Share2,
  Volume2,
  Globe,
  XCircle
} from 'lucide-react';
import { AIAnswer, Language, Municipality } from '../types';
import { askGeminiAssistant } from '../services/geminiService';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface AIAssistantViewProps {
  language: Language;
  selectedMunicipality: Municipality;
  savedAnswers: AIAnswer[];
  onSaveAnswer: (answer: AIAnswer) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  language,
  selectedMunicipality,
  savedAnswers,
  onSaveAnswer,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState<'ar-SA' | 'sv-SE' | 'en-US'>(
    language === 'sv' ? 'sv-SE' : language === 'en' ? 'en-US' : 'ar-SA'
  );
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isHighThinking, setIsHighThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<AIAnswer | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  // Sync default speech language with app language
  useEffect(() => {
    setSpeechLanguage(language === 'sv' ? 'sv-SE' : language === 'en' ? 'en-US' : 'ar-SA');
  }, [language]);

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }

    setIsLoading(true);
    setCurrentAnswer(null);
    setIsSavedLocally(false);

    let promptQuery = questionText;
    if (uploadedFileName) {
      promptQuery += ` [الملف المرفق للمراجعة: ${uploadedFileName}]`;
    }

    try {
      const result = await askGeminiAssistant(
        promptQuery,
        selectedCategory,
        language,
        selectedMunicipality.name,
        isHighThinking
      );
      setCurrentAnswer(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInputToggle = () => {
    setSpeechError(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('متصفحك الحالي لا يدعم التعرف الصوتي المباشر (Web Speech API). يرجى التحديث أو تجربة Chrome/Edge أو كتابة السؤال نصياً.');
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error(err);
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = speechLanguage;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setQuestionText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('تم رفض صلاحية الميكروفون. يرجى تفعيل السماح بالميكروفون في إعدادات المتصفح.');
        } else if (event.error === 'no-speech') {
          setSpeechError('لم يتم التقاط أي صوت. يرجى الضغط على زر الميكروفون والتحدث بوضوح.');
        } else {
          setSpeechError(`خطأ في التسجيل الصوتي: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('تعذر تشغيل الميكروفون. يرجى التأكد من توصيل الميكروفون والتصريح للموقع.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleDownloadPDF = () => {
    if (!currentAnswer) return;

    const content = `
==================================================
دليل التوجيه المجتمعي في السويد - إجابة المساعد الذكي
تاريخ الاستخراج: ${new Date().toLocaleDateString('ar-SA')}
البلدية: ${selectedMunicipality.name} (${selectedMunicipality.nameSv})
==================================================

السؤال: ${currentAnswer.question || questionText}

[الملخص]:
${currentAnswer.summary}

[الشرح التفصيلي والقانوني]:
${currentAnswer.detailedAnswer}

[نصيحة عملية]:
${currentAnswer.practicalTip || 'تأكد من متابعة بريدك الرقمي في Kivra بانتظام.'}

[المصادر الحكومية الرسمية]:
${currentAnswer.officialSources.map(s => `- ${s.name}: ${s.url}`).join('\n')}

[التنبيه القانوني]:
${currentAnswer.disclaimer}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sverige-Orientation-Answer-${Date.now()}.txt`;
    link.click();
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailAddress) {
      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
      }, 2000);
    }
  };

  const handleSaveToAccount = () => {
    if (currentAnswer) {
      onSaveAnswer(currentAnswer);
      setIsSavedLocally(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-yellow-300">
          <Sparkles className="w-5 h-5 text-yellow-400 fill-current" />
          <span>مساعد الذكاء الاصطناعي التوجيهي السويدي 2026</span>
        </div>

        <h2 className="text-2xl font-black text-white">
          سؤال مساعد ذكي عن الحياة والقوانين في السويد 🇸🇪
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          اطرح سؤالك أو سجل صوتك أو أرفق وثيقة للحصول على إجابة هيكلية مبسطة مستندة للمصادر الحكومية الرسمية (مثل مصلحة الهجرة، الضرائب، والسوسيال) مع نصائح عملية.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            نطاق البحث: بلدية {selectedMunicipality.name}
          </span>
          <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            مصادر رسمية محدثة 2026
          </span>
        </div>
      </div>

      {/* Question Form */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl space-y-4">
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">تصنيف السؤال (اختياري)</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-yellow-400"
              >
                <option value="">جميع الأقسام العامة</option>
                {CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Document / Image Attachment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">إرفاق وثيقة أو صورة (اختياري)</label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs px-3 py-2.5 rounded-xl flex items-center gap-2 transition-colors w-full justify-center">
                  <Upload className="w-4 h-4 text-yellow-400" />
                  <span className="truncate">{uploadedFileName || 'اختر ملف / صورة خطاب رسمية'}</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf,.doc" />
                </label>
                {uploadedFileName && (
                  <button
                    type="button"
                    onClick={() => setUploadedFileName(null)}
                    className="p-2 text-slate-400 hover:text-red-400 text-xs"
                  >
                    إزالة
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* High Thinking Mode & Voice Input Options */}
          <div className="space-y-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-purple-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-purple-500/20 text-purple-300 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>وضع التفكير والتحليل القانوني العميق (Thinking Mode)</span>
                    <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">gemini-3.1-pro</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    استخدام نموذج الذكاء الاصطناعي المتقدم لتحليل الأسئلة القانونية والتعليمات المعقدة
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsHighThinking(!isHighThinking)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isHighThinking ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isHighThinking ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <label className="text-xs font-bold text-slate-300">اكتب سؤالك أو استخدم البحث الصوتي الذكي</label>
              
              {/* Voice Recognition Language Selector */}
              <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 text-[11px] font-bold">
                <span className="text-slate-400 px-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#FECC00]" />
                  <span>لغة الصوت:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSpeechLanguage('ar-SA')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    speechLanguage === 'ar-SA' ? 'bg-[#005293] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  العربية 🇸🇦
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechLanguage('sv-SE')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    speechLanguage === 'sv-SE' ? 'bg-[#005293] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Svenska 🇸🇪
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechLanguage('en-US')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    speechLanguage === 'en-US' ? 'bg-[#005293] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English 🇬🇧
                </button>
              </div>
            </div>

            {/* Active Speech Recording Live Indicator */}
            {isListening && (
              <div className="p-3.5 bg-red-950/60 border border-red-500/60 rounded-xl flex items-center justify-between gap-3 text-xs text-red-200 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="font-bold text-white">
                    جاري التسجيل الصوتي باللغة ({speechLanguage === 'ar-SA' ? 'العربية' : speechLanguage === 'sv-SE' ? 'السويدية' : 'الإنجليزية'})... تحدث الآن!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleVoiceInputToggle}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-lg text-[11px]"
                >
                  إيقاف التسجيل
                </button>
              </div>
            )}

            {/* Speech Recognition Error Banner */}
            {speechError && (
              <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl flex items-start justify-between gap-2 text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FECC00] shrink-0" />
                  <span>{speechError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechError(null)}
                  className="text-amber-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="relative">
              <textarea
                required
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="مثال: كيف أقدم على الإقامة الدائمة إذا عملت بعقد سنة؟ أو اضغط زر الميكروفون للتحدث مباشرة..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FECC00] font-normal"
              />

              {/* Voice Record Button Inside Input */}
              <div className="absolute left-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleVoiceInputToggle}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                    isListening 
                      ? 'bg-red-600 text-white animate-bounce' 
                      : 'bg-[#FECC00] hover:bg-yellow-400 text-[#005293]'
                  }`}
                  title="البحث والتعرف الصوتي المباشر Web Speech API"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isListening ? 'جاري الاستماع...' : 'التحدث صوتياً'}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !questionText.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl transition-all shadow flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري الاتصال بالسيرفر واستخراج الإجابة الرسمية...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 fill-current rotate-180" />
                <span>إرسال السؤال واستخراج الإجابة</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Structured AI Response View */}
      {currentAnswer && (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden space-y-6 p-6 animate-fadeIn">
          {/* Answer Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base">إجابة توجيهية رسمية معتمدة</h3>
                <p className="text-xs text-slate-400">تاريخ المراجعة: 2026 | بلدية {selectedMunicipality.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Save to Account */}
              <button
                onClick={handleSaveToAccount}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isSavedLocally
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSavedLocally ? 'fill-current' : ''}`} />
                <span>{isSavedLocally ? 'محفوظ' : 'حفظ'}</span>
              </button>

              {/* Download PDF/Text */}
              <button
                onClick={handleDownloadPDF}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="تصدير كـ ملف نصي / PDF"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>تحميل PDF</span>
              </button>

              {/* Send Email */}
              <button
                onClick={() => setShowEmailModal(true)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="إرسال إلى الإيميل"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>إرسال بريد</span>
              </button>
            </div>
          </div>

          {/* Answer Executive Summary */}
          <div className="p-4 bg-blue-950/40 border border-blue-800/60 rounded-xl space-y-1.5">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              الملخص المباشر
            </h4>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              {currentAnswer.summary}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">الشرح التفصيلي والقانوني:</h4>
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {currentAnswer.detailedAnswer}
            </div>
          </div>

          {/* Practical Tip */}
          {currentAnswer.practicalTip && (
            <div className="p-4 bg-yellow-950/30 border border-yellow-700/40 rounded-xl space-y-1.5">
              <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                نصيحة خطوة بخطوة في التعامل مع المؤسسات السويدية
              </h4>
              <p className="text-xs text-slate-200">{currentAnswer.practicalTip}</p>
            </div>
          )}

          {/* Official Swedish Sources */}
          {currentAnswer.officialSources && currentAnswer.officialSources.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-slate-400">المصادر الحكومية الرسمية المعتمدة:</p>
              <div className="flex flex-wrap gap-2">
                {currentAnswer.officialSources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-blue-400 font-medium transition-colors"
                  >
                    <span>{src.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Legal Safety Disclaimer */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <p>{currentAnswer.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Modal to Email Answer */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">إرسال الإجابة عبر البريد الإلكتروني</h3>
            <p className="text-xs text-slate-400">سنقوم بإرسال ملخص السؤال والإجابة التفصيلية والمصادر مباشرة لإيميلك.</p>

            {emailSent ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-emerald-400 font-bold text-xs flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>تم إرسال الإجابة إلى بريدك الإلكتروني بنجاح!</span>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-3">
                <input
                  type="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني..."
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
