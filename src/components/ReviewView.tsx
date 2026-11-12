import React, { useState } from 'react';
import { UserProgress, VocabularyWord } from '../types';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { updateSRSForWord } from '../utils/storage';
import { russianAudio } from '../utils/audio';
import { 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Sparkles, 
  Award,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewViewProps {
  progress: UserProgress;
  onUpdateSrs: (wordId: string, wasCorrect: boolean) => void;
  onAddXp: (amount: number) => void;
  audioSpeed: number;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  progress,
  onUpdateSrs,
  onAddXp,
  audioSpeed,
}) => {
  // Determine words due for review or words with high error count
  const allSrsIds = Object.keys(progress.srsData);
  
  // If user hasn't practiced many words yet, seed from the vocabulary list
  const availablePool: VocabularyWord[] = VOCABULARY_LIST;
  
  // Words that user has marked or errored
  const dueWordIds = allSrsIds.filter((id) => {
    const item = progress.srsData[id];
    if (!item) return false;
    return new Date(item.nextReview) <= new Date() || item.status === 'learning';
  });

  // Candidate review list: items due or first few words
  const reviewWords: VocabularyWord[] = availablePool.filter((w) => {
    if (dueWordIds.includes(w.id)) return true;
    if (progress.favoriteWords.includes(w.id)) return true;
    return false;
  }).slice(0, 15);

  const [activeList] = useState<VocabularyWord[]>(() => {
    if (reviewWords.length >= 4) return reviewWords;
    // Fallback: take first 8 words of vocab
    return availablePool.slice(0, 8);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = activeList[currentIndex];

  const handlePlayAudio = async (text: string) => {
    await russianAudio.speak(text, audioSpeed);
  };

  const handleRate = (wasCorrect: boolean) => {
    if (!currentWord) return;

    onUpdateSrs(currentWord.id, wasCorrect);
    if (wasCorrect) {
      onAddXp(10);
    }
    setReviewCount((prev) => prev + 1);

    if (currentIndex < activeList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Revisão Concluída!</h2>
          <p className="text-sm text-slate-400 mb-6">
            Você revisou {reviewCount} palavras. O algoritmo agendou o próximo intervalo de revisão com base no seu desempenho.
          </p>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-sm font-bold text-white transition-all shadow-md mx-auto"
          >
            <RotateCw className="w-4 h-4" />
            <span>Revisar Mais Palavras</span>
          </button>
        </div>
      </div>
    );
  }

  const srsInfo = currentWord ? progress.srsData[currentWord.id] : null;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Sistema de Repetição Espaçada (SRS)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Revisão Inteligente
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Fixe palavras na memória de longo prazo. O app prioriza automaticamente os termos com maior incidência de dúvidas.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Cartão {currentIndex + 1} de {activeList.length}</span>
        <span className="text-teal-300 font-semibold">
          Status: {srsInfo?.status === 'mastered' ? 'Dominado' : srsInfo?.status === 'reviewing' ? 'Em Fixação' : 'Aprendendo'}
        </span>
      </div>

      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${Math.round(((currentIndex + 1) / activeList.length) * 100)}%` }}
        />
      </div>

      {/* SRS Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[260px] p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 cursor-pointer shadow-xl transition-all flex flex-col justify-between text-center select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            {currentWord.category}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayAudio(currentWord.ru);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Ouvir"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="my-6">
          {!isFlipped ? (
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                {currentWord.ru}
              </div>
              <div className="text-sm font-mono text-purple-300">
                /{currentWord.translit}/
              </div>
              <div className="text-xs text-slate-500 mt-4">
                Toque no cartão para revelar a tradução
              </div>
            </div>
          ) : (
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-2">
                {currentWord.pt}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 italic mb-1">
                "{currentWord.exampleRu}"
              </div>
              <div className="text-xs text-slate-400">
                {currentWord.examplePt}
              </div>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-500">
          {isFlipped ? 'Como foi a sua lembrança?' : 'Pense na tradução antes de virar'}
        </div>
      </div>

      {/* Rating Buttons */}
      {isFlipped ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleRate(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/40 text-sm font-bold text-rose-300 transition-colors"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Errei / Não Lembrei</span>
          </button>
          <button
            onClick={() => handleRate(true)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 text-sm font-bold text-emerald-300 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Lembrei Fácil (+10 XP)</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsFlipped(true)}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-200 transition-colors"
        >
          Virar Cartão
        </button>
      )}
    </div>
  );
};
