import { useState } from 'react';
import { ArrowLeft, Sparkles, Clock, Target, BookOpen, ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import type { CourseId, Page } from '@/types';
import { getCourse, ROADMAPS } from '@/data/roadmaps';

type Props = {
  courseId: CourseId;
  onBack: () => void;
  onNavigate: (page: Page) => void;
};

export default function CoursePage({ courseId, onBack, onNavigate }: Props) {
  const course = getCourse(courseId);
  const phases = ROADMAPS[courseId] || [];
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({});

  if (!course) {
    return (
      <div className="content-layer min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Course not found.</p>
      </div>
    );
  }

  const isGreen = course.theme === 'green';
  const accent = isGreen ? 'edu-green' : 'edu-orange';
  const accentDark = isGreen ? 'edu-green-dark' : 'edu-orange-dark';

  const toggleTopic = (key: string) => {
    setCheckedTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`content-layer min-h-screen ${isGreen ? 'bg-gradient-to-b from-edu-green-light via-white to-edu-green-light' : 'bg-gradient-to-b from-edu-orange-light via-black to-black'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isGreen ? 'bg-white/80 border-edu-green/20' : 'glass border-edu-orange/20'} border-b backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-semibold rounded-lg px-3 py-2 transition ${isGreen ? 'text-edu-green-dark hover:bg-edu-green/10' : 'text-edu-orange hover:bg-edu-orange/10'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />
            <span className={`font-display font-extrabold text-lg ${isGreen ? 'text-edu-green-dark' : 'text-edu-orange'}`}>Smart Study</span>
            <Sparkles className={`w-5 h-5 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${isGreen ? 'bg-edu-green/10 text-edu-green-dark' : 'bg-edu-orange/10 text-edu-orange'}`}>
          {course.category === 'school' ? 'School Roadmap' : 'Degree Roadmap'}
        </span>
        <h1 className={`font-display font-extrabold text-3xl sm:text-5xl ${isGreen ? 'text-edu-green-dark' : 'text-white'}`}>
          {course.fullName}
        </h1>
        <p className={`mt-3 max-w-2xl mx-auto ${isGreen ? 'text-gray-700' : 'text-gray-300'}`}>
          {course.description} Follow this complete roadmap phase by phase to master every subject.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('tracker')}
            className={`text-white font-semibold rounded-lg px-5 py-2.5 transition ${isGreen ? 'bg-edu-green hover:bg-edu-green-dark' : 'bg-edu-orange hover:bg-edu-orange-dark'}`}
          >
            Track My Progress
          </button>
          <button
            onClick={() => onNavigate('ai-doubt')}
            className={`font-semibold rounded-lg px-5 py-2.5 transition border ${isGreen ? 'border-edu-green/40 text-edu-green-dark hover:bg-edu-green/10' : 'border-edu-orange/40 text-edu-orange hover:bg-edu-orange/10'}`}
          >
            Ask a Doubt
          </button>
        </div>
      </section>

      {/* Roadmap phases */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative">
          {/* timeline line */}
          <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 ${isGreen ? 'bg-edu-green/30' : 'bg-edu-orange/30'}`} />

          {phases.map((phase, pi) => (
            <div key={pi} className="relative pl-12 sm:pl-16 pb-10 animate-fadeIn" style={{ animationDelay: `${pi * 120}ms` }}>
              {/* node */}
              <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${isGreen ? 'bg-edu-green' : 'bg-edu-orange'}`}>
                {pi + 1}
              </div>

              <div className={`rounded-2xl border p-6 ${isGreen ? 'bg-white border-edu-green/20 shadow-sm' : 'glass border-edu-orange/20'}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isGreen ? 'bg-edu-green/10 text-edu-green-dark' : 'bg-edu-orange/10 text-edu-orange'}`}>
                    {phase.phase}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs ${isGreen ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Clock className="w-3.5 h-3.5" /> {phase.duration}
                  </span>
                </div>
                <h2 className={`font-display font-bold text-xl mb-2 ${isGreen ? 'text-gray-900' : 'text-white'}`}>{phase.title}</h2>
                <div className={`flex items-start gap-2 mb-4 text-sm ${isGreen ? 'text-gray-600' : 'text-gray-300'}`}>
                  <Target className={`w-4 h-4 mt-0.5 shrink-0 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />
                  <span><span className="font-semibold">Goal:</span> {phase.goal}</span>
                </div>

                {/* Subjects */}
                <div className="space-y-3 mt-4">
                  {phase.subjects.map((subject, si) => {
                    const key = `${pi}-${si}`;
                    const isOpen = openSubject === key;
                    return (
                      <div key={si} className={`rounded-xl border overflow-hidden ${isGreen ? 'border-edu-green/15 bg-edu-green-light/40' : 'border-white/10 bg-black/30'}`}>
                        <button
                          onClick={() => setOpenSubject(isOpen ? null : key)}
                          className={`w-full flex items-center justify-between p-4 text-left transition ${isGreen ? 'hover:bg-edu-green/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className={`w-4 h-4 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />
                            <span className={`font-semibold ${isGreen ? 'text-gray-900' : 'text-white'}`}>{subject.name}</span>
                            <span className={`text-xs ${isGreen ? 'text-gray-400' : 'text-gray-500'}`}>({subject.topics.length} topics)</span>
                          </div>
                          {isOpen ? <ChevronUp className={`w-4 h-4 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} /> : <ChevronDown className={`w-4 h-4 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 animate-slideDown">
                            <ul className="space-y-2 mb-4">
                              {subject.topics.map((topic, ti) => {
                                const tkey = `${key}-${ti}`;
                                const done = !!checkedTopics[tkey];
                                return (
                                  <li key={ti}>
                                    <button
                                      onClick={() => toggleTopic(tkey)}
                                      className={`flex items-center gap-2 text-sm w-full text-left ${isGreen ? 'text-gray-700 hover:text-edu-green-dark' : 'text-gray-300 hover:text-white'}`}
                                    >
                                      {done ? (
                                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isGreen ? 'text-edu-green' : 'text-edu-orange'}`} />
                                      ) : (
                                        <Circle className={`w-4 h-4 shrink-0 ${isGreen ? 'text-gray-300' : 'text-gray-600'}`} />
                                      )}
                                      <span className={done ? 'line-through opacity-60' : ''}>{topic}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className={`text-xs font-semibold mb-1 ${isGreen ? 'text-edu-green-dark' : 'text-edu-orange'}`}>Recommended Resources:</div>
                            <div className="flex flex-wrap gap-2">
                              {subject.resources.map((r, ri) => (
                                <span key={ri} className={`text-xs px-2.5 py-1 rounded-full ${isGreen ? 'bg-edu-green/10 text-edu-green-dark' : 'bg-edu-orange/10 text-edu-orange'}`}>
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
