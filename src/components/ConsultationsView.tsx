import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Video,
  Users,
  Compass
} from 'lucide-react';
import { Language, Municipality, UserProfile } from '../types';
import { MUNICIPALITIES_DATA } from '../data/municipalitiesData';

interface ConsultationsViewProps {
  language: Language;
  selectedMunicipality: Municipality;
  userProfile: UserProfile;
  onBookSuccess: (bookingData: any) => void;
}

export const ConsultationsView: React.FC<ConsultationsViewProps> = ({
  language,
  selectedMunicipality,
  userProfile,
  onBookSuccess,
}) => {
  const [selectedService, setSelectedService] = useState<'individual' | 'course' | 'tour'>('individual');
  const [fullName, setFullName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(userProfile.email || '');
  const [municipalityId, setMunicipalityId] = useState(selectedMunicipality.id);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const services = [
    {
      id: 'individual',
      title: 'استشارة توجيهية فردية خاصة',
      subtitle: 'مع خبراء التوجيه المجتمعي والقانوني (فريق العرب في السويد)',
      price: 'مجانية للأعضاء الجدد / 250 SEK',
      icon: User,
      duration: '45 دقيقة - أونلاين عبر Teams / Zoom',
      features: [
        'مراجعة ملفك الشخصي في السويد',
        'توضيح شروط الإقامة، لم الشمل، والجنسية 2026',
        'توجيه خطوة بخطوة للتعامل مع السوسيال ومدرسة الأطفال',
        'إجابات مخصصة لظروفك الفردية',
      ],
    },
    {
      id: 'course',
      title: 'دورة التوجيه المجتمعي الشاملة (100 ساعة)',
      subtitle: 'Samhällsorientering för nyanlända',
      price: 'مغطاة بالكامل مجاناً للحاصلين على الإقامة',
      icon: Users,
      duration: 'دورة تفاعلية أسبوعية بجميع الأقسام',
      features: [
        'تغطي كافة محاور الدورة الحكومية الرسمية باللغة العربية',
        'مناقشات حية وأمثلة واقعية مع مدربين متمرسين',
        'شهادة إتمام دورة موثوقة عند الانتهاء',
        'مجموعة وتواصل مستمر للإجابة على التساؤلات',
      ],
    },
    {
      id: 'tour',
      title: 'الجولة التوجيهية الميدانية في ستوكهولم / المدن الكبرى',
      subtitle: 'Stockholm Guided Community Orientation',
      price: '350 SEK للشخص',
      icon: Compass,
      duration: '3 ساعات ميدانية',
      features: [
        'زيارة الدوائر والمؤسسات الرئيسية بنفسك',
        'تعلم استخدام مواصلات SL وتطبيقات المدن',
        'التعرف على المراكز الخدمية والترفيهية العائلية',
        'لقاء عائلات قادمة جديدة وتكوين شبكة تعارف',
      ],
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'SR-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsBooked(true);

    onBookSuccess({
      ref,
      service: selectedService,
      fullName,
      phone,
      email,
      municipalityId,
      bookingDate,
      timeSlot,
      notes,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-slate-800 shadow-xl text-white space-y-3">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>خدمات الاستشارات والدورات التدريبية</span>
        </div>

        <h2 className="text-2xl font-black text-white">
          حجز استشارة توجيهية أو دورة مجتمعية في السويد 🇸🇪
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          تواصل مباشر مع مستشاري التوجيه المجتمعي والقانوني (إشراف رائد شهاب – منصة العرب في السويد منذ 2007) للحصول على إجابات مخصصة تناسب وضعك الأسري والقانوني.
        </p>
      </div>

      {/* Service Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((srv) => {
          const Icon = srv.icon;
          const isSelected = selectedService === srv.id;

          return (
            <button
              key={srv.id}
              onClick={() => setSelectedService(srv.id as any)}
              className={`p-6 rounded-2xl border text-right transition-all flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-xl ring-2 ring-blue-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-yellow-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">
                    {srv.price}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white leading-snug">{srv.title}</h3>
                <p className="text-xs text-slate-400">{srv.subtitle}</p>
                <p className="text-xs text-blue-300 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {srv.duration}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  {srv.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <span className={`w-full block text-center py-2 rounded-xl text-xs font-bold transition-colors ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {isSelected ? 'محدد حالياً' : 'اختيار هذه الخدمة'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Booking Form or Confirmation */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl">
        {!isBooked ? (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span>إكمال بيانات الحجز المباشر</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أدخل اسمك كما في الهوية..."
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">رقم الهاتف السويدي / الواتساب</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="070 123 45 67"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.se"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Municipality */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">البلدية التي تقيم بها</label>
                <select
                  value={municipalityId}
                  onChange={(e) => setMunicipalityId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                >
                  {MUNICIPALITIES_DATA.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.nameSv})</option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">تاريخ الحجز المفضل</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Preferred Time Slot */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">التوقيت المفضل</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
                >
                  <option value="10:00">10:00 صباحاً</option>
                  <option value="12:00">12:00 ظهراً</option>
                  <option value="14:00">02:00 ظهراً</option>
                  <option value="16:00">04:00 عصراً</option>
                  <option value="18:00">06:00 مساءً</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">ملاحظات أو أسئلة محددة تريد التركيز عليها</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثلاً: أريد الاستفسار حول تعديل الإقامة، المدارس، أو خطة السوسيال..."
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow"
            >
              تأكيد وتأكيد الحجز المباشر
            </button>
          </form>
        ) : (
          /* Confirmation Receipt */
          <div className="text-center space-y-6 py-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">تم تأكيد طلب الحجز بنجاح! 🎉</h3>
              <p className="text-xs text-slate-300">
                رقم الحجز المرجعي الخاص بك: <span className="font-extrabold text-yellow-400">{bookingRef}</span>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-xs text-right space-y-2 text-slate-300">
              <p><strong className="text-white">الاسم:</strong> {fullName}</p>
              <p><strong className="text-white">الخدمة:</strong> {services.find(s => s.id === selectedService)?.title}</p>
              <p><strong className="text-white">التاريخ والتوقيت:</strong> {bookingDate} الساعة {timeSlot}</p>
              <p><strong className="text-white">الهاتف:</strong> {phone}</p>
              <p><strong className="text-white">البريد الإلكتروني:</strong> {email}</p>
            </div>

            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              سيقوم أحد مشرفي فريق التوجيه بالتواصل معك عبر الهاتف أو الواتساب قبل موعد الاستشارة لتأكيد رابط الجلسة ومساعدتك.
            </p>

            <button
              onClick={() => setIsBooked(false)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
            >
              حجز موعد آخر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
