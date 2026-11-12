import React, { useState } from 'react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';
import { evaluateAchievements } from '../data/achievementsData';
import { 
  Trophy, 
  Flame, 
  Target, 
  Award, 
  Sliders, 
  RotateCcw, 
  Volume2, 
  Check, 
  AlertTriangle,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateDailyGoal: (goalXp: number) => void;
  onUpdateAudioSpeed: (speed: number) => void;
  onResetProgress: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  progress,
  onUpdateDailyGoal,
  onUpdateAudioSpeed,
  onResetProgress,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const lvlInfo = calculateLevel(progress.xp);
  const achievements = evaluateAchievements(progress);

  const accuracyPct = progress.exercisesCompleted > 0
    ? Math.round((progress.exercisesCorrect / progress.exercisesCompleted) * 100)
    : 100;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-lg ring-4 ring-purple-500/20">
            {lvlInfo.level}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Nível {lvlInfo.level}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lvlInfo.title}
            </h1>
            <p className="text-xs text-slate-400">
              Estudando russo desde {progress.lastStudyDate}
            </p>

            {/* Level Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-xs text-slate-400 mb-1 tabular-nums">
                <span>Progresso do Nível</span>
                <span className="text-purple-300 font-bold">{lvlInfo.progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${lvlInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
          <span className="block text-2xl font-black text-white tabular-nums">{progress.xp}</span>
          <span className="text-xs text-slate-400">XP Acumulado</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
          <span className="block text-2xl font-black text-amber-400 tabular-nums">{progress.streakDays}</span>
          <span className="text-xs text-slate-400">Dias de Sequência</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
          <span className="block text-2xl font-black text-purple-400 tabular-nums">{progress.completedLessons.length}</span>
          <span className="text-xs text-slate-400">Aulas Concluídas</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
          <span className="block text-2xl font-black text-emerald-400 tabular-nums">{accuracyPct}%</span>
          <span className="text-xs text-slate-400">Taxa de Acerto</span>
        </div>
      </div>

      {/* Badges / Conquistas */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Conquistas e Medalhas</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {achievements.map((ach) => {
            const isUnlocked = !!ach.unlockedAt;
            const progressPct = Math.round((ach.currentProgress / ach.maxProgress) * 100);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-purple-500/30 ring-1 ring-purple-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{ach.title}</span>
                    {isUnlocked && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {ach.unlockedAt}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {ach.description}
                  </p>

                  {!isUnlocked && (
                    <div className="pt-1">
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block tabular-nums">
                        {ach.currentProgress} / {ach.maxProgress}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings / Configurações */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <span>Configurações de Aprendizado</span>
        </h2>

        {/* Daily Goal Setting */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 block">
            Meta Diária de XP:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[15, 30, 50, 100].map((goal) => (
              <button
                key={goal}
                onClick={() => onUpdateDailyGoal(goal)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  progress.dailyGoalXp === goal
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {goal} XP / dia
              </button>
            ))}
          </div>
        </div>

        {/* Audio Speed Setting */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-300 block">
            Velocidade do Áudio Russo:
          </span>
          <div className="grid grid-cols-2 gap-2.5 max-w-sm">
            <button
              onClick={() => onUpdateAudioSpeed(0.8)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                progress.audioSpeed === 0.8
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Lento (0.8x) · Ideal p/ iniciantes
            </button>
            <button
              onClick={() => onUpdateAudioSpeed(1.0)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                progress.audioSpeed === 1.0
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Normal (1.0x) · Ritmo natural
            </button>
          </div>
        </div>

        {/* Danger zone / Reset */}
        <div className="pt-4 border-t border-slate-800">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar todo o progresso dos estudos</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Tem certeza? Isso zerará seu XP, aulas e sequência salva localmente.</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
                >
                  Sim, reiniciar
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
