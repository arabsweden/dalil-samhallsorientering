import React from 'react';
import { Compass, Shield, Heart, ExternalLink, Phone } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenPrivacyTerms: () => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenPrivacyTerms,
  onSelectCategory,
}) => {
  const t = {
    title: 'دليل التوجيه المجتمعي في السويد',
    subtitle: 'Samhällsorientering i Sverige',
    branding: 'Arab Sweden Since 2007 – RAED SHIHAB',
    brandingAr: 'منصة العرب في السويد منذ عام 2007 - إشراف رائد شهاب',
    desc: 'منصة تعليمية تفاعلية موثوقة تهدف لمساعدة القادمين الجدد والعائلات في السويد على فهم المجتمع والقوانين، الحقوق والواجبات، والتعامل مع المؤسسات السويدية بسهولة.',
    quickLinks: 'أقسام التوجيه الهامة',
    officialSources: 'المؤسسات والجهات الرسمية',
    emergencies: 'أرقام الطوارئ السريعة',
    copyright: `© ${new Date().getFullYear()} جميع الحقوق محفوظة - دليل التوجيه المجتمعي السويدي`,
    disclaimer: 'تنبيه قانوني ومجتمعي: جميع المعارف والأجوبة الواردة في التطبيق مستندة للقوانين السويدية الرسمية والتعليمات الحكومية لعام 2026. التطبيق مخصص للتوعية والتوجيه المجتمعي العام ولا يحل محل الاستشارة القانونية أو الطبية الفردية. للحالات الحرجة اتصل فوراً بـ 112 وللاستفسارات الطبية اتصل بـ 1177.',
    privacy: 'سياسة الخصوصية وحماية البيانات GDPR',
    terms: 'شروط الاستخدام والخدمة',
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 border-t-2 border-[#FECC00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FECC00] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#005293] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-[#FECC00]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{t.title}</h3>
                <p className="text-xs text-[#FECC00] font-mono tracking-wider uppercase font-bold">{t.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.desc}
            </p>

            <div className="p-3 bg-[#005293]/30 border border-[#005293]/60 rounded-xl">
              <p className="text-xs font-black text-[#FECC00] flex items-center gap-1.5">
                🇸🇪 {t.branding}
              </p>
              <p className="text-[11px] text-blue-100 mt-1 font-bold">
                {t.brandingAr}
              </p>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">{t.quickLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('sweden-democracy')} className="hover:text-[#FECC00] transition-colors">
                  • السويد والديمقراطية والقيم المجتمعية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('residence-asylum')} className="hover:text-[#FECC00] transition-colors">
                  • الإقامة واللجوء ولم الشمل والجنسية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('children-social-services')} className="hover:text-[#FECC00] transition-colors">
                  • حقوق الطفل ومؤسسة السوسيال Socialtjänsten
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('employment-unions')} className="hover:text-[#FECC00] transition-colors">
                  • العمل والنقابات والاتفاقيات الجماعية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('digital-services')} className="hover:text-[#FECC00] transition-colors">
                  • خدمات BankID وSwish وKivra
                </button>
              </li>
            </ul>
          </div>

          {/* Official Swedish Authorities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">{t.officialSources}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.migrationsverket.se" target="_blank" rel="noreferrer" className="hover:text-[#FECC00] transition-colors flex items-center justify-between">
                  <span>• مصلحة الهجرة (Migrationsverket)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.skatteverket.se" target="_blank" rel="noreferrer" className="hover:text-[#FECC00] transition-colors flex items-center justify-between">
                  <span>• مصلحة الضرائب والنفوس (Skatteverket)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.socialstyrelsen.se" target="_blank" rel="noreferrer" className="hover:text-[#FECC00] transition-colors flex items-center justify-between">
                  <span>• هيئة الرعاية الاجتماعية (Socialstyrelsen)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.forsakringskassan.se" target="_blank" rel="noreferrer" className="hover:text-[#FECC00] transition-colors flex items-center justify-between">
                  <span>• صندوق التأمينات (Försäkringskassan)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.polisen.se" target="_blank" rel="noreferrer" className="hover:text-[#FECC00] transition-colors flex items-center justify-between">
                  <span>• الشرطة السويدية (Polisen)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">{t.emergencies}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-red-950/60 border border-red-800/60 rounded-xl text-center">
                <p className="text-red-400 font-black text-sm">112</p>
                <p className="text-[10px] text-slate-300 font-medium">الطوارئ والإنقاذ</p>
              </div>
              <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-center">
                <p className="text-emerald-400 font-black text-sm">1177</p>
                <p className="text-[10px] text-slate-300 font-medium">الاستشارة الطبية</p>
              </div>
              <div className="p-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-center">
                <p className="text-blue-400 font-black text-sm">114 14</p>
                <p className="text-[10px] text-slate-300 font-medium">الشرطة الحالات العامة</p>
              </div>
              <div className="p-2.5 bg-purple-950/60 border border-purple-800/60 rounded-xl text-center">
                <p className="text-purple-400 font-black text-sm">020-50 50 50</p>
                <p className="text-[10px] text-slate-300 font-medium">حماية النساء Kvinnofrid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 leading-relaxed mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#FECC00] shrink-0 mt-0.5" />
          <p>{t.disclaimer}</p>
        </div>

        {/* Bottom Rights & Links */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-right">{t.copyright}</p>

          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacyTerms} className="hover:text-[#FECC00] transition-colors font-medium">
              {t.privacy}
            </button>
            <span>•</span>
            <button onClick={onOpenPrivacyTerms} className="hover:text-[#FECC00] transition-colors font-medium">
              {t.terms}
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Aesthetic Status Bar */}
      <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap justify-between items-center text-[11px] border-t border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            تحديث التشريعات القوانين: اليوم 14:30
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">المصادر: مصلحة الهجرة، البرلمان السويدي،Skatterverket, 1177</span>
        </div>

        <div className="flex gap-6 mt-2 sm:mt-0 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">المستخدمين النشطين:</span>
            <span className="font-bold text-[#FECC00]">1,402</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">شهادات مكتملة:</span>
            <span className="font-bold text-[#FECC00]">856</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
