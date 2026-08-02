import { useEffect, useState } from 'react';
import StarCursor from '@/components/StarCursor';
import AuthModal from '@/components/AuthModal';
import LandingPage from '@/components/LandingPage';
import CoursePage from '@/components/CoursePage';
import StudyTracker from '@/components/StudyTracker';
import YouTubeSearch from '@/components/YouTubeSearch';
import AiDoubtSolver from '@/components/AiDoubtSolver';
import type { User, Page, CourseId } from '@/types';
import { safeGet, safeSet, safeRemove, STORAGE_KEYS } from '@/lib/storage';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [showAuth, setShowAuth] = useState(false);

  // Restore session on load
  useEffect(() => {
    const saved = safeGet<User | null>(STORAGE_KEYS.user, null);
    if (saved && saved.email) setUser(saved);
  }, []);

  const handleAuth = (u: User) => {
    setUser(u);
    setShowAuth(false);
  };

  const handleLogout = () => {
    safeRemove(STORAGE_KEYS.user);
    setUser(null);
    setPage('home');
  };

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCoursePage = (p: Page): p is CourseId =>
    p === '10th' || p === '12th' || p === 'btech' || p === 'be' || p === 'bca' || p === 'bcom' || p === 'bsc';

  return (
    <>
      <StarCursor />

      {page === 'home' && (
        <LandingPage
          user={user}
          onNavigate={navigate}
          onOpenAuth={() => setShowAuth(true)}
          onLogout={handleLogout}
        />
      )}

      {isCoursePage(page) && (
        <CoursePage courseId={page} onBack={() => navigate('home')} onNavigate={navigate} />
      )}

      {page === 'tracker' && (
        <StudyTracker user={user} onBack={() => navigate('home')} onNavigate={navigate} />
      )}

      {page === 'youtube' && <YouTubeSearch onBack={() => navigate('home')} />}

      {page === 'ai-doubt' && <AiDoubtSolver onBack={() => navigate('home')} onNavigate={navigate} />}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
    </>
  );
}
