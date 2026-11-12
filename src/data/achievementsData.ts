import { Achievement, UserProgress } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'Primeiro Passo (Первый шаг)',
    description: 'Iniciou seus estudos e realizou sua primeira atividade no app.',
    icon: 'Footprints',
    maxProgress: 1,
    currentProgress: 1,
    unlockedAt: 'Hoje',
  },
  {
    id: 'alphabet_master',
    title: 'Mestre do Cirílico',
    description: 'Conclua exercícios de reconhecimento do alfabeto cirílico.',
    icon: 'BookOpen',
    maxProgress: 10,
    currentProgress: 0,
  },
  {
    id: 'streak_warrior',
    title: 'Disciplina Eslava',
    description: 'Mantenha uma sequência de 3 ou mais dias de estudos consecutivos.',
    icon: 'Flame',
    maxProgress: 3,
    currentProgress: 1,
  },
  {
    id: 'vocab_collector',
    title: 'Guardião de Vocábulos',
    description: 'Marque pelo menos 5 palavras como favoritas no vocabulário.',
    icon: 'Bookmark',
    maxProgress: 5,
    currentProgress: 3,
  },
  {
    id: 'xp_centurion',
    title: 'Centurião de XP',
    description: 'Acumule 100 ou mais pontos de experiência (XP).',
    icon: 'Award',
    maxProgress: 100,
    currentProgress: 0,
  },
  {
    id: 'exercise_ace',
    title: 'Atirador de Elite',
    description: 'Acerte 10 exercícios diferentes na plataforma.',
    icon: 'Target',
    maxProgress: 10,
    currentProgress: 0,
  },
  {
    id: 'srs_scholar',
    title: 'Memória de Aço',
    description: 'Revise 5 termos na Revisão Espaçada (SRS).',
    icon: 'RotateCw',
    maxProgress: 5,
    currentProgress: 0,
  },
];

export function evaluateAchievements(progress: UserProgress): Achievement[] {
  return INITIAL_ACHIEVEMENTS.map((ach) => {
    let current = ach.currentProgress;
    let unlocked = progress.unlockedBadges.includes(ach.id);

    if (ach.id === 'first_step') {
      current = 1;
      unlocked = true;
    } else if (ach.id === 'alphabet_master') {
      current = Math.min(ach.maxProgress, progress.exercisesCompleted);
      if (current >= ach.maxProgress) unlocked = true;
    } else if (ach.id === 'streak_warrior') {
      current = Math.min(ach.maxProgress, progress.streakDays);
      if (current >= ach.maxProgress) unlocked = true;
    } else if (ach.id === 'vocab_collector') {
      current = Math.min(ach.maxProgress, progress.favoriteWords.length);
      if (current >= ach.maxProgress) unlocked = true;
    } else if (ach.id === 'xp_centurion') {
      current = Math.min(ach.maxProgress, progress.xp);
      if (current >= ach.maxProgress) unlocked = true;
    } else if (ach.id === 'exercise_ace') {
      current = Math.min(ach.maxProgress, progress.exercisesCorrect);
      if (current >= ach.maxProgress) unlocked = true;
    } else if (ach.id === 'srs_scholar') {
      const srsCount = Object.keys(progress.srsData).length;
      current = Math.min(ach.maxProgress, srsCount);
      if (current >= ach.maxProgress) unlocked = true;
    }

    return {
      ...ach,
      currentProgress: current,
      unlockedAt: unlocked ? (ach.unlockedAt || 'Conquistado') : undefined,
    };
  });
}
