import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CategoriesView } from './components/CategoriesView';
import { AIAssistantView } from './components/AIAssistantView';
import { AuthoritiesView } from './components/AuthoritiesView';
import { ConsultationsView } from './components/ConsultationsView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { EventsCalendarView } from './components/EventsCalendarView';
import { QuestionBankView } from './components/QuestionBankView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { QuizModal } from './components/QuizModal';
import { LawUpdatesBanner } from './components/LawUpdatesBanner';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CertificateModal } from './components/CertificateModal';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { ToastNotificationContainer } from './components/ToastNotification';

import { Language, Lesson, AIAnswer, UserProfile, ToastNotification } from './types';
import { MUNICIPALITIES_DATA } from './data/municipalitiesData';
import { LAW_UPDATES_DATA } from './data/lawUpdatesData';
import { CATEGORIES_DATA } from './data/categoriesData';

export function App() {
  // App state with local persistence
  const [language, setLanguage] = useState<Language>('ar');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('sverige_dark_mode') === 'true';
  });
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('stockholm');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const local = localStorage.getItem('sverige_user_profile');
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
    return {
      id: 'usr-1',
      name: 'القادم الجديد المتميز',
      email: 'learner@sverige.se',
      municipalityId: 'stockholm',
      completedLessonIds: [],
      savedLessonIds: [],
      earnedBadgeIds: ['badge-welcome'],
      xpPoints: 100,
      subscriptionPlan: 'free',
      languagePreference: 'ar',
    };
  });

  // Saved AI Answers
  const [savedAnswers, setSavedAnswers] = useState<AIAnswer[]>(() => {
    const local = localStorage.getItem('sverige_saved_answers');
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
    return [];
  });

  // Modals state
  const [selectedLessonForDetail, setSelectedLessonForDetail] = useState<Lesson | null>(null);
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState<Lesson | null>(null);
  const [showLawUpdatesModal, setShowLawUpdatesModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);
  const [showPrivacyTermsModal, setShowPrivacyTermsModal] = useState<boolean>(false);

  // Lesson Visit Counts Tracking & Toast Notifications
  const [lessonVisitCounts, setLessonVisitCounts] = useState<Record<string, number>>(() => {
    const local = localStorage.getItem('sverige_lesson_visit_counts');
    if (local) {
      try { return JSON.parse(local); } catch {}
    }
    return {};
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenLessonDetail = (lesson: Lesson) => {
    setSelectedLessonForDetail(lesson);

    const isQuizCompleted = userProfile.completedLessonIds.includes(lesson.id);

    if (!isQuizCompleted) {
      const currentCount = (lessonVisitCounts[lesson.id] || 0) + 1;
      const updatedCounts = { ...lessonVisitCounts, [lesson.id]: currentCount };
      setLessonVisitCounts(updatedCounts);
      localStorage.setItem('sverige_lesson_visit_counts', JSON.stringify(updatedCounts));

      // Remind user if they visited the lesson modal MORE THAN TWICE (3 or more times) without taking the test
      if (currentCount > 2) {
        const toastId = `quiz-reminder-${lesson.id}`;

        const newToast: ToastNotification = {
          id: toastId,
          type: 'quiz_reminder',
          title: 'تذكير لترسيخ المعلومات 🎯',
          titleSv: 'Påminnelse: Gör kunskapstestet 🎯',
          titleEn: 'Quiz Reminder: Test Your Knowledge 🎯',
          message: `لقد زرت درس "${lesson.title}" ${currentCount} مرات دون إجراء الاختبار! خذ الاختبار القصير الآن لترسيخ معلوماتك وكسب +250 XP.`,
          messageSv: `Du har besökt lektionen "${lesson.titleSv}" ${currentCount} gånger utan att göra testet! Gör det korta quizet nu för att stärk dina kunskaper och tjäna +250 XP.`,
          messageEn: `You've visited "${lesson.titleEn}" ${currentCount} times without taking the quiz! Take the test now to consolidate your learning and earn +250 XP.`,
          actionLabel: 'إجراء الاختبار الآن 📝',
          actionLabelSv: 'Gör testet nu 📝',
          actionLabelEn: 'Take Quiz Now 📝',
          onAction: () => {
            setSelectedLessonForDetail(null);
            setSelectedLessonForQuiz(lesson);
          },
          autoCloseDuration: 14000,
        };

        setToasts(prev => [newToast, ...prev.filter(t => t.id !== toastId)]);
      }
    }
  };

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem('sverige_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sverige_saved_answers', JSON.stringify(savedAnswers));
  }, [savedAnswers]);

  useEffect(() => {
    localStorage.setItem('sverige_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle document direction and font
  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Lock body scroll when any modal is active to prevent horizontal displacement
  useEffect(() => {
    const isModalOpen = Boolean(
      selectedLessonForDetail ||
      selectedLessonForQuiz ||
      showLawUpdatesModal ||
      showCertificateModal ||
      showSubscriptionModal ||
      showPrivacyTermsModal
    );

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [
    selectedLessonForDetail,
    selectedLessonForQuiz,
    showLawUpdatesModal,
    showCertificateModal,
    showSubscriptionModal,
    showPrivacyTermsModal,
  ]);

  const selectedMunicipality = MUNICIPALITIES_DATA.find(m => m.id === selectedMunicipalityId) || MUNICIPALITIES_DATA[0];

  // Total lessons count
  const totalLessonsCount = CATEGORIES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);

  // Handlers
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  const handleSaveAIAnswer = (answer: AIAnswer) => {
    if (!savedAnswers.some(a => a.id === answer.id)) {
      setSavedAnswers(prev => [answer, ...prev]);
    }
  };

  const handleRemoveAIAnswer = (id: string) => {
    setSavedAnswers(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleSaveLesson = (lessonId: string) => {
    setUserProfile(prev => {
      const isSaved = prev.savedLessonIds.includes(lessonId);
      const newSaved = isSaved
        ? prev.savedLessonIds.filter(id => id !== lessonId)
        : [...prev.savedLessonIds, lessonId];
      return { ...prev, savedLessonIds: newSaved };
    });
  };

  const handleSaveLessonNote = (lessonId: string, noteText: string) => {
    setUserProfile(prev => {
      const updatedNotes = { ...(prev.lessonNotes || {}), [lessonId]: noteText };
      return { ...prev, lessonNotes: updatedNotes };
    });
  };

  const handleQuizComplete = (lessonId: string, scorePercentage: number) => {
    // Dismiss any active quiz reminder toast for this lesson
    setToasts(prev => prev.filter(t => t.id !== `quiz-reminder-${lessonId}`));

    // Reset visit count for this lesson
    setLessonVisitCounts(prev => {
      const updated = { ...prev, [lessonId]: 0 };
      localStorage.setItem('sverige_lesson_visit_counts', JSON.stringify(updated));
      return updated;
    });

    setUserProfile(prev => {
      const isAlreadyDone = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isAlreadyDone ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const addedXp = scorePercentage >= 60 ? 250 : 50;

      // Unlock Badges logic
      const newBadges = [...prev.earnedBadgeIds];
      if (newCompleted.length >= 1 && !newBadges.includes('badge-first-lesson')) {
        newBadges.push('badge-first-lesson');
      }
      if (newCompleted.length >= 5 && !newBadges.includes('badge-quiz-master')) {
        newBadges.push('badge-quiz-master');
      }
      if (newCompleted.length >= totalLessonsCount && !newBadges.includes('badge-sverige-expert')) {
        newBadges.push('badge-sverige-expert');
      }

      return {
        ...prev,
        completedLessonIds: newCompleted,
        xpPoints: prev.xpPoints + addedXp,
        earnedBadgeIds: newBadges,
      };
    });
  };


  const handleHeroSearch = (query: string) => {
    setGlobalSearchQuery(query);
    setActiveTab('categories');
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden font-sans flex flex-col transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'}`}>
      {/* Top Main Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        selectedMunicipalityId={selectedMunicipalityId}
        onSelectMunicipality={setSelectedMunicipalityId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        unreadUpdatesCount={LAW_UPDATES_DATA.length}
        onOpenLawUpdates={() => setShowLawUpdatesModal(true)}
        onOpenCertificate={() => setShowCertificateModal(true)}
        onOpenSubscription={() => setShowSubscriptionModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              language={language}
              selectedMunicipality={selectedMunicipality}
              onSearch={handleHeroSearch}
              onStartCourse={() => setActiveTab('categories')}
              onAskAI={() => setActiveTab('ai')}
              onBookConsultation={() => setActiveTab('consultations')}
              onOpenEvents={() => setActiveTab('events')}
            />

            {/* Main Categories Section Preview */}
            <CategoriesView
              language={language}
              completedLessonIds={userProfile.completedLessonIds}
              savedLessonIds={userProfile.savedLessonIds}
              onOpenLesson={handleOpenLessonDetail}
              onStartQuiz={(lesson) => setSelectedLessonForQuiz(lesson)}
              searchQuery={globalSearchQuery}
            />
          </>
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            language={language}
            completedLessonIds={userProfile.completedLessonIds}
            savedLessonIds={userProfile.savedLessonIds}
            onOpenLesson={handleOpenLessonDetail}
            onStartQuiz={(lesson) => setSelectedLessonForQuiz(lesson)}
            searchQuery={globalSearchQuery}
          />
        )}


        {activeTab === 'ai' && (
          <AIAssistantView
            language={language}
            selectedMunicipality={selectedMunicipality}
            savedAnswers={savedAnswers}
            onSaveAnswer={handleSaveAIAnswer}
          />
        )}

        {activeTab === 'authorities' && (
          <AuthoritiesView language={language} />
        )}

        {activeTab === 'consultations' && (
          <ConsultationsView
            language={language}
            selectedMunicipality={selectedMunicipality}
            userProfile={userProfile}
            onBookSuccess={() => {}}
          />
        )}

        {activeTab === 'events' && (
          <EventsCalendarView
            language={language}
            userProfile={userProfile}
            onUpdateUserProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBankView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onOpenSubscriptionModal={() => setShowSubscriptionModal(true)}
            onOpenCertificateModal={() => setShowCertificateModal(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            language={language}
            userProfile={userProfile}
            selectedMunicipality={selectedMunicipality}
            onUpdateProfile={handleUpdateProfile}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onOpenSubscription={() => setShowSubscriptionModal(true)}
            savedAnswers={savedAnswers}
            onRemoveAnswer={handleRemoveAIAnswer}
            onNavigateToCategories={(catId) => {
              if (catId) setGlobalSearchQuery('');
              setActiveTab('categories');
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenPrivacyTerms={() => setShowPrivacyTermsModal(true)}
        onSelectCategory={(catId) => {
          setActiveTab('categories');
        }}
      />

      {/* Modals & Dialogs */}
      <LessonDetailModal
        lesson={selectedLessonForDetail}
        language={language}
        onClose={() => setSelectedLessonForDetail(null)}
        onStartQuiz={(lesson) => {
          setSelectedLessonForDetail(null);
          setSelectedLessonForQuiz(lesson);
        }}
        isCompleted={selectedLessonForDetail ? userProfile.completedLessonIds.includes(selectedLessonForDetail.id) : false}
        isSaved={selectedLessonForDetail ? userProfile.savedLessonIds.includes(selectedLessonForDetail.id) : false}
        onToggleSaveLesson={handleToggleSaveLesson}
        userNote={selectedLessonForDetail ? (userProfile.lessonNotes?.[selectedLessonForDetail.id] || '') : ''}
        onSaveNote={handleSaveLessonNote}
      />

      <QuizModal
        lesson={selectedLessonForQuiz}
        language={language}
        onClose={() => setSelectedLessonForQuiz(null)}
        onQuizComplete={handleQuizComplete}
      />

      <LawUpdatesBanner
        language={language}
        isOpen={showLawUpdatesModal}
        onClose={() => setShowLawUpdatesModal(false)}
      />

      <SubscriptionModal
        language={language}
        userProfile={userProfile}
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSelectPlan={(plan) => setUserProfile(prev => ({ ...prev, subscriptionPlan: plan }))}
      />

      <CertificateModal
        language={language}
        userProfile={userProfile}
        completedLessonsCount={userProfile.completedLessonIds.length}
        totalLessonsCount={totalLessonsCount}
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
      />

      <PrivacyTermsModal
        language={language}
        isOpen={showPrivacyTermsModal}
        onClose={() => setShowPrivacyTermsModal(false)}
      />

      {/* Floating Toast Notification Container */}
      <ToastNotificationContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        language={language}
      />
    </div>
  );
}


export default App;
