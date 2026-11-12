import React, { useState } from 'react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';
import { Flame, Trophy, Menu, X, Sparkles, BookOpen } from 'lucide-react';

export type TabType = 
  | 'dashboard' 
  | 'alphabet' 
  | 'course' 
  | 'vocabulary' 
  | 'exercises' 
  | 'grammar' 
  | 'review' 
  | 'profile';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, progress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lvlInfo = calculateLevel(progress.xp);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: 'Início' },
    { id: 'alphabet', label: 'Alfabeto' },
    { id: 'course', label: 'Curso' },
    { id: 'vocabulary', label: 'Vocabulário' },
    { id: 'exercises', label: 'Exercícios' },
    { id: 'grammar', label: 'Gramática' },
    { id: 'review', label: 'Revisão' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 text-base font-black text-white shadow-sm ring-1 ring-white/20">
              Ру
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
                Русский
              </span>
              <span className="text-[10px] font-medium tracking-wide text-purple-300/80 uppercase">
                Aprenda Russo
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean hover) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-600/15 text-purple-300 ring-1 ring-purple-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Area (Gamification Stats & Profile) */}
        <div className="flex items-center gap-3">
          {/* Streak Indicator */}
          <div 
            title={`Sequência de ${progress.streakDays} dias estudando!`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{progress.streakDays}</span>
            <span className="hidden sm:inline text-[11px] text-amber-300/70">dias</span>
          </div>

          {/* XP & Level Badge button */}
          <button
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 text-xs font-medium text-slate-200 transition-all hover:border-indigo-400/50 hover:shadow-sm group"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tabular-nums">Nível {lvlInfo.level}</span>
              <span className="text-slate-500">·</span>
              <span className="text-purple-300 font-semibold tabular-nums">{progress.xp} XP</span>
            </div>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0a0f1d] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                onSelectTab('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
            >
              <span>Meu Perfil & Metas</span>
              <span className="text-xs text-purple-400 font-bold">{lvlInfo.title}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
