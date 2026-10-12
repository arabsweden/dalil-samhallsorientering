import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Crown, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Download, 
  Award, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  History, 
  Play, 
  Layers, 
  BarChart2, 
  FileText, 
  ShieldAlert, 
  Info,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { PremiumQuestion, UserProfile, DifficultyLevel, QuizAttemptResult } from '../types';
import { 
  COURSE_MODULES, 
  ALL_PREMIUM_QUESTIONS, 
  getQuestionsByModule, 
  getRandomQuizSet, 
  searchAndFilterQuestions 
} from '../data/premiumQuestionBank';
import { QuestionCard } from './QuestionCard';

interface QuestionBankViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onOpenSubscriptionModal: () => void;
  onOpenCertificateModal: () => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenSubscriptionModal,
  onOpenCertificateModal,
}) => {
  const isPremiumUser = userProfile.subscriptionPlan === 'premium' || userProfile.subscriptionPlan === 'municipal';

  // Navigation state within Question Bank View
  const [activeSubTab, setActiveSubTab] = useState<'modules' | 'bookmarks' | 'history' | 'wrong_review'>('modules');
  
  // Quiz active state
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<PremiumQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeQuizTitle, setActiveQuizTitle] = useState<string>('');
  const [activeModuleId, setActiveModuleId] = useState<number | 'final' | 'custom'>('final');

  // Quiz execution progress
  const [userAnswers, setUserAnswers] = useState<Record<string, { choice: number; isCorrect: boolean }>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number | 'all'>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [quizQuestionCount, setQuizQuestionCount] = useState<number | 'all'>(10);

  // Bookmarks state (saved in userProfile or local)
  const bookmarkedIds = useMemo(() => new Set(userProfile.savedQuestionIds || []), [userProfile.savedQuestionIds]);

  const handleToggleBookmark = (questionId: string) => {
    const current = new Set(userProfile.savedQuestionIds || []);
    if (current.has(questionId)) {
      current.delete(questionId);
    } else {
      current.add(questionId);
    }
    const updatedIds = Array.from(current);
    onUpdateProfile({ savedQuestionIds: updatedIds });
  };

  // Toggle/Activate Individual Premium Membership
  const handleActivateIndividualPremium = () => {
    onUpdateProfile({ subscriptionPlan: 'premium' });
  };

  // Start a Quiz Set
  const startQuiz = (questions: PremiumQuestion[], title: string, modId: number | 'final' | 'custom') => {
    if (questions.length === 0) return;
    setActiveQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    setActiveQuizTitle(title);
    setActiveModuleId(modId);
  };

  const handleStartModuleQuiz = (moduleId: number) => {
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (!mod) return;

    if (!isPremiumUser) {
      // Free users can practice the 2 free questions or trial
      const freeQuestions = getQuestionsByModule(moduleId, false);
      startQuiz(freeQuestions, `أسئلة مجانية: ${mod.title}`, moduleId);
    } else {
      const moduleQuestions = getRandomQuizSet(quizQuestionCount, moduleId, true);
      startQuiz(moduleQuestions, `اختبار وحدة: ${mod.title}`, moduleId);
    }
  };

  const handleStartFinalExam = () => {
    if (!isPremiumUser) {
      // Short 5-question trial quiz
      const trialQuestions = getRandomQuizSet(5, 'all', false);
      startQuiz(trialQuestions, 'اختبار مجاني تجريبي (5 أسئلة)', 'final');
    } else {
      const examQuestions = getRandomQuizSet(30, 'all', true);
      startQuiz(examQuestions, 'الاختبار النهائي الشامل (30 سؤالاً)', 'final');
    }
  };

  const handleStartFreeTrialQuiz = () => {
    const trialQuestions = getRandomQuizSet(5, 'all', false);
    startQuiz(trialQuestions, 'الاختبار التجريبي المجاني (5 أسئلة)', 'final');
  };

  const handleAnswerSubmit = (questionId: string, selectedChoiceIndex: number, isCorrect: boolean) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { choice: selectedChoiceIndex, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (!activeQuizQuestions) return;
    if (currentQuestionIndex < activeQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish Quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeQuizQuestions) return;
    
    let correct = 0;
    const wrongIds: string[] = [];
    const wrongModulesSet = new Set<string>();

    activeQuizQuestions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans && ans.isCorrect) {
        correct++;
      } else {
        wrongIds.push(q.id);
        wrongModulesSet.add(q.moduleTitle);
      }
    });

    const scorePct = Math.round((correct / activeQuizQuestions.length) * 100);

    const attemptResult: QuizAttemptResult = {
      id: 'att-' + Date.now(),
      date: new Date().toLocaleDateString('sv-SE') + ' ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      moduleId: typeof activeModuleId === 'number' ? activeModuleId : 'final',
      moduleTitle: activeQuizTitle,
      totalQuestions: activeQuizQuestions.length,
      correctAnswers: correct,
      scorePercentage: scorePct,
      wrongQuestionIds: wrongIds,
      topicsToReview: Array.from(wrongModulesSet),
    };

    // Save attempt in profile history
    const history = userProfile.questionBankHistory || [];
    const updatedHistory = [attemptResult, ...history].slice(0, 20); // Keep last 20
    
    // Add XP points
    const earnedXp = correct * 15;

    onUpdateProfile({
      questionBankHistory: updatedHistory,
      xpPoints: (userProfile.xpPoints || 0) + earnedXp,
    });

    setQuizFinished(true);
  };

  const handleRetryWrongQuestions = () => {
    if (!activeQuizQuestions) return;
    const wrongQuestions = activeQuizQuestions.filter(q => {
      const ans = userAnswers[q.id];
      return !ans || !ans.isCorrect;
    });

    if (wrongQuestions.length === 0) {
      alert('ممتاز! لقد أجبت على جميع الأسئلة بطريقة صحيحة.');
      return;
    }

    startQuiz(wrongQuestions, `مراجعة الأسئلة الخاطئة (${wrongQuestions.length} أسئلة)`, activeModuleId);
  };

  const handleDownloadPDFResult = () => {
    if (!activeQuizQuestions) return;
    const total = activeQuizQuestions.length;
    let correct = 0;
    activeQuizQuestions.forEach(q => {
      if (userAnswers[q.id]?.isCorrect) correct++;
    });
    const percentage = Math.round((correct / total) * 100);

    const reportContent = `
==================================================
تقرير نتيجة اختبار التوجيه المجتمعي السويدي 2026
منصة عرب السويد - Individual Premium Membership
==================================================
المتعلم: ${userProfile.name || 'المحترم'}
البريد: ${userProfile.email}
نوع الاختبار: ${activeQuizTitle}
تاريخ الاختبار: ${new Date().toLocaleDateString('sv-SE')}
النتيجة الإجمالية: ${correct} من ${total} (${percentage}%)
حالة الاجتياز: ${percentage >= 70 ? 'ناجح ومجتاز بنجاح' : 'يحتاج إلى مراجعة إضافية'}

تفاصيل الأسئلة المراجعة:
${activeQuizQuestions.map((q, idx) => {
  const isRight = userAnswers[q.id]?.isCorrect;
  return `
[سؤال ${idx + 1}] (${q.moduleTitle}) - ${q.swedishTerm}
السؤال: ${q.questionArabic}
النتيجة: ${isRight ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
المصدر الرسمي: ${q.authorityName} (${q.officialSourceUrl})
`;
}).join('\n')}

==================================================
المعلومات تعليمية عامة وقانونية صادرة عن منصة عرب السويد 2026.
==================================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_نتيجة_${activeQuizTitle.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Questions List for Search/Filter view
  const filteredQuestions = useMemo(() => {
    return searchAndFilterQuestions(
      searchQuery,
      selectedModuleFilter,
      selectedDifficultyFilter,
      selectedTypeFilter,
      isPremiumUser
    );
  }, [searchQuery, selectedModuleFilter, selectedDifficultyFilter, selectedTypeFilter, isPremiumUser]);

  // Bookmarked Questions List
  const bookmarkedQuestions = useMemo(() => {
    return ALL_PREMIUM_QUESTIONS.filter(q => bookmarkedIds.has(q.id));
  }, [bookmarkedIds]);

  // =========================================================
  // VIEW RENDER: Active Quiz Execution or Quiz Result Screen
  // =========================================================
  if (activeQuizQuestions && activeQuizQuestions.length > 0) {
    if (quizFinished) {
      // Render Quiz Completion Summary Screen
      let correctCount = 0;
      const wrongQuestionsList: PremiumQuestion[] = [];
      activeQuizQuestions.forEach(q => {
        if (userAnswers[q.id]?.isCorrect) {
          correctCount++;
        } else {
          wrongQuestionsList.push(q);
        }
      });
      const totalCount = activeQuizQuestions.length;
      const percentage = Math.round((correctCount / totalCount) * 100);
      const isPassed = percentage >= 70;

      return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
          {/* Top Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FECC00] to-yellow-500 p-1 mx-auto shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                {isPassed ? (
                  <CheckCircle2 className="w-10 h-10 text-[#FECC00]" />
                ) : (
                  <RotateCcw className="w-10 h-10 text-amber-400" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="bg-[#005293] text-white px-3 py-1 rounded-full text-xs font-black">
                {activeQuizTitle}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                {isPassed ? 'تهانينا! لقد اجتزت الاختبار بنجاح' : 'نتيجة الاختبار - تحتاج إلى مراجعة إضافية'}
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                {isPassed 
                  ? 'لقد أظهرت فهماً ممتازاً للمفاهيم والقوانين والمؤسسات السويدية.' 
                  : 'راجع الإجابات الخاطئة وأعد المحاولة لتحقيق نسبة أعلى من 70%.'}
              </p>
            </div>

            {/* Score Ring / Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold">الدرجة المئوية</span>
                <p className={`text-3xl font-black ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {percentage}%
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold">الإجابات الصحيحة</span>
                <p className="text-3xl font-black text-emerald-400">
                  {correctCount} / {totalCount}
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                <span className="text-slate-400 text-xs font-bold">الإجابات الخاطئة</span>
                <p className="text-3xl font-black text-rose-400">
                  {totalCount - correctCount}
                </p>
              </div>
            </div>

            {/* Topics to review if any */}
            {wrongQuestionsList.length > 0 && (
              <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl text-right text-xs text-amber-200 space-y-2">
                <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> الموضوعات التي تحتاج إلى إعادة مراجعة:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {Array.from(new Set(wrongQuestionsList.map(q => q.moduleTitle))).map((title, i) => (
                    <li key={i}>{title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Individual Premium Upgrade Banner */}
            {!isPremiumUser && (
              <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-yellow-500/40 p-5 rounded-2xl text-right space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-[#FECC00] font-black text-sm sm:text-base">
                  <Crown className="w-5 h-5" />
                  <span>تفعيل العضوية الفردية الممتازة – Individual Premium</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  لقد أتممت هذا الاختبار. انضم إلى <strong className="text-[#FECC00]">العضوية الفردية الممتازة</strong> الآن بضغطة واحدة لمتابعة إكمال كافة الأسئلة الـ 96+ الموثوقة عبر جميع الوحدات الثمانية دون أي قيود!
                </p>
                <button
                  onClick={() => {
                    handleActivateIndividualPremium();
                    // Load full 30 questions or current module questions
                    const fullSet = getRandomQuizSet(30, 'all', true);
                    startQuiz(fullSet, 'الاختبار الشامل – العضوية الفردية الممتازة (30 سؤالاً)', 'final');
                  }}
                  className="px-6 py-3 bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Crown className="w-4 h-4" />
                  تفعيل العضوية الفردية ومتابعة الأسئلة الـ 96+
                </button>
              </div>
            )}

            {/* Completion Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
              {wrongQuestionsList.length > 0 && (
                <button
                  onClick={handleRetryWrongQuestions}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  إعادة الأسئلة الخاطئة ({wrongQuestionsList.length})
                </button>
              )}

              <button
                onClick={() => setActiveQuizQuestions(null)}
                className="px-5 py-3 bg-[#005293] hover:bg-blue-800 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm border border-blue-400/30"
              >
                <Play className="w-4 h-4 text-[#FECC00]" />
                بدء اختبار جديد
              </button>

              <button
                onClick={handleDownloadPDFResult}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                تنزيل النتيجة PDF / TXT
              </button>

              {isPassed && (
                <button
                  onClick={onOpenCertificateModal}
                  className="px-5 py-3 bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black rounded-xl shadow-xl transition-all flex items-center gap-2 text-sm"
                >
                  <Award className="w-4 h-4" />
                  عرض وتنزيل شهادة المشاركة
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Active Question Rendering
    const currentQuestion = activeQuizQuestions[currentQuestionIndex];
    const isBookmarked = bookmarkedIds.has(currentQuestion.id);

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
        <button
          onClick={() => {
            if (confirm('هل أنت تأكد من رغبتك في الخروج من الاختبار الحالي؟')) {
              setActiveQuizQuestions(null);
            }
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-bold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          إلغاء والعودة للقائمة الرئيسية
        </button>

        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={activeQuizQuestions.length}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onAnswerSubmit={handleAnswerSubmit}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === activeQuizQuestions.length - 1}
        />
      </div>
    );
  }

  // =========================================================
  // MAIN VIEW: Modules, Filters, Bookmarks, and Premium CTA
  // =========================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#003e70] to-slate-900 rounded-3xl p-6 sm:p-10 border border-blue-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FECC00] text-[#005293] px-3.5 py-1 rounded-full text-xs font-black shadow-md">
              <Crown className="w-4 h-4" />
              العضوية الفردية الممتازة – Individual Premium Membership
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug tracking-tight">
              بنك أسئلة التوجيه المجتمعي السويدي الشامل
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
              أكثر من <strong className="text-[#FECC00]">96 سؤالاً تفاعلياً موثقاً</strong> مشروحة باللغة العربية مع المصطلحات السويدية والمصادر الحكومية الرسمية، مقسّمة على ثماني وحدات تعليمية مغطية لكافة جوانب الحياة والقوانين في السويد.
            </p>
          </div>

          {/* Quick CTA Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl text-center space-y-3 shrink-0 shadow-xl w-full sm:w-auto">
            {!isPremiumUser ? (
              <>
                <div className="flex items-center justify-center gap-2 text-amber-400 font-extrabold text-sm">
                  <Lock className="w-4 h-4" /> العضوية المجانية (اختبار تجريبي 5 أسئلة)
                </div>
                <button
                  onClick={handleActivateIndividualPremium}
                  className="w-full bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-sm flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  تفعيل العضوية الفردية الممتازة مجاناً
                </button>
                <button
                  onClick={handleStartFreeTrialQuiz}
                  className="text-xs text-blue-300 hover:underline font-bold block mx-auto"
                >
                  بدء اختبار تجريبي مجاني (5 أسئلة)
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-extrabold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> مشترك ممتاز - وصول غير محدود
                </div>
                <button
                  onClick={handleStartFinalExam}
                  className="w-full bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  بدء الاختبار النهائي (30 سؤالاً)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Practice Options Selector for Premium Users */}
        {isPremiumUser && (
          <div className="pt-4 border-t border-blue-500/20 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Layers className="w-4 h-4 text-[#FECC00]" />
              <span>تحديد عدد أسئلة الاختبار:</span>
            </div>
            <div className="flex items-center gap-2">
              {[10, 20, 30, 'all'].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuizQuestionCount(count as number | 'all')}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                    quizQuestionCount === count 
                      ? 'bg-[#FECC00] text-[#005293] border-[#FECC00] font-black' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {count === 'all' ? 'جميع الأسئلة' : `${count} سؤال`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('modules')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'modules' ? 'bg-[#FECC00] text-[#005293] font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            الوحدات التعليمية (8)
          </button>

          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'bookmarks' ? 'bg-[#FECC00] text-[#005293] font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            المفضلة ({bookmarkedQuestions.length})
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'history' ? 'bg-[#FECC00] text-[#005293] font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4 text-sky-400" />
            سجل الاختبارات ({userProfile.questionBankHistory?.length || 0})
          </button>
        </div>

        {/* Global Search & Filter Modal Trigger */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤال، مصطلح سويدي، أو هيئة..."
              className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl pr-9 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FECC00]"
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: MODULES GRID (8 UNITS)                             */}
      {/* ========================================================= */}
      {activeSubTab === 'modules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSE_MODULES.map((mod) => {
              const availableQuestions = getQuestionsByModule(mod.id, isPremiumUser);
              const totalInBank = 12;

              return (
                <div 
                  key={mod.id} 
                  className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 rounded-3xl space-y-4 shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 rounded-2xl bg-[#005293] text-[#FECC00] font-black text-sm flex items-center justify-center shadow-md">
                        {mod.id}
                      </span>
                      {!isPremiumUser ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          <Lock className="w-3 h-3" /> أسئلتان مجاناً
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> 12 سؤالاً كاملاً
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-white leading-snug group-hover:text-[#FECC00] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-blue-300 font-mono font-bold">{mod.titleSv}</p>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-medium">
                      {mod.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                      <span>الجهة المختصة:</span>
                      <span className="text-slate-200">{mod.officialAuthority}</span>
                    </div>

                    <button
                      onClick={() => handleStartModuleQuiz(mod.id)}
                      className="w-full py-3 bg-[#005293] hover:bg-blue-800 text-white font-extrabold rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 border border-blue-400/30"
                    >
                      <Play className="w-4 h-4 text-[#FECC00]" />
                      ابدأ أسئلة هذه الوحدة ({availableQuestions.length})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Free User Upsell Banner */}
          {!isPremiumUser && (
            <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 p-6 rounded-3xl text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
                <Crown className="w-6 h-6 text-[#FECC00]" />
              </div>
              <h3 className="text-xl font-black text-white">
                اشترك في العضوية الفردية الممتازة لفتح جميع الأسئلة
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                احصل على بنك مكون من 96+ سؤالاً كاملاً، مع إمكانية تحديد عدد أسئلة الاختبار، ومراجعة الأسئلة الخاطئة، وحفظ المفضلة، وتحميل تقارير PDF وإصدار شهادة المشاركة التعليمية الموثقة.
              </p>
              <button
                onClick={onOpenSubscriptionModal}
                className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black px-8 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-sm"
              >
                ترقية الاشتراك الآن
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: BOOKMARKS (المفضلة)                                 */}
      {/* ========================================================= */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          {bookmarkedQuestions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-extrabold text-white">لا توجد أسئلة محفوظة في المفضلة بعد</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                أثناء مراجعة الأسئلة والاختبارات، اضغط على زر "حفظ في المفضلة" على أي سؤال لتعود إليه هنا بسهولة.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-base">الأسئلة المحفوظة ({bookmarkedQuestions.length})</h3>
                <button
                  onClick={() => startQuiz(bookmarkedQuestions, 'اختبار الأسئلة المفضلة', 'custom')}
                  className="px-4 py-2 bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Play className="w-4 h-4" />
                  بدء اختبار الأسئلة المفضلة
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedQuestions.map((q) => (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-[#005293] text-white px-2.5 py-0.5 rounded-full font-bold">{q.moduleTitle}</span>
                      <button
                        onClick={() => handleToggleBookmark(q.id)}
                        className="text-amber-400 hover:text-rose-400 font-bold text-xs"
                      >
                        إزالة
                      </button>
                    </div>
                    <h4 className="font-bold text-white text-sm leading-relaxed">{q.questionArabic}</h4>
                    <p className="text-xs text-blue-300 font-mono">🇸🇪 {q.swedishTerm}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: QUIZ HISTORY (سجل النتائج)                         */}
      {/* ========================================================= */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          {(!userProfile.questionBankHistory || userProfile.questionBankHistory.length === 0) ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <History className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-extrabold text-white">لا توجد محاولات اختبار سابقة مسجلة</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                قم بإكمال أي اختبار لتبدأ نتائجك ومعدل تقدمك بالظهور في هذا السجل الموثق.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-extrabold text-white text-base">سجل نتائج المحاولات الأخيرة</h3>
              <div className="space-y-3">
                {userProfile.questionBankHistory.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">{item.moduleTitle}</h4>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-bold">النتيجة: </span>
                        <strong className={item.scorePercentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                          {item.correctAnswers} / {item.totalQuestions} ({item.scorePercentage}%)
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Global Filtered Search Results Box if user typed in search query */}
      {searchQuery.trim() !== '' && (
        <div className="bg-slate-950 border border-blue-500/40 p-6 rounded-3xl space-y-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <Search className="w-5 h-5 text-[#FECC00]" />
            نتائج البحث عن "{searchQuery}" ({filteredQuestions.length} سؤال)
          </h3>

          {filteredQuestions.length === 0 ? (
            <p className="text-slate-400 text-xs">لم نجد أي أسئلة تطابق بحثك. جرب كتابة كلمة أخرى.</p>
          ) : (
            <div className="space-y-3">
              {filteredQuestions.map((q) => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#FECC00] font-bold">{q.moduleTitle}</span>
                    <span className="text-blue-300 font-mono">🇸🇪 {q.swedishTerm}</span>
                  </div>
                  <p className="text-white text-sm font-bold">{q.questionArabic}</p>
                  <p className="text-slate-400 text-xs">{q.explanationArabic}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
