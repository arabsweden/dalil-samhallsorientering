import React, { useEffect } from 'react';
import { HelpCircle, Sparkles, AlertTriangle, CheckCircle2, X, ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import { ToastNotification, Language } from '../types';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
  language: Language;
}

export const ToastNotificationContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  language,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-4 left-4 sm:left-auto sm:max-w-md z-[100] flex flex-col space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <SingleToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          language={language}
        />
      ))}
    </div>
  );
};

interface SingleToastProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
  language: Language;
}

const SingleToastItem: React.FC<SingleToastProps> = ({ toast, onDismiss, language }) => {
  useEffect(() => {
    if (toast.autoCloseDuration) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  const titleText =
    language === 'sv'
      ? toast.titleSv || toast.title
      : language === 'en'
      ? toast.titleEn || toast.title
      : toast.title;

  const messageText =
    language === 'sv'
      ? toast.messageSv || toast.message
      : language === 'en'
      ? toast.messageEn || toast.message
      : toast.message;

  const actionText =
    language === 'sv'
      ? toast.actionLabelSv || toast.actionLabel
      : language === 'en'
      ? toast.actionLabelEn || toast.actionLabel
      : toast.actionLabel;

  const isQuizReminder = toast.type === 'quiz_reminder';

  return (
    <div
      className={`pointer-events-auto w-full p-4 rounded-2xl shadow-2xl border-2 transition-all transform animate-slide-up duration-300 flex flex-col space-y-3 backdrop-blur-xl ${
        isQuizReminder
          ? 'bg-slate-950/95 text-white border-amber-400/80 shadow-amber-500/20'
          : toast.type === 'success'
          ? 'bg-slate-950/95 text-white border-emerald-500 shadow-emerald-500/20'
          : toast.type === 'warning'
          ? 'bg-slate-950/95 text-white border-red-500 shadow-red-500/20'
          : 'bg-slate-950/95 text-white border-blue-500 shadow-blue-500/20'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Icon Badge */}
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isQuizReminder
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                : toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : toast.type === 'warning'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
            }`}
          >
            {isQuizReminder ? (
              <Brain className="w-6 h-6 text-amber-400" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-6 h-6 text-red-400" />
            ) : (
              <Sparkles className="w-6 h-6 text-blue-400" />
            )}
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-300 flex items-center gap-1.5 leading-snug">
              <span>{titleText}</span>
              {isQuizReminder && (
                <span className="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black">
                  تذكير بالترسيخ
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">{messageText}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          title="إغلاق التنبيه"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Direct Action CTA */}
      {toast.onAction && actionText && (
        <div className="pt-1 flex justify-end">
          <button
            onClick={() => {
              toast.onAction?.();
              onDismiss(toast.id);
            }}
            className="w-full sm:w-auto px-4 py-2 bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group border border-yellow-300"
          >
            <span>{actionText}</span>
            {language === 'ar' ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
