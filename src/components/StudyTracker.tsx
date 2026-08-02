import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, Plus, Trash2, Pencil, NotebookPen, BookOpen, X, Save } from 'lucide-react';
import type { Note, Page, User } from '@/types';
import { safeGet, safeSet, STORAGE_KEYS } from '@/lib/storage';
import { COURSES } from '@/data/roadmaps';

type Props = {
  user: User | null;
  onBack: () => void;
  onNavigate: (page: Page) => void;
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function StudyTracker({ user, onBack, onNavigate }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [course, setCourse] = useState<string>(COURSES[0].id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [progress, setProgress] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const notesKey = user ? `${STORAGE_KEYS.notes}_${user.email}` : STORAGE_KEYS.notes;

  // Load notes on mount / when user changes
  useEffect(() => {
    const loaded = safeGet<Note[]>(notesKey, []);
    setNotes(loaded);
  }, [notesKey]);

  // Auto-save whenever notes change
  useEffect(() => {
    safeSet(notesKey, notes);
  }, [notes, notesKey]);

  const userNotes = notes;

  const resetForm = () => {
    setTitle('');
    setContent('');
    setProgress(0);
    setCourse(COURSES[0].id);
    setEditingId(null);
  };

  const saveNote = () => {
    if (!title.trim() && !content.trim()) return;
    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? { ...n, course, title: title.trim(), content: content.trim(), progress, updatedAt: new Date().toISOString() }
            : n,
        ),
      );
    } else {
      const note: Note = {
        id: uid(),
        course,
        title: title.trim() || 'Untitled note',
        content: content.trim(),
        progress,
        updatedAt: new Date().toISOString(),
      };
      setNotes((prev) => [note, ...prev]);
    }
    resetForm();
    setShowForm(false);
  };

  const editNote = (n: Note) => {
    setEditingId(n.id);
    setCourse(n.course);
    setTitle(n.title);
    setContent(n.content);
    setProgress(n.progress);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  };

  const courseName = useMemo(
    () => (id: string) => COURSES.find((c) => c.id === id)?.name || id,
    [],
  );

  const avgProgress = userNotes.length
    ? Math.round(userNotes.reduce((s, n) => s + n.progress, 0) / userNotes.length)
    : 0;

  return (
    <div className="content-layer min-h-screen bg-gradient-to-b from-netflix-black via-netflix-black-soft to-black">
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-netflix-red" />
            <span className="font-display font-extrabold text-lg gradient-text">Smart Study</span>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <NotebookPen className="w-6 h-6 text-netflix-red" />
          <h1 className="font-display font-extrabold text-3xl text-white">Study Tracker & Notes</h1>
        </div>
        <p className="text-gray-400">
          {user
            ? `Welcome ${user.name}. Your notes auto-save privately to this browser.`
            : 'Notes auto-save to this browser. Sign in to keep them tied to your account.'}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          <StatCard label="Total Notes" value={String(userNotes.length)} />
          <StatCard label="Avg Progress" value={`${avgProgress}%`} />
          <StatCard label="Courses Tracked" value={String(new Set(userNotes.map((n) => n.course)).size)} />
        </div>

        <button
          onClick={() => {
            if (showForm && editingId) resetForm();
            setShowForm((s) => !s);
          }}
          className="mt-6 inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg px-5 py-2.5 transition"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Close' : 'Add Note'}
        </button>
      </section>

      {/* Form */}
      {showForm && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 animate-slideDown">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="font-display font-bold text-lg text-white mb-4">
              {editingId ? 'Edit Note' : 'New Note'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-netflix-red outline-none"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-black">
                      {c.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Trigonometry revision"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Notes</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Write your study notes here..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red outline-none resize-y"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Progress: <span className="text-netflix-red font-bold">{progress}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-netflix-red"
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={saveNote}
                className="inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg px-5 py-2.5 transition"
              >
                <Save className="w-4 h-4" /> {editingId ? 'Update' : 'Save'} Note
              </button>
              <button
                onClick={resetForm}
                className="text-gray-300 hover:text-white text-sm font-medium px-4 py-2.5"
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Notes list */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {userNotes.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl border border-white/10">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No notes yet. Start by adding your first study note.</p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg px-5 py-2.5 transition"
            >
              <Plus className="w-4 h-4" /> Add your first note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userNotes.map((n) => (
              <div
                key={n.id}
                className="glass rounded-2xl border border-white/10 p-5 hover:border-netflix-red/40 transition animate-fadeIn"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-semibold text-netflix-red bg-netflix-red/10 px-2 py-0.5 rounded-full">
                      {courseName(n.course)}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white mt-2">{n.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => editNote(n)}
                      className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-wrap line-clamp-4 mb-3">
                  {n.content || <span className="text-gray-500 italic">No content</span>}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-netflix-red to-red-400 rounded-full transition-all"
                      style={{ width: `${n.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-300 w-9 text-right">{n.progress}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Updated {new Date(n.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {!user && (
          <p className="text-center text-xs text-gray-500 mt-8">
            Tip: Sign in to keep your notes associated with your account across sessions on this device.
          </p>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl border border-white/10 p-4">
      <div className="text-2xl font-display font-extrabold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
