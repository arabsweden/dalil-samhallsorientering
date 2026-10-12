import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Landmark,
  ShieldCheck,
  FileText,
  Home,
  Briefcase,
  Calculator,
  GraduationCap,
  Activity,
  Users,
  Heart,
  ShieldAlert,
  Scale,
  Smartphone,
  PhoneCall,
  Vote,
  Leaf,
  Accessibility,
  Bookmark
} from 'lucide-react';
import { Category, Lesson, Language } from '../types';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface CategoriesViewProps {
  language: Language;
  completedLessonIds: string[];
  savedLessonIds: string[];
  onOpenLesson: (lesson: Lesson) => void;
  onStartQuiz: (lesson: Lesson) => void;
  searchQuery?: string;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  language,
  completedLessonIds,
  savedLessonIds,
  onOpenLesson,
  onStartQuiz,
  searchQuery = '',
}) => {
  const [filterText, setFilterText] = useState(searchQuery);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(CATEGORIES_DATA[0].id);

  // Icon mapping helper
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-yellow-400" };
    switch (iconName) {
      case 'Landmark': return <Landmark {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'PhoneCall': return <PhoneCall {...props} />;
      case 'Vote': return <Vote {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Accessibility': return <Accessibility {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const filteredCategories = CATEGORIES_DATA.filter((cat) => {
    const term = filterText.toLowerCase().trim();
    if (!term) return true;

    const matchCatTitle = cat.title.toLowerCase().includes(term) || cat.titleSv.toLowerCase().includes(term);
    const matchCatDesc = cat.description.toLowerCase().includes(term);
    const matchLessons = cat.lessons.some(
      (l) => l.title.toLowerCase().includes(term) || l.summary.toLowerCase().includes(term) || l.fullContent.toLowerCase().includes(term)
    );

    return matchCatTitle || matchCatDesc || matchLessons;
  });

  const totalLessonsCount = CATEGORIES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalCompletedCount = completedLessonIds.length;
  const overallProgressPercentage = Math.round((totalCompletedCount / totalLessonsCount) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Overview Header & Overall Progress */}
      <div className="bg-[#005293] p-6 sm:p-8 rounded-3xl shadow-md border-b-4 border-[#FECC00] flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
        <div className="space-y-3 text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-[#FECC00] text-[#005293] px-3.5 py-1 rounded-full text-xs font-black shadow-sm">
            <BookOpen className="w-4 h-4" />
            <span>17 قسم تعليمي متكامل لعام 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'sv' ? 'Samhällsorienteringskurser' : language === 'en' ? 'Community Orientation Lessons' : 'أقسام ودروس التوجيه المجتمعي السويدي'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed font-normal">
            استكشف الأقسام الرئيسية الـ 17 الشاملة، اقرأ الدروس المبسطة، واجتاز الاختبارات للحصول على شهادة إتمام التوجيه المعتمدة.
          </p>
        </div>

        {/* Progress Tracker Widget */}
        <div className="bg-[#003e70] border border-blue-400/30 p-5 rounded-2xl min-w-[250px] text-center space-y-2.5 shrink-0 z-10 shadow-lg">
          <div className="flex justify-between items-center text-xs font-bold text-blue-100">
            <span>تقدمك الكلي في الدورة</span>
            <span className="text-[#FECC00] font-black text-sm">{overallProgressPercentage}%</span>
          </div>
          <div className="w-full bg-[#002d52] h-3 rounded-full overflow-hidden p-0.5 border border-blue-400/20">
            <div
              className="bg-[#FECC00] h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-blue-200">
            إكمال <span className="font-bold text-[#FECC00]">{totalCompletedCount}</span> من أصل <span className="font-bold text-white">{totalLessonsCount}</span> درساً
          </p>
        </div>
      </div>

      {/* Filter / Search Control */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-[#005293] dark:text-[#FECC00] absolute right-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="ابحث في الأقسام والدروس (مثلاً: الإقامة، السوسيال، العمل، الضرائب، المدرسة)..."
          className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-2xl pr-12 pl-4 py-3 text-sm sm:text-base focus:outline-none focus:border-[#005293] dark:focus:border-[#FECC00] placeholder-slate-400 dark:placeholder-slate-500 shadow-md transition-all font-medium"
        />
      </div>

      {/* Category Accordion / Cards List */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => {
          const isExpanded = expandedCategoryId === cat.id;
          const completedInCat = cat.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
          const catProgress = Math.round((completedInCat / cat.lessons.length) * 100) || 0;

          return (
            <div
              key={cat.id}
              className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[#005293]"
            >
              {/* Category Header Row */}
              <button
                onClick={() => setExpandedCategoryId(isExpanded ? null : cat.id)}
                className="w-full p-5 sm:p-6 text-right flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3.5 bg-[#005293] text-[#FECC00] border border-[#005293] rounded-2xl shrink-0 shadow-sm">
                    {renderCategoryIcon(cat.iconName)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#FECC00] text-[#005293] px-3 py-0.5 rounded-full font-black shadow-xs">
                        {cat.badgeTag}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                        {cat.lessons.length} دروس تعليمية
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#005293] dark:text-white leading-snug">
                      {language === 'sv' ? cat.titleSv : language === 'en' ? cat.titleEn : cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-medium">
                      {language === 'sv' ? cat.descriptionSv : language === 'en' ? cat.descriptionEn : cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-black text-[#005293] dark:text-[#FECC00]">{catProgress}% مكتمل</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{completedInCat}/{cat.lessons.length} دروس تم اجتيازها</p>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-bold">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* Lessons Expansion Panel - Enhanced Comfort Background & High Legibility Typography */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950/80 border-t-2 border-[#005293]/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <p className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#005293] dark:text-[#FECC00]" />
                      <span>قائمة دروس هذا القسم ({cat.lessons.length} دروس):</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.lessons.map((lesson) => {
                      const isDone = completedLessonIds.includes(lesson.id);
                      const isSaved = savedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md ${
                            isDone
                              ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/70 text-slate-900 dark:text-slate-100'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-[#005293]'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-[#005293] dark:text-[#FECC00]" />
                                {lesson.readingTimeMinutes} دقائق قراءة
                              </span>

                              {isDone && (
                                <span className="bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  درس مكتمل
                                </span>
                              )}
                            </div>

                            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                              {language === 'sv' ? lesson.titleSv : language === 'en' ? lesson.titleEn : lesson.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {language === 'sv' ? lesson.summarySv : language === 'en' ? lesson.summaryEn : lesson.summary}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                            <button
                              onClick={() => onOpenLesson(lesson)}
                              className="bg-[#005293] hover:bg-[#003e70] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <BookOpen className="w-4 h-4 text-[#FECC00]" />
                              <span>قراءة تفاصيل الدرس</span>
                            </button>

                            <button
                              onClick={() => onStartQuiz(lesson)}
                              className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] border border-yellow-500/40 text-xs sm:text-sm font-black px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <HelpCircle className="w-4 h-4" />
                              <span>ابدأ الاختبار (5 أسئلة)</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
