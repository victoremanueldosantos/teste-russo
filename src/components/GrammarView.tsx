import React, { useState } from 'react';
import { GRAMMAR_TOPICS, GrammarTopic } from '../data/grammarData';
import { russianAudio } from '../utils/audio';
import { Volume2, BookOpen, ChevronRight, CheckCircle2, Table, Sparkles } from 'lucide-react';

interface GrammarViewProps {
  audioSpeed: number;
}

export const GrammarView: React.FC<GrammarViewProps> = ({ audioSpeed }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(GRAMMAR_TOPICS[0].id);
  const [playingSnippet, setPlayingSnippet] = useState<string | null>(null);

  const activeTopic = GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) || GRAMMAR_TOPICS[0];

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingSnippet(id);
    await russianAudio.speak(text, audioSpeed);
    setPlayingSnippet(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manual de Gramática Eslava em Português</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Guia Gramatical do Russo
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Explicações sistemáticas sobre gêneros, os 6 casos, conjugações, aspectos e verbos de movimento sem termos desnecessariamente complexos.
        </p>
      </div>

      {/* Main Grid: Sidebar Navigator + Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Topic Selector */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
            Tópicos Fundamentais
          </span>
          {GRAMMAR_TOPICS.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-sm ring-1 ring-purple-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{topic.title}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-purple-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            {/* Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Gramática Prática
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {activeTopic.title}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 font-medium mt-1">
                {activeTopic.subtitle}
              </p>
            </div>

            {/* General explanation */}
            <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 whitespace-pre-line">
              {activeTopic.explanation}
            </div>

            {/* Key Rules List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Regras-chave para memorizar:
              </span>
              <div className="space-y-2">
                {activeTopic.keyRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tables if any */}
            {activeTopic.tables && activeTopic.tables.length > 0 && (
              <div className="space-y-4">
                {activeTopic.tables.map((tbl, tIdx) => (
                  <div key={tIdx} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <Table className="w-3.5 h-3.5 text-purple-400" />
                      <span>{tbl.caption}</span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold">
                            {tbl.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 whitespace-nowrap font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Examples with Audio */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Exemplos Práticos com Áudio:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {activeTopic.examples.map((ex, eIdx) => {
                  const isPlaying = playingSnippet === `gt-${activeTopic.id}-${eIdx}`;
                  return (
                    <div
                      key={eIdx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/30 transition-all"
                    >
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-white">{ex.ru}</span>
                          <span className="text-xs font-mono text-purple-300">[{ex.translit}]</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {ex.pt}
                        </div>
                        {ex.note && (
                          <div className="text-[11px] text-purple-400/90 mt-1">
                            {ex.note}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handlePlayAudio(ex.ru, `gt-${activeTopic.id}-${eIdx}`)}
                        className="p-2 rounded-lg bg-purple-600/15 hover:bg-purple-600/30 text-purple-300 hover:text-white transition-colors shrink-0 ml-3"
                        title="Ouvir exemplo"
                      >
                        <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
