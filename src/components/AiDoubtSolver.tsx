import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Bot,
  Send,
  Key,
  ExternalLink,
  Search,
  MessageSquare,
  Settings,
  Loader2,
  Lightbulb,
  X,
} from 'lucide-react';
import type { Page } from '@/types';
import { safeGet, safeSet, safeRemove, STORAGE_KEYS } from '@/lib/storage';

type Props = {
  onBack: () => void;
  onNavigate: (page: Page) => void;
};

type Provider = 'gemini' | 'groq' | 'openai';

const PROVIDERS: { id: Provider; name: string; placeholder: string }[] = [
  { id: 'gemini', name: 'Google Gemini', placeholder: 'AIza...' },
  { id: 'groq', name: 'Groq', placeholder: 'gsk_...' },
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...' },
];

export default function AiDoubtSolver({ onBack, onNavigate }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState<Provider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');

  // Load saved settings
  useEffect(() => {
    const p = safeGet<Provider>(STORAGE_KEYS.apiProvider, 'gemini');
    const k = safeGet<string>(STORAGE_KEYS.apiKey, '');
    setProvider(p);
    setApiKey(k);
    setSavedKey(k);
  }, []);

  const saveSettings = () => {
    safeSet(STORAGE_KEYS.apiProvider, provider);
    safeSet(STORAGE_KEYS.apiKey, apiKey.trim());
    setSavedKey(apiKey.trim());
    setShowSettings(false);
  };

  const clearKey = () => {
    safeRemove(STORAGE_KEYS.apiKey);
    setApiKey('');
    setSavedKey('');
  };

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setError('');
    setAnswer('');

    if (savedKey) {
      // Call the AI directly
      setLoading(true);
      try {
        const result = await callAi(provider, savedKey, q);
        if (result) {
          setAnswer(result);
        } else {
          setError('The AI did not return a response. Check your API key in settings, or use the quick links below.');
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        setError(`Could not reach the AI (${msg}). Please check your key or try the quick links below.`);
      } finally {
        setLoading(false);
      }
    }
    // If no key: do nothing here — the fallback card renders automatically (no error screen).
  };

  const hasKey = !!savedKey;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(question.trim() + ' explained')}`;
  const chatgptUrl = `https://chat.openai.com/?q=${encodeURIComponent(question.trim())}`;

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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-6 h-6 text-netflix-red" />
          <h1 className="font-display font-extrabold text-3xl text-white">AI Doubt Solver</h1>
        </div>
        <p className="text-gray-400">
          Ask any academic question. Add your own AI key to get instant answers, or use the 1-click links to Google & ChatGPT.
        </p>

        {/* Status pill */}
        <div className="mt-4 flex items-center gap-2">
          {hasKey ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-edu-green/10 text-edu-green border border-edu-green/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-edu-green" /> AI connected ({PROVIDERS.find((p) => p.id === provider)?.name})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full px-3 py-1">
              <Lightbulb className="w-3 h-3" /> No API key — using smart fallback links
            </span>
          )}
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-300 transition"
          >
            <Settings className="w-3.5 h-3.5" /> {hasKey ? 'Manage key' : 'Add API key'}
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mt-4 glass rounded-2xl border border-white/10 p-5 animate-slideDown">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-netflix-red" /> API Key Settings
              </h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Your key is stored only in this browser (localStorage) and sent directly to the provider you choose. It never touches our servers.
            </p>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Provider</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={`text-sm font-medium rounded-lg px-3 py-2 border transition ${
                    provider === p.id
                      ? 'bg-netflix-red/20 border-netflix-red text-white'
                      : 'bg-black/30 border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={PROVIDERS.find((p) => p.id === provider)?.placeholder}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-netflix-red outline-none"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={saveSettings}
                className="bg-netflix-red hover:bg-netflix-red-dark text-white text-sm font-semibold rounded-lg px-4 py-2 transition"
              >
                Save Key
              </button>
              {hasKey && (
                <button
                  onClick={clearKey}
                  className="text-sm text-gray-300 hover:text-red-400 px-4 py-2 transition"
                >
                  Remove key
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Question input */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask();
          }}
        >
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              placeholder="Type your doubt here... e.g. Explain Newton's second law with an example"
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-14 py-3 text-sm text-white placeholder-gray-500 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/40 outline-none resize-y"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute bottom-3 right-3 bg-netflix-red hover:bg-netflix-red-dark disabled:opacity-40 text-white rounded-lg p-2.5 transition"
              aria-label="Ask"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </section>

      {/* Answer / fallback */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {loading && (
          <div className="glass rounded-2xl border border-white/10 p-6 animate-fadeIn">
            <div className="flex items-center gap-3 text-gray-300">
              <Loader2 className="w-5 h-5 animate-spin text-netflix-red" />
              <span className="text-sm">Thinking through your question...</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="glass rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 animate-fadeIn mb-4">
            <p className="text-sm text-amber-300 mb-4">{error}</p>
            <FallbackLinks googleUrl={googleUrl} chatgptUrl={chatgptUrl} hasQuestion={!!question.trim()} />
          </div>
        )}

        {answer && !loading && (
          <div className="glass rounded-2xl border border-edu-green/20 p-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-edu-green" />
              <h3 className="font-display font-bold text-white">Answer</h3>
            </div>
            <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{answer}</p>
          </div>
        )}

        {/* Smart fallback card — shown when no key and no answer yet, or when no key at all */}
        {!hasKey && !loading && !answer && question.trim() && (
          <div className="glass rounded-2xl border border-netflix-red/20 p-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-netflix-red" />
              <h3 className="font-display font-bold text-white">Get your answer in one click</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              No AI key set up yet. Use these quick links to get an instant answer to your question, or add an API key above to get answers right here.
            </p>
            <FallbackLinks googleUrl={googleUrl} chatgptUrl={chatgptUrl} hasQuestion />
          </div>
        )}

        {!question.trim() && !answer && !loading && !error && (
          <div className="text-center py-16">
            <Bot className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Ask a question above to get started.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function FallbackLinks({
  googleUrl,
  chatgptUrl,
  hasQuestion,
}: {
  googleUrl: string;
  chatgptUrl: string;
  hasQuestion: boolean;
}) {
  if (!hasQuestion) return null;
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition"
      >
        <Search className="w-4 h-4" /> Search on Google
      </a>
      <a
        href={chatgptUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-edu-green/20 hover:bg-edu-green/30 border border-edu-green/30 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition"
      >
        <MessageSquare className="w-4 h-4" /> Ask ChatGPT
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

// --- Direct AI calls (only runs when a key is present) ---
async function callAi(provider: Provider, key: string, question: string): Promise<string> {
  const sys = 'You are Smart Study, a helpful academic tutor. Explain concepts clearly and concisely for students. Use simple language and examples where helpful.';

  if (provider === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: sys }] },
          contents: [{ parts: [{ text: question }] }],
        }),
      },
    );
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new Error(`Gemini ${res.status}: ${t.slice(0, 120)}`);
    }
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('\n') || '';
  }

  if (provider === 'groq') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: question },
        ],
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new Error(`Groq ${res.status}: ${t.slice(0, 120)}`);
    }
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  }

  // openai
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: question },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

