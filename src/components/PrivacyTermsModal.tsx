import React from 'react';
import { X, ShieldCheck, Lock, FileText, Check } from 'lucide-react';
import { Language } from '../types';

interface PrivacyTermsModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-3xl w-full min-w-0 shadow-2xl overflow-hidden my-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold text-white text-base">سياسة الخصوصية وحماية البيانات GDPR وشروط الاستخدام</h3>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">1. حماية البيانات الشخصية طبقاً للائح الأوروبية (GDPR)</h4>
            <p>
              نلتزم في منصة دليل التوجيه المجتمعي بالسويد بحماية كافة بياناتك الشخصية برعايتها وعدم مشاركتها مع أي طرف ثالث لأغراض تجارية. تُستخدم البيانات المدخلة محلياً فقط لتحسين تجربة التعلم وحفظ تقدمك في الاختبارات والاستشارات.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">2. حدود المسؤولية والتنبيه القانوني والحصانة الطبية</h4>
            <p>
              جميع الدروس والأجوبة التي يوفرها المساعد الذكي مستندة للوائح والتشريعات السويدية الرسمية المحدثة لعام 2026. ومع ذلك، يُعتبر المحتوى لأغراض التثقيف والتوجيه المجتمعي العام، ولا يمثل استشارة قانونية أو طبية فردية رسمية ملزمة. في حالات الطوارئ الطبية أو خطر الحياة، اتصل مباشرة بـ 112 وللاستشارات الطبية 1177.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">3. حقوق الملكية الفكرية والعلامة التجارية</h4>
            <p>
              جميع المواد التعليمية والهياكل النصية مصممة تحت إشراف "العرب في السويد منذ 2007 – رائد شهاب RAED SHIHAB" ويُحظر إعادة نشرها لأغراض تجارية بدون إذن كتابي مسبق.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">4. حق التعديل والحذف الكامل لبياناتك</h4>
            <p>
              يمكنك في أي وقت تصدير كافة بياناتك أو طلب مسح حسابك وسجل التعلم بالكامل من شاشة الملف الشخصي بنقرة واحدة.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow"
          >
            موافق وفهمت الشروط
          </button>
        </div>
      </div>
    </div>
  );
};
