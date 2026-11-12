export type LetterType = 'vogal' | 'consoante' | 'sinal';

export interface RussianLetter {
  id: string;
  upper: string;
  lower: string;
  name: string; // e.g. "А" (a), "Бэ" (be)
  soundPt: string; // e.g. "Como o 'a' de pai"
  transliteration: string; // e.g. "a", "b", "v"
  type: LetterType;
  phoneticDescription: string; // detailed nuance for PT-BR speaker
  exampleWord: {
    ru: string;
    translit: string;
    pt: string;
  };
  confusingPairWith?: string; // e.g. "В vs Б", "Р vs П", "Н vs И", "Ш vs Щ"
  hardSoftPair?: string; // e.g. for vowels: А/Я, О/Ё, У/Ю, Э/Е, Ы/И
}

export type AlphabetExerciseType = 
  | 'identify-sound' 
  | 'sound-to-letter' 
  | 'match-case' 
  | 'translit-to-letter'
  | 'confusing-pairs'
  | 'audio-listen';

export interface AlphabetExercise {
  id: string;
  type: AlphabetExerciseType;
  prompt: string;
  letterTarget?: RussianLetter;
  audioText?: string;
  options: {
    id: string;
    text: string;
    subtext?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface VocabularyWord {
  id: string;
  ru: string;
  pt: string;
  translit: string;
  category: 'família' | 'comida' | 'números' | 'lugares' | 'cotidiano' | 'viagem' | 'saudações' | 'tempo';
  partOfSpeech: 'substantivo' | 'verbo' | 'adjetivo' | 'advérbio' | 'expressão' | 'pronome';
  gender?: 'masculino' | 'feminino' | 'neutro';
  exampleRu: string;
  exampleTranslit: string;
  examplePt: string;
  culturalNote?: string;
}

export interface SRSItem {
  wordId: string;
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
  lastReviewed: string;
  nextReview: string;
  status: 'learning' | 'reviewing' | 'mastered';
  incorrectCount: number;
}

export interface LessonContent {
  id: string;
  title: string;
  type: 'concept' | 'dialogue' | 'vocabulary' | 'grammar' | 'practice';
  body: string;
  russianSnippets?: {
    ru: string;
    translit: string;
    pt: string;
    note?: string;
  }[];
  practiceQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  level: string; // "Iniciante A1", "Básico A1+", etc.
  lessonsCount: number;
  estimatedMinutes: number;
  xpReward: number;
  lessons: {
    id: string;
    title: string;
    summary: string;
    contents: LessonContent[];
  }[];
}

export type GeneralExerciseType = 
  | 'ru-to-pt'
  | 'pt-to-ru'
  | 'multiple-choice'
  | 'fill-blank'
  | 'word-order'
  | 'letter-sound'
  | 'matching-pairs';

export interface GeneralExercise {
  id: string;
  type: GeneralExerciseType;
  difficulty: 'fácil' | 'médio' | 'avançado';
  topic: string;
  prompt: string;
  russianReference?: string;
  translitReference?: string;
  options?: string[];
  correctAnswer: string | string[]; // string for simple, string[] for ordered words
  explanation: string;
  pairs?: { ru: string; pt: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  maxProgress: number;
  currentProgress: number;
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson ids
  favoriteWords: string[]; // word ids
  srsData: Record<string, SRSItem>;
  exercisesCompleted: number;
  exercisesCorrect: number;
  dailyGoalXp: number;
  todayXp: number;
  audioSpeed: number; // 0.8 or 1.0
  theme: 'deep' | 'contrast' | 'light';
  soundEnabled: boolean;
  unlockedBadges: string[];
}
