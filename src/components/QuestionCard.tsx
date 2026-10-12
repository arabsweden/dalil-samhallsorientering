import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  HelpCircle, 
  AlertTriangle, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';
import { PremiumQuestion } from '../types';

interface QuestionCardProps {
  question: PremiumQuestion;
  currentIndex: number;
  totalQuestions: number;
  isBookmarked: boolean;
  onToggleBookmark: (questionId: string) => void;
  onAnswerSubmit: (questionId: string, selectedChoiceIndex: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  isBookmarked,
  onToggleBookmark,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);

  // Reset local state when question changes
  React.useEffect(() => {
    setSelectedChoice(null);
    setIsAnswerConfirmed(false);
  }, [question.id]);

  const handleConfirmAnswer = () => {
    if (selectedChoice === null) return;
    setIsAnswerConfirmed(true);
    const isCorrect = selectedChoice === question.correctAnswer;
    onAnswerSubmit(question.id, selectedChoice, isCorrect);
  };

  const difficultyBadges = {
    beginner: { label: 'مبتدئ', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    intermediate: { label: 'متوسط', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    advanced: { label: 'متقدم', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  };

  const legalStatusBadges = {
    current_law: { label: 'قانون نافذ حالياً', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    adopted_decision: { label: 'قرار معتمد بانتظار التطبيق', bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
    proposal_investigation: { label: 'مقترح/تحقيق حكومي (اتفاق تيدو)', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    needs_verification: { label: 'هذه المعلومة تحتاج إلى مراجعة من مصدر رسمي قبل نشرها', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  };

  const questionTypeLabels = {
    mcq: 'اختيار من متعدد',
    true_false: 'صح أم خطأ',
    scenario: 'موقف واقعي',
    faq: 'أسئلة القادمين الجدد',
  };

  const difficultyInfo = difficultyBadges[question.difficulty] || difficultyBadges.beginner;
  const legalInfo = legalStatusBadges[question.legalStatus] || legalStatusBadges.current_law;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden transition-all">
      {/* Top Header & Progress */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#FECC00] text-[#005293] font-black px-3 py-1 rounded-full shadow-sm text-xs">
              {question.moduleTitle}
            </span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-bold border border-slate-700">
              {questionTypeLabels[question.questionType]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full font-bold border ${difficultyInfo.bg}`}>
              {difficultyInfo.label}
            </span>
            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 font-bold text-xs ${
                isBookmarked 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden sm:inline">{isBookmarked ? 'محفوظ' : 'حفظ'}</span>
            </button>
          </div>
        </div>

        {/* Question Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400 font-bold">
            <span>السؤال {currentIndex + 1} من {totalQuestions}</span>
            <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-[#FECC00] to-emerald-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Swedish Term & Legal Status Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {question.swedishTerm && (
          <span className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-500/40 text-blue-200 text-xs px-3 py-1 rounded-lg font-mono font-bold shadow-inner">
            <span className="text-[#FECC00]">🇸🇪</span> {question.swedishTerm}
          </span>
        )}
        <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg font-bold border ${legalInfo.bg}`}>
          <Info className="w-3.5 h-3.5" />
          {legalInfo.label}
        </span>
      </div>

      {/* Question Arabic Text */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed tracking-tight">
          {question.questionArabic}
        </h3>
      </div>

      {/* Choices Options Grid */}
      <div className="space-y-3 pt-2">
        {question.choices.map((choice, index) => {
          let optionStyle = 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200';
          
          if (isAnswerConfirmed) {
            if (index === question.correctAnswer) {
              optionStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40';
            } else if (index === selectedChoice && selectedChoice !== question.correctAnswer) {
              optionStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/40';
            } else {
              optionStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
            }
          } else if (selectedChoice === index) {
            optionStyle = 'bg-blue-950 border-[#FECC00] text-white font-bold ring-2 ring-[#FECC00]/50';
          }

          return (
            <button
              key={index}
              disabled={isAnswerConfirmed}
              onClick={() => setSelectedChoice(index)}
              className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 text-sm sm:text-base leading-relaxed ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  selectedChoice === index ? 'bg-[#FECC00] text-[#005293]' : 'bg-slate-700/60 text-slate-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{choice}</span>
              </div>

              {isAnswerConfirmed && index === question.correctAnswer && (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              )}
              {isAnswerConfirmed && index === selectedChoice && selectedChoice !== question.correctAnswer && (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm Answer Button */}
      {!isAnswerConfirmed ? (
        <button
          disabled={selectedChoice === null}
          onClick={handleConfirmAnswer}
          className="w-full py-4 bg-[#FECC00] hover:bg-yellow-400 disabled:opacity-40 disabled:hover:bg-[#FECC00] text-[#005293] font-black rounded-2xl shadow-xl transition-all text-base flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Sparkles className="w-5 h-5" />
          تأكيد الإجابة
        </button>
      ) : (
        /* Answer Result Explanation & Source Box */
        <div className="space-y-4 pt-2 border-t border-slate-800 animate-fadeIn">
          {/* Result Alert Header */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            selectedChoice === question.correctAnswer
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
          }`}>
            {selectedChoice === question.correctAnswer ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base">إجابة صحيحة! أحسنت عملًا.</h4>
                  <p className="text-xs text-emerald-200/80">لقد استوعبت هذه المعلومة بشكل ممتاز.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base">إجابة خاطئة! الإجابة الصحيحة هي: الخيار ({String.fromCharCode(65 + question.correctAnswer)})</h4>
                  <p className="text-xs text-rose-200/80">اقرأ الشرح والنصيحة أدناه لترسيخ الفهم.</p>
                </div>
              </>
            )}
          </div>

          {/* Explanation Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <h5 className="font-bold text-[#FECC00] flex items-center gap-1.5 text-xs sm:text-sm">
                <HelpCircle className="w-4 h-4" /> الشرح والتوضيح القانوني:
              </h5>
              <p className="text-slate-300 leading-relaxed font-medium">
                {question.explanationArabic}
              </p>
            </div>

            {question.practicalAdvice && (
              <div className="space-y-1 pt-2 border-t border-slate-800/80">
                <h5 className="font-bold text-sky-400 flex items-center gap-1.5 text-xs sm:text-sm">
                  💡 نصيحة عملية للمشترك:
                </h5>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {question.practicalAdvice}
                </p>
              </div>
            )}

            {/* Official Source & Authority */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-4 h-4 text-[#FECC00]" />
                <span>الجهة المسؤولة: <strong className="text-white">{question.authorityName}</strong></span>
              </div>

              {question.officialSourceUrl && (
                <a
                  href={question.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-blue-300 px-3 py-1.5 rounded-xl border border-slate-700 font-bold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  المصدر الرسمي
                </a>
              )}
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed font-medium">
              ⚠️ <strong className="text-amber-400">تنويه قانوني:</strong> المعلومات تعليمية عامة وقد تتغير. يُرجى مراجعة الجهة السويدية الرسمية المختصة في الحالات الشخصية.
            </div>
          </div>

          {/* Next Question Button */}
          <button
            onClick={onNextQuestion}
            className="w-full py-4 bg-[#005293] hover:bg-blue-800 text-white font-black rounded-2xl shadow-xl transition-all text-base flex items-center justify-center gap-2 border border-blue-400/30 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{isLastQuestion ? 'إنهاء الاختبار ومراجعة النتيجة' : 'السؤال التالي'}</span>
            <ArrowRight className="w-5 h-5 text-[#FECC00]" />
          </button>
        </div>
      )}
    </div>
  );
};
