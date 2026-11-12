import React, { useState, useEffect } from 'react';
import { UserProgress } from './types';
import { 
  loadUserProgress, 
  saveUserProgress, 
  calculateLevel, 
  INITIAL_PROGRESS,
  updateSRSForWord
} from './utils/storage';
import { Navbar, TabType } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { AlphabetView } from './components/AlphabetView';
import { CourseView } from './components/CourseView';
import { VocabularyView } from './components/VocabularyView';
import { ExerciseHub } from './components/ExerciseHub';
import { GrammarView } from './components/GrammarView';
import { ReviewView } from './components/ReviewView';
import { ProfileView } from './components/ProfileView';
import { Sparkles, Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [activeCourseModule, setActiveCourseModule] = useState<number | undefined>(undefined);
  const [activeCourseLesson, setActiveCourseLesson] = useState<string | undefined>(undefined);
  const [levelUpModal, setLevelUpModal] = useState<{ level: number; title: string } | null>(null);

  // Sync to local storage on state change
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Add XP helper with level-up trigger
  const handleAddXp = (amount: number) => {
    setProgress((prev) => {
      const prevLvl = calculateLevel(prev.xp);
      const newXp = prev.xp + amount;
      const newTodayXp = prev.todayXp + amount;
      const nextLvl = calculateLevel(newXp);

      if (nextLvl.level > prevLvl.level) {
        // Trigger Level Up
        setLevelUpModal({ level: nextLvl.level, title: nextLvl.title });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      }

      return {
        ...prev,
        xp: newXp,
        todayXp: newTodayXp,
      };
    });
  };

  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    setProgress((prev) => {
      const completedSet = new Set(prev.completedLessons);
      completedSet.add(lessonId);
      return {
        ...prev,
        completedLessons: Array.from(completedSet),
      };
    });
    handleAddXp(xpReward);
  };

  const handleRecordExerciseResult = (isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      exercisesCompleted: prev.exercisesCompleted + 1,
      exercisesCorrect: isCorrect ? prev.exercisesCorrect + 1 : prev.exercisesCorrect,
    }));
  };

  const handleToggleFavorite = (wordId: string) => {
    setProgress((prev) => {
      const exists = prev.favoriteWords.includes(wordId);
      const nextFavs = exists
        ? prev.favoriteWords.filter((id) => id !== wordId)
        : [...prev.favoriteWords, wordId];
      return {
        ...prev,
        favoriteWords: nextFavs,
      };
    });
  };

  const handleUpdateSrs = (wordId: string, wasCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      srsData: updateSRSForWord(prev.srsData, wordId, wasCorrect),
    }));
  };

  const handleUpdateDailyGoal = (goalXp: number) => {
    setProgress((prev) => ({
      ...prev,
      dailyGoalXp: goalXp,
    }));
  };

  const handleUpdateAudioSpeed = (speed: number) => {
    setProgress((prev) => ({
      ...prev,
      audioSpeed: speed,
    }));
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    saveUserProgress(INITIAL_PROGRESS);
    setCurrentTab('dashboard');
  };

  const handleStartLessonFromDashboard = (moduleId: number, lessonId: string) => {
    setActiveCourseModule(moduleId);
    setActiveCourseLesson(lessonId);
    setCurrentTab('course');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'course') {
            setActiveCourseModule(undefined);
            setActiveCourseLesson(undefined);
          }
        }}
        progress={progress}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectTab={setCurrentTab}
            onStartLesson={handleStartLessonFromDashboard}
          />
        )}

        {currentTab === 'alphabet' && (
          <AlphabetView
            onAddXp={handleAddXp}
            onRecordExerciseResult={handleRecordExerciseResult}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {currentTab === 'course' && (
          <CourseView
            progress={progress}
            onCompleteLesson={handleCompleteLesson}
            activeModuleId={activeCourseModule}
            activeLessonId={activeCourseLesson}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {currentTab === 'vocabulary' && (
          <VocabularyView
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {currentTab === 'exercises' && (
          <ExerciseHub
            onAddXp={handleAddXp}
            onRecordExerciseResult={handleRecordExerciseResult}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {currentTab === 'grammar' && (
          <GrammarView audioSpeed={progress.audioSpeed} />
        )}

        {currentTab === 'review' && (
          <ReviewView
            progress={progress}
            onUpdateSrs={handleUpdateSrs}
            onAddXp={handleAddXp}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            progress={progress}
            onUpdateDailyGoal={handleUpdateDailyGoal}
            onUpdateAudioSpeed={handleUpdateAudioSpeed}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Level Up Celebration Modal */}
      {levelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border border-purple-500/50 p-6 sm:p-8 text-center shadow-2xl">
            <button
              onClick={() => setLevelUpModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-xl ring-4 ring-purple-500/30 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Parabéns! Subiu de Nível!
            </span>
            <h3 className="text-2xl font-black text-white mt-1 mb-1">
              Nível {levelUpModal.level}
            </h3>
            <p className="text-sm font-semibold text-purple-300 mb-6">
              {levelUpModal.title}
            </p>

            <button
              onClick={() => setLevelUpModal(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-bold text-white shadow-md transition-all"
            >
              Continuar Aprendendo
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Русский</span>
            <span>—</span>
            <span>Aprenda Russo para falantes de Português Brasileiro</span>
          </div>
          <div>
            Áudio nativo com síntese de voz (ru-RU) · Progresso salvo localmente
          </div>
        </div>
      </footer>
    </div>
  );
}
