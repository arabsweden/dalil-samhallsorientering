import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Shield, 
  Download, 
  Trash2, 
  MapPin, 
  Bell, 
  Lock,
  ChevronDown,
  ChevronUp,
  LogIn,
  LogOut,
  UserCheck,
  UserX,
  Key,
  Check,
  Save,
  Globe,
  FileText,
  BookOpen,
  Edit3
} from 'lucide-react';
import { UserProfile, AIAnswer, Language, Municipality } from '../types';
import { BADGES_DATA } from '../data/badgesData';
import { MUNICIPALITIES_DATA } from '../data/municipalitiesData';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ProgressAnalytics } from './ProgressAnalytics';

interface ProfileViewProps {
  language: Language;
  userProfile: UserProfile;
  selectedMunicipality: Municipality;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onOpenCertificate: () => void;
  onOpenSubscription: () => void;
  savedAnswers: AIAnswer[];
  onRemoveAnswer: (id: string) => void;
  onNavigateToCategories?: (categoryId?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  language,
  userProfile,
  selectedMunicipality,
  onUpdateProfile,
  onOpenCertificate,
  onOpenSubscription,
  savedAnswers,
  onRemoveAnswer,
  onNavigateToCategories,
}) => {
  const [userName, setUserName] = useState(userProfile.name || 'زائر متميز');
  const [userEmail, setUserEmail] = useState(userProfile.email || 'guest@sverige.se');
  const [userPassword, setUserPassword] = useState('••••••••');
  const [isGuestMode, setIsGuestMode] = useState<boolean>(userProfile.isGuest ?? (userProfile.email === 'guest@sverige.se' || userProfile.name === 'زائر متميز'));
  const [expandedAnswerId, setExpandedAnswerId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const totalLessons = CATEGORIES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = userProfile.completedLessonIds.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100) || 0;

  // Login as Registered User
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      setStatusMessage('يرجى إدخال الاسم والبريد الإلكتروني بشكل صحيح.');
      return;
    }

    const updatedProfile: Partial<UserProfile> = {
      name: userName.trim(),
      email: userEmail.trim(),
      isGuest: false,
    };

    onUpdateProfile(updatedProfile);
    setIsGuestMode(false);
    setStatusMessage('تم تسجيل الدخول وحفظ البيانات في LocalStorage بنجاح! 🎉');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setStatusMessage(null);
    }, 3000);
  };

  // Switch to Guest Mode
  const handleSwitchToGuest = () => {
    const updatedProfile: Partial<UserProfile> = {
      isGuest: true,
      name: 'زائر متميز',
      email: 'guest@sverige.se',
    };
    setUserName('زائر متميز');
    setUserEmail('guest@sverige.se');
    setIsGuestMode(true);
    onUpdateProfile(updatedProfile);
    setStatusMessage('تم التحديث إلى "وضع الزائر". البيانات ستبقى مخزنة مؤقتاً بالمتصفح.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Switch back to Registered mode
  const handleSwitchToRegistered = () => {
    setIsGuestMode(false);
    if (userName === 'زائر متميز') setUserName('رائد شهاب');
    if (userEmail === 'guest@sverige.se') setUserEmail('raed@example.se');
  };

  const handleGDPRDataExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Sweden-Community-UserData-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Mode Switcher Banner (Guest vs Registered User) */}
      <div className="bg-[#005293] p-6 rounded-3xl shadow-xl border-b-4 border-[#FECC00] text-white space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-blue-400/30 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isGuestMode ? 'bg-amber-500/20 text-[#FECC00] border border-amber-400/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'}`}>
              {isGuestMode ? <UserX className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  {isGuestMode ? 'وضع الزائر (Guest Mode)' : 'حساب مستخدم مسجل (Registered User)'}
                </h2>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isGuestMode ? 'bg-[#FECC00] text-[#005293]' : 'bg-emerald-400 text-slate-950'}`}>
                  {isGuestMode ? 'زائر مؤقت' : 'حساب دائم'}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                {isGuestMode 
                  ? 'أنت تتصفح المنصة حالياً كزائر. سجل دخولك لحفظ أوسمتك وشهاداتك بشكل دائم في LocalStorage.' 
                  : 'بياناتك محفوظة وآمنة محلياً في ذاكرة متصفحك طبقاً للائحة GDPR الأوروبية.'}
              </p>
            </div>
          </div>

          {/* Mode Switch Buttons */}
          <div className="flex bg-[#003e70] p-1.5 rounded-2xl border border-blue-400/30 text-xs font-bold shrink-0">
            <button
              onClick={handleSwitchToRegistered}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                !isGuestMode ? 'bg-[#FECC00] text-[#005293] shadow-md' : 'text-blue-200 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>مستخدم مسجل</span>
            </button>

            <button
              onClick={handleSwitchToGuest}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                isGuestMode ? 'bg-[#FECC00] text-[#005293] shadow-md' : 'text-blue-200 hover:text-white'
              }`}
            >
              <UserX className="w-3.5 h-3.5" />
              <span>وضع الزائر</span>
            </button>
          </div>
        </div>

        {/* Simplified Login & Quick Account Setup Form */}
        <div className="bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-[#FECC00] flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span>{isGuestMode ? 'تسجيل الدخول السريع / إنشاء حساب جديد' : 'تحديث بيانات الحساب المسجل'}</span>
          </h3>

          <form onSubmit={handleLoginSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-blue-100">الاسم الكامل</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="أدخل اسمك الكريم..."
                className="w-full bg-[#002d52] border border-blue-400/40 text-white placeholder-blue-300/60 text-xs rounded-xl p-3 focus:outline-none focus:border-[#FECC00]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-blue-100">البريد الإلكتروني</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.se"
                className="w-full bg-[#002d52] border border-blue-400/40 text-white placeholder-blue-300/60 text-xs rounded-xl p-3 focus:outline-none focus:border-[#FECC00]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-blue-100">كلمة المرور / الرمز السري</label>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#002d52] border border-blue-400/40 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-[#FECC00]"
              />
            </div>

            <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-blue-400/20">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-[#FECC00] hover:bg-yellow-300 text-[#005293] font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isGuestMode ? 'تسجيل الدخول وتفعيل الحساب' : 'حفظ البيانات في LocalStorage'}</span>
                </button>

                {!isGuestMode && (
                  <button
                    type="button"
                    onClick={handleSwitchToGuest}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>تسجيل الخروج (العودة لزائر)</span>
                  </button>
                )}
              </div>

              {statusMessage && (
                <span className="text-xs text-[#FECC00] font-bold bg-[#002d52] px-3 py-1.5 rounded-lg border border-blue-400/30">
                  {statusMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-slate-800 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="w-16 h-16 rounded-2xl bg-[#FECC00] p-1 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-[#005293] rounded-xl flex items-center justify-center font-black text-2xl text-[#FECC00]">
              {userName.charAt(0) || 'U'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-[#005293] dark:text-white">{userName}</h2>
              <span className="bg-[#FECC00] text-[#005293] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                {userProfile.subscriptionPlan === 'free' ? 'العضوية الأساسية' : 'العضوية الممتازة Pro'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">{userEmail}</p>
            <p className="text-xs text-[#005293] dark:text-yellow-400 font-bold">البلدية الحالية: {selectedMunicipality.name}</p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-center min-w-[90px]">
            <p className="text-xl font-black text-[#005293] dark:text-yellow-400">{userProfile.xpPoints}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">نقاط الخبرة XP</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-center min-w-[90px]">
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{progressPct}%</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">إتمام الدروس</p>
          </div>

          <button
            onClick={onOpenCertificate}
            className="p-3 bg-[#FECC00] hover:bg-yellow-300 text-[#005293] rounded-2xl text-center min-w-[90px] transition-colors shadow"
          >
            <Award className="w-6 h-6 mx-auto mb-1 text-[#005293]" />
            <p className="text-[10px] font-black">عرض الشهادة</p>
          </button>
        </div>
      </div>

      {/* Progress Analytics Component (Recharts) */}
      <ProgressAnalytics
        language={language}
        userProfile={userProfile}
        onNavigateToCategories={onNavigateToCategories}
      />

      {/* Gamification Badges Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#005293] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FECC00]" />
          <span>الأوسمة والشارات المكتسبة ({userProfile.earnedBadgeIds.length} من {BADGES_DATA.length})</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES_DATA.map((badge) => {
            const isEarned = userProfile.earnedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                  isEarned
                    ? 'bg-amber-50 dark:bg-yellow-950/20 border-yellow-400 dark:border-yellow-500/50 text-slate-800 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-snug">{badge.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{badge.description}</p>
                {isEarned && (
                  <span className="inline-block bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    مكتسب 🎉
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved AI Answers Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#005293] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#005293] dark:text-blue-400" />
          <span>الاستشارات والأجوبة المحفوظة بحسابك ({savedAnswers.length})</span>
        </h3>

        {savedAnswers.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
            لم تقم بحفظ أي استشارة بعد. يمكنك حفظ أجوبة المساعد الذكي بالنقر على زر "حفظ" في شاشة المساعد الذكي.
          </p>
        ) : (
          <div className="space-y-3">
            {savedAnswers.map((ans) => {
              const isExpanded = expandedAnswerId === ans.id;

              return (
                <div key={ans.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => setExpandedAnswerId(isExpanded ? null : ans.id)}
                      className="text-right space-y-1 hover:text-[#005293] dark:hover:text-yellow-300 transition-colors"
                    >
                      <span className="text-[10px] text-[#005293] dark:text-yellow-400 font-bold bg-[#005293]/10 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">
                        {ans.relatedCategory || 'عام'}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">{ans.question}</h4>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setExpandedAnswerId(isExpanded ? null : ans.id)}
                        className="p-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => onRemoveAnswer(ans.id)}
                        className="p-1.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg text-xs hover:bg-red-200 dark:hover:bg-red-900/60"
                        title="حذف من المحفوظات"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-300 animate-fadeIn">
                      <p className="font-semibold text-[#005293] dark:text-yellow-300">الملخص: {ans.summary}</p>
                      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg whitespace-pre-line text-slate-700 dark:text-slate-200">
                        {ans.detailedAnswer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Lesson Notes Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#005293] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-yellow-500" />
          <span>ملاحظاتي المدونة على الدروس ({Object.entries(userProfile.lessonNotes || {}).filter(([_, text]) => typeof text === 'string' && text.trim().length > 0).length})</span>
        </h3>

        {Object.entries(userProfile.lessonNotes || {}).filter(([_, text]) => typeof text === 'string' && text.trim().length > 0).length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
            لم تقم بتدوين أي ملاحظات شخصية على الدروس بعد. يمكنك فتح أي درس وإضافة ملاحظاتك وتلخيصاتك الخاصة لحفظها هنا للرجوع إليها مستقبلاً.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(userProfile.lessonNotes || {})
              .filter(([_, text]) => typeof text === 'string' && text.trim().length > 0)
              .map(([lessonId, noteText]) => {
                const lesson = CATEGORIES_DATA.flatMap(c => c.lessons).find(l => l.id === lessonId);
                const title = lesson ? (language === 'sv' ? lesson.titleSv : language === 'en' ? lesson.titleEn : lesson.title) : lessonId;
                const titleSv = lesson?.titleSv;

                return (
                  <div key={lessonId} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold text-[#005293] dark:text-yellow-400 bg-blue-100 dark:bg-yellow-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>درس تعليمي</span>
                        </span>

                        <button
                          onClick={() => {
                            const updatedNotes = { ...userProfile.lessonNotes };
                            delete updatedNotes[lessonId];
                            onUpdateProfile({ lessonNotes: updatedNotes });
                          }}
                          className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                          title="حذف الملاحظة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                        {title}
                      </h4>
                      {titleSv && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                          🇸🇪 {titleSv}
                        </p>
                      )}

                      <div className="mt-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                        "{noteText}"
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Account Settings & GDPR Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white p-6 rounded-2xl shadow-sm space-y-6">
        <h3 className="text-base font-bold text-[#005293] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#FECC00]" />
          <span>إعدادات الحساب وحماية البيانات GDPR</span>
        </h3>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>تلتزم المنصة بتشريعات حماية البيانات الأوروبية (GDPR). يتم حفظ بياناتك محلياً بالكامل.</p>

          <button
            onClick={handleGDPRDataExport}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors font-bold"
          >
            <Download className="w-4 h-4 text-[#005293] dark:text-yellow-400" />
            <span>تصدير نسخة كاملة من بياناتك (GDPR Export)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
