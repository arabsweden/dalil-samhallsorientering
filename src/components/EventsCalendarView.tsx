import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Building2,
  Users,
  Search,
  Filter,
  CheckCircle2,
  PlusCircle,
  Share2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CalendarPlus,
  Bell,
  Sparkles,
  Ticket,
  Send,
  X,
  AlertCircle,
  Check,
  Globe,
  Award
} from 'lucide-react';
import { CommunityEvent, Language, RSVP, UserProfile } from '../types';
import { COMMUNITY_EVENTS_DATA } from '../data/eventsData';

interface EventsCalendarViewProps {
  language: Language;
  userProfile: UserProfile;
  onUpdateUserProfile: (updated: Partial<UserProfile>) => void;
}

export const EventsCalendarView: React.FC<EventsCalendarViewProps> = ({
  language,
  userProfile,
  onUpdateUserProfile,
}) => {
  const [events, setEvents] = useState<CommunityEvent[]>(COMMUNITY_EVENTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'my_events'>('list');

  // Selected date for calendar grid filtering
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // RSVP Registration Modal State
  const [activeRSVPEvent, setActiveRSVPEvent] = useState<CommunityEvent | null>(null);
  const [rsvpForm, setRsvpForm] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: '',
    municipality: userProfile.municipalityId || 'stockholm',
  });
  const [rsvpSuccess, setRsvpSuccess] = useState<boolean>(false);

  // Submit new Event Modal State
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submitForm, setSubmitForm] = useState({
    title: '',
    date: '',
    time: '',
    city: 'Stockholm',
    locationType: 'online' as 'online' | 'in_person' | 'hybrid',
    organizer: '',
    summary: '',
    description: '',
    contactEmail: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Toast / Feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Registered event IDs
  const registeredIds = userProfile.registeredEventIds || [];

  // Filtering events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Category filter
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }
      // City filter
      if (selectedCity !== 'all') {
        if (selectedCity === 'online' && evt.locationType !== 'online') return false;
        if (selectedCity !== 'online' && !evt.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      }
      // Date filter
      if (selectedDate && evt.date !== selectedDate) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q) || evt.titleSv.toLowerCase().includes(q);
        const matchesSummary = evt.summary.toLowerCase().includes(q);
        const matchesTags = evt.tags.some(t => t.toLowerCase().includes(q));
        const matchesCity = evt.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesCity) return false;
      }
      return true;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedCategory, selectedCity, selectedDate, searchQuery]);

  // My Registered Events
  const myEvents = useMemo(() => {
    return events.filter(e => registeredIds.includes(e.id));
  }, [events, registeredIds]);

  // Calendar Days generator for August 2026
  const calendarDays = useMemo(() => {
    const days = [];
    const totalDays = 31; // August 2026 has 31 days
    for (let i = 1; i <= totalDays; i++) {
      const dayStr = i < 10 ? `0${i}` : `${i}`;
      const fullDate = `2026-08-${dayStr}`;
      const hasEvents = events.some(e => e.date === fullDate);
      const count = events.filter(e => e.date === fullDate).length;
      days.push({
        dayNumber: i,
        fullDate,
        hasEvents,
        count,
      });
    }
    return days;
  }, [events]);

  // Handle RSVP Submission
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRSVPEvent) return;

    if (!rsvpForm.name.trim() || !rsvpForm.email.trim()) {
      alert('يرجى كتابة الاسم والبريد الإلكتروني للقيام بالتسجيل');
      return;
    }

    const newRegistered = [...registeredIds, activeRSVPEvent.id];
    onUpdateUserProfile({ registeredEventIds: newRegistered });

    // Decrement spots if available
    setEvents(prev => prev.map(item => {
      if (item.id === activeRSVPEvent.id && item.spotsLeft && item.spotsLeft > 0) {
        return { ...item, spotsLeft: item.spotsLeft - 1 };
      }
      return item;
    }));

    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setActiveRSVPEvent(null);
      showToast('تم تأكيد تسجيلك في الفعالية وحجز مقعدك بنجاح! 🎟️');
    }, 2000);
  };

  // Cancel RSVP Registration
  const handleCancelRSVP = (eventId: string) => {
    const updated = registeredIds.filter(id => id !== eventId);
    onUpdateUserProfile({ registeredEventIds: updated });
    showToast('تم إلغاء تسجيلك في هذه الفعالية.');
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (evt: CommunityEvent) => {
    const startDate = evt.date.replace(/-/g, '');
    const titleEncoded = encodeURIComponent(evt.title);
    const detailsEncoded = encodeURIComponent(`${evt.summary}\n\nالموقع: ${evt.venueName || evt.city}\nالمنظم: ${evt.organizer}`);
    const locationEncoded = encodeURIComponent(evt.venueName || evt.city);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startDate}T160000Z/${startDate}T180000Z&details=${detailsEncoded}&location=${locationEncoded}`;
  };

  // Download .ics Calendar file
  const handleDownloadICS = (evt: CommunityEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Arab Sweden Community Guide//EN
BEGIN:VEVENT
SUMMARY:${evt.title}
DESCRIPTION:${evt.summary}
LOCATION:${evt.venueName || evt.city}
DTSTART:${evt.date.replace(/-/g, '')}T160000Z
DTEND:${evt.date.replace(/-/g, '')}T180000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `event-${evt.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('تم تحميل ملف التقويم (.ics) لتنصيبه في جهازك! 📅');
  };

  // Submit Proposal Event
  const handleSubmitNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.title || !submitForm.date) {
      alert('يرجى ملء عنوان الفعالية وتاريخها بشكل صحيح.');
      return;
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setSubmitForm({
        title: '',
        date: '',
        time: '',
        city: 'Stockholm',
        locationType: 'online',
        organizer: '',
        summary: '',
        description: '',
        contactEmail: '',
      });
      showToast('شكراً لك! تم استلام مقترح الفعالية وسيتم مراجعته من الإدارة ونشره قريباً.');
    }, 1800);
  };

  const getCategoryBadge = (cat: CommunityEvent['category']) => {
    switch (cat) {
      case 'legal':
        return { label: 'ندوة قانونية', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'workshop':
        return { label: 'ورشة عمل وتوظيف', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'orientation':
        return { label: 'توجيه مجتمعي', color: 'bg-[#FECC00]/20 text-[#FECC00] border-[#FECC00]/40' };
      case 'family':
        return { label: 'نشاط عائلي وثقافي', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'deadline':
        return { label: 'ضرائب وأعمال', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      default:
        return { label: 'فعالية عامة', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#005293] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-[#FECC00] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#FECC00]" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Main Header Hero Banner */}
      <div className="bg-[#005293] p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-[#FECC00] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-right z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#FECC00] text-[#005293] px-3.5 py-1 rounded-full font-black text-xs shadow-sm">
            <CalendarIcon className="w-4 h-4" />
            <span>تقويم الفعاليات والندوات المباشرة 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            مواعيد الندوات وورش العمل واللقاءات المجتمعية في السويد
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
            تأكد من متابعة أحدث الندوات التوجيهية القانونية، ورش تحضير السيرة الذاتية، ملتقيات البلديات، ومواعيد الهيئات الحكومية الرسمية في مختلف المحافظات السويدية.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto z-10">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black px-5 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <PlusCircle className="w-5 h-5" />
            <span>اقترح أو أضف فعالية جديدة</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'my_events' ? 'list' : 'my_events')}
            className={`px-5 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow ${
              viewMode === 'my_events'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#003e70] hover:bg-blue-900 text-white border border-blue-400/30'
            }`}
          >
            <Ticket className="w-5 h-5 text-[#FECC00]" />
            <span>فعالياتي المسجل بها ({myEvents.length})</span>
          </button>
        </div>

        {/* Background Decorative Graphic */}
        <div className="absolute left-[-50px] bottom-[-50px] opacity-10 pointer-events-none">
          <CalendarIcon className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Navigation View Switcher & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab View Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => { setViewMode('list'); setSelectedDate(null); }}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              viewMode === 'list' && !selectedDate
                ? 'bg-[#005293] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Filter className="w-4 h-4 text-[#FECC00]" />
            <span>قائمة الفعاليات ({filteredEvents.length})</span>
          </button>

          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              viewMode === 'calendar'
                ? 'bg-[#005293] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-[#FECC00]" />
            <span>عرض التقويم الشريطي</span>
          </button>

          <button
            onClick={() => setViewMode('my_events')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              viewMode === 'my_events'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>تذكرتي الحالية ({myEvents.length})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، المدينة، أو الموضوع..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl pr-9 pl-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#005293]"
          />
        </div>
      </div>

      {/* Category & City Filter Chips */}
      <div className="space-y-3">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 ml-1">التصنيف:</span>
          {[
            { id: 'all', label: 'جميع الفعاليات' },
            { id: 'legal', label: 'ندوات قانونية والهجرة' },
            { id: 'workshop', label: 'ورش عمل السيرة والعمل' },
            { id: 'orientation', label: 'التوجيه المجتمعي والسوسيال' },
            { id: 'family', label: 'أنشطة العائلة والأطفال' },
            { id: 'deadline', label: 'الضرائب والأعمال' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-[#005293] text-white border-[#005293] shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* City / Location Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 ml-1">المدينة/الموقع:</span>
          {[
            { id: 'all', label: 'كل المدن السويدية' },
            { id: 'online', label: '🌐 عبر الإنترنت (Zoom/Teams)' },
            { id: 'stockholm', label: '📍 ستوكهولم (Stockholm)' },
            { id: 'göteborg', label: '📍 يوتوبوري (Göteborg)' },
            { id: 'malmö', label: '📍 مالمو (Malmö)' },
          ].map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                selectedCity === city.id
                  ? 'bg-[#FECC00] text-[#005293] border-yellow-500 font-extrabold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Filter Badge if active */}
      {selectedDate && (
        <div className="bg-blue-900/30 border border-blue-500/40 p-3 rounded-2xl flex items-center justify-between text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#FECC00]" />
            <span>معروض الفعاليات المحددة لتاريخ: <strong className="text-white">{selectedDate}</strong></span>
          </div>
          <button
            onClick={() => setSelectedDate(null)}
            className="text-[#FECC00] font-bold hover:underline"
          >
            إلغاء تصفية التاريخ
          </button>
        </div>
      )}

      {/* CALENDAR MONTH GRID VIEW MODE */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-[#005293] dark:text-[#FECC00]" />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                تقويم شهر أغسطس / أوجست 2026 (Augusti 2026)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              اضغط على اليوم لعرض فعالياته المحددة
            </p>
          </div>

          {/* Days Grid Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-black text-[#005293] dark:text-[#FECC00] pb-2">
            <div>الإثنين (Mån)</div>
            <div>الثلاثاء (Tis)</div>
            <div>الأربعاء (Ons)</div>
            <div>الخميس (Tors)</div>
            <div>الجمعة (Fre)</div>
            <div className="text-red-500">السبت (Lör)</div>
            <div className="text-red-500">الأحد (Sön)</div>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {calendarDays.map((d) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <button
                  key={d.dayNumber}
                  onClick={() => {
                    setSelectedDate(d.fullDate);
                    setViewMode('list');
                  }}
                  className={`p-2 sm:p-3 rounded-2xl border text-xs sm:text-sm font-bold flex flex-col items-center justify-between min-h-[60px] sm:min-h-[75px] transition-all relative ${
                    isSelected
                      ? 'bg-[#005293] text-white border-[#FECC00] ring-2 ring-[#FECC00]'
                      : d.hasEvents
                      ? 'bg-amber-500/10 dark:bg-amber-500/20 text-slate-900 dark:text-white border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-extrabold">{d.dayNumber}</span>
                  {d.hasEvents && (
                    <span className="mt-1 bg-[#FECC00] text-[#005293] px-1.5 py-0.5 rounded-full text-[10px] font-black shadow-xs">
                      {d.count} فعالية
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MY REGISTERED EVENTS VIEW */}
      {viewMode === 'my_events' && (
        <div className="space-y-6">
          <div className="bg-emerald-950/40 border-2 border-emerald-700/60 p-5 rounded-3xl flex items-center justify-between gap-4 text-emerald-200">
            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h3 className="font-black text-lg text-white">تذاكرك وحجوزاتك المؤكدة ({myEvents.length})</h3>
                <p className="text-xs text-emerald-300">
                  تحتوي هذه القائمة على الندوات التي قمت بالحجز والمشاركة فيها. سيتم تذكيرك بالموعد وإرسال روابط الزوم إليها.
                </p>
              </div>
            </div>
          </div>

          {myEvents.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
              <CalendarPlus className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="font-bold text-base text-slate-700 dark:text-slate-300">لم تقم بالتسجيل في أي فعالية حتى الآن</h4>
              <p className="text-xs text-slate-500">استعرض الفعاليات المتاحة واضغط على "حجز مقعد مجاني" لتثبيت حضورك.</p>
              <button
                onClick={() => setViewMode('list')}
                className="bg-[#005293] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003e70]"
              >
                تصفح جميع الفعاليات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="bg-emerald-500 text-slate-950 font-black px-3 py-0.5 rounded-full text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      تذكرة مقعد مؤكدة
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {evt.id}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-black text-base sm:text-lg text-white leading-snug">{evt.title}</h4>
                    <p className="text-xs text-slate-300">{evt.summary}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-[#FECC00] font-bold">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{evt.date} | {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{evt.venueName || evt.city}</span>
                    </div>
                  </div>

                  {/* Join Link if Online */}
                  {evt.meetingUrl && (
                    <a
                      href={evt.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow"
                    >
                      <Video className="w-4 h-4" />
                      <span>رابط الحضور المباشر (Zoom)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => handleDownloadICS(evt)}
                      className="text-[#FECC00] hover:underline font-bold flex items-center gap-1"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>حفظ في تقويم الهاتف (.ics)</span>
                    </button>

                    <button
                      onClick={() => handleCancelRSVP(evt.id)}
                      className="text-red-400 hover:underline font-medium"
                    >
                      إلغاء الحجز
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EVENTS LIST CARDS VIEW */}
      {(viewMode === 'list' || selectedDate) && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 font-bold">
            <span>عدد الفعاليات المطابقة: ({filteredEvents.length}) فعالية</span>
            <span className="text-xs text-slate-400">مرتبة حسب التاريخ القادم</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-base text-slate-700 dark:text-slate-300">لا توجد فعاليات مطابقة للبحث أو التصفية الحالية</h4>
              <p className="text-xs text-slate-500">جرب البحث بكلمات مختلفة أو تغيير تصنيفات المدن والتاريخ.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedCity('all'); setSearchQuery(''); setSelectedDate(null); }}
                className="bg-[#005293] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                إعادة ضبط خيارات التصفية
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((evt) => {
                const badge = getCategoryBadge(evt.category);
                const isRegistered = registeredIds.includes(evt.id);

                return (
                  <div
                    key={evt.id}
                    className={`bg-white dark:bg-slate-900 border-2 rounded-3xl p-6 shadow-md transition-all hover:shadow-xl flex flex-col justify-between gap-5 relative overflow-hidden ${
                      isRegistered
                        ? 'border-emerald-500/80 dark:border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-[#005293]'
                    }`}
                  >
                    {/* Event Card Header Badges */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black border ${badge.color}`}>
                          {badge.label}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="bg-[#FECC00] text-[#005293] text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                            مجانية 100%
                          </span>
                          {evt.locationType === 'online' ? (
                            <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              أونلاين
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#FECC00]" />
                              {evt.city}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {evt.summary}
                      </p>
                    </div>

                    {/* Date, Time & Organizer Details Box */}
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-bold">
                        <div className="flex items-center gap-2 text-[#005293] dark:text-[#FECC00]">
                          <CalendarIcon className="w-4 h-4 shrink-0" />
                          <span>تاريخ الفعالية: <strong>{evt.date}</strong></span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <Building2 className="w-4 h-4 text-[#005293] dark:text-[#FECC00] shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">المنظم: <strong>{evt.organizer}</strong></span>
                      </div>

                      <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">المكان: <strong>{evt.venueName || evt.city}</strong></span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed whitespace-pre-line">
                      {evt.description}
                    </p>

                    {/* Action Row */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      {isRegistered ? (
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            حجزك مؤكد
                          </span>
                          <button
                            onClick={() => handleCancelRSVP(evt.id)}
                            className="text-xs text-red-400 hover:underline"
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveRSVPEvent(evt)}
                          className="bg-[#005293] hover:bg-[#003e70] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                        >
                          <Ticket className="w-4 h-4 text-[#FECC00]" />
                          <span>حجز مقعد مجاني الآن</span>
                        </button>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Calendar Sync Menu */}
                        <button
                          onClick={() => handleDownloadICS(evt)}
                          className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="حفظ في تقويم الهاتف (.ics)"
                        >
                          <CalendarPlus className="w-4 h-4 text-[#005293] dark:text-[#FECC00]" />
                        </button>

                        <a
                          href={getGoogleCalendarUrl(evt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="إضافة لتقويم Google Calendar"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* RSVP MODAL REGISTRATION DIALOG */}
      {activeRSVPEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
          <div className="bg-slate-900 border-2 border-slate-700 text-white rounded-3xl max-w-lg w-full min-w-0 shadow-2xl p-6 space-y-5 my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#FECC00]" />
                <h3 className="font-extrabold text-base">تأكيد حجز مقعدك المجاني</h3>
              </div>
              <button
                onClick={() => setActiveRSVPEvent(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Summary Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-sm text-[#FECC00] leading-snug">{activeRSVPEvent.title}</h4>
              <p className="text-xs text-slate-300">التاريخ: {activeRSVPEvent.date} | {activeRSVPEvent.time}</p>
              <p className="text-xs text-slate-400">المكان: {activeRSVPEvent.venueName || activeRSVPEvent.city}</p>
            </div>

            {rsvpSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-lg text-white">تم تأكيد الحجز بنجاح!</h4>
                <p className="text-xs text-slate-300">تم حجز المقعد باسم {rsvpForm.name}. سنرسل رابط التذكير وحضور الجلسة عبر بريدك الإلكتروني.</p>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">الاسم الكامل:</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="مثال: أحمد علي"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">البريد الإلكتروني (لتلقي رابط الزوم والتذكير):</label>
                  <input
                    type="email"
                    required
                    value={rsvpForm.email}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">رقم الهاتف السويدي (اختياري للواتساب):</label>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                    placeholder="070 123 4567"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveRSVPEvent(null)}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FECC00] text-[#005293] font-black rounded-xl hover:bg-yellow-400 shadow-lg"
                  >
                    تأكيد حجز المقعد المجاني
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SUGGEST / SUBMIT NEW EVENT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
          <div className="bg-slate-900 border-2 border-slate-700 text-white rounded-3xl max-w-xl w-full min-w-0 shadow-2xl p-6 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#FECC00]" />
                <h3 className="font-extrabold text-base">اقترح أو أضف فعالية مجتمعية جديدة</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-lg text-white">تم استلام مقترح الفعالية!</h4>
                <p className="text-xs text-slate-300">سيقوم فريق دليل التوجيه المجتمعي بمراجعة المقترح ونشره في التقويم قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewEvent} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">عنوان الفعالية أو الندوة:</label>
                  <input
                    type="text"
                    required
                    value={submitForm.title}
                    onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                    placeholder="مثال: ندوه تعريفية بحقوق العمال في النقابات السويدية"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">التاريخ (مثلاً 2026-09-10):</label>
                    <input
                      type="date"
                      required
                      value={submitForm.date}
                      onChange={(e) => setSubmitForm({ ...submitForm, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">التوقيت (مثال: 18:00 - 20:00):</label>
                    <input
                      type="text"
                      value={submitForm.time}
                      onChange={(e) => setSubmitForm({ ...submitForm, time: e.target.value })}
                      placeholder="18:00 - 20:00"
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">المدينة أو المحافظة:</label>
                    <input
                      type="text"
                      value={submitForm.city}
                      onChange={(e) => setSubmitForm({ ...submitForm, city: e.target.value })}
                      placeholder="Stockholm / Online"
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">المنظم أو الجمعية:</label>
                    <input
                      type="text"
                      value={submitForm.organizer}
                      onChange={(e) => setSubmitForm({ ...submitForm, organizer: e.target.value })}
                      placeholder="اسم الجمعية أو الجهة المنظمة"
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">ملخص وموضوع الفعالية:</label>
                  <textarea
                    rows={3}
                    required
                    value={submitForm.summary}
                    onChange={(e) => setSubmitForm({ ...submitForm, summary: e.target.value })}
                    placeholder="اكتب شرحاً مختصراً لأهم النقاط والمحاور التي ستتناولها الفعالية..."
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-[#FECC00] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FECC00] text-[#005293] font-black rounded-xl hover:bg-yellow-400 shadow-lg flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الفعالية للمراجعة</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
