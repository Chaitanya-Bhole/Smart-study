import { Sparkles, School, GraduationCap, Cpu, Wrench, Code2, Calculator, FlaskConical, ArrowRight, BookOpen, NotebookPen, Youtube, Bot, LogOut } from 'lucide-react';
import type { User, Page, CourseId } from '@/types';
import { SCHOOL_COURSES, DEGREE_COURSES } from '@/data/roadmaps';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  GraduationCap,
  Cpu,
  Wrench,
  Code2,
  Calculator,
  FlaskConical,
};

type Props = {
  user: User | null;
  onNavigate: (page: Page) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
};

export default function LandingPage({ user, onNavigate, onOpenAuth, onLogout }: Props) {
  return (
    <div className="content-layer">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-netflix-red" />
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              <span className="gradient-text">Smart Study</span>
            </h1>
            <Sparkles className="w-7 h-7 text-netflix-red" />
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-gray-300">
                  Hi, <span className="font-semibold text-white">{user.name}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-netflix-red hover:bg-netflix-red-dark text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-netflix-red/10 border border-netflix-red/30 rounded-full px-4 py-1.5 mb-6 animate-slideDown">
          <Sparkles className="w-4 h-4 text-netflix-red" />
          <span className="text-sm text-netflix-red font-medium">Your academic journey, mapped.</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight text-balance">
          Study smarter with
          <br />
          <span className="gradient-text">personalized roadmaps</span>
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto text-balance">
          Pick your class or degree, follow a complete study roadmap, track your notes, search
          educational videos, and get your doubts solved — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('tracker')}
            className="bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg px-6 py-3 transition-colors flex items-center gap-2"
          >
            <NotebookPen className="w-5 h-5" /> Start Tracking
          </button>
          <button
            onClick={() => onNavigate('ai-doubt')}
            className="glass hover:bg-white/10 text-white font-semibold rounded-lg px-6 py-3 transition flex items-center gap-2"
          >
            <Bot className="w-5 h-5" /> Ask AI Doubt Solver
          </button>
        </div>
      </section>

      {/* School section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <School className="w-6 h-6 text-edu-green" />
          <h3 className="font-display font-bold text-2xl">School (Class 10 & 12)</h3>
          <span className="text-sm text-gray-400">— CBSE / SSC / HSC</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SCHOOL_COURSES.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <button
                key={c.id}
                onClick={() => onNavigate(c.id as Page)}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group text-left bg-gradient-to-br from-edu-green/10 to-black/40 border border-edu-green/20 hover:border-edu-green/50 rounded-2xl p-6 transition-all hover:scale-[1.02] animate-fadeIn"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-edu-green/20 flex items-center justify-center group-hover:bg-edu-green/30 transition">
                    {Icon && <Icon className="w-7 h-7 text-edu-green" />}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-edu-green group-hover:translate-x-1 transition" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">{c.fullName}</h4>
                <p className="text-sm text-gray-400 mt-1">{c.description}</p>
                <span className="inline-block mt-4 text-xs font-semibold text-edu-green bg-edu-green/10 px-3 py-1 rounded-full">
                  Green & White Theme
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Degree section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-6 h-6 text-edu-orange" />
          <h3 className="font-display font-bold text-2xl">Degrees</h3>
          <span className="text-sm text-gray-400">— B.Tech, B.E., BCA, B.Com, B.Sc</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEGREE_COURSES.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <button
                key={c.id}
                onClick={() => onNavigate(c.id as Page)}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group text-left bg-gradient-to-br from-edu-orange/10 to-black/40 border border-edu-orange/20 hover:border-edu-orange/50 rounded-2xl p-6 transition-all hover:scale-[1.02] animate-fadeIn"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-edu-orange/20 flex items-center justify-center group-hover:bg-edu-orange/30 transition">
                    {Icon && <Icon className="w-7 h-7 text-edu-orange" />}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-edu-orange group-hover:translate-x-1 transition" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">{c.name}</h4>
                <p className="text-sm text-gray-400 mt-1">{c.fullName}</p>
                <p className="text-sm text-gray-500 mt-2">{c.description}</p>
                <span className="inline-block mt-4 text-xs font-semibold text-edu-orange bg-edu-orange/10 px-3 py-1 rounded-full">
                  Orange & Black Theme
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-20">
        <h3 className="font-display font-bold text-2xl mb-6 text-center">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={<NotebookPen className="w-6 h-6" />}
            title="Study Tracker & Notes"
            desc="Write notes per course, track progress, edit, delete — auto-saved to your browser."
            onClick={() => onNavigate('tracker')}
            accent="text-edu-green border-edu-green/30 hover:border-edu-green/60"
          />
          <FeatureCard
            icon={<Youtube className="w-6 h-6" />}
            title="YouTube Edu Search"
            desc="Search academic topics and get distraction-free educational video results."
            onClick={() => onNavigate('youtube')}
            accent="text-netflix-red border-netflix-red/30 hover:border-netflix-red/60"
          />
          <FeatureCard
            icon={<Bot className="w-6 h-6" />}
            title="AI Doubt Solver"
            desc="Ask any question. Use your own AI key, or get 1-click links to Google & ChatGPT."
            onClick={() => onNavigate('ai-doubt')}
            accent="text-edu-orange border-edu-orange/30 hover:border-edu-orange/60"
          />
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-4 h-4" />
          <span className="font-display font-semibold text-gray-400">Smart Study</span>
        </div>
        Built for students. Your data stays private in your browser.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  onClick,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left glass rounded-2xl p-6 border ${accent} transition-all hover:scale-[1.02] animate-fadeIn`}
    >
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${accent.split(' ')[0]}`}>
        {icon}
      </div>
      <h4 className="font-display font-bold text-lg text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </button>
  );
}

export type { CourseId };
