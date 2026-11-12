import React, { useState } from 'react';
import { CourseModule, LessonContent, UserProgress } from '../types';
import { COURSE_MODULES } from '../data/courseData';
import { russianAudio } from '../utils/audio';
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  Sparkles, 
  Award,
  ChevronRight,
  Clock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseViewProps {
  progress: UserProgress;
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  activeModuleId?: number;
  activeLessonId?: string;
  audioSpeed: number;
}

export const CourseView: React.FC<CourseViewProps> = ({
  progress,
  onCompleteLesson,
  activeModuleId,
  activeLessonId,
  audioSpeed,
}) => {
  const [currentModuleId, setCurrentModuleId] = useState<number>(activeModuleId || 1);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(activeLessonId || null);
  const [stepIndex, setStepIndex] = useState(0);
  const [playingSnippet, setPlayingSnippet] = useState<string | null>(null);

  const selectedModule = COURSE_MODULES.find((m) => m.id === currentModuleId) || COURSE_MODULES[0];
  const selectedLesson = selectedLessonId 
    ? selectedModule.lessons.find((l) => l.id === selectedLessonId) 
    : null;

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingSnippet(id);
    await russianAudio.speak(text, audioSpeed);
    setPlayingSnippet(null);
  };

  const handleFinishLesson = () => {
    if (!selectedLesson) return;
    const isFirstTime = !progress.completedLessons.includes(selectedLesson.id);
    const xpReward = isFirstTime ? 25 : 5;
    onCompleteLesson(selectedLesson.id, xpReward);
    
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });

    setSelectedLessonId(null);
    setStepIndex(0);
  };

  // Lesson Player Screen
  if (selectedLesson) {
    const currentStep: LessonContent = selectedLesson.contents[stepIndex] || selectedLesson.contents[0];
    const totalSteps = selectedLesson.contents.length;
    const isLastStep = stepIndex === totalSteps - 1;

    return (
      <div className="max-w-3xl mx-auto py-6 px-4">
        {/* Lesson Navigation Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setSelectedLessonId(null);
              setStepIndex(0);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Módulos</span>
          </button>

          <span className="text-xs font-semibold text-purple-300">
            Passo {stepIndex + 1} de {totalSteps}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${Math.round(((stepIndex + 1) / totalSteps) * 100)}%` }}
          />
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1 block">
              {selectedModule.title} · {selectedLesson.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {currentStep.title}
            </h2>
          </div>

          <div className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
            {currentStep.body}
          </div>

          {/* Russian Phrases Snippets with Audio */}
          {currentStep.russianSnippets && currentStep.russianSnippets.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Exemplos de Áudio & Fala:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentStep.russianSnippets.map((item, idx) => {
                  const isPlaying = playingSnippet === `snip-${idx}`;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/30 transition-all"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-bold text-white">{item.ru}</span>
                          <span className="text-xs text-purple-300 font-mono">[{item.translit}]</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.pt}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(item.ru, `snip-${idx}`)}
                        className="p-2.5 rounded-xl bg-purple-600/15 hover:bg-purple-600/30 text-purple-300 hover:text-white transition-colors shrink-0 ml-3"
                        title="Ouvir pronúncia nativa"
                      >
                        <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={stepIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            {isLastStep ? (
              <button
                onClick={handleFinishLesson}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-sm font-bold text-white shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluir Lição (+25 XP)</span>
              </button>
            ) : (
              <button
                onClick={() => setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Próximo Passo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Course Overview: 10 Modules List & Lesson Picker
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Currículo Estruturado · Do Básico ao Intermediário</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Curso Completo de Russo (10 Módulos)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          Aprenda o russo passo a passo com didática pensada especificamente para brasileiros.
          Cada módulo inclui explicações gramaticais claras, áudio nativo e vocabulário contextual.
        </p>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {COURSE_MODULES.map((module) => {
          const completedInModule = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
          const isModuleComplete = completedInModule === module.lessons.length;
          const isCurrentActive = currentModuleId === module.id;

          return (
            <div
              key={module.id}
              className={`rounded-2xl border transition-all p-6 flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-slate-900/90 border-purple-500/50 ring-1 ring-purple-500/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">
                    {module.level}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{module.estimatedMinutes} min</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {module.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 font-medium mb-2">
                  {module.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Lessons in module */}
                <div className="space-y-2 mb-4">
                  {module.lessons.map((lesson) => {
                    const isDone = progress.completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          setCurrentModuleId(module.id);
                          setSelectedLessonId(lesson.id);
                          setStepIndex(0);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isDone
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-950/30'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-purple-500/40 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500">
                              •
                            </div>
                          )}
                          <span className="font-semibold">{lesson.title}</span>
                        </div>

                        <span className="text-[11px] text-purple-300 hover:underline flex items-center gap-1 font-bold">
                          {isDone ? 'Revisar' : 'Iniciar'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Module Progress Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {completedInModule} de {module.lessons.length} aulas concluídas
                </span>
                <span className="text-purple-300 font-semibold">
                  +{module.xpReward} XP total
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
