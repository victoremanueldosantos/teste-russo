import React from 'react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';
import { COURSE_MODULES } from '../data/courseData';
import { TabType } from './Navbar';
import { 
  Trophy, 
  Flame, 
  Target, 
  Play, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Bookmark, 
  RotateCw,
  Award
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onSelectTab: (tab: TabType) => void;
  onStartLesson: (moduleId: number, lessonId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onSelectTab,
  onStartLesson,
}) => {
  const lvlInfo = calculateLevel(progress.xp);

  // Find next lesson to continue
  let nextModule = COURSE_MODULES[0];
  let nextLesson = nextModule.lessons[0];

  for (const mod of COURSE_MODULES) {
    const uncompleted = mod.lessons.find((l) => !progress.completedLessons.includes(l.id));
    if (uncompleted) {
      nextModule = mod;
      nextLesson = uncompleted;
      break;
    }
  }

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallProgressPct = Math.round((completedCount / totalLessons) * 100);

  // Daily goal progress
  const dailyGoalPct = Math.min(100, Math.round((progress.todayXp / progress.dailyGoalXp) * 100));

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome & Main Level Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e162f] via-[#15103a] to-[#0a0f1d] border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Добро пожаловать! Bem-vindo aos seus estudos</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Olá, estudante! Готовы учиться?
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Continue sua jornada no russo com explicações claras em português brasileiro, áudio nativo em cirílico e exercícios práticos.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {completedCount} de {totalLessons} aulas concluídas ({overallProgressPct}%)
              </span>
              <span className="hidden sm:inline text-slate-600">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                {progress.exercisesCorrect} exercícios corretos
              </span>
            </div>
          </div>

          {/* Quick Continue CTA Card */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-sm shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  Próxima Aula
                </span>
                <span className="text-xs text-slate-500">{nextModule.level}</span>
              </div>
              <h2 className="text-base font-bold text-white mb-1 leading-snug">
                {nextLesson.title}
              </h2>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                {nextLesson.summary}
              </p>
            </div>

            <button
              onClick={() => onStartLesson(nextModule.id, nextLesson.id)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-bold text-white shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continuar Aula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats KPI Strip (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Nível de Aprendizado</span>
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tabular-nums mb-1">
              Nível {lvlInfo.level}
            </div>
            <div className="text-xs text-purple-300 font-semibold truncate mb-3">
              {lvlInfo.title}
            </div>
            {/* Level XP Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${lvlInfo.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5 tabular-nums">
              <span>{lvlInfo.currentXpInLevel} XP neste nível</span>
              <span>Faltam {lvlInfo.xpNeededForNext - lvlInfo.currentXpInLevel} XP</span>
            </div>
          </div>
        </div>

        {/* Total XP Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total de XP</span>
            <Award className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-3xl font-black text-white tabular-nums mb-1">
              {progress.xp} <span className="text-base font-normal text-slate-400">XP</span>
            </div>
            <p className="text-xs text-slate-400">
              Ganhe XP completando aulas, exercícios e praticando o alfabeto.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            Hoje: <span className="text-purple-300 font-bold tabular-nums">+{progress.todayXp} XP</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Sequência de Estudos</span>
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <div className="text-3xl font-black text-amber-300 tabular-nums mb-1">
              {progress.streakDays} <span className="text-base font-normal text-slate-400">dias</span>
            </div>
            <p className="text-xs text-slate-400">
              Mantenha o hábito estudando pelo menos 1 lição ou exercício por dia!
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-amber-400/90 font-medium">
            Ativo hoje · Fogo aceso 🔥
          </div>
        </div>

        {/* Daily Goal Card */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Meta Diária</span>
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-black text-white tabular-nums">
                {progress.todayXp} <span className="text-sm font-normal text-slate-400">/ {progress.dailyGoalXp} XP</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 tabular-nums">
                {dailyGoalPct}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-300 ${
                  dailyGoalPct >= 100
                    ? 'bg-emerald-400'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${dailyGoalPct}%` }}
              />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {dailyGoalPct >= 100 ? (
              <span className="text-emerald-300 font-bold">Meta de hoje batida! Parabéns!</span>
            ) : (
              <span>Faltam {Math.max(0, progress.dailyGoalXp - progress.todayXp)} XP hoje</span>
            )}
          </div>
        </div>
      </div>

      {/* Featured Learning Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Alfabeto Card */}
        <div 
          onClick={() => onSelectTab('alphabet')}
          className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
              Alfabeto Cirílico (33 Letras)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Explore cada letra com áudio nativo ru-RU, som aproximado em português e faça os exercícios de reconhecimento.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>Abrir Alfabeto & Exercícios</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Exercícios Card */}
        <div 
          onClick={() => onSelectTab('exercises')}
          className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              Central de Exercícios (7 Tipos)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Tradução, múltipla escolha, complete a frase, organize palavras, pares e identificação de som com feedback imediato.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
            <span>Iniciar Prática</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Revisão Inteligente Card */}
        <div 
          onClick={() => onSelectTab('review')}
          className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-teal-600/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <RotateCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
              Revisão Espaçada (SRS)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              O algoritmo prioriza palavras que você errou para fixar na memória de longo prazo e dominar o vocabulário.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
            <span>Revisar Vocabulário</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
