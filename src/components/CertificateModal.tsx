import React, { useEffect, useState } from 'react';
import { X, Award, Download, Printer, CheckCircle2, ShieldCheck, Compass, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { Language, UserProfile } from '../types';

interface CertificateModalProps {
  language: Language;
  userProfile: UserProfile;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  language,
  userProfile,
  completedLessonsCount,
  totalLessonsCount,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    const certElement = document.getElementById('printable-certificate');
    if (!certElement) return;

    try {
      setIsDownloading(true);
      const canvas = await html2canvas(certElement, {
        scale: 2.5, // High resolution image output
        useCORS: true,
        backgroundColor: '#020617',
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `شهادة_التوجيه_المجتمعي_${userProfile.name ? userProfile.name.replace(/\s+/g, '_') : 'المتعلم'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading certificate PNG:', error);
      alert('تعذر تحميل الصورة مباشرة، يمكنك طباعة الشهادة وحفظها كملف PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const issueDate = new Date().toLocaleDateString('sv-SE');
  const certNumber = 'SWE-CERT-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-3xl w-full min-w-0 shadow-2xl overflow-hidden my-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Modal Top Actions Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FECC00]/20 text-[#FECC00] rounded-xl border border-[#FECC00]/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base">شهادة إتمام التوجيه المجتمعي السويدي</h3>
              <p className="text-xs text-slate-400">معتمدة وموثقة لعام 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md transition-all"
              title="تحميل الشهادة كصورة عالية الدقة"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>تحميل كصورة (PNG)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#005293] hover:bg-[#003e70] text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md transition-all"
              title="طباعة الشهادة أو حفظها كملف PDF"
            >
              <Printer className="w-4 h-4 text-[#FECC00]" />
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas Frame */}
        <div id="printable-certificate" className="bg-slate-950 border-4 border-[#FECC00]/80 p-6 sm:p-10 rounded-2xl text-center space-y-6 relative overflow-hidden shadow-2xl">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#FECC00] pointer-events-none" />
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#FECC00] pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#FECC00] pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#FECC00] pointer-events-none" />

          {/* Certificate Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Compass className="w-96 h-96 text-[#FECC00]" />
          </div>

          {/* Top Header Branding */}
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FECC00]/10 border border-[#FECC00]/40 px-4 py-1 rounded-full text-xs font-black text-[#FECC00]">
              🇸🇪 SAMHÄLLSORIENTERING I SVERIGE 2026
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              شهادة إتمام دورة التوجيه المجتمعي والقانوني
            </h1>
            <p className="text-xs text-[#FECC00] font-extrabold tracking-widest uppercase">
              Certifikat för genomförd Samhällsorientering i Sverige
            </p>
          </div>

          {/* Certificate Recipient */}
          <div className="py-4 space-y-3 relative z-10 border-y border-slate-800/90">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">تُشهد منصة دليل التوجيه المجتمعي في السويد بأن:</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#FECC00] font-serif tracking-wide py-1">
              {userProfile.name || 'المتعلم المتميز'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed pt-1 font-medium">
              قد أتم بنجاح كافة متطلبات دروس واختبارات التوجيه المجتمعي والقانوني السويدي لعام 2026 بإجمالي <span className="text-emerald-400 font-black">{completedLessonsCount}</span> درساً واختباراً تقويمياً شملت جميع محاور الحياة والقوانين والمؤسسات الرسمية السويدية.
            </p>
          </div>

          {/* Certificate Footer Stamp & Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs text-slate-300 relative z-10 items-end">
            <div className="space-y-1 text-right sm:text-center">
              <p className="text-slate-400 font-bold">تاريخ الإصدار:</p>
              <p className="font-extrabold text-white text-sm">{issueDate}</p>
              <p className="text-[11px] text-slate-400 font-mono">الرقم المرجعي: {certNumber}</p>
            </div>

            {/* Official Badge Stamp */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-9 h-9 text-[#FECC00]" />
                </div>
              </div>
              <p className="text-[11px] font-black text-[#FECC00]">ختم الاعتماد الرسمي 🇸🇪</p>
            </div>

            <div className="space-y-1 text-left sm:text-center">
              <p className="text-slate-400 font-bold">إشراف وإدارة المنصة:</p>
              <p className="font-black text-[#FECC00] text-sm">رائد شهاب – RAED SHIHAB</p>
              <p className="text-[11px] text-slate-400">منصة العرب في السويد منذ 2007</p>
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 font-bold leading-relaxed relative z-10">
            ⚠️ <span className="text-[#FECC00] font-black">إخلاء مسؤولية تنظيمي:</span> شهادة مشاركة تعليمية صادرة عن منصة عرب السويد، وليست شهادة حكومية سويدية.
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-slate-800">
          <span>الشهادة قابلة للتحميل والحفظ والطباعة في أي وقت.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="text-emerald-400 hover:underline font-extrabold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل PNG</span>
            </button>
            <span>•</span>
            <button
              onClick={handlePrint}
              className="text-[#FECC00] hover:underline font-extrabold flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

