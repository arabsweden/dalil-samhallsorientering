import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { UserProfile } from '../types';

interface PremiumContentGuardProps {
  userProfile: UserProfile;
  onUpgrade: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const PremiumContentGuard: React.FC<PremiumContentGuardProps> = ({ 
  userProfile, 
  onUpgrade, 
  children,
  title = "محتوى حصري للمشتركين",
  description = "هذا المحتوى متاح للمشتركين المميزين فقط. قم بالترقية الآن للوصول إلى كافة المزايا والدروس الحصرية."
}) => {
  if (userProfile.subscriptionPlan !== 'free') {
    return <>{children}</>;
  }

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-lg">
      <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
        <Crown className="w-8 h-8 text-yellow-500" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
      <button 
        onClick={onUpgrade}
        className="bg-[#FECC00] hover:bg-yellow-400 text-[#005293] font-black px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        ترقية الاشتراك
      </button>
    </div>
  );
};
