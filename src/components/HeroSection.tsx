import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Award,
  ArrowRight,
  ArrowLeft,
  Clock,
  History,
  X,
  Trash2,
  TrendingUp
} from 'lucide-react';
import { Language, Municipality } from '../types';

interface HeroSectionProps {
  language: Language;
  selectedMunicipality: Municipality;
  onSearch: (query: string) => void;
  onStartCourse: () => void;
  onAskAI: () => void;
  onBookConsultation: () => void;
  onOpenEvents?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  selectedMunicipality,
  onSearch,
  onStartCourse,
  onAskAI,
  onBookConsultation,
  onOpenEvents,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Recent Searches State & Persistence
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('sverige_recent_searches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return ['الإقامة الدائمة 2026', 'شروط لم الشمل العائلي', 'دراسة SFI والدعم المالي', 'حساب بنكي و BankID'];
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const popularTopics = [
    'الإقامة الدائمة 2026',
    'شروط لم الشمل العائلي',
    'مدرسة SFI والدعم المالي',
    'مصلحة السوسيال وحماية الطفل',
    'حساب بنكي و BankID',
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      localStorage.setItem('sverige_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveRecent = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(item => item !== queryToRemove);
      localStorage.setItem('sverige_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('sverige_recent_searches');
  };

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    addRecentSearch(query);
    onSearch(query);
    setIsDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      executeSearch(searchQuery);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('عذراً، متصفحك لا يدعم خاصية البحث الصوتي المباشر. يمكنك استخدام البحث النصي بسهولة.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'sv' ? 'sv-SE' : language === 'en' ? 'en-US' : 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        executeSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const t = {
    badge: 'دليل التوجيه المجتمعي والقانوني المعتمد 2026',
    title: 'دليل التوجيه المجتمعي في السويد 🇸🇪',
    subtitle: 'Samhällsorientering i Sverige',
    description: 'بوابتك الشاملة لفهم الحياة في السويد: القوانين، الحقوق والواجبات، الإقامة، السكن، المدارس، السوسيال، والخدمات الرقمية بلغة عربية مبسطة ومصادر رسمية موثوقة.',
    searchPlaceholder: 'ابحث عن أي موضوع (مثلاً: شروط الإقامة الدائمة، السوسيال، BankID، SFI)...',
    startCourse: 'ابدأ الدورة التعليمية',
    askAI: 'سؤال المساعد الذكي',
    bookConsultation: 'حجز استشارة أو دورة',
    stat1: '17 قسم توجيهي شاطئ',
    stat2: 'مصادر حكومية رسمية 2026',
    stat3: 'اختبارات وشهادات معتمدة',
    stat4: 'دعم كامل للغة العربية',
  };

  return (
    <div className="relative overflow-hidden bg-[#F4F7F9] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header/Intro Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Highlight Card (Editorial Aesthetic) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between">
            {/* Yellow Accent Border Strip */}
            <div className="absolute top-0 right-0 w-2 h-full bg-[#FECC00]"></div>

            <div className="space-y-4 pr-3">
              <div className="inline-flex items-center gap-2 bg-[#005293]/10 dark:bg-blue-900/40 text-[#005293] dark:text-blue-300 border border-[#005293]/20 px-3.5 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#005293] dark:text-yellow-400" />
                <span>{t.badge}</span>
                <span className="text-slate-400">|</span>
                <span className="text-[#005293] dark:text-yellow-300">بلدية {selectedMunicipality.name}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#005293] dark:text-white leading-tight tracking-tight">
                {t.title}
              </h1>
              
              <p className="text-base sm:text-lg text-[#005293]/80 dark:text-yellow-400 font-bold tracking-wide">
                {t.subtitle}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {t.description}
              </p>
            </div>

            {/* Search Field & Buttons */}
            <div className="space-y-4 pt-6" ref={dropdownRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-[#005293] dark:focus-within:border-[#FECC00] rounded-2xl p-1.5 shadow-inner">
                  <Search className="w-5 h-5 text-slate-400 mr-3 ml-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      onSearch(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none px-2 py-2.5 font-normal"
                  />
                  
                  {/* Voice Search Button */}
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                      isListening ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-[#005293] dark:text-yellow-400'
                    }`}
                    title="البحث الصوتي الذكي"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    type="submit"
                    className="mr-2 bg-[#005293] hover:bg-[#003e70] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow shrink-0 hidden sm:block"
                  >
                    بحث
                  </button>
                </div>

                {/* Dropdown Menu for Recent Searches & Popular Topics */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-40 p-4 space-y-4 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Section 1: Recent Searches */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-black text-slate-700 dark:text-yellow-400 flex items-center gap-1.5">
                          <History className="w-4 h-4 text-yellow-500" />
                          <span>عمليات البحث الأخيرة (Recent Searches)</span>
                        </span>
                        {recentSearches.length > 0 && (
                          <button
                            type="button"
                            onClick={handleClearAllRecent}
                            className="text-[11px] text-slate-400 hover:text-red-500 font-bold transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>مسح السجل</span>
                          </button>
                        )}
                      </div>

                      {recentSearches.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1 font-medium">لا توجد عمليات بحث سابقة.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {recentSearches.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => executeSearch(item)}
                              className="group flex items-center gap-2 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all hover:border-blue-400 dark:hover:border-yellow-500/50"
                            >
                              <Clock className="w-3 h-3 text-slate-400 group-hover:text-[#005293] dark:group-hover:text-yellow-400 shrink-0" />
                              <span>{item}</span>
                              <button
                                type="button"
                                onClick={(e) => handleRemoveRecent(e, item)}
                                className="text-slate-400 hover:text-red-500 p-0.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors mr-0.5"
                                title="حذف من السجل"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 2: Popular Topics */}
                    <div className="space-y-2 pt-1">
                      <div className="pb-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-[#005293] dark:text-blue-400" />
                          <span>المواضيع الأكثر بحثاً في السويد 2026</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {popularTopics.map((topic, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => executeSearch(topic)}
                            className="bg-blue-50 hover:bg-blue-100 dark:bg-slate-800/80 dark:hover:bg-blue-900/30 text-[#005293] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50 rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 hover:scale-[1.02]"
                          >
                            <Sparkles className="w-3 h-3 text-yellow-500 shrink-0" />
                            <span>{topic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartCourse}
                  className="bg-[#005293] hover:bg-[#003e70] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4 text-[#FECC00]" />
                  <span>{t.startCourse}</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onAskAI}
                  className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] px-6 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>{t.askAI}</span>
                </button>

                <button
                  onClick={onBookConsultation}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{t.bookConsultation}</span>
                </button>

                {onOpenEvents && (
                  <button
                    onClick={onOpenEvents}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#FECC00]" />
                    <span>تقويم الفعاليات والندوات</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Side Emergency Quick Box (Editorial Yellow Card) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-[#FECC00] p-6 rounded-3xl text-[#005293] shadow-md space-y-4 flex-1 flex flex-col justify-between border border-yellow-400">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-[#005293] text-white px-2.5 py-0.5 rounded-full">
                    خدمات الطوارئ 🇸🇪
                  </span>
                  <span className="text-xl font-black italic">!</span>
                </div>
                <h3 className="text-xl font-black text-[#005293]">
                  أرقام الطوارئ والاستشارات الطبية
                </h3>
                <p className="text-xs text-[#005293]/80 leading-relaxed font-medium">
                  حفظ هذه الأرقام ضروري لكل مقيم جديد في السويد للتعامل مع الحالات العاجلة والاستشارات الطبية الرسمية.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:112"
                  className="bg-[#005293] text-white p-3 rounded-2xl text-center hover:bg-[#003e70] transition-colors"
                >
                  <p className="text-[10px] opacity-80">طوارئ الإنقاذ</p>
                  <p className="text-2xl font-black text-[#FECC00]">112</p>
                </a>

                <a
                  href="tel:1177"
                  className="bg-white text-[#005293] p-3 rounded-2xl text-center hover:bg-slate-50 transition-colors border border-yellow-300"
                >
                  <p className="text-[10px] text-slate-500 font-bold">الاستشارة الطبية</p>
                  <p className="text-2xl font-black text-[#005293]">1177</p>
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-[#005293] dark:text-yellow-400">
                <Award className="w-4 h-4" />
                <span>شهادة توجيه مجتمعي رسمية</span>
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                100% مجانية
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Stat Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.stat1}</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#005293] dark:text-blue-400 shrink-0" />
            <span>{t.stat2}</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
            <Award className="w-4 h-4 text-yellow-500 shrink-0" />
            <span>{t.stat3}</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
            <span>{t.stat4}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
