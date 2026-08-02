import { useState } from 'react';
import { ArrowLeft, Sparkles, Youtube, Search, ExternalLink, BookOpen } from 'lucide-react';

type Props = {
  onBack: () => void;
};

const SUGGESTIONS = [
  '12th Science Chapter 1 Physics',
  'Class 10 Trigonometry',
  'B.Tech Data Structures',
  'BCA C Programming basics',
  'B.Com Financial Accounting',
  'NEET Biology Human Reproduction',
];

export default function YouTubeSearch({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');

  const runSearch = (q: string) => {
    const term = q.trim();
    if (!term) return;
    setQuery(term);
    setSearched(term);
  };

  const ytEmbedUrl = searched
    ? `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searched)}`
    : '';
  const ytResultsUrl = searched
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(searched + ' lecture tutorial')}`
    : '';
  const ytWatchUrl = searched
    ? `https://www.youtube.com/watch?v=&search_query=${encodeURIComponent(searched)}`
    : '';

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
          <Youtube className="w-6 h-6 text-netflix-red" />
          <h1 className="font-display font-extrabold text-3xl text-white">Educational Video Search</h1>
        </div>
        <p className="text-gray-400">
          Search any academic topic and get distraction-free educational video results — no login, no recommendations sidebar.
        </p>

        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          className="mt-6 flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 12th Science Chapter 1"
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-3 py-3 text-sm text-white placeholder-gray-500 focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/40 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg px-5 py-3 transition"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </form>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => runSearch(s)}
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-gray-300 transition"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      {searched && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 animate-fadeIn">
          <div className="glass rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-netflix-red" /> Results for "{searched}"
              </h2>
              <a
                href={ytResultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-netflix-red hover:underline"
              >
                Open on YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded distraction-free playlist search */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
              <iframe
                title="YouTube educational search results"
                src={ytEmbedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-gray-500 mt-3">
              This embedded player shows search results as a playlist — no sidebar, no recommendations, just educational videos for your query.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={ytResultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white transition"
              >
                <Youtube className="w-4 h-4 text-netflix-red" /> Full YouTube Results
              </a>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(searched + ' educational video lecture')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white transition"
              >
                <Search className="w-4 h-4" /> Search on Google
              </a>
            </div>
          </div>
        </section>
      )}

      {!searched && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 text-center py-16">
          <Youtube className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Type a topic above to load distraction-free educational videos.</p>
        </section>
      )}
    </div>
  );
}
