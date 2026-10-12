import React, { useState } from 'react';
import { 
  PhoneCall, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Search, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { Language, Authority } from '../types';
import { AUTHORITIES_DATA } from '../data/authoritiesData';

interface AuthoritiesViewProps {
  language: Language;
}

export const AuthoritiesView: React.FC<AuthoritiesViewProps> = ({ language }) => {
  const [filterText, setFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAuthorities = AUTHORITIES_DATA.filter((auth: Authority) => {
    const term = filterText.toLowerCase().trim();
    const matchCat = selectedCategory === 'all' || auth.category === selectedCategory;
    const matchTerm = !term || 
      auth.name.toLowerCase().includes(term) || 
      auth.nameSv.toLowerCase().includes(term) || 
      auth.phone.includes(term) || 
      auth.description.toLowerCase().includes(term);

    return matchCat && matchTerm;
  });

  const categories = [
    { id: 'all', label: 'جميع الجهات' },
    { id: 'emergency', label: 'أرقام الطوارئ السريعة' },
    { id: 'immigration', label: 'الهجرة والجنسية' },
    { id: 'taxes', label: 'الضرائب والنفوس' },
    { id: 'social', label: 'السوسيال والتأمين' },
    { id: 'employment', label: 'العمل والتأهيل' },
    { id: 'police', label: 'الشرطة والقضاء' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-slate-800 shadow-xl text-white space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold">
          <PhoneCall className="w-4 h-4 text-red-400" />
          <span>دليل الاتصال المباشر 2026</span>
        </div>

        <h2 className="text-2xl font-black text-white">
          أرقام الطوارئ والدليل الحكومي للمؤسسات السويدية 🇸🇪
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          دليل شامل يحتوي على كافة أرقام الطوارئ المباشرة والجهات الحكومية الرسمية، ساعات العمل، الأوراق المطلوبة، وكيفية التعامل مع موظفي الدوائر السويدية.
        </p>

        {/* Emergency Call Box Banner */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:112"
            className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-center shadow-lg transition-all flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">112</span>
            <span className="text-[10px] text-red-100">الطوارئ والإنقاذ العاجل</span>
          </a>

          <a
            href="tel:1177"
            className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-center shadow-lg transition-all flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">1177</span>
            <span className="text-[10px] text-emerald-100">الاستشارة الطبية Vård</span>
          </a>

          <a
            href="tel:11414"
            className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-center shadow-lg transition-all flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">114 14</span>
            <span className="text-[10px] text-blue-100">الشرطة الحالات غير الحادة</span>
          </a>

          <a
            href="tel:116111"
            className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-center shadow-lg transition-all flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">116 111</span>
            <span className="text-[10px] text-purple-100">خط طوارئ الأطفال BRIS</span>
          </a>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="ابحث عن اسم المؤسسة (مثلاً: Migrationsverket, Skatteverket, السوسيال)..."
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pr-11 pl-4 py-3 text-sm focus:outline-none focus:border-yellow-400 placeholder-slate-500 shadow-md"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Authorities Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAuthorities.map((auth: Authority) => {
          const isEmergencyCat = auth.category === 'emergency';

          return (
            <div
              key={auth.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                isEmergencyCat
                  ? 'bg-red-950/20 border-red-800/60 text-white'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {language === 'sv' ? auth.nameSv : auth.name}
                    </h3>
                    <p className="text-xs text-yellow-400 font-semibold">{auth.nameSv}</p>
                  </div>

                  {isEmergencyCat ? (
                    <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full animate-pulse shrink-0">
                      طوارئ 24/7
                    </span>
                  ) : (
                    <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[11px] px-2.5 py-0.5 rounded-full shrink-0">
                      مؤسسة حكومية
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'sv' ? auth.descriptionSv : auth.description}
                </p>

                {/* Working Hours */}
                <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>ساعات العمل المتاحة: {auth.hours}</span>
                  </div>
                </div>

                {/* Services Provided List */}
                {auth.services && auth.services.length > 0 && (
                  <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl space-y-1">
                    <p className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      الخدمات والمستندات المطلوبة:
                    </p>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      {auth.services.map((srv, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Call & Website CTAs */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
                <a
                  href={`tel:${auth.phone.replace(/\s+/g, '')}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>اتصال مباشر: {auth.phone}</span>
                </a>

                <a
                  href={auth.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 font-bold p-2.5 rounded-xl text-xs transition-colors flex items-center justify-center"
                  title="زيارة الموقع الرسمي"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
