import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Sparkles, AlertCircle } from 'lucide-react';
import type { User } from '@/types';
import {
  safeGet,
  safeSet,
  STORAGE_KEYS,
  isValidEmail,
  isValidPassword,
} from '@/lib/storage';

type StoredUser = User & { password: string };

type Props = {
  onClose: () => void;
  onAuth: (user: User) => void;
};

export default function AuthModal({ onClose, onAuth }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email like name@gmail.com');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);
    try {
      const users = safeGet<StoredUser[]>(STORAGE_KEYS.users, []);

      if (mode === 'signup') {
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          setError('An account with this email already exists. Please sign in.');
          setLoading(false);
          return;
        }
        const newUser: StoredUser = {
          email: email.trim(),
          name: name.trim(),
          createdAt: new Date().toISOString(),
          password,
        };
        users.push(newUser);
        safeSet(STORAGE_KEYS.users, users);
        const { password: _pw, ...safe } = newUser;
        safeSet(STORAGE_KEYS.user, safe);
        onAuth(safe);
      } else {
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        );
        if (!found) {
          setError('Invalid email or password. Please try again or sign up.');
          setLoading(false);
          return;
        }
        const { password: _pw, ...safe } = found;
        safeSet(STORAGE_KEYS.user, safe);
        onAuth(safe);
      }
    } catch {
      setError('Something went wrong saving your session. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md glass rounded-2xl p-8 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-netflix-red" />
            <span className="font-display font-extrabold text-2xl gradient-text">Smart Study</span>
            <Sparkles className="w-6 h-6 text-netflix-red" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {mode === 'signin' ? 'Sign in to continue your journey' : 'Start tracking your study progress'}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300 animate-slideDown">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/40 outline-none transition"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/40 outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/40 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red hover:bg-netflix-red-dark disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 transition-colors"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-netflix-red hover:underline font-medium"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
