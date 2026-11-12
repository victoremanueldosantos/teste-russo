import { UserProgress, SRSItem } from '../types';

const STORAGE_KEY = 'russkiy_app_progress_v1';

export const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  favoriteWords: ['w1', 'w3', 'w12'], // sensible initial favorites
  srsData: {},
  exercisesCompleted: 0,
  exercisesCorrect: 0,
  dailyGoalXp: 30,
  todayXp: 0,
  audioSpeed: 0.9,
  theme: 'deep',
  soundEnabled: true,
  unlockedBadges: ['first_step'],
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProgress(INITIAL_PROGRESS);
      return INITIAL_PROGRESS;
    }
    const parsed = JSON.parse(raw) as UserProgress;
    
    // Check if streak needs updating
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastStudyDate !== today) {
      const lastDate = new Date(parsed.lastStudyDate);
      const currDate = new Date(today);
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        // streak maintains, todayXp resets
        parsed.todayXp = 0;
      } else if (diffDays > 1) {
        // Broken streak
        parsed.streakDays = 1;
        parsed.todayXp = 0;
      }
      parsed.lastStudyDate = today;
    }

    return { ...INITIAL_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Falha ao ler progresso:', e);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Falha ao salvar progresso:', e);
  }
}

export function calculateLevel(xp: number): {
  level: number;
  title: string;
  currentXpInLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
} {
  // Levels:
  // L1: 0 - 100 XP (Iniciante Curioso)
  // L2: 101 - 250 XP (Aprendiz do Cirílico)
  // L3: 251 - 500 XP (Explorador das Palavras)
  // L4: 501 - 900 XP (Estudante Dedicado)
  // L5: 901 - 1500 XP (Poliglota em Ascensão)
  // L6: 1501 - 2300 XP (Mestre dos Casos)
  // L7: 2301 - 3300 XP (Intermediário Fluente)
  // L8: 3301 - 4500 XP (Orador Eslavo)
  // L9: 4501 - 6000 XP (Filólogo)
  // L10: 6000+ XP (Nativo Honorário)
  const thresholds = [
    { lvl: 1, max: 100, title: 'Iniciante Curioso' },
    { lvl: 2, max: 250, title: 'Aprendiz do Cirílico' },
    { lvl: 3, max: 500, title: 'Explorador das Palavras' },
    { lvl: 4, max: 900, title: 'Estudante Dedicado' },
    { lvl: 5, max: 1500, title: 'Poliglota em Ascensão' },
    { lvl: 6, max: 2300, title: 'Mestre dos Casos' },
    { lvl: 7, max: 3300, title: 'Intermediário Fluente' },
    { lvl: 8, max: 4500, title: 'Orador Eslavo' },
    { lvl: 9, max: 6000, title: 'Filólogo' },
    { lvl: 10, max: 99999, title: 'Nativo Honorário' },
  ];

  let prevMax = 0;
  for (const t of thresholds) {
    if (xp <= t.max) {
      const levelSpan = t.max - prevMax;
      const currentXpInLevel = Math.max(0, xp - prevMax);
      const progressPercent = Math.min(100, Math.round((currentXpInLevel / levelSpan) * 100));
      return {
        level: t.lvl,
        title: t.title,
        currentXpInLevel,
        xpNeededForNext: levelSpan,
        progressPercent,
      };
    }
    prevMax = t.max;
  }

  return {
    level: 10,
    title: 'Nativo Honorário',
    currentXpInLevel: xp - 6000,
    xpNeededForNext: 1000,
    progressPercent: 100,
  };
}

export function updateSRSForWord(
  currentData: Record<string, SRSItem>,
  wordId: string,
  wasCorrect: boolean
): Record<string, SRSItem> {
  const existing = currentData[wordId] || {
    wordId,
    intervalDays: 1,
    repetitions: 0,
    easeFactor: 2.5,
    lastReviewed: new Date().toISOString(),
    nextReview: new Date().toISOString(),
    status: 'learning',
    incorrectCount: 0,
  };

  const today = new Date();
  let nextDate = new Date();
  let newRepetitions = existing.repetitions;
  let newInterval = existing.intervalDays;
  let newEase = existing.easeFactor;
  let newStatus = existing.status;
  let newIncorrect = existing.incorrectCount;

  if (wasCorrect) {
    newRepetitions += 1;
    if (newRepetitions === 1) {
      newInterval = 1;
      newStatus = 'learning';
    } else if (newRepetitions === 2) {
      newInterval = 3;
      newStatus = 'reviewing';
    } else {
      newInterval = Math.round(newInterval * newEase);
      if (newInterval >= 14) {
        newStatus = 'mastered';
      }
    }
    newEase = Math.min(2.8, newEase + 0.1);
  } else {
    newRepetitions = 0;
    newInterval = 1;
    newStatus = 'learning';
    newIncorrect += 1;
    newEase = Math.max(1.3, newEase - 0.2);
  }

  nextDate.setDate(today.getDate() + newInterval);

  return {
    ...currentData,
    [wordId]: {
      wordId,
      intervalDays: newInterval,
      repetitions: newRepetitions,
      easeFactor: Number(newEase.toFixed(2)),
      lastReviewed: today.toISOString(),
      nextReview: nextDate.toISOString(),
      status: newStatus,
      incorrectCount: newIncorrect,
    },
  };
}
