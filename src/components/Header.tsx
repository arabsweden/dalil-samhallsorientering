import React, { useState } from 'react';
import { 
  Compass, 
  Globe, 
  Moon, 
  Sun, 
  MapPin, 
  Bell, 
  User, 
  Award, 
  BookOpen, 
  MessageSquare, 
  PhoneCall, 
  Calendar, 
  ShieldCheck,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { Language, Municipality, UserProfile } from '../types';
import { MUNICIPALITIES_DATA } from '../data/municipalitiesData';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  selectedMunicipalityId: string;
  onSelectMunicipality: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  unreadUpdatesCount: number;
  onOpenLawUpdates: () => void;
  onOpenCertificate: () => void;
  onOpenSubscription: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  selectedMunicipalityId,
  onSelectMunicipality,
  activeTab,
  setActiveTab,
  userProfile,
  unreadUpdatesCount,
  onOpenLawUpdates,
  onOpenCertificate,
  onOpenSubscription,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedMunicipality = MUNICIPALITIES_DATA.find(m => m.id === selectedMunicipalityId) || MUNICIPALITIES_DATA[0];

  const t = {
    title: language === 'sv' ? 'Samhällsorientering i Sverige' : language === 'en' ? 'Community Orientation Sweden' : 'دليل التوجيه المجتمعي في السويد',
    subtitle: language === 'ar' ? 'Samhällsorientering i Sverige' : 'Arab Sweden Since 2007 – RAED SHIHAB',
    branding: 'Arab Sweden Since 2007 – RAED SHIHAB',
    brandingAr: 'العرب في السويد منذ 2007 - رائد شهاب',
    navHome: language === 'sv' ? 'Hem' : language === 'en' ? 'Home' : 'الرئيسية',
    navCategories: language === 'sv' ? 'Kategorier' : language === 'en' ? 'Categories' : 'الأقسام والدروس',
    navAI: language === 'sv' ? 'AI-Guide' : language === 'en' ? 'AI Assistant' : 'المساعد الذكي',
    navAuthorities: language === 'sv' ? 'Nöd & Myndigheter' : language === 'en' ? 'Emergency & Contacts' : 'الطوارئ والجهات',
    navConsultations: language === 'sv' ? 'Boka Rådgivning' : language === 'en' ? 'Consultations' : 'الاستشارات والدورات',
    navQuestionBank: language === 'sv' ? 'Frågebank' : language === 'en' ? 'Question Bank' : 'بنك الأسئلة الممتاز',
    navEvents: language === 'sv' ? 'Evenemang' : language === 'en' ? 'Events Calendar' : 'تقويم الفعاليات',
    navAdmin: language === 'sv' ? 'Admin' : language === 'en' ? 'Admin' : 'لوحة الإدارة',
    navProfile: language === 'sv' ? 'Min Profil' : language === 'en' ? 'My Profile' : 'حسابي والشهادة',
    selectMunicipality: language === 'sv' ? 'Välj kommun' : language === 'en' ? 'Select municipality' : 'اختر البلدية / المحافظة',
    upgrade: language === 'sv' ? 'Uppgradera' : language === 'en' ? 'Upgrade' : 'ترقية العضوية',
    certificate: language === 'sv' ? 'Certifikat' : language === 'en' ? 'Certificate' : 'الشهادة',
  };

  return (
    <header className="sticky top-0 z-40 bg-[#005293] text-white shadow-xl border-b-4 border-[#FECC00] transition-colors">
      {/* Top Banner Branding */}
      <div className="bg-[#003e70] text-xs py-1.5 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#FECC00] text-[#005293] px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-sm">
              🇸🇪 {t.branding}
            </span>
            <span className="hidden sm:inline text-blue-200/60">|</span>
            <span className="hidden sm:inline text-blue-100 font-bold">{t.brandingAr}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Municipality Selector */}
            <div className="flex items-center gap-1 text-blue-100 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FECC00]" />
              <select
                value={selectedMunicipalityId}
                onChange={(e) => onSelectMunicipality(e.target.value)}
                className="bg-[#002d52] border border-blue-400/30 text-white text-xs rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#FECC00] cursor-pointer"
                title={t.selectMunicipality}
              >
                {MUNICIPALITIES_DATA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {language === 'ar' ? `${m.name} (${m.nameSv})` : m.nameSv}
                  </option>
                ))}
              </select>
            </div>

            {/* Law Updates Notification Button with Live Alert Ticker */}
            <button
              onClick={onOpenLawUpdates}
              className="relative flex items-center gap-1.5 bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-white text-xs px-2.5 py-1 rounded-full transition-all shadow-sm"
              title="تحديثات القوانين السويدية المباشرة 2026"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Bell className="w-3.5 h-3.5 text-[#FECC00]" />
              <span className="font-bold hidden md:inline text-[11px]">تغيرات القوانين 2026</span>
              {unreadUpdatesCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                  {unreadUpdatesCount} جديد
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FECC00] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#005293] rounded-[10px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#FECC00]" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight group-hover:text-[#FECC00] transition-colors">
              {t.title}
            </h1>
            <p className="text-xs text-[#FECC00] font-mono tracking-wider uppercase font-bold">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'home' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            {t.navHome}
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'categories' ? 'bg-[#FECC00] text-[#005293]' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.navCategories}
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'questions' ? 'bg-[#FECC00] text-[#005293] font-black shadow-md' : 'text-yellow-300 font-bold hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FECC00]" />
            {t.navQuestionBank}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'ai' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t.navAI}
          </button>

          <button
            onClick={() => setActiveTab('authorities')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'authorities' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            {t.navAuthorities}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'consultations' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t.navConsultations}
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'events' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            {t.navEvents}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-[#FECC00] text-[#005293] font-bold shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            {t.navProfile}
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1.5 text-xs rounded-xl transition-colors flex items-center gap-1 ${
              activeTab === 'admin' ? 'bg-[#FECC00] text-[#005293] font-bold' : 'text-blue-200 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.navAdmin}
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Certificate Quick CTA if user completed lessons */}
          {userProfile.completedLessonIds.length > 0 && (
            <button
              onClick={onOpenCertificate}
              className="hidden sm:flex items-center gap-1.5 bg-[#FECC00] text-[#005293] font-bold text-xs px-3 py-1.5 rounded-full transition-colors shadow"
            >
              <Award className="w-4 h-4" />
              <span>{t.certificate}</span>
            </button>
          )}

          {/* Premium Subscription Badge */}
          <button
            onClick={onOpenSubscription}
            className="hidden md:flex items-center gap-1.5 bg-[#FECC00] hover:bg-yellow-300 text-[#005293] font-extrabold text-xs px-3.5 py-1.5 rounded-full transition-all shadow"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>{userProfile.subscriptionPlan === 'free' ? t.upgrade : 'العضوية الممتازة'}</span>
          </button>

          {/* Language Switcher Dropdown (Editorial Aesthetic Pill) */}
          <div className="flex bg-white/10 rounded-full p-1 text-xs">
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                language === 'ar' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/20'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => onLanguageChange('sv')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                language === 'sv' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/20'
              }`}
            >
              Svenska
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                language === 'en' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/20'
              }`}
            >
              English
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-blue-100 hover:text-[#FECC00] hover:bg-white/10 rounded-full transition-colors"
            title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-[#FECC00]" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#FECC00] rounded-lg hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#003e70] border-t border-blue-800/60 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'home' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navHome}</span>
            <Compass className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('categories'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'categories' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navCategories}</span>
            <BookOpen className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('ai'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'ai' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navAI}</span>
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('authorities'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'authorities' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navAuthorities}</span>
            <PhoneCall className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('consultations'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'consultations' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navConsultations}</span>
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'events' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navEvents}</span>
            <Calendar className="w-5 h-5 text-emerald-300" />
          </button>

          <button
            onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'profile' ? 'bg-[#FECC00] text-[#005293]' : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{t.navProfile}</span>
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
              activeTab === 'admin' ? 'bg-[#FECC00] text-[#005293]' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <span>{t.navAdmin}</span>
            <ShieldCheck className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};
