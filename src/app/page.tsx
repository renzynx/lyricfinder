import LyricsSearch from "./components/lyrics-search";
import ThemeSwitch from "./components/theme-switch";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-text mb-4">
              🎵 Lyrics Finder
            </h1>
            <p className="text-muted text-lg">
              Search for lyrics from your favorite songs
            </p>
          </div>
          <ThemeSwitch />
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <section aria-label="Lyrics search functionality">
          <LyricsSearch />
        </section>
      </main>
    </div>
  );
}
