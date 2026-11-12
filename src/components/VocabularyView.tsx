import React, { useState } from 'react';
import { VocabularyWord, UserProgress } from '../types';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { russianAudio } from '../utils/audio';
import { 
  Search, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  RotateCw,
  Tag,
  Info
} from 'lucide-react';

interface VocabularyViewProps {
  progress: UserProgress;
  onToggleFavorite: (wordId: string) => void;
  audioSpeed: number;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  progress,
  onToggleFavorite,
  audioSpeed,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'favoritos', label: `Favoritos (${progress.favoriteWords.length})` },
    { id: 'saudações', label: 'Saudações' },
    { id: 'família', label: 'Família' },
    { id: 'comida', label: 'Comida' },
    { id: 'números', label: 'Números' },
    { id: 'lugares', label: 'Lugares' },
    { id: 'cotidiano', label: 'Cotidiano' },
    { id: 'viagem', label: 'Viagem' },
    { id: 'tempo', label: 'Tempo' },
  ];

  const filteredWords = VOCABULARY_LIST.filter((w) => {
    // Category check
    if (selectedCategory === 'favoritos') {
      if (!progress.favoriteWords.includes(w.id)) return false;
    } else if (selectedCategory !== 'todos' && w.category !== selectedCategory) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRu = w.ru.toLowerCase().includes(q);
      const matchPt = w.pt.toLowerCase().includes(q);
      const matchTrans = w.translit.toLowerCase().includes(q);
      return matchRu || matchPt || matchTrans;
    }

    return true;
  });

  const handlePlayAudio = async (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingWordId(id);
    await russianAudio.speak(text, audioSpeed);
    setPlayingWordId(null);
  };

  const toggleFlip = (wordId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Banco de Vocabulário Russo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Palavras essenciais com transliteração, exemplos reais e pronúncia com síntese de voz nativa.
          </p>
        </div>

        <button
          onClick={() => setFlashcardMode(!flashcardMode)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            flashcardMode
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{flashcardMode ? 'Modo Lista' : 'Modo Flashcards'}</span>
        </button>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar em russo, português ou transliteração (ex: Спасибо, livro, vadá)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Category Pills (Interactive Filter Tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-sm font-semibold text-slate-300">Nenhuma palavra encontrada</p>
          <p className="text-xs text-slate-500 mt-1">Tente pesquisar por outro termo ou selecione outra categoria.</p>
        </div>
      )}

      {/* Flashcards View */}
      {flashcardMode ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => {
            const isFlipped = !!flippedCards[word.id];
            const isFav = progress.favoriteWords.includes(word.id);
            const isPlaying = playingWordId === word.id;

            return (
              <div
                key={word.id}
                onClick={() => toggleFlip(word.id)}
                className="group relative min-h-[200px] p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
              >
                {/* Card Top Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    {word.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handlePlayAudio(word.ru, word.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-slate-800 transition-colors"
                      title="Ouvir"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(word.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                      title="Favoritar palavra"
                    >
                      {isFav ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Center Content: Russian Front vs Translation Back */}
                <div className="text-center my-4">
                  {!isFlipped ? (
                    <div>
                      <div className="text-2xl font-extrabold text-white mb-1">
                        {word.ru}
                      </div>
                      <div className="text-xs font-mono text-purple-300">
                        /{word.translit}/
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2">
                        Toque para virar o cartão
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xl font-bold text-emerald-300 mb-1">
                        {word.pt}
                      </div>
                      <div className="text-xs text-slate-300 italic">
                        "{word.exampleRu}"
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {word.examplePt}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="text-[10px] text-slate-500 text-center border-t border-slate-800/80 pt-2">
                  {word.partOfSpeech} {word.gender ? `· ${word.gender}` : ''}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List / Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWords.map((word) => {
            const isFav = progress.favoriteWords.includes(word.id);
            const isPlaying = playingWordId === word.id;

            return (
              <div
                key={word.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        {word.category}
                      </span>
                      {word.gender && (
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {word.gender}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handlePlayAudio(word.ru, word.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-slate-800 transition-colors"
                        title="Ouvir em russo"
                      >
                        <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(word.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                        title="Favoritar"
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="text-xl font-bold text-white">{word.ru}</span>
                    <span className="text-xs font-mono text-purple-300">[{word.translit}]</span>
                  </div>

                  <p className="text-sm font-semibold text-slate-200 mb-3">
                    {word.pt}
                  </p>

                  {/* Real Usage Example */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-300 font-medium">
                      <span>Exemplo: {word.exampleRu}</span>
                      <button
                        onClick={() => handlePlayAudio(word.exampleRu, `ex-${word.id}`)}
                        className="text-[11px] text-purple-300 hover:text-white"
                      >
                        Ouvir frase
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500 italic">
                      "{word.examplePt}"
                    </div>
                  </div>
                </div>

                {word.culturalNote && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 mt-3 pt-2 border-t border-slate-800/60">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>{word.culturalNote}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
