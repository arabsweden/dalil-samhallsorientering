import React, { useState } from 'react';
import { Bell, AlertTriangle, ChevronLeft, X, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { LawUpdate, Language } from '../types';
import { LAW_UPDATES_DATA } from '../data/lawUpdatesData';

interface LawUpdatesBannerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const LawUpdatesBanner: React.FC<LawUpdatesBannerProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  const [selectedUpdate, setSelectedUpdate] = useState<LawUpdate | null>(LAW_UPDATES_DATA[0]);
  const [subscribed, setSubscribed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setSubscribed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-3xl w-full min-w-0 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/80 via-slate-900 to-blue-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 animate-pulse">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>تحديثات القوانين السويدية المباشرة 2026</span>
                <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">عاجل</span>
              </h2>
              <p className="text-xs text-slate-300">
                إشعارات وتنبيهات مستمرة حول تغير قوانين الهجرة، الجنسية، العمل، والسوسيال في السويد
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Updates List Sidebar */}
          <div className="space-y-3 border-l border-slate-800 pl-4 md:border-l-0 md:pl-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">أحدث القوانين الصادرة 2026</p>
            {LAW_UPDATES_DATA.map((update) => (
              <button
                key={update.id}
                onClick={() => setSelectedUpdate(update)}
                className={`w-full text-right p-3 rounded-xl border transition-all ${
                  selectedUpdate?.id === update.id
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-yellow-400 font-semibold">{update.category}</span>
                  <span className="text-slate-400">{update.date}</span>
                </div>
                <h4 className="text-xs font-bold leading-snug line-clamp-2">{update.title}</h4>
              </button>
            ))}
          </div>

          {/* Selected Update Details */}
          {selectedUpdate && (
            <div className="md:col-span-2 space-y-4">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-full font-bold">
                    {selectedUpdate.category}
                  </span>
                  <span className="text-xs text-slate-400">تاريخ النشر: {selectedUpdate.date}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {selectedUpdate.title}
                </h3>
                <p className="text-xs text-yellow-300 italic font-medium">
                  {selectedUpdate.titleSv}
                </p>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed pt-2">
                  <p className="font-semibold text-white">الملخص التنفيذي للقانون:</p>
                  <p className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">{selectedUpdate.summary}</p>
                </div>

                <div className="p-3 bg-yellow-950/30 border border-yellow-700/40 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-yellow-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    تأثير التحديث على القادمين الجدد والعائلات:
                  </p>
                  <p className="text-slate-200">{selectedUpdate.impactOnNewcomers}</p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={selectedUpdate.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold"
                  >
                    <span>المصدر الحكومي الرسمي</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email Alerts Subscription Form */}
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-800 p-4 rounded-xl border border-blue-800/50 text-xs">
                {subscribed ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold p-2 bg-emerald-950/40 rounded-lg border border-emerald-800">
                    <Check className="w-5 h-5 shrink-0" />
                    <span>تم تفعيل اشتراكك في إشعارات تغير القوانين السويدية بنجاح!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-yellow-400" />
                      احصل على إشعارات فورية عند صدور أي قانون سويدي جديد
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="أدخل بريدك الإلكتروني هنا..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                      />
                      <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shrink-0 transition-colors"
                      >
                        اشتراك
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
