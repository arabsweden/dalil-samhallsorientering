import React, { useState, useMemo } from 'react';
import { X, CheckCircle2, XCircle, Award, Sparkles, ArrowLeft, RotateCcw, Puzzle, GripVertical, Link } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Language, QuizQuestion } from '../types';
import { ALL_PREMIUM_QUESTIONS } from '../data/premiumQuestionBank';

interface QuizModalProps {
  lesson: Lesson | null;
  language: Language;
  onClose: () => void;
  onQuizComplete: (lessonId: string, scorePercentage: number) => void;
}

// Default matching questions generator for legal terms & authorities
const DEFAULT_MATCHING_QUESTION_1: QuizQuestion = {
  id: 'matching-agencies-1',
  type: 'matching',
  question: 'وصل كل مصلحة حكومية سويدية بمسؤوليتها القانونية الأساسية (سحب وإسقاط / اضغط للتوصيل):',
  questionSv: 'Koppla varje svensk myndighet till dess huvudsakliga ansvarsområde (Drag & Drop):',
  questionEn: 'Match each Swedish agency with its primary legal responsibility (Drag & Drop):',
  options: [],
  optionsSv: [],
  optionsEn: [],
  correctAnswerIndex: 0,
  explanation: 'أحسنت التوصيل! Skatteverket مسؤولة عن النفوس والضرائب، Försäkringskassan عن التعويضات والتأمينات، Arbetsförmedlingen عن التوجيه والعمل، و Migrationsverket عن الإقامات والجنسية.',
  explanationSv: 'Rätt kopplat! Skatteverket ansvarar för folkbokföring, Försäkringskassan för ersättningar, Arbetsförmedlingen för jobb och Migrationsverket för uppehållstillstånd.',
  explanationEn: 'Correctly matched! Skatteverket handles civil registration, Försäkringskassan handles social insurance, Arbetsförmedlingen handles employment, and Migrationsverket handles permits.',
  matchingPairs: [
    {
      id: 'pair-1',
      left: 'Skatteverket',
      leftSv: 'Skatteverket',
      right: 'مصلحة الضرائب وقيد النفوس (Personnummer)',
      rightSv: 'Skatte- och folkbokföringsmyndigheten',
    },
    {
      id: 'pair-2',
      left: 'Försäkringskassan',
      leftSv: 'Försäkringskassan',
      right: 'مصلحة التأمينات الاجتماعية والدعم النقدي',
      rightSv: 'Socialförsäkringsmyndigheten och ersättningar',
    },
    {
      id: 'pair-3',
      left: 'Arbetsförmedlingen',
      leftSv: 'Arbetsförmedlingen',
      right: 'مكتب التوجيه والترسيخ الوظيفي والعمل',
      rightSv: 'Arbetsförmedling och etablering',
    },
    {
      id: 'pair-4',
      left: 'Migrationsverket',
      leftSv: 'Migrationsverket',
      right: 'مصلحة تصاريح الإقامة والعدالة والجنسية',
      rightSv: 'Uppehållstillstånd och medborgarskap',
    },
  ],
};

const DEFAULT_MATCHING_QUESTION_2: QuizQuestion = {
  id: 'matching-terms-2',
  type: 'matching',
  question: 'وصل كل مصطلح قانوني باللغة السويدية بمعناه الصحيح (Drag & Drop / توصيل):',
  questionSv: 'Koppla varje juridisk term till dess rätta betydelse (Drag & Drop):',
  questionEn: 'Match each Swedish legal term to its correct meaning (Drag & Drop):',
  options: [],
  optionsSv: [],
  optionsEn: [],
  correctAnswerIndex: 0,
  explanation: 'ممتاز! Uppehållstillstånd تعني تصريح الإقامة، Folkbokföring تعني قيد النفوس، Allemansrätten تعني حق المشاع الطبيعي، و Personnummer يعني الرقم الشخصي.',
  explanationSv: 'Perfekt! Alla termer har sin korrekta juridiska definition.',
  explanationEn: 'Perfect! All terms matched their proper legal definitions.',
  matchingPairs: [
    {
      id: 'pair-2-1',
      left: 'Uppehållstillstånd',
      right: 'تصريح الإقامة (مؤقت أو دائم)',
      rightSv: 'Tillstånd att bo i Sverige',
    },
    {
      id: 'pair-2-2',
      left: 'Folkbokföring',
      right: 'تسجيل وتحديث السكن وقيد النفوس',
      rightSv: 'Registrering av bostad och personuppgifter',
    },
    {
      id: 'pair-2-3',
      left: 'Allemansrätten',
      right: 'حق التجول والتمتع بالطبيعة السويدية',
      rightSv: 'Rätten att röra sig fritt i naturen',
    },
    {
      id: 'pair-2-4',
      left: 'Personnummer',
      right: 'الرقم الشخصي المكون من 12 خانة',
      rightSv: 'Unikt identitetsnummer på 12 siffror',
    },
  ],
};

// Subcomponent for interactive Matching (Drag-and-Drop & Tap-to-Connect)
const MatchingQuestionView: React.FC<{
  question: QuizQuestion;
  language: Language;
  isSubmitted: boolean;
  onStateChange: (isComplete: boolean, isCorrect: boolean) => void;
}> = ({ question, language, isSubmitted, onStateChange }) => {
  const pairs = question.matchingPairs || [];

  // Shuffled right column items
  const shuffledRightPairs = useMemo(() => {
    return [...pairs].sort(() => 0.5 - Math.random());
  }, [question.id]);

  const [userPairs, setUserPairs] = useState<Record<string, string>>({}); // leftId -> rightId
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [draggedLeftId, setDraggedLeftId] = useState<string | null>(null);

  const handleConnect = (leftId: string, rightId: string) => {
    if (isSubmitted) return;
    const newPairs = { ...userPairs };

    // Remove previous assignment to this rightId if any
    Object.keys(newPairs).forEach((k) => {
      if (newPairs[k] === rightId) delete newPairs[k];
    });

    newPairs[leftId] = rightId;
    setUserPairs(newPairs);
    setSelectedLeftId(null);

    const isComplete = Object.keys(newPairs).length === pairs.length;
    let isCorrect = true;
    if (isComplete) {
      pairs.forEach((p) => {
        if (newPairs[p.id] !== p.id) {
          isCorrect = false;
        }
      });
    } else {
      isCorrect = false;
    }
    onStateChange(isComplete, isCorrect);
  };

  const handleClearPair = (leftId: string) => {
    if (isSubmitted) return;
    const newPairs = { ...userPairs };
    delete newPairs[leftId];
    setUserPairs(newPairs);
    onStateChange(false, false);
  };

  const handleResetAll = () => {
    if (isSubmitted) return;
    setUserPairs({});
    setSelectedLeftId(null);
    onStateChange(false, false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-yellow-500/30">
        <span className="flex items-center gap-1.5 font-bold text-yellow-400">
          <Puzzle className="w-4 h-4 text-yellow-400 shrink-0" />
          سؤال التوصيل التفاعلي (Drag & Drop): اسحب المصطلح أو انقر عليه ثم انقر على التعريفي المناسب.
        </span>
        {Object.keys(userPairs).length > 0 && !isSubmitted && (
          <button
            onClick={handleResetAll}
            className="text-slate-400 hover:text-red-400 font-bold flex items-center gap-1 text-[11px] shrink-0"
          >
            <RotateCcw className="w-3 h-3" /> إعادة التوصيل
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Left Column (Terms / Agencies) */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 px-1 flex items-center gap-1">
            <span>القائمة الأولى (المصطلحات):</span>
          </p>
          {pairs.map((pair) => {
            const isSelected = selectedLeftId === pair.id;
            const connectedRightId = userPairs[pair.id];
            const connectedRight = pairs.find((p) => p.id === connectedRightId);
            const isPairCorrect = isSubmitted && connectedRightId === pair.id;
            const isPairWrong = isSubmitted && connectedRightId && connectedRightId !== pair.id;

            let cardStyle = 'bg-slate-800/90 border-slate-700 hover:border-slate-500 text-slate-200';
            if (isSubmitted) {
              if (isPairCorrect) cardStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
              else if (isPairWrong) cardStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
            } else if (isSelected) {
              cardStyle = 'bg-blue-600/30 border-blue-400 text-white font-bold ring-2 ring-blue-500/60';
            } else if (connectedRightId) {
              cardStyle = 'bg-slate-800 border-blue-500/50 text-white font-medium';
            }

            return (
              <div
                key={pair.id}
                draggable={!isSubmitted}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', pair.id);
                  setDraggedLeftId(pair.id);
                }}
                onClick={() => {
                  if (isSubmitted) return;
                  if (selectedLeftId === pair.id) setSelectedLeftId(null);
                  else setSelectedLeftId(pair.id);
                }}
                className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between gap-2 shadow-sm ${cardStyle}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-4 h-4 text-slate-500 shrink-0 cursor-grab" />
                  <span className="font-bold text-slate-100 truncate">
                    {language === 'sv' ? pair.leftSv || pair.left : pair.left}
                  </span>
                </div>

                {connectedRight ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 truncate max-w-[110px]">
                    ✓ {language === 'sv' ? connectedRight.rightSv || connectedRight.right : connectedRight.right}
                  </span>
                ) : (
                  <span className="text-[10px] text-yellow-400/80 italic font-medium">اختر للربط</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column (Definitions / Drop targets) */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 px-1">القائمة الثانية (التعريفات / المهام):</p>
          {shuffledRightPairs.map((pairItem) => {
            const connectedLeftId = Object.keys(userPairs).find((k) => userPairs[k] === pairItem.id);
            const connectedLeft = pairs.find((p) => p.id === connectedLeftId);
            const isPairCorrect = isSubmitted && connectedLeftId === pairItem.id;
            const isPairWrong = isSubmitted && connectedLeftId && connectedLeftId !== pairItem.id;

            let targetStyle = 'bg-slate-900/90 border-slate-700/80 hover:border-blue-500/60 text-slate-300';
            if (isSubmitted) {
              if (isPairCorrect) targetStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
              else if (isPairWrong) targetStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
            } else if (selectedLeftId) {
              targetStyle = 'bg-blue-950/40 border-blue-500/80 text-white animate-pulse border-dashed';
            } else if (connectedLeftId) {
              targetStyle = 'bg-slate-800 border-blue-500/60 text-white';
            }

            return (
              <div
                key={pairItem.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const leftId = e.dataTransfer.getData('text/plain') || draggedLeftId;
                  if (leftId) handleConnect(leftId, pairItem.id);
                }}
                onClick={() => {
                  if (selectedLeftId) {
                    handleConnect(selectedLeftId, pairItem.id);
                  }
                }}
                className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between gap-2 shadow-sm min-h-[46px] ${targetStyle}`}
              >
                <span className="min-w-0 flex-1 leading-snug">
                  {language === 'sv' ? pairItem.rightSv || pairItem.right : pairItem.right}
                </span>

                {connectedLeft && (
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Link className="w-3 h-3 text-amber-400" />
                      {language === 'sv' ? connectedLeft.leftSv || connectedLeft.left : connectedLeft.left}
                    </span>
                    {!isSubmitted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearPair(connectedLeft.id);
                        }}
                        className="text-slate-400 hover:text-red-400 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const QuizModal: React.FC<QuizModalProps> = ({
  lesson,
  language,
  onClose,
  onQuizComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Matching Question state
  const [isMatchingComplete, setIsMatchingComplete] = useState(false);
  const [isMatchingCorrect, setIsMatchingCorrect] = useState(false);

  // Build a 5-question set for the lesson quiz, including an interactive matching question
  const quizQuestions = useMemo(() => {
    if (!lesson || !lesson.quiz || lesson.quiz.length === 0) return [];

    const existing: QuizQuestion[] = [...lesson.quiz];

    // Check if there is already a matching question
    const hasMatching = existing.some((q) => q.type === 'matching' || (q.matchingPairs && q.matchingPairs.length > 0));

    // Supplement matching question if not present
    if (!hasMatching) {
      const matchingQuest = (lesson.id.charCodeAt(0) % 2 === 0) ? DEFAULT_MATCHING_QUESTION_1 : DEFAULT_MATCHING_QUESTION_2;
      existing.splice(Math.min(2, existing.length), 0, matchingQuest);
    }

    if (existing.length >= 5) return existing.slice(0, 5);

    // Supplement from ALL_PREMIUM_QUESTIONS to make a full 5-question quiz
    const extraQuestions: QuizQuestion[] = ALL_PREMIUM_QUESTIONS.filter((q) => q.isActive).map((pq) => ({
      id: pq.id,
      question: pq.questionArabic,
      questionSv: pq.swedishTerm + ' - ' + pq.questionArabic,
      questionEn: pq.questionArabic,
      options: pq.choices,
      optionsSv: pq.choices,
      optionsEn: pq.choices,
      correctAnswerIndex: pq.correctAnswer,
      explanation: pq.explanationArabic,
      explanationSv: pq.explanationArabic,
      explanationEn: pq.explanationArabic,
    }));

    const combined = [...existing];
    for (const item of extraQuestions) {
      if (combined.length >= 5) break;
      if (!combined.some((c) => c.id === item.id || c.question === item.question)) {
        combined.push(item);
      }
    }
    return combined;
  }, [lesson]);

  if (!lesson || quizQuestions.length === 0) return null;

  const currentQuiz = quizQuestions[currentQuestionIndex];
  const isMatchingQuestion = currentQuiz?.type === 'matching' || (currentQuiz?.matchingPairs && currentQuiz.matchingPairs.length > 0);
  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleConfirmAnswer = () => {
    if (isMatchingQuestion) {
      if (!isMatchingComplete) return;
      // Record answer: correct index if matching is correct, else -1
      setSelectedOptionIndex(isMatchingCorrect ? currentQuiz.correctAnswerIndex : -1);
      setIsSubmitted(true);
    } else {
      if (selectedOptionIndex === null) return;
      setIsSubmitted(true);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) return;

    const newAnswers = [...userAnswers, selectedOptionIndex];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsSubmitted(false);
      setIsMatchingComplete(false);
      setIsMatchingCorrect(false);
    } else {
      // Calculate Final Score
      let correctCount = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === quizQuestions[idx]?.correctAnswerIndex) {
          correctCount++;
        }
      });

      const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
      setQuizFinished(true);
      onQuizComplete(lesson.id, scorePercentage);

      // Trigger Confetti Celebration for good score!
      if (scorePercentage >= 60) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // fallback ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setUserAnswers([]);
    setQuizFinished(false);
    setIsMatchingComplete(false);
    setIsMatchingCorrect(false);
  };

  // Compute final score if finished
  const finalCorrectCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === quizQuestions[idx]?.correctAnswerIndex ? acc + 1 : acc;
  }, 0);
  const finalWrongCount = totalQuestions - finalCorrectCount;
  const finalScorePercentage = Math.round((finalCorrectCount / totalQuestions) * 100);
  const [savedResult, setSavedResult] = useState(false);

  const handleSaveResult = () => {
    onQuizComplete(lesson.id, finalScorePercentage);
    setSavedResult(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full min-w-0 shadow-2xl overflow-hidden my-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-xl border border-yellow-500/30 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm sm:text-base truncate">اختبار الدرس التقويمي (5 أسئلة)</h3>
              <p className="text-xs text-slate-400 truncate">{lesson.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          /* Active Question Step */
          <div className="space-y-5 sm:space-y-6 min-w-0">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>السؤال {currentQuestionIndex + 1} من {totalQuestions}</span>
                <span className="text-yellow-400 font-bold">{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-yellow-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                {isMatchingQuestion && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-[11px] font-black px-2.5 py-1 rounded-lg border border-yellow-500/30 flex items-center gap-1">
                    <Puzzle className="w-3.5 h-3.5" />
                    سؤال التوصيل (Drag & Drop)
                  </span>
                )}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed break-words">
                {language === 'sv' ? currentQuiz.questionSv : language === 'en' ? currentQuiz.questionEn : currentQuiz.question}
              </h4>
            </div>

            {/* Render Matching Question OR Multiple Choice Options */}
            {isMatchingQuestion ? (
              <MatchingQuestionView
                question={currentQuiz}
                language={language}
                isSubmitted={isSubmitted}
                onStateChange={(isComplete, isCorrect) => {
                  setIsMatchingComplete(isComplete);
                  setIsMatchingCorrect(isCorrect);
                }}
              />
            ) : (
              /* MCQ Options List */
              <div className="space-y-2.5 min-w-0">
                {(language === 'sv' ? currentQuiz.optionsSv : language === 'en' ? currentQuiz.optionsEn : currentQuiz.options).map((option, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isCorrect = idx === currentQuiz.correctAnswerIndex;

                  let optionStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-950/60 border-red-500 text-red-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-blue-600/30 border-blue-500 text-white font-bold shadow-md';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-right p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 min-w-0 break-words ${optionStyle}`}
                    >
                      <span className="min-w-0 flex-1 text-right break-words">{option}</span>
                      {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feedback Explanation Box when Submitted */}
            {isSubmitted && (
              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5 animate-fadeIn">
                <p className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  الشرح والتوضيح القانوني:
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {language === 'sv' ? currentQuiz.explanationSv : language === 'en' ? currentQuiz.explanationEn : currentQuiz.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
              {!isSubmitted ? (
                <button
                  disabled={isMatchingQuestion ? !isMatchingComplete : selectedOptionIndex === null}
                  onClick={handleConfirmAnswer}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow"
                >
                  تأكيد الإجابة
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow flex items-center gap-2"
                >
                  <span>{currentQuestionIndex + 1 < totalQuestions ? 'السؤال التالي' : 'عرض التلخيص والنتيجة النهائية'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Summary Screen View */
          <div className="text-center space-y-6 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 p-1 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                ملخص نتيجة اختبار الدرس (5 أسئلة)
              </h3>
              <p className="text-xs text-slate-300">
                {finalScorePercentage >= 80 ? 'ممتاز! نتيجة رائعة 🎉' : finalScorePercentage >= 60 ? 'جيد جداً! نتيجة حسنة 👍' : 'حاول مرة أخرى لتحقيق نسبة أعلى!'}
              </p>
            </div>

            {/* Detailed Results Grid (Correct / Wrong / Total) */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-right">
              <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-center space-y-1">
                <p className="text-[10px] sm:text-xs text-emerald-300 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> الإجابات الصحيحة
                </p>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">{finalCorrectCount}</p>
              </div>

              <div className="p-3 bg-rose-950/50 border border-rose-500/30 rounded-xl text-center space-y-1">
                <p className="text-[10px] sm:text-xs text-rose-300 font-bold flex items-center justify-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" /> الإجابات الخاطئة
                </p>
                <p className="text-xl sm:text-2xl font-black text-rose-400">{finalWrongCount}</p>
              </div>

              <div className="p-3 bg-blue-950/50 border border-blue-500/30 rounded-xl text-center space-y-1">
                <p className="text-[10px] sm:text-xs text-blue-300 font-bold">إجمالي الأسئلة</p>
                <p className="text-xl sm:text-2xl font-black text-blue-300">{totalQuestions}</p>
              </div>
            </div>

            {/* Score & XP Banner */}
            <div className="p-3.5 bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border border-yellow-500/30 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between text-yellow-400 font-black px-2">
                <span>نسبة النجاح: {finalScorePercentage}%</span>
                <span>+{(finalCorrectCount * 50)} XP</span>
              </div>
              {savedResult && (
                <p className="text-[11px] text-emerald-400 font-bold pt-1">
                  ✓ تم حفظ النتيجة وتحديث التقدم بنجاح!
                </p>
              )}
            </div>

            {/* Action Buttons: Save Result, Retake, Return to Lessons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                onClick={handleSaveResult}
                disabled={savedResult}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-950 disabled:border-emerald-700/50 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{savedResult ? 'تم حفظ النتيجة ✓' : 'حفظ النتيجة'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
              >
                <RotateCcw className="w-4 h-4 text-yellow-400" />
                <span>إعادة الاختبار</span>
              </button>

              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
              >
                العودة لقائمة الدروس
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
