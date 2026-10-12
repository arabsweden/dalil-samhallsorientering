import React, { useState } from 'react';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Crown, 
  Lock, 
  Save, 
  RotateCcw, 
  AlertTriangle,
  HelpCircle,
  Building2,
  ExternalLink,
  Layers,
  Bell,
  Clock,
  ShieldAlert,
  CheckCircle,
  RefreshCw,
  Send
} from 'lucide-react';
import { PremiumQuestion, QuestionType, DifficultyLevel, LegalStatus, MembershipLevel } from '../types';
import { ALL_PREMIUM_QUESTIONS, COURSE_MODULES } from '../data/premiumQuestionBank';

export const AdminQuestionManagerView: React.FC = () => {
  const [questions, setQuestions] = useState<PremiumQuestion[]>(ALL_PREMIUM_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number | 'all'>('all');
  const [selectedMembershipFilter, setSelectedMembershipFilter] = useState<MembershipLevel | 'all'>('all');
  const [selectedVerificationFilter, setSelectedVerificationFilter] = useState<'all' | 'expired' | 'expiring_soon' | 'up_to_date'>('all');
  
  // Alert Notification State
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [editingQuestion, setEditingQuestion] = useState<PremiumQuestion | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<PremiumQuestion>>({
    moduleId: 1,
    moduleTitle: 'تاريخ السويد والديمقراطية ودولة القانون',
    questionType: 'mcq',
    questionArabic: '',
    swedishTerm: '',
    choices: ['', '', '', ''],
    correctAnswer: 0,
    explanationArabic: '',
    practicalAdvice: '',
    authorityName: 'مصلحة الهجرة السويدية',
    officialSourceUrl: 'https://www.migrationsverket.se',
    difficulty: 'beginner',
    legalStatus: 'current_law',
    lastVerifiedDate: '2026-07-22',
    membershipLevel: 'individual_premium',
    isActive: true,
  });

  // Calculate Legal Verification Status helper (6 Months / 180 Days Threshold)
  const getVerificationStatus = (question: PremiumQuestion) => {
    const currentDate = new Date('2026-07-22');
    const verifiedDate = new Date(question.lastVerifiedDate || '2026-01-01');
    const diffTime = Math.abs(currentDate.getTime() - verifiedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isOverSixMonths = diffDays >= 180 || question.legalStatus === 'needs_verification';

    if (isOverSixMonths) {
      return {
        status: 'expired' as const,
        label: '🔴 مر عليها أكثر من 6 أشهر (تستوجب التحديث)',
        badgeClass: 'bg-rose-500/30 text-rose-200 border-rose-500 font-extrabold animate-pulse',
        rowBg: 'bg-rose-950/40 border-r-8 border-r-rose-600 shadow-md',
        days: diffDays,
        isOverSixMonths: true,
      };
    } else if (question.legalStatus === 'proposal_investigation' || diffDays > 90) {
      return {
        status: 'expiring_soon' as const,
        label: '🟡 تقترب من 6 أشهر (بين 3 و 6 أشهر)',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold',
        rowBg: 'bg-amber-950/20 border-r-4 border-r-amber-500',
        days: diffDays,
        isOverSixMonths: false,
      };
    }
    return {
      status: 'up_to_date' as const,
      label: '🟢 محققة ومحدثة (< 6 أشهر)',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold',
      rowBg: '',
      days: diffDays,
      isOverSixMonths: false,
    };
  };

  // Stats Counters
  const expiredCount = questions.filter(q => getVerificationStatus(q).status === 'expired').length;
  const expiringCount = questions.filter(q => getVerificationStatus(q).status === 'expiring_soon').length;
  const upToDateCount = questions.filter(q => getVerificationStatus(q).status === 'up_to_date').length;

  // Filtered List
  const filteredList = questions.filter(q => {
    if (selectedModuleFilter !== 'all' && q.moduleId !== selectedModuleFilter) return false;
    if (selectedMembershipFilter !== 'all' && q.membershipLevel !== selectedMembershipFilter) return false;
    
    const vStatus = getVerificationStatus(q).status;
    if (selectedVerificationFilter !== 'all' && vStatus !== selectedVerificationFilter) return false;

    if (searchQuery.trim()) {
      const sq = searchQuery.toLowerCase();
      return (
        q.questionArabic.toLowerCase().includes(sq) ||
        q.swedishTerm.toLowerCase().includes(sq) ||
        q.authorityName.toLowerCase().includes(sq)
      );
    }
    return true;
  });

  const handleSendAdminReviewAlert = () => {
    setIsAlertSent(true);
    setAlertMessage(`تم إرسال تنبيه عاجل للمسؤول بضرورة إعادة مراجعة وتحديث (${expiredCount + expiringCount}) سؤالاً قانونياً بناءً على المصادر الحكومية السويدية الرسمية.`);
    setTimeout(() => {
      setIsAlertSent(false);
    }, 4000);
  };

  const handleBatchRenewExpired = () => {
    if (confirm(`هل أنت تأكد من تجديد تاريخ المراجعة لجميع الأسئلة التي قاربت على الانتهاء (${expiredCount + expiringCount} سؤالاً) لتصبح محققة بتاريخ اليوم؟`)) {
      const todayStr = '2026-07-22';
      setQuestions(prev => prev.map(q => {
        const v = getVerificationStatus(q).status;
        if (v === 'expired' || v === 'expiring_soon') {
          return {
            ...q,
            lastVerifiedDate: todayStr,
            legalStatus: 'current_law',
          };
        }
        return q;
      }));
      alert('تم تحديث تاريخ المراجعة القانونية لجميع الأسئلة المحددة بنجاح!');
    }
  };

  const handleRenewSingleQuestion = (questionId: string) => {
    const todayStr = '2026-07-22';
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          lastVerifiedDate: todayStr,
          legalStatus: 'current_law',
        };
      }
      return q;
    }));
  };

  const handleOpenAdd = () => {
    setFormData({
      id: 'q-custom-' + Date.now(),
      moduleId: 1,
      moduleTitle: 'تاريخ السويد والديمقراطية ودولة القانون',
      questionType: 'mcq',
      questionArabic: '',
      swedishTerm: '',
      choices: ['', '', '', ''],
      correctAnswer: 0,
      explanationArabic: '',
      practicalAdvice: '',
      authorityName: 'مصلحة الهجرة السويدية',
      officialSourceUrl: 'https://www.migrationsverket.se',
      difficulty: 'beginner',
      legalStatus: 'current_law',
      lastVerifiedDate: '2026-07-22',
      membershipLevel: 'individual_premium',
      isActive: true,
    });
    setEditingQuestion(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (question: PremiumQuestion) => {
    setEditingQuestion(question);
    setFormData({ ...question });
    setIsAddModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.questionArabic || !formData.swedishTerm) {
      alert('الرجاء إدخال نص السؤال والمصطلح السويدي.');
      return;
    }

    const mod = COURSE_MODULES.find(m => m.id === Number(formData.moduleId));
    const fullQuestion: PremiumQuestion = {
      id: formData.id || 'q-' + Date.now(),
      moduleId: Number(formData.moduleId) || 1,
      moduleTitle: mod ? mod.title : 'تاريخ السويد والديمقراطية ودولة القانون',
      questionType: formData.questionType as QuestionType || 'mcq',
      questionArabic: formData.questionArabic || '',
      swedishTerm: formData.swedishTerm || '',
      choices: formData.choices && formData.choices.length >= 2 ? formData.choices : ['نعم', 'لا', '', ''],
      correctAnswer: Number(formData.correctAnswer) || 0,
      explanationArabic: formData.explanationArabic || '',
      practicalAdvice: formData.practicalAdvice || '',
      authorityName: formData.authorityName || 'مصلحة رسمية',
      officialSourceUrl: formData.officialSourceUrl || 'https://www.informationsverige.se',
      difficulty: formData.difficulty as DifficultyLevel || 'beginner',
      legalStatus: formData.legalStatus as LegalStatus || 'current_law',
      lastVerifiedDate: formData.lastVerifiedDate || '2026-07-22',
      membershipLevel: formData.membershipLevel as MembershipLevel || 'individual_premium',
      isActive: formData.isActive !== false,
    };

    if (editingQuestion) {
      setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? fullQuestion : q));
    } else {
      setQuestions(prev => [fullQuestion, ...prev]);
    }

    setIsAddModalOpen(false);
    alert('تم حفظ السؤال بنجاح وتحديث بنك الأسئلة!');
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا السؤال من بنك الأسئلة؟')) {
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  const handleToggleActive = (questionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, isActive: !q.isActive };
      }
      return q;
    }));
  };

  return (
    <div className="space-y-6 text-white">
      {/* Legal Verification Alert Warning Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/50 p-6 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-black">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>نظام مراقبة صلاحية وتجديد النصوص القانونية السويدية 2026</span>
            </div>
            <h3 className="text-xl font-black text-white">
              مراجعة وتحديث الأسئلة ذات الصلاحية المنتهية
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              تنبيه فني للمسؤول: توجد أسئلة مضى على مراجعتها أكثر من 30-60 يوماً أو ترتبط بمقترحات اتفاق تيدو، وتتطلب إعادة التحقق من المصادر الرسمية (Migrationsverket, Skatteverket, Socialstyrelsen, DO).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSendAdminReviewAlert}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Bell className="w-4 h-4" />
              إرسال تنبيه للمسؤول بالأسئلة المنتهية
            </button>

            <button
              onClick={handleBatchRenewExpired}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              تجديد المراجعة للجميع الآن
            </button>
          </div>
        </div>

        {/* Verification Stats Summary Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
          <button
            onClick={() => setSelectedVerificationFilter('expired')}
            className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
              selectedVerificationFilter === 'expired' 
                ? 'bg-rose-950 border-rose-500 text-white ring-2 ring-rose-500/50' 
                : 'bg-slate-950/80 border-slate-800 text-rose-300 hover:border-rose-500/50'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">🔴 تحتاج مراجعة عاجلة</span>
              <strong className="text-xl font-black text-rose-400">{expiredCount} سؤالاً</strong>
            </div>
            <Clock className="w-6 h-6 text-rose-400 opacity-80" />
          </button>

          <button
            onClick={() => setSelectedVerificationFilter('expiring_soon')}
            className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
              selectedVerificationFilter === 'expiring_soon' 
                ? 'bg-amber-950 border-amber-500 text-white ring-2 ring-amber-500/50' 
                : 'bg-slate-950/80 border-slate-800 text-amber-300 hover:border-amber-500/50'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">🟡 قاربت على الانتهاء</span>
              <strong className="text-xl font-black text-amber-400">{expiringCount} سؤالاً</strong>
            </div>
            <AlertTriangle className="w-6 h-6 text-amber-400 opacity-80" />
          </button>

          <button
            onClick={() => setSelectedVerificationFilter('up_to_date')}
            className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
              selectedVerificationFilter === 'up_to_date' 
                ? 'bg-emerald-950 border-emerald-500 text-white ring-2 ring-emerald-500/50' 
                : 'bg-slate-950/80 border-slate-800 text-emerald-300 hover:border-emerald-500/50'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">🟢 محدثة بالكامل</span>
              <strong className="text-xl font-black text-emerald-400">{upToDateCount} سؤالاً</strong>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-400 opacity-80" />
          </button>
        </div>

        {/* Alert Trigger Toast Feedback */}
        {isAlertSent && alertMessage && (
          <div className="p-3 bg-rose-950 border border-rose-500 rounded-2xl text-rose-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Bell className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{alertMessage}</span>
          </div>
        )}
      </div>

      {/* Top Controls Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FECC00]" />
              إدارة بنك أسئلة العضوية الفردية الممتازة
            </h3>
            <p className="text-xs text-slate-400">
              إجمالي الأسئلة في النظام: <strong className="text-emerald-400 font-bold">{questions.length} سؤالاً</strong> (موزعة على 8 وحدات)
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            إضافة سؤال جديد
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث بنص السؤال أو المصطلح..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pr-9 pl-3 py-2 focus:outline-none focus:border-[#FECC00]"
            />
          </div>

          <select
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">جميع الوحدات التعليمية (8)</option>
            {COURSE_MODULES.map(m => (
              <option key={m.id} value={m.id}>الوحدة {m.id}: {m.title}</option>
            ))}
          </select>

          <select
            value={selectedMembershipFilter}
            onChange={(e) => setSelectedMembershipFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">جميع مستويات الصلاحية</option>
            <option value="free">مجاني (Free Tier)</option>
            <option value="individual_premium">ممتاز (Individual Premium)</option>
          </select>

          <select
            value={selectedVerificationFilter}
            onChange={(e) => setSelectedVerificationFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 focus:outline-none font-bold"
          >
            <option value="all">جميع حالات المراجعة القانونية</option>
            <option value="expired">🔴 منتهية الصلاحية (تحتاج مراجعة)</option>
            <option value="expiring_soon">🟡 قاربت على الانتهاء</option>
            <option value="up_to_date">🟢 محدثة ومحققة بالكامل</option>
          </select>
        </div>
      </div>

      {/* Questions Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">الوحدة</th>
                <th className="p-4">السؤال والمصطلح السويدي</th>
                <th className="p-4">تاريخ المراجعة القانونية</th>
                <th className="p-4">الصلاحية والنوع</th>
                <th className="p-4">الجهة الرسمية</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              {filteredList.map((q) => {
                const vInfo = getVerificationStatus(q);

                return (
                  <tr key={q.id} className={`hover:bg-slate-800/50 transition-colors ${vInfo.rowBg}`}>
                    <td className="p-4">
                      <span className="bg-blue-950 text-blue-300 font-bold px-2 py-1 rounded-md border border-blue-800/50">
                        وحدة {q.moduleId}
                      </span>
                    </td>

                    <td className="p-4 space-y-1 max-w-xs sm:max-w-md">
                      <p className="font-bold text-white line-clamp-2">{q.questionArabic}</p>
                      <p className="text-[11px] text-blue-300 font-mono">🇸🇪 {q.swedishTerm}</p>
                    </td>

                    <td className="p-4 space-y-1">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] border ${vInfo.badgeClass}`}>
                        {vInfo.status === 'expired' && <ShieldAlert className="w-3 h-3 text-rose-400" />}
                        {vInfo.status === 'expiring_soon' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                        {vInfo.status === 'up_to_date' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {vInfo.label}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        آخر تحقق: {q.lastVerifiedDate} ({vInfo.days} يوماً)
                      </p>
                    </td>

                    <td className="p-4 space-y-1">
                      {q.membershipLevel === 'free' ? (
                        <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold block w-max">
                          مجاني
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 w-max">
                          <Crown className="w-3 h-3" /> مميز
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-bold block">{q.questionType}</span>
                    </td>

                    <td className="p-4 text-slate-300">{q.authorityName}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(q.id)}
                        className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
                          q.isActive 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-rose-950 text-rose-400 border-rose-800'
                        }`}
                      >
                        {q.isActive ? 'مفعل' : 'معطل'}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => handleRenewSingleQuestion(q.id)}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] rounded-lg border border-emerald-400/40 shadow flex items-center gap-1 transition-all shrink-0"
                          title="تأكيد وتجديد تاريخ المراجعة القانونية لليوم (2026-07-22)"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>تحديث الحالة</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg"
                          title="تعديل السؤال والمصدر الرسمى"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-900/50 text-rose-400 rounded-lg"
                          title="حذف السؤال"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for Add/Edit Question */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl my-auto text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base">
                {editingQuestion ? 'تعديل سؤال في بنك الأسئلة' : 'إنشاء سؤال جديد لبرنامج التوجيه المجتمعي'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">الوحدة التعليمية</label>
                  <select
                    value={formData.moduleId}
                    onChange={(e) => setFormData({ ...formData, moduleId: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                  >
                    {COURSE_MODULES.map(m => (
                      <option key={m.id} value={m.id}>الوحدة {m.id}: {m.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">مستوى الصلاحية</label>
                  <select
                    value={formData.membershipLevel}
                    onChange={(e) => setFormData({ ...formData, membershipLevel: e.target.value as MembershipLevel })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                  >
                    <option value="individual_premium">العضوية الممتازة (Individual Premium)</option>
                    <option value="free">المستخدم المجاني (Free Tier)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">نص السؤال بالعربية الواضحة</label>
                <input
                  type="text"
                  required
                  value={formData.questionArabic || ''}
                  onChange={(e) => setFormData({ ...formData, questionArabic: e.target.value })}
                  placeholder="أدخل السؤال كاملاً..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">المصطلح السويدي المعتمد</label>
                <input
                  type="text"
                  required
                  value={formData.swedishTerm || ''}
                  onChange={(e) => setFormData({ ...formData, swedishTerm: e.target.value })}
                  placeholder="مثال: Allemansrätten / Folkbokföring"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                />
              </div>

              {/* Choices input */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300">الخيارات الأربعة (أدخل الخيار الصحيح وحدد دليله)</label>
                {formData.choices?.map((choice, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoiceRadio"
                      checked={formData.correctAnswer === idx}
                      onChange={() => setFormData({ ...formData, correctAnswer: idx })}
                    />
                    <input
                      type="text"
                      required
                      value={choice}
                      onChange={(e) => {
                        const newChoices = [...(formData.choices || [])];
                        newChoices[idx] = e.target.value;
                        setFormData({ ...formData, choices: newChoices });
                      }}
                      placeholder={`الخيار (${String.fromCharCode(65 + idx)})`}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">الشرح والتوضيح القانوني بالعربية</label>
                <textarea
                  rows={2}
                  required
                  value={formData.explanationArabic || ''}
                  onChange={(e) => setFormData({ ...formData, explanationArabic: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">تاريخ آخر مراجعة قانونية</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={formData.lastVerifiedDate || '2026-07-22'}
                      onChange={(e) => setFormData({ ...formData, lastVerifiedDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, lastVerifiedDate: '2026-07-22', legalStatus: 'current_law' })}
                      className="px-3 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs shrink-0 font-bold"
                    >
                      تاريخ اليوم
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">الوضع القانوني للنص</label>
                  <select
                    value={formData.legalStatus || 'current_law'}
                    onChange={(e) => setFormData({ ...formData, legalStatus: e.target.value as LegalStatus })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                  >
                    <option value="current_law">قانون نافذ حالياً</option>
                    <option value="adopted_decision">قرار معتمد بانتظار التطبيق</option>
                    <option value="proposal_investigation">مقترح/تحقيق حكومي (اتفاق تيدو)</option>
                    <option value="needs_verification">تحتاج مراجعة رسمية عاجلة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">اسم الجهة الرسمية</label>
                  <input
                    type="text"
                    value={formData.authorityName || ''}
                    onChange={(e) => setFormData({ ...formData, authorityName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">رابط المصدر الرسمي</label>
                  <input
                    type="url"
                    value={formData.officialSourceUrl || ''}
                    onChange={(e) => setFormData({ ...formData, officialSourceUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FECC00] text-[#005293] font-black rounded-xl shadow-lg"
                >
                  حفظ السؤال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

