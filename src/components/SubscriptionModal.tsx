import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Award, Zap } from 'lucide-react';
import { Language, UserProfile } from '../types';

interface SubscriptionModalProps {
  language: Language;
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'free' | 'premium' | 'pro') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  language,
  userProfile,
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [activated, setActivated] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 'premium' | 'pro'>('premium');

  if (!isOpen) return null;

  const handleActivate = (plan: 'free' | 'premium' | 'pro') => {
    setSelectedPlanId(plan);
    setActivated(true);
    setTimeout(() => {
      onSelectPlan(plan);
      setActivated(false);
      onClose();
    }, 1500);
  };

  const plans = [
    {
      id: 'free',
      title: 'العضوية الأساسية المجانية',
      price: '0 SEK',
      period: 'مجاناً مدى الحياة',
      badge: 'الأساسية',
      isPopular: false,
      features: [
        'تصفح كافة الأقسام والدروس الـ 17',
        'اجتياز اختبارات التقييم القاتمة',
        'الوصول لأرقام ودليل الطوارئ والجهات',
        'تنبيهات تحديثات القوانين السويدية 2026',
      ],
    },
    {
      id: 'premium',
      title: 'العضوية الفردية الممتازة',
      price: '99 SEK',
      period: 'شهرية - إلغاء في أي وقت',
      badge: 'الأكثر شعبية 🎉',
      isPopular: true,
      features: [
        'أسئلة ألا محدودة لمساعد الذكاء الاصطناعي',
        'استخراج وتحميل شهادة التوجيه المجتمعي الرسمية PDF',
        'حفظ وتنظيم كافة الإجابات واستشارات الملف الشخصي',
        'أولوية الإجابة والدعم المباشر من خبراء التوجيه',
        'قراءة صوتية ناطقة لكافة الدروس والإجابات',
      ],
    },
    {
      id: 'pro',
      title: 'باقة البلديات والجمعيات Pro',
      price: '1,499 SEK',
      period: 'سنوية - للمؤسسات والجمعيات',
      badge: 'للمؤسسات والجمعيات',
      isPopular: false,
      features: [
        'تراخيص استخدام متعددة لكافة القادمين الجدد',
        'لوحة تحكم إدارية لتتبع نسبة إتمام الدورات',
        'ورش عمل ودورات توجيه مخصصة لبلديتك',
        'تقرير إحصائي شهري معتمد للبلدية',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-4xl w-full min-w-0 shadow-2xl overflow-hidden my-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-yellow-500/20 text-yellow-400 rounded-xl border border-yellow-500/30">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-black text-white text-lg">باقات العضوية والدعم المجتمعي 🇸🇪</h3>
              <p className="text-xs text-slate-400">اختر الباقة المناسبة لتفعيل كامل المزايا المتقدمة</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {activated ? (
          <div className="text-center py-12 space-y-3 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white">تم تفعيل الباقة بنجاح!</h4>
            <p className="text-xs text-slate-300">جاري توجيهك وتحديث حسابك بالمزايا الجديدة...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between gap-6 relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 border-yellow-500/80 shadow-2xl ring-2 ring-yellow-500/30'
                    : 'bg-slate-900/80 border-slate-800 text-slate-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-bold text-base text-white">{plan.title}</h4>
                  <div>
                    <p className="text-3xl font-black text-yellow-400">{plan.price}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{plan.period}</p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActivate(plan.id as any)}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {userProfile.subscriptionPlan === plan.id ? 'الباقة الحالية' : 'اختيار وتفعيل الآن (Swish / Card)'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
