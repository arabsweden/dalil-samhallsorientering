import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Bookmark,
  Share2,
  Eye,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Moon,
  FileText,
  Save,
  Edit3,
  Check
} from 'lucide-react';
import { Lesson, Language } from '../types';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  language: Language;
  onClose: () => void;
  onStartQuiz: (lesson: Lesson) => void;
  isCompleted: boolean;
  isSaved: boolean;
  onToggleSaveLesson: (lessonId: string) => void;
  userNote?: string;
  onSaveNote?: (lessonId: string, noteText: string) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  language,
  onClose,
  onStartQuiz,
  isCompleted,
  isSaved,
  onToggleSaveLesson,
  userNote = '',
  onSaveNote,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [fontSizeStep, setFontSizeStep] = useState<number>(1); // 0: Normal (16px), 1: Large (20px), 2: Extra Large (24px), 3: Huge (28px)
  const [highContrastTheme, setHighContrastTheme] = useState<'dark' | 'amber'>('dark');
  const [noteText, setNoteText] = useState<string>(userNote);
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  if (!lesson) return null;

  const fontClasses = [
    'text-base sm:text-lg leading-relaxed',       // Step 0 - Normal
    'text-xl sm:text-2xl leading-loose',          // Step 1 - Large
    'text-2xl sm:text-3xl leading-[2.2]',         // Step 2 - Extra Large
    'text-3xl sm:text-4xl leading-[2.4]',         // Step 3 - Huge
  ];

  const handleIncreaseFont = () => {
    setFontSizeStep(prev => Math.min(prev + 1, 3));
  };

  const handleDecreaseFont = () => {
    setFontSizeStep(prev => Math.max(prev - 1, 0));
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('القارئ الصوتي غير مدعوم في متصفحك حالياً.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${lesson.title}. ${lesson.summary}. ${lesson.fullContent}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'sv' ? 'sv-SE' : language === 'en' ? 'en-US' : 'ar-SA';
      utterance.rate = isReadingMode ? 0.8 : 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${lesson.title} - دليل التوجيه المجتمعي السويدي\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveNote = () => {
    if (onSaveNote) {
      onSaveNote(lesson.id, noteText);
      setIsNoteSaved(true);
      setTimeout(() => setIsNoteSaved(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div 
        className={`w-full max-w-4xl min-w-0 shadow-2xl rounded-3xl overflow-hidden my-auto max-h-[94vh] flex flex-col transition-all duration-300 border ${
          isReadingMode 
            ? highContrastTheme === 'amber'
              ? 'bg-[#1a1409] text-[#fef3c7] border-[#78350f]'
              : 'bg-black text-white border-yellow-500/50'
            : 'bg-slate-900 text-white border-slate-700'
        }`}
      >
        {/* Reading Mode Control Bar Banner */}
        {isReadingMode && (
          <div className="bg-yellow-500 text-slate-950 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 font-bold text-xs sm:text-sm shrink-0 border-b border-yellow-600">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-slate-950 shrink-0" />
              <span>وضع القراءة المريح والأحجام المكبرة (نشط)</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Size Adjusters */}
              <div className="flex items-center bg-slate-950/20 rounded-xl p-0.5 border border-slate-950/30">
                <button
                  onClick={handleDecreaseFont}
                  disabled={fontSizeStep === 0}
                  className="p-1.5 hover:bg-slate-950/20 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-black"
                  title="تصغير الخط"
                >
                  <ZoomOut className="w-4 h-4" />
                  <span>A-</span>
                </button>
                <span className="px-2 font-mono font-black text-xs">
                  {fontSizeStep === 0 ? '100%' : fontSizeStep === 1 ? '125%' : fontSizeStep === 2 ? '150%' : '175%'}
                </span>
                <button
                  onClick={handleIncreaseFont}
                  disabled={fontSizeStep === 3}
                  className="p-1.5 hover:bg-slate-950/20 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-black"
                  title="تكبير الخط"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>A+</span>
                </button>
              </div>

              {/* Theme Toggle in Reading Mode */}
              <button
                onClick={() => setHighContrastTheme(prev => prev === 'dark' ? 'amber' : 'dark')}
                className="px-2.5 py-1 bg-slate-950 text-yellow-400 rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors flex items-center gap-1"
                title="تغيير نغمة الألوان للعين"
              >
                {highContrastTheme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{highContrastTheme === 'dark' ? 'وضع دافئ' : 'وضع داكن تباين عالٍ'}</span>
              </button>

              {/* Exit Reading Mode */}
              <button
                onClick={() => setIsReadingMode(false)}
                className="px-3 py-1 bg-slate-950 text-white rounded-xl text-xs font-black hover:bg-red-700 transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>إغلاق وضع القراءة</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b-2 flex items-start justify-between shrink-0 transition-colors ${
          isReadingMode 
            ? highContrastTheme === 'amber'
              ? 'bg-[#291e0a] border-[#b45309]'
              : 'bg-slate-950 border-yellow-500/80'
            : 'bg-[#005293] border-[#FECC00]'
        }`}>
          <div className="space-y-2 pr-2">
            {!isReadingMode && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-[#FECC00] text-[#005293] font-black px-3 py-0.5 rounded-full shadow-xs">
                  درس تعليمي معتمد
                </span>
                <span className="text-blue-100 font-bold flex items-center gap-1 bg-[#003e70] px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#FECC00]" />
                  {lesson.readingTimeMinutes} دقائق قراءة
                </span>
                {isCompleted && (
                  <span className="bg-emerald-500 text-white font-black px-3 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    درس مكتمل
                  </span>
                )}
              </div>
            )}

            <h2 className={`font-black leading-snug transition-all ${
              isReadingMode ? 'text-2xl sm:text-3xl text-yellow-300' : 'text-xl sm:text-2xl text-white'
            }`}>
              {language === 'sv' ? lesson.titleSv : language === 'en' ? lesson.titleEn : lesson.title}
            </h2>
            <p className={`text-xs sm:text-sm font-bold ${isReadingMode ? 'text-amber-200' : 'text-[#FECC00]'}`}>
              🇸🇪 {lesson.titleSv}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Reading Mode Toggle Button */}
            <button
              onClick={() => {
                setIsReadingMode(!isReadingMode);
                if (!isReadingMode && fontSizeStep === 0) setFontSizeStep(1); // Default to Large font on activate
              }}
              className={`p-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md ${
                isReadingMode 
                  ? 'bg-yellow-400 text-slate-950 font-black ring-2 ring-yellow-300' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30'
              }`}
              title={isReadingMode ? 'إيقاف وضع القراءة' : 'تفعيل وضع القراءة المريح لكبار السن وضعاف البصر'}
            >
              <Eye className="w-5 h-5 text-yellow-200 fill-current shrink-0" />
              <span className="hidden sm:inline">
                {isReadingMode ? 'وضع القراءة (مفعّل)' : 'وضع القراءة المريح'}
              </span>
            </button>

            {/* Save Button */}
            <button
              onClick={() => onToggleSaveLesson(lesson.id)}
              className={`p-2.5 rounded-xl transition-all ${
                isSaved 
                  ? 'bg-[#FECC00] text-[#005293] font-bold' 
                  : isReadingMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-[#003e70] text-white hover:bg-blue-800'
              }`}
              title={isSaved ? 'محفوظ في حسابك' : 'حفظ الدرس'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Audio Reader Button */}
            <button
              onClick={handleToggleAudio}
              className={`p-2.5 rounded-xl transition-all ${
                isPlayingAudio 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : isReadingMode ? 'bg-amber-600 text-white hover:bg-amber-500' : 'bg-[#003e70] text-[#FECC00] hover:bg-blue-800'
              }`}
              title={isPlayingAudio ? 'إيقاف القراءة الصوتية' : 'استماع للدرس بصوت مسموع'}
            >
              {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis.cancel();
                onClose();
              }}
              className={`p-2.5 rounded-xl transition-colors ${
                isReadingMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-blue-200 hover:text-white hover:bg-[#003e70]'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Lesson Body - Supports Standard and Reading Mode Layouts */}
        <div className={`p-6 sm:p-8 overflow-y-auto space-y-6 transition-colors ${
          isReadingMode
            ? highContrastTheme === 'amber'
              ? 'bg-[#140f07] text-[#fffbeb]'
              : 'bg-black text-slate-50'
            : 'bg-slate-900 text-slate-100'
        }`}>
          {/* Quick Font Size Controls Bar when in Reading Mode */}
          {isReadingMode && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl text-amber-200 text-sm font-bold">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-amber-400" />
                <span>حجم الخط الحالي: {fontSizeStep === 0 ? 'عادي (100%)' : fontSizeStep === 1 ? 'مكبر (125%)' : fontSizeStep === 2 ? 'مكبر جداً (150%)' : 'أقصى تكبير (175%)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecreaseFont}
                  disabled={fontSizeStep === 0}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 text-amber-100 rounded-xl disabled:opacity-30 font-bold transition-all text-xs"
                >
                  تصغير الخط A-
                </button>
                <button
                  onClick={handleIncreaseFont}
                  disabled={fontSizeStep === 3}
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-black rounded-xl disabled:opacity-30 transition-all text-xs"
                >
                  تكبير الخط A+
                </button>
              </div>
            </div>
          )}

          {/* Executive Summary Box */}
          <div className={`p-5 sm:p-6 rounded-2xl space-y-2 border-2 transition-all ${
            isReadingMode
              ? highContrastTheme === 'amber'
                ? 'bg-[#261b0c] border-[#d97706] text-amber-100'
                : 'bg-slate-900 border-yellow-400/60 text-white'
              : 'bg-[#003e70]/60 border-[#005293] text-blue-50'
          }`}>
            <h4 className={`font-black uppercase tracking-wider flex items-center gap-2 ${
              isReadingMode ? 'text-yellow-400 text-base sm:text-lg' : 'text-[#FECC00] text-xs sm:text-sm'
            }`}>
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
              <span>الملخص والفكره الأساسية للدرس:</span>
            </h4>
            <p className={`font-bold ${
              isReadingMode 
                ? fontClasses[fontSizeStep] 
                : 'text-sm sm:text-base leading-relaxed'
            }`}>
              {language === 'sv' ? lesson.summarySv : language === 'en' ? lesson.summaryEn : lesson.summary}
            </p>
          </div>

          {/* Full Text Content - Scaled Font Size */}
          <div className={`space-y-6 whitespace-pre-line font-medium transition-all ${
            isReadingMode
              ? `${fontClasses[fontSizeStep]} tracking-wide text-white`
              : 'text-slate-100 text-base sm:text-lg leading-relaxed sm:leading-loose'
          }`}>
            {language === 'sv' ? lesson.fullContentSv : language === 'en' ? lesson.fullContentEn : lesson.fullContent}
          </div>

          {/* Practical Real-Life Examples in Sweden */}
          <div className={`p-5 sm:p-6 rounded-2xl space-y-4 border-2 transition-all ${
            isReadingMode
              ? highContrastTheme === 'amber'
                ? 'bg-[#1f1609] border-amber-600/60'
                : 'bg-slate-900 border-slate-700'
              : 'bg-slate-800/90 border-slate-700'
          }`}>
            <h4 className={`font-extrabold uppercase tracking-wider flex items-center gap-2 ${
              isReadingMode ? 'text-yellow-400 text-lg sm:text-xl' : 'text-[#FECC00] text-xs sm:text-sm'
            }`}>
              <BookOpen className="w-5 h-5 text-yellow-400 shrink-0" />
              <span>أمثلة عملية واقعية في المجتمع السويدي:</span>
            </h4>
            <ul className="space-y-3">
              {(language === 'sv' ? lesson.practicalExamplesSv : language === 'en' ? lesson.practicalExamplesEn : lesson.practicalExamples).map((example, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    isReadingMode 
                      ? highContrastTheme === 'amber'
                        ? 'bg-[#291e0a] border-[#b45309] text-amber-100'
                        : 'bg-slate-950 border-slate-800 text-slate-100'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 text-sm sm:text-base'
                  }`}
                >
                  <span className="text-[#FECC00] font-black text-xl shrink-0">•</span>
                  <span className={`font-medium ${isReadingMode ? fontClasses[fontSizeStep] : 'leading-relaxed'}`}>
                    {example}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* User Personal Notes Section */}
          <div className={`p-5 sm:p-6 rounded-2xl space-y-3 border-2 transition-all ${
            isReadingMode
              ? highContrastTheme === 'amber'
                ? 'bg-[#261b0c] border-[#b45309]'
                : 'bg-slate-900 border-yellow-500/40'
              : 'bg-slate-950/90 border-blue-500/30'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-yellow-400/20 text-yellow-300 rounded-xl">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>ملاحظاتي الخاصة حول هذا الدرس</span>
                    {noteText.trim() && (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        مدوّن
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">
                    يمكنك كتابة ملاحظاتك وتلخيصاتك الخاصة، وسيتم حفظها بحسابك للرجوع إليها لاحقاً.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveNote}
                className={`px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 ${
                  isNoteSaved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#FECC00] hover:bg-yellow-400 text-[#005293]'
                }`}
              >
                {isNoteSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم الحفظ بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>حفظ الملاحظة</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="اكتب ملاحظاتك، أسئلتك، أو التواريخ المهمة المرتبطة بهذا الدرس هنا..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FECC00] leading-relaxed resize-y transition-colors"
            />
            
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>تُحفظ الملاحظة تلقائياً في ملفك الشخصي.</span>
              <span>{noteText.length} حرف</span>
            </div>
          </div>

          {/* Official Source & Verification Info */}
          <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border text-xs sm:text-sm ${
            isReadingMode 
              ? 'bg-slate-950 border-slate-800 text-slate-300' 
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">المصدر الحكومي المعتمد:</span>
              <a
                href={lesson.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#FECC00] hover:underline font-extrabold flex items-center gap-1 text-base"
              >
                <span>{lesson.officialSource}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="text-slate-300 font-semibold">
              تاريخ المراجعة القانونية: <span className="text-emerald-400 font-bold">{lesson.lastVerifiedDate}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer & Quiz CTA */}
        <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          isReadingMode
            ? highContrastTheme === 'amber'
              ? 'bg-[#291e0a] border-[#b45309]'
              : 'bg-slate-950 border-slate-800'
            : 'bg-slate-950 border-slate-800'
        }`}>
          <button
            onClick={handleShare}
            className="text-xs sm:text-sm text-slate-300 hover:text-white flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-bold"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة الدرس'}</span>
          </button>

          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onStartQuiz(lesson);
            }}
            className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 mr-auto"
          >
            <HelpCircle className="w-5 h-5 fill-current" />
            <span>ابدأ اختبار الدرس (5 أسئلة)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

