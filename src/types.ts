export type Language = 'ar' | 'sv' | 'en';

export interface MatchingPair {
  id: string;
  left: string;      // Term or Agency (e.g., Arabic/Swedish)
  leftSv?: string;
  leftEn?: string;
  right: string;     // Definition or Function
  rightSv?: string;
  rightEn?: string;
}

export interface QuizQuestion {
  id: string;
  type?: 'mcq' | 'matching';
  question: string;
  questionSv: string;
  questionEn: string;
  options: string[];
  optionsSv: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationSv: string;
  explanationEn: string;
  matchingPairs?: MatchingPair[];
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  titleSv: string;
  titleEn: string;
  readingTimeMinutes: number;
  summary: string;
  summarySv: string;
  summaryEn: string;
  fullContent: string;
  fullContentSv: string;
  fullContentEn: string;
  practicalExamples: string[];
  practicalExamplesSv: string[];
  practicalExamplesEn: string[];
  officialSource: string;
  officialUrl: string;
  lastVerifiedDate: string;
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  iconName: string;
  title: string;
  titleSv: string;
  titleEn: string;
  description: string;
  descriptionSv: string;
  descriptionEn: string;
  badgeTag: string;
  lessons: Lesson[];
}

export interface OfficialSource {
  name: string;
  url: string;
}

export interface AIAnswer {
  id?: string;
  question?: string;
  summary: string;
  detailedAnswer: string;
  practicalTip?: string;
  officialSources: OfficialSource[];
  relatedCategory?: string;
  disclaimer: string;
  createdAt?: string;
}

export interface Authority {
  id: string;
  name: string;
  nameSv: string;
  nameEn: string;
  category: string;
  phone: string;
  emergencyPhone?: string;
  website: string;
  hours: string;
  description: string;
  descriptionSv: string;
  descriptionEn: string;
  services: string[];
}

export interface Municipality {
  id: string;
  name: string;
  nameSv: string;
  region: string;
  website: string;
  sfiContact: string;
  socialServicesPhone: string;
  housingAgencyUrl: string;
}

export interface LawUpdate {
  id: string;
  title: string;
  titleSv: string;
  titleEn: string;
  date: string;
  category: string;
  importance: 'critical' | 'high' | 'medium';
  summary: string;
  summarySv: string;
  summaryEn: string;
  impactOnNewcomers: string;
  officialLink: string;
}

export interface Badge {
  id: string;
  title: string;
  titleSv: string;
  titleEn: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export type QuestionType = 'mcq' | 'true_false' | 'scenario' | 'faq';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LegalStatus = 'current_law' | 'adopted_decision' | 'proposal_investigation' | 'needs_verification';
export type MembershipLevel = 'free' | 'individual_premium';

export interface PremiumQuestion {
  id: string;
  moduleId: number; // 1 to 8
  moduleTitle: string;
  lessonId?: string;
  questionType: QuestionType;
  questionArabic: string;
  swedishTerm: string;
  choices: string[];
  correctAnswer: number; // index 0..3 (or 0..1)
  explanationArabic: string;
  practicalAdvice: string;
  authorityName: string;
  officialSourceUrl: string;
  difficulty: DifficultyLevel;
  legalStatus: LegalStatus;
  lastVerifiedDate: string;
  membershipLevel: MembershipLevel;
  isActive: boolean;
}

export interface QuizAttemptResult {
  id: string;
  date: string;
  moduleId?: number | 'final';
  moduleTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  wrongQuestionIds: string[];
  topicsToReview: string[];
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  municipalityId: string;
  language?: Language;
  completedLessonIds: string[];
  quizScores?: Record<string, number>; // lessonId -> percentage
  earnedBadgeIds: string[];
  xpPoints: number;
  subscriptionPlan: 'free' | 'premium' | 'municipal';
  savedAnswerIds?: string[];
  savedLessonIds: string[];
  savedQuestionIds?: string[]; // bookmarked question IDs
  questionBankHistory?: QuizAttemptResult[];
  lessonNotes?: Record<string, string>; // lessonId -> note text
  certificateIssued?: boolean;
  certificateDate?: string;
  isGuest?: boolean;
  registeredEventIds?: string[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleSv: string;
  titleEn: string;
  category: 'orientation' | 'workshop' | 'legal' | 'family' | 'deadline';
  date: string; // ISO format e.g. 2026-08-05
  time: string; // e.g. 18:00 - 20:00
  locationType: 'online' | 'in_person' | 'hybrid';
  city: string; // e.g. Stockholm, Göteborg, Malmö, Online
  venueName?: string;
  organizer: string;
  summary: string;
  summarySv: string;
  summaryEn: string;
  description: string;
  descriptionSv: string;
  descriptionEn: string;
  isFree: boolean;
  spotsLeft?: number;
  meetingUrl?: string;
  targetAudience: string;
  tags: string[];
}

export interface RSVP {
  id: string;
  eventId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  municipality: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  consultationType: string;
  date: string;
  timeSlot: string;
  municipality: string;
  notes: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  titleSv?: string;
  titleEn?: string;
  message: string;
  messageSv?: string;
  messageEn?: string;
  type?: 'info' | 'quiz_reminder' | 'success' | 'warning';
  actionLabel?: string;
  actionLabelSv?: string;
  actionLabelEn?: string;
  onAction?: () => void;
  autoCloseDuration?: number;
}

