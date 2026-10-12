import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  BookOpen, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface ProgressAnalyticsProps {
  language: Language;
  userProfile: UserProfile;
  onNavigateToCategories?: (categoryId?: string) => void;
}

export const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({
  language,
  userProfile,
  onNavigateToCategories,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'inProgress' | 'completed' | 'notStarted'>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'highest' | 'lowest'>('highest');

  // Compute stats for each category
  const categoriesStats = useMemo(() => {
    return CATEGORIES_DATA.map((cat) => {
      const totalLessons = cat.lessons.length;
      const completedLessons = cat.lessons.filter((l) =>
        userProfile.completedLessonIds.includes(l.id)
      ).length;
      const percentage = Math.round((completedLessons / totalLessons) * 100);

      // Category name according to selected language
      const title =
        language === 'sv'
          ? cat.titleSv
          : language === 'en'
          ? cat.titleEn
          : cat.title;

      // Short name for chart axis label (first 2-3 words)
      const shortTitle = title.split(' ').slice(0, 3).join(' ') + (title.split(' ').length > 3 ? '...' : '');

      return {
        id: cat.id,
        title,
        shortTitle,
        badgeTag: cat.badgeTag,
        totalLessons,
        completedLessons,
        percentage,
        iconName: cat.iconName,
      };
    });
  }, [userProfile.completedLessonIds, language]);

  // Overall calculations
  const totalLessonsCount = CATEGORIES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalCompletedCount = userProfile.completedLessonIds.length;
  const overallPercentage = Math.round((totalCompletedCount / totalLessonsCount) * 100) || 0;

  // Strengths (Highest completed)
  const strengths = useMemo(() => {
    return [...categoriesStats]
      .filter((c) => c.completedLessons > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  }, [categoriesStats]);

  // Areas for improvement (Lowest completed or zero progress)
  const areasForImprovement = useMemo(() => {
    return [...categoriesStats]
      .filter((c) => c.percentage < 100)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  }, [categoriesStats]);

  // Top Strength & Needs Attention for summary cards
  const topStrength = strengths[0];
  const topAreaToImprove = areasForImprovement[0];

  // Filtered & Sorted data for Recharts
  const chartData = useMemo(() => {
    let list = [...categoriesStats];

    if (filterMode === 'completed') {
      list = list.filter((c) => c.percentage === 100);
    } else if (filterMode === 'inProgress') {
      list = list.filter((c) => c.percentage > 0 && c.percentage < 100);
    } else if (filterMode === 'notStarted') {
      list = list.filter((c) => c.percentage === 0);
    }

    if (sortOrder === 'highest') {
      list.sort((a, b) => b.percentage - a.percentage);
    } else if (sortOrder === 'lowest') {
      list.sort((a, b) => a.percentage - b.percentage);
    }

    return list;
  }, [categoriesStats, filterMode, sortOrder]);

  // Bar color based on completion level
  const getBarColor = (percentage: number) => {
    if (percentage === 100) return '#10B981'; // Emerald (Done)
    if (percentage >= 50) return '#FECC00';  // Gold Yellow
    if (percentage > 0) return '#005293';   // Swedish Blue
    return '#94A3B8';                        // Slate Gray (0%)
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#002d52] border-2 border-[#FECC00] p-3 rounded-xl text-white shadow-xl text-right max-w-xs space-y-1">
          <div className="flex items-center justify-between gap-2 border-b border-blue-400/30 pb-1.5">
            <span className="text-[10px] bg-[#FECC00] text-[#005293] font-black px-2 py-0.5 rounded-full">
              {data.badgeTag}
            </span>
            <span className="text-xs font-black text-[#FECC00]">{data.percentage}%</span>
          </div>
          <p className="text-xs font-bold text-white pt-1">{data.title}</p>
          <p className="text-[11px] text-blue-200">
            تم إكمال <span className="font-bold text-[#FECC00]">{data.completedLessons}</span> من أصل <span className="font-bold text-white">{data.totalLessons}</span> درساً
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-6 rounded-3xl shadow-sm space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#005293]/10 dark:bg-blue-900/30 text-[#005293] dark:text-blue-300 px-3 py-0.5 rounded-full text-xs font-extrabold">
            <BarChart2 className="w-3.5 h-3.5 text-[#005293] dark:text-[#FECC00]" />
            <span>تحليلات الأداء والتقدم التفاعلية</span>
          </div>
          <h3 className="text-xl font-black text-[#005293] dark:text-white">
            مؤشر الإنجاز ونقاط القوة في المنهج (Progress Analytics)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            تتبع مستوى إنجازك في كل قسم من الأقسام الـ 17 للتعرف على نقاط قوتك والمواضيع المطلوبة لإكمال التوجيه.
          </p>
        </div>

        {onNavigateToCategories && (
          <button
            onClick={() => onNavigateToCategories()}
            className="bg-[#005293] hover:bg-[#003e70] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>عرض كافة الأقسام والدروس</span>
            <ArrowLeft className="w-4 h-4 text-[#FECC00]" />
          </button>
        )}
      </div>

      {/* Overview Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Completion */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>معدل التقدم العام</span>
            <TrendingUp className="w-4 h-4 text-[#005293] dark:text-blue-400" />
          </div>
          <p className="text-2xl font-black text-[#005293] dark:text-[#FECC00]">{overallPercentage}%</p>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-[#FECC00] h-full rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">
            {totalCompletedCount} من {totalLessonsCount} درس مكتمل
          </p>
        </div>

        {/* Top Strength */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>أبرز نقطة قوة لديك</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm font-black text-slate-800 dark:text-white truncate">
            {topStrength ? topStrength.title : 'لم تبدأ الدروس بعد'}
          </p>
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
            {topStrength ? `${topStrength.percentage}% إكمال (${topStrength.completedLessons}/${topStrength.totalLessons})` : 'ابدأ درسك الأول!'}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">
            أعلى نسبة تفاعل وإنجاز
          </p>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>مجال بحاجة لمتابعة</span>
            <Target className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-sm font-black text-slate-800 dark:text-white truncate">
            {topAreaToImprove ? topAreaToImprove.title : 'جميع الأقسام مكتملة!'}
          </p>
          <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
            {topAreaToImprove ? `${topAreaToImprove.percentage}% إكمال (${topAreaToImprove.completedLessons}/${topAreaToImprove.totalLessons})` : 'ممتاز جداً 🌟'}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">
            يوصى بدراسته للحصول على الشهادة
          </p>
        </div>

        {/* Active Categories Count */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>الأقسام المتفاعلة</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-[#005293] dark:text-purple-300">
            {categoriesStats.filter((c) => c.percentage > 0).length} / {CATEGORIES_DATA.length}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-2">
            أقسام قمت بالبدء أو الدراسة بها
          </p>
        </div>
      </div>

      {/* Recharts Bar Chart Controls & Visualization Container */}
      <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FECC00]" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">
              مخطط إنجاز الأقسام الـ 17 (%)
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Filter */}
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl font-bold">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'all' ? 'bg-[#005293] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                الكل ({CATEGORIES_DATA.length})
              </button>
              <button
                onClick={() => setFilterMode('inProgress')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'inProgress' ? 'bg-[#005293] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                قيد التعلم
              </button>
              <button
                onClick={() => setFilterMode('completed')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'completed' ? 'bg-[#005293] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                المكتملة
              </button>
              <button
                onClick={() => setFilterMode('notStarted')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'notStarted' ? 'bg-[#005293] text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                لم تبدأ
              </button>
            </div>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl font-bold focus:outline-none"
            >
              <option value="highest">الأعلى إنجازاً أولاً</option>
              <option value="lowest">الأقل إنجازاً أولاً</option>
              <option value="default">حسب الترتيب الأصلي</option>
            </select>
          </div>
        </div>

        {/* Recharts BarChart Render */}
        {chartData.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs font-bold space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-400" />
            <p>لا توجد أقسام مطابقة للفلتر المحدد.</p>
          </div>
        ) : (
          <div className="w-full h-80 pt-2 dir-ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis
                  dataKey="shortTitle"
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
                  height={70}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry) => (
                    <Cell key={entry.id} fill={getBarColor(entry.percentage)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Color Legend Footer */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>مكتمل 100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FECC00]"></span>
            <span>إنجاز متقدم (50-99%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#005293]"></span>
            <span>بدأت الدراسة (1-49%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
            <span>لم تبدأ بعد (0%)</span>
          </div>
        </div>
      </div>

      {/* Strengths & Areas for Improvement Grid Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Strengths Card */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 border-b border-emerald-200 dark:border-emerald-800/50 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h4 className="font-black text-sm">أقوى مجالات المعرفة لديك (Strengths)</h4>
          </div>

          {strengths.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
              أكمل دراسة دروس واختبارات القوانين لترى نقاط قوتك هنا.
            </p>
          ) : (
            <div className="space-y-3">
              {strengths.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 p-3 rounded-xl flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold px-2 py-0.5 rounded-full">
                      {item.badgeTag}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {item.title}
                    </h5>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {item.percentage}%
                    </span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {item.completedLessons}/{item.totalLessons} درس
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Areas for Growth & Actionable CTAs */}
        <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800/50 pb-3">
            <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <h4 className="font-black text-sm">مجالات موصى بمتابعتها (Areas for Improvement)</h4>
          </div>

          {areasForImprovement.length === 0 ? (
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-bold text-center py-4">
              أحسنت! لقد أتممت جميع الأقسام الـ 17 بنجاح 100%! 🎉
            </p>
          ) : (
            <div className="space-y-3">
              {areasForImprovement.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 p-3 rounded-xl flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold px-2 py-0.5 rounded-full">
                      {item.badgeTag}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {item.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-left">
                      <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                        {item.percentage}%
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.completedLessons}/{item.totalLessons} درس
                      </p>
                    </div>

                    {onNavigateToCategories && (
                      <button
                        onClick={() => onNavigateToCategories(item.id)}
                        className="bg-[#005293] hover:bg-[#003e70] text-white p-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                        title="دراسة هذا القسم الآن"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
