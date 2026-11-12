import React, { useState } from 'react';
import { RussianLetter, LetterType } from '../types';
import { RUSSIAN_ALPHABET } from '../data/alphabetData';
import { AlphabetExercisePlayer } from './AlphabetExercisePlayer';
import { russianAudio } from '../utils/audio';
import { Volume2, PlayCircle, Filter, BookOpen, Sparkles, X, Info } from 'lucide-react';

interface AlphabetViewProps {
  onAddXp: (amount: number) => void;
  onRecordExerciseResult: (isCorrect: boolean) => void;
  audioSpeed: number;
}

export const AlphabetView: React.FC<AlphabetViewProps> = ({
  onAddXp,
  onRecordExerciseResult,
  audioSpeed,
}) => {
  const [viewMode, setViewMode] = useState<'explorer' | 'exercises'>('explorer');
  const [selectedFilter, setSelectedFilter] = useState<'todos' | LetterType>('todos');
  const [selectedLetter, setSelectedLetter] = useState<RussianLetter | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredLetters = RUSSIAN_ALPHABET.filter((letter) => {
    if (selectedFilter === 'todos') return true;
    return letter.type === selectedFilter;
  });

  const handlePlayAudio = async (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingId(id);
    await russianAudio.speak(text, audioSpeed);
    setPlayingId(null);
  };

  if (viewMode === 'exercises') {
    return (
      <AlphabetExercisePlayer
        onAddXp={onAddXp}
        onRecordExerciseResult={onRecordExerciseResult}
        onReturnToExplorer={() => setViewMode('explorer')}
        audioSpeed={audioSpeed}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1428] via-[#171233] to-[#0d1428] border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>33 Letras Cirílicas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Alfabeto Cirílico Russo (Русский алфавит)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              O cirílico russo possui exatamente 33 letras: 10 vogais, 21 consoantes e 2 sinais especiais.
              Toque em qualquer letra para ouvir a pronúncia nativa e ver explicações fonéticas detalhadas para falantes de português.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setViewMode('exercises')}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-bold text-white shadow-lg shadow-purple-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Praticar Exercícios do Alfabeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedFilter('todos')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === 'todos'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Todas (33)
          </button>
          <button
            onClick={() => setSelectedFilter('vogal')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === 'vogal'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Vogais (10)
          </button>
          <button
            onClick={() => setSelectedFilter('consoante')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === 'consoante'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Consoantes (21)
          </button>
          <button
            onClick={() => setSelectedFilter('sinal')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === 'sinal'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Sinais (2)
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Mostrando <span className="text-slate-200 font-semibold">{filteredLetters.length}</span> letras
        </div>
      </div>

      {/* Grid of Letters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredLetters.map((letter) => {
          const isPlaying = playingId === letter.id;
          return (
            <div
              key={letter.id}
              onClick={() => setSelectedLetter(letter)}
              className="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              {/* Card top */}
              <div className="flex items-start justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    letter.type === 'vogal'
                      ? 'bg-indigo-500/10 text-indigo-300'
                      : letter.type === 'consoante'
                      ? 'bg-purple-500/10 text-purple-300'
                      : 'bg-amber-500/10 text-amber-300'
                  }`}
                >
                  {letter.type === 'vogal' ? 'Vogal' : letter.type === 'consoante' ? 'Consoante' : 'Sinal'}
                </span>

                <button
                  onClick={(e) => handlePlayAudio(letter.upper, letter.id, e)}
                  title="Ouvir som da letra"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-600/20 transition-colors"
                >
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
                </button>
              </div>

              {/* Cyrillic Glyphs */}
              <div className="my-3 text-center">
                <div className="text-4xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {letter.upper} <span className="text-3xl text-slate-300">{letter.lower}</span>
                </div>
                <div className="text-xs font-semibold text-purple-300 mt-1">
                  {letter.name}
                </div>
              </div>

              {/* Sound & Translit Preview */}
              <div className="pt-2 border-t border-slate-800/80 text-left">
                <p className="text-[11px] text-slate-300 truncate" title={letter.soundPt}>
                  {letter.soundPt}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                  <span>Ex: {letter.exampleWord.ru}</span>
                  <span className="font-mono text-slate-400">/{letter.transliteration}/</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal for Selected Letter */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0d1428] border border-slate-700/80 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Close button */}
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-slate-900 border border-purple-500/40 text-4xl font-black text-white">
                {selectedLetter.upper} {selectedLetter.lower}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  {selectedLetter.type === 'vogal' ? 'Vogal' : selectedLetter.type === 'consoante' ? 'Consoante' : 'Sinal Especial'}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedLetter.name}</h3>
                <p className="text-xs text-slate-400">Transliteração: <span className="text-purple-300 font-mono font-bold">/{selectedLetter.transliteration}/</span></p>
              </div>
            </div>

            {/* Phonetic guide */}
            <div className="space-y-4 mb-6 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="block text-xs font-bold text-slate-400 mb-1">Som em Português:</span>
                <span className="font-semibold text-white">{selectedLetter.soundPt}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="block text-xs font-bold text-slate-400 mb-1">Explicação Fonética:</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLetter.phoneticDescription}
                </p>
              </div>

              {/* Example Word */}
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-purple-300">Exemplo de Palavra:</span>
                  <button
                    onClick={() => handlePlayAudio(selectedLetter.exampleWord.ru, `ex-${selectedLetter.id}`)}
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Ouvir</span>
                  </button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">{selectedLetter.exampleWord.ru}</span>
                  <span className="text-xs text-purple-300 font-mono">({selectedLetter.exampleWord.translit})</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Significado: <span className="font-medium text-white">{selectedLetter.exampleWord.pt}</span>
                </div>
              </div>

              {selectedLetter.confusingPairWith && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
                  <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold">Atenção ao falso amigo:</span> {selectedLetter.confusingPairWith}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handlePlayAudio(selectedLetter.upper, `modal-${selectedLetter.id}`)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
                Ouvir Letra
              </button>
              <button
                onClick={() => {
                  setSelectedLetter(null);
                  setViewMode('exercises');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Treinar no Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
