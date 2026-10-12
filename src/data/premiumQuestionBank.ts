import { PremiumQuestion, MembershipLevel, DifficultyLevel } from '../types';
import { MODULES_1_4_QUESTIONS } from './premiumQuestionsModule1_4';
import { MODULES_5_8_QUESTIONS } from './premiumQuestionsModule5_8';

export const ALL_PREMIUM_QUESTIONS: PremiumQuestion[] = [
  ...MODULES_1_4_QUESTIONS,
  ...MODULES_5_8_QUESTIONS,
];

export interface ModuleMetadata {
  id: number;
  title: string;
  titleSv: string;
  iconName: string;
  description: string;
  officialAuthority: string;
  questionsCount: number;
}

export const COURSE_MODULES: ModuleMetadata[] = [
  {
    id: 1,
    title: 'تاريخ السويد والديمقراطية ودولة القانون',
    titleSv: 'Sveriges historia, demokrati och rättsstat',
    iconName: 'Landmark',
    description: 'تاريخ نشوء دولة الرفاهية، القوانين الأساسية للدستور، دور الملك والبرلمان والحكومة، ومبدأ العلنية وتطورات اختبار المواطنة 2026.',
    officialAuthority: 'Riksdagen & Regeringen',
    questionsCount: 12,
  },
  {
    id: 2,
    title: 'الحقوق والواجبات والتعامل مع السلطات',
    titleSv: 'Rättigheter, skyldigheter och myndighetskontakt',
    iconName: 'ShieldCheck',
    description: 'قيد النفوس والرقم الشخصي، الهوية الرقمية BankID، التأمين الاجتماعي، شروط الاستقرار والدخل المسجل، وإجراءات التعامل مع الديون والاستئناف.',
    officialAuthority: 'Skatteverket & Försäkringskassan',
    questionsCount: 12,
  },
  {
    id: 3,
    title: 'السكن والأمن والشرطة والمرور والبيئة',
    titleSv: 'Bostad, säkerhet, polis, trafik och miljö',
    iconName: 'Home',
    description: 'عقود السكن وتحديد الإيجار العادل، حق التجول الحر Allemansrätten، قواعد المرور ورخص القيادة، أرقام الطوارئ، وتأمين السكن فرز النفايات.',
    officialAuthority: 'Polisen & Transportstyrelsen',
    questionsCount: 12,
  },
  {
    id: 4,
    title: 'سوق العمل والتعليم واللغة وإدارة المال',
    titleSv: 'Arbetsmarknad, utbildning, språk och ekonomi',
    iconName: 'Briefcase',
    description: 'مصلحة التوظيف والترسيخ، دراسة SFI وKomvux، الاتفاقيات الجماعية للنقابات، معادلة الشهادات الأجنبية UHR، دعم CSN، وصناديق A-kassa.',
    officialAuthority: 'Arbetsförmedlingen & UHR',
    questionsCount: 12,
  },
  {
    id: 5,
    title: 'حقوق الإنسان والمساواة ومكافحة التمييز',
    titleSv: 'Mänskliga rättigheter, jämställdhet och diskriminering',
    iconName: 'Scale',
    description: 'قانون مكافحة التمييز DO، المساواة بين الجنسين وتقسيم أيام الوالدية، حقوق الأقليات القومية، ومواجهة العنف الأسري ومراكز حماية المرأة.',
    officialAuthority: 'Diskrimineringsombudsmannen (DO)',
    questionsCount: 12,
  },
  {
    id: 6,
    title: 'الأسرة وحقوق الطفل والسوسيال والمدرسة',
    titleSv: 'Familj, barns rättigheter, socialtjänsten och skola',
    iconName: 'HeartHandshake',
    description: 'حظر العقاب البدني للأطفال، دور مصلحة الخدمات الاجتماعية (السوسيال)، اتفاقية حقوق الطفل، نظام المدارس الإلزامي ومحاربة التنمر.',
    officialAuthority: 'Socialstyrelsen & Skolverket',
    questionsCount: 12,
  },
  {
    id: 7,
    title: 'الصحة الجسدية والنفسية والرعاية الصحية',
    titleSv: 'Fysisk och psykisk hälsa samt sjukvård',
    iconName: 'Activity',
    description: 'دليل الرعاية 1177 والمستوصفات Vårdcentral، سقف التكلفة العالية Högkostnadsskydd، رعاية الأسنان، الصحة النفسية BUP، وسرية معلومات المريض.',
    officialAuthority: 'Regionerna & 1177 Vårdguiden',
    questionsCount: 12,
  },
  {
    id: 8,
    title: 'كبار السن والطوارئ والإجراءات المتعلقة بالوفاة',
    titleSv: 'Äldreomsorg, krisberedskap och dödsfall',
    iconName: 'AlertTriangle',
    description: 'خدمات الرعاية المنزلية Hemtjänst، الجاهزية المنزلية للأزمات Hemberedskap، إنذارات VMA، رسوم الجنازة والتدابير القانونية لحصر التركة.',
    officialAuthority: 'MSB & Pensionsmyndigheten',
    questionsCount: 12,
  },
];

export function getQuestionsByModule(moduleId: number, isPremiumUser: boolean): PremiumQuestion[] {
  const questions = ALL_PREMIUM_QUESTIONS.filter(q => q.moduleId === moduleId && q.isActive);
  if (!isPremiumUser) {
    // Free/Trial practice users get 5 full questions per module
    return questions.slice(0, 5);
  }
  return questions;
}

export function getRandomQuizSet(
  count: number | 'all',
  moduleId?: number | 'all' | 'final',
  isPremiumUser: boolean = false
): PremiumQuestion[] {
  let pool = ALL_PREMIUM_QUESTIONS.filter(q => q.isActive);
  
  if (typeof moduleId === 'number') {
    pool = pool.filter(q => q.moduleId === moduleId);
  }

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  if (count === 'all') {
    return shuffled;
  }
  const targetCount = typeof count === 'number' ? count : 5;
  return shuffled.slice(0, Math.min(targetCount, shuffled.length));
}

export function searchAndFilterQuestions(
  query: string,
  moduleId?: number | 'all',
  difficulty?: DifficultyLevel | 'all',
  questionType?: string,
  isPremiumUser: boolean = false
): PremiumQuestion[] {
  let list = ALL_PREMIUM_QUESTIONS.filter(q => q.isActive);

  if (!isPremiumUser) {
    // restrict view
    list = list.filter(q => q.membershipLevel === 'free');
  }

  if (moduleId && moduleId !== 'all') {
    list = list.filter(q => q.moduleId === moduleId);
  }

  if (difficulty && difficulty !== 'all') {
    list = list.filter(q => q.difficulty === difficulty);
  }

  if (questionType && questionType !== 'all') {
    list = list.filter(q => q.questionType === questionType);
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(item => 
      item.questionArabic.toLowerCase().includes(q) ||
      item.swedishTerm.toLowerCase().includes(q) ||
      item.explanationArabic.toLowerCase().includes(q) ||
      item.authorityName.toLowerCase().includes(q)
    );
  }

  return list;
}
