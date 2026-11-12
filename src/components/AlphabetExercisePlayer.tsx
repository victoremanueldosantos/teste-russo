import React, { useState } from 'react';
import { AlphabetExercise } from '../types';
import { ALPHABET_EXERCISES } from '../data/alphabetExercises';
import { russianAudio } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlphabetExercisePlayerProps {
  onAddXp: (amount: number) => void;
  onRecordExerciseResult: (isCorrect: boolean) => void;
  onReturnToExplorer: () => void;
  audioSpeed: number;
}

export const AlphabetExercisePlayer: React.FC<AlphabetExercisePlayerProps> = ({
  onAddXp,
  onRecordExerciseResult,
  onReturnToExplorer,
  audioSpeed,
}) => {
  const [exercises] = useState<AlphabetExercise[]>(() => [...ALPHABET_EXERCISES].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / exercises.length) * 100);

  const handlePlayAudio = async (text: string) => {
    setIsPlayingAudio(true);
    await russianAudio.speak(text, audioSpeed);
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const selected = currentExercise.options.find((o) => o.id === optionId);
    const isCorrect = !!selected?.isCorrect;

    onRecordExerciseResult(isCorrect);

    if (isCorrect) {
      const earnedXp = 10 + combo * 2;
      setScore((prev) => prev + 1);
      setCombo((prev) => prev + 1);
      onAddXp(earnedXp);
    } else {
      setCombo(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setCombo(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const accuracy = Math.round((score / exercises.length) * 100);
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Exercícios Concluídos!</h2>
          <p className="text-sm text-slate-400 mb-6">
            Você praticou a identificação de sons, letras maiúsculas/minúsculas e transliterações do alfabeto cirílico.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="block text-2xl font-extrabold text-white tabular-nums">{score}</span>
              <span className="text-xs text-slate-400">Acertos</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="block text-2xl font-extrabold text-purple-400 tabular-nums">{accuracy}%</span>
              <span className="text-xs text-slate-400">Precisão</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="block text-2xl font-extrabold text-emerald-400 tabular-nums">+{score * 10}</span>
              <span className="text-xs text-slate-400">XP Ganho</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir Exercícios
            </button>
            <button
              onClick={onReturnToExplorer}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold text-white transition-all shadow-md"
            >
              Ver Tabela das 33 Letras
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedOption = currentExercise.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect;

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-6 px-4">
      {/* Header bar: Progress & Stats */}
      <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-2">
          <span>Exercício {currentIndex + 1} de {exercises.length}</span>
          {combo > 1 && (
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" /> Combo x{combo}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-purple-300 font-semibold tabular-nums">{score} acertos</span>
          <button
            onClick={onReturnToExplorer}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Sair do modo treino
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Exercise Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Badge category */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            {currentExercise.type === 'sound-to-letter' && 'Som ➔ Letra Cirílica'}
            {currentExercise.type === 'identify-sound' && 'Identificação de Som'}
            {currentExercise.type === 'match-case' && 'Maiúscula e Minúscula'}
            {currentExercise.type === 'translit-to-letter' && 'Transliteração ➔ Letra'}
            {currentExercise.type === 'confusing-pairs' && 'Atenção aos Falsos Amigos'}
            {currentExercise.type === 'audio-listen' && 'Desafio Auditivo'}
          </span>

          {currentExercise.audioText && (
            <button
              onClick={() => handlePlayAudio(currentExercise.audioText!)}
              disabled={isPlayingAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-purple-400' : ''}`} />
              Ouvir Pronúncia
            </button>
          )}
        </div>

        {/* Prompt Question */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
          {currentExercise.prompt}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentExercise.options.map((option) => {
            let optionStyles = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60';

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyles = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/50';
              } else if (option.id === selectedOptionId && !option.isCorrect) {
                optionStyles = 'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/50';
              } else {
                optionStyles = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswered}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all text-sm font-medium ${optionStyles}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-base font-semibold text-white">{option.text}</span>
                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && option.id === selectedOptionId && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </div>
                {option.subtext && (
                  <span className="text-xs text-slate-400">{option.subtext}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border mb-6 transition-all ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resposta Correta! (+{10 + (combo - 1) * 2} XP)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Não foi dessa vez. Veja a explicação:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentExercise.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-md transition-all"
            >
              <span>{currentIndex < exercises.length - 1 ? 'Próxima Letra' : 'Finalizar Treino'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
