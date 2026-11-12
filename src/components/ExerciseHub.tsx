import React, { useState } from 'react';
import { GeneralExercise } from '../types';
import { GENERAL_EXERCISES } from '../data/exercisesData';
import { russianAudio } from '../utils/audio';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Award,
  HelpCircle,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseHubProps {
  onAddXp: (amount: number) => void;
  onRecordExerciseResult: (isCorrect: boolean) => void;
  audioSpeed: number;
}

export const ExerciseHub: React.FC<ExerciseHubProps> = ({
  onAddXp,
  onRecordExerciseResult,
  audioSpeed,
}) => {
  const [exercises, setExercises] = useState<GeneralExercise[]>(() => [...GENERAL_EXERCISES]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // For word-order exercises:
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // For matching-pairs exercise:
  const [selectedRuPair, setSelectedRuPair] = useState<string | null>(null);
  const [selectedPtPair, setSelectedPtPair] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // matched ru keys

  const currentExercise = exercises[currentIndex];
  const progressPct = Math.round(((currentIndex + 1) / exercises.length) * 100);

  // Initialize word-order state when exercise changes
  React.useEffect(() => {
    if (currentExercise.type === 'word-order' && Array.isArray(currentExercise.options)) {
      setAvailableWords([...currentExercise.options].sort(() => Math.random() - 0.5));
      setConstructedWords([]);
    }
    if (currentExercise.type === 'matching-pairs') {
      setSelectedRuPair(null);
      setSelectedPtPair(null);
      setMatchedPairs([]);
    }
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex, currentExercise]);

  const handlePlayAudio = async (text: string) => {
    await russianAudio.speak(text, audioSpeed);
  };

  // Multiple choice / standard option select
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentExercise.correctAnswer;
    onRecordExerciseResult(isCorrect);

    if (isCorrect) {
      const earnedXp = 15 + combo * 3;
      setScore((prev) => prev + 1);
      setCombo((prev) => prev + 1);
      onAddXp(earnedXp);
    } else {
      setCombo(0);
    }
  };

  // Word Order logic
  const handleAddWordToSentence = (word: string, indexInAvailable: number) => {
    if (isAnswered) return;
    setConstructedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== indexInAvailable));
  };

  const handleRemoveWordFromSentence = (word: string, indexInConstructed: number) => {
    if (isAnswered) return;
    setAvailableWords((prev) => [...prev, word]);
    setConstructedWords((prev) => prev.filter((_, i) => i !== indexInConstructed));
  };

  const handleVerifyWordOrder = () => {
    if (isAnswered) return;
    setIsAnswered(true);

    const targetArray = currentExercise.correctAnswer as string[];
    const isCorrect = constructedWords.join(' ') === targetArray.join(' ');

    onRecordExerciseResult(isCorrect);
    if (isCorrect) {
      const earnedXp = 20 + combo * 3;
      setScore((prev) => prev + 1);
      setCombo((prev) => prev + 1);
      onAddXp(earnedXp);
    } else {
      setCombo(0);
    }
  };

  // Matching pairs logic
  const handleSelectRu = (ru: string) => {
    if (isAnswered || matchedPairs.includes(ru)) return;
    setSelectedRuPair(ru);
    if (selectedPtPair) {
      checkPair(ru, selectedPtPair);
    }
  };

  const handleSelectPt = (pt: string) => {
    if (isAnswered) return;
    setSelectedPtPair(pt);
    if (selectedRuPair) {
      checkPair(selectedRuPair, pt);
    }
  };

  const checkPair = (ru: string, pt: string) => {
    const pair = currentExercise.pairs?.find((p) => p.ru === ru);
    if (pair && pair.pt === pt) {
      // Match!
      const newMatched = [...matchedPairs, ru];
      setMatchedPairs(newMatched);
      setSelectedRuPair(null);
      setSelectedPtPair(null);

      // Check if all matched
      if (newMatched.length === (currentExercise.pairs?.length || 0)) {
        setIsAnswered(true);
        setScore((prev) => prev + 1);
        setCombo((prev) => prev + 1);
        onRecordExerciseResult(true);
        onAddXp(20 + combo * 3);
      }
    } else {
      // Mismatch
      setTimeout(() => {
        setSelectedRuPair(null);
        setSelectedPtPair(null);
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
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
    setExercises([...GENERAL_EXERCISES].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const accuracy = Math.round((score / exercises.length) * 100);
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Treino Finalizado!</h2>
          <p className="text-sm text-slate-400 mb-6">
            Você praticou traduções, estrutura de frases, associações e escuta.
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
              <span className="block text-2xl font-extrabold text-emerald-400 tabular-nums">+{score * 15}</span>
              <span className="text-xs text-slate-400">XP Total</span>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-bold text-white transition-all shadow-md mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Treinar Novamente</span>
          </button>
        </div>
      </div>
    );
  }

  // Type labels
  const typeMap: Record<string, string> = {
    'ru-to-pt': 'Tradução Russo ➔ Português',
    'pt-to-ru': 'Tradução Português ➔ Russo',
    'multiple-choice': 'Múltipla Escolha',
    'fill-blank': 'Complete a Frase',
    'word-order': 'Organize as Palavras',
    'letter-sound': 'Identifique o Som / Grafia',
    'matching-pairs': 'Relacione os Pares',
  };

  const isWordOrderCorrect = isAnswered && constructedWords.join(' ') === (currentExercise.correctAnswer as string[]).join(' ');
  const isMatchingCorrect = isAnswered && matchedPairs.length === (currentExercise.pairs?.length || 0);
  const isGeneralCorrect = currentExercise.type === 'word-order' 
    ? isWordOrderCorrect 
    : currentExercise.type === 'matching-pairs' 
    ? isMatchingCorrect 
    : selectedAnswer === currentExercise.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-2">
          <span>Exercício {currentIndex + 1} de {exercises.length}</span>
          {combo > 1 && (
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" /> Combo x{combo}
            </span>
          )}
        </div>
        <div className="text-purple-300 font-semibold tabular-nums">
          {score} acertos
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Exercise Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Category Badge & Audio */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            {typeMap[currentExercise.type] || 'Exercício'} · {currentExercise.topic}
          </span>

          {currentExercise.russianReference && (
            <button
              onClick={() => handlePlayAudio(currentExercise.russianReference!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir</span>
            </button>
          )}
        </div>

        {/* Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-relaxed">
          {currentExercise.prompt}
        </h3>

        {/* Reference snippet if available */}
        {currentExercise.russianReference && (
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6">
            <span className="text-xl sm:text-2xl font-black text-white block">
              {currentExercise.russianReference}
            </span>
            {currentExercise.translitReference && (
              <span className="text-xs font-mono text-purple-300">
                [{currentExercise.translitReference}]
              </span>
            )}
          </div>
        )}

        {/* --- TYPE 5: Word-Order Scramble --- */}
        {currentExercise.type === 'word-order' && (
          <div className="space-y-4 mb-6">
            {/* Answer building slot */}
            <div className="min-h-[56px] p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 items-center">
              {constructedWords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  Toque nas palavras abaixo para ordenar a frase...
                </span>
              ) : (
                constructedWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWordFromSentence(word, idx)}
                    disabled={isAnswered}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-medium text-xs sm:text-sm hover:bg-purple-500 transition-colors"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Available bubbles */}
            <div className="flex flex-wrap gap-2 pt-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddWordToSentence(word, idx)}
                  disabled={isAnswered}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>

            {!isAnswered && (
              <button
                onClick={handleVerifyWordOrder}
                disabled={constructedWords.length === 0}
                className="w-full mt-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors disabled:opacity-40"
              >
                Verificar Ordem
              </button>
            )}
          </div>
        )}

        {/* --- TYPE 7: Matching Pairs --- */}
        {currentExercise.type === 'matching-pairs' && currentExercise.pairs && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              {/* Russian Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-300 block mb-1">Russo:</span>
                {currentExercise.pairs.map((p) => {
                  const isMatched = matchedPairs.includes(p.ru);
                  const isSelected = selectedRuPair === p.ru;
                  return (
                    <button
                      key={p.ru}
                      onClick={() => handleSelectRu(p.ru)}
                      disabled={isMatched || isAnswered}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60'
                          : isSelected
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-950/80 border-slate-800 text-white hover:border-purple-500/40'
                      }`}
                    >
                      {p.ru}
                    </button>
                  );
                })}
              </div>

              {/* Portuguese Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-300 block mb-1">Português:</span>
                {currentExercise.pairs.map((p) => {
                  const isMatched = matchedPairs.includes(p.ru);
                  const isSelected = selectedPtPair === p.pt;
                  return (
                    <button
                      key={p.pt}
                      onClick={() => handleSelectPt(p.pt)}
                      disabled={isMatched || isAnswered}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60'
                          : isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-950/80 border-slate-800 text-white hover:border-indigo-500/40'
                      }`}
                    >
                      {p.pt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- DEFAULT: Standard Multiple Choice / Options --- */}
        {currentExercise.type !== 'word-order' && currentExercise.type !== 'matching-pairs' && currentExercise.options && (
          <div className="space-y-2.5 mb-6">
            {currentExercise.options.map((option, idx) => {
              let optStyles = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60';

              if (isAnswered) {
                if (option === currentExercise.correctAnswer) {
                  optStyles = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500/40';
                } else if (option === selectedAnswer && option !== currentExercise.correctAnswer) {
                  optStyles = 'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/40';
                } else {
                  optStyles = 'bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-semibold transition-all ${optStyles}`}
                >
                  <span>{option}</span>
                  {isAnswered && option === currentExercise.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && option === selectedAnswer && option !== currentExercise.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Immediate Feedback Box with PT-BR explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border mb-6 transition-all ${
              isGeneralCorrect
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {isGeneralCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Muito Bem! (+{15 + (combo - 1) * 3} XP)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Explicação Didática:</span>
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
              <span>{currentIndex < exercises.length - 1 ? 'Próximo Exercício' : 'Concluir Prática'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
