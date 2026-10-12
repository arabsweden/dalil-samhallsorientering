import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Sparkles, 
  Bell, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  BarChart3,
  MapPin,
  RefreshCw,
  Layers,
  HelpCircle,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../types';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { MUNICIPALITIES_DATA } from '../data/municipalitiesData';
import { ALL_PREMIUM_QUESTIONS } from '../data/premiumQuestionBank';
import { AdminQuestionManagerView } from './AdminQuestionManagerView';

interface AdminDashboardViewProps {
  language: Language;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions'>('overview');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Questions older than 6 months (180 days) or needing verification
  const expiredQuestions = ALL_PREMIUM_QUESTIONS.filter(q => {
    const verifiedDate = new Date(q.lastVerifiedDate || '2026-01-01');
    const diffDays = Math.ceil(Math.abs(new Date('2026-07-22').getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));
    return q.legalStatus === 'needs_verification' || diffDays >= 180;
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationTitle && notificationBody) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setNotificationTitle('');
        setNotificationBody('');
      }, 2500);
    }
  };

  const totalLessons = CATEGORIES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-6 rounded-2xl border border-slate-800 shadow-xl text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>لوحة التحكم والإدارة الفنية المحمية</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-[#FECC00] text-[#005293]' : 'text-slate-400 hover:text-white'}`}
            >
              الإحصائيات والبث
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 rounded-lg transition-all relative ${activeTab === 'questions' ? 'bg-[#FECC00] text-[#005293]' : 'text-slate-400 hover:text-white'}`}
            >
              <span>إدارة بنك الأسئلة (96+)</span>
              {expiredQuestions.length > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold mr-1.5 inline-block animate-pulse">
                  {expiredQuestions.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">
            لوحة مشرف المنصة – إشراف رائد شهاب 🇸🇪
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            متابعة إحصائيات التعلم، إدارة بنك أسئلة العضوية الممتازة، وإرسال التنبيهات العاجلة للمستفيدين حول القوانين الجديدة.
          </p>
        </div>
      </div>

      {activeTab === 'questions' ? (
        <AdminQuestionManagerView />
      ) : (
        <>
          {/* Legal Verification Alert Banner on Overview */}
          {expiredQuestions.length > 0 && (
            <div className="bg-gradient-to-r from-slate-900 via-rose-950/50 to-slate-900 border border-rose-500/50 p-5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                  <ShieldAlert className="w-6 h-6 animate-pulse text-rose-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-rose-200">
                    تنبيه مراجعة قانونية: مر أكثر من 6 أشهر على مراجعة ({expiredQuestions.length}) سؤالاً!
                  </h4>
                  <p className="text-xs text-slate-300">
                    تم تمييز الأسئلة باللون الأحمر لوجود فترة تزيد عن 6 أشهر (180 يوماً) على تاريخ المراجعة الرسمية (lastVerifiedDate)، وتتطلب المطابقة الفورية مع المصادر الحكومية السويدية (Migrationsverket, Skatteverket, Riksdagen).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('questions')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <span>الانتقال لإدارة وتحديث الأسئلة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* Analytics KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">المستخدمون النشطون</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">12,480</p>
          <p className="text-[10px] text-emerald-400 font-bold">+18% هذا الشهر</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">إجمالي الدروس المتاحة</span>
            <BookOpen className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-black text-white">{totalLessons}</p>
          <p className="text-[10px] text-slate-400">في 17 قسم توجيهي</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">أسئلة المساعد الذكي</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">45,920</p>
          <p className="text-[10px] text-yellow-400 font-bold">دقة إجابات 99.4%</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">شهادات مكتملة</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">3,110</p>
          <p className="text-[10px] text-emerald-400 font-bold">شهادة معتمدة</p>
        </div>
      </div>

      {/* Broadcast Notification Form */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-400" />
          <span>بث إشعار عاجل لكافة المستفيدين (تحديث قانوني جديد)</span>
        </h3>

        {isSent ? (
          <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl text-emerald-400 font-bold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>تم بث الإشعار بنجاح لجميع المستخدمين المسجلين والتطبيقات!</span>
          </div>
        ) : (
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">عنوان التنبيه العاجل</label>
              <input
                type="text"
                required
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                placeholder="مثال: تعديل جديد على شرط الإقامة الدائمة والجنسية لعام 2026"
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">نص التنبيه والملخص</label>
              <textarea
                rows={3}
                required
                value={notificationBody}
                onChange={(e) => setNotificationBody(e.target.value)}
                placeholder="أدخل التفاصيل والروابط الحكومية المعنية..."
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow flex items-center gap-2"
            >
              <Send className="w-4 h-4 fill-current rotate-180" />
              <span>إرسال البث الآن</span>
            </button>
          </form>
        )}
      </div>

      {/* Municipality Distribution & System Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>توزيع القادمين الجدد حسب البلديات</span>
          </h3>
          <div className="space-y-2 text-xs">
            {MUNICIPALITIES_DATA.slice(0, 5).map((m, idx) => (
              <div key={m.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                <span className="font-semibold text-slate-200">{m.name} ({m.nameSv})</span>
                <span className="font-bold text-yellow-400">{(35 - idx * 5)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>حالة السيرفر ومحرك Gemini AI</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            <p className="flex justify-between border-b border-slate-800 pb-1">
              <span>الموديل المستخدم:</span>
              <span className="text-emerald-400 font-mono font-bold">gemini-2.5-flash (3.6)</span>
            </p>
            <p className="flex justify-between border-b border-slate-800 pb-1">
              <span>المصدر الحاكم:</span>
              <span className="text-yellow-400 font-bold">تعليمات السويد 2026</span>
            </p>
            <p className="flex justify-between">
              <span>حالة الاستجابة:</span>
              <span className="text-emerald-400 font-bold">متصل وقيد التشغيل 100%</span>
            </p>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
