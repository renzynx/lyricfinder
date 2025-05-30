"use client";

import { useState, useRef, useEffect } from "react";

interface LyricsResult {
  id: number;
  name: string;
  trackName: string;
  artistName: string;
  albumName?: string;
  duration: number;
  instrumental: boolean;
  plainLyrics?: string;
  syncedLyrics?: string;
}

export default function LyricsSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LyricsResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLyrics, setSelectedLyrics] = useState<LyricsResult | null>(
    null
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const searchLyrics = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://lrclib.net/api/search?q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch lyrics");
      }

      const data = await response.json();
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error searching lyrics:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      searchLyrics(value);
    }, 500);
  };

  const handleResultClick = (result: LyricsResult) => {
    setSelectedLyrics(result);
    setShowDropdown(false);
    setQuery(`${result.artistName} - ${result.trackName}`);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative" ref={searchRef}>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for lyrics by song, artist, or album..."
            className="w-full px-4 py-3 pr-12 bg-surface border border-overlay rounded-lg focus:outline-none focus:ring-2 focus:ring-pine focus:border-transparent text-text placeholder-muted"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-pine border-t-transparent rounded-full"></div>
            ) : (
              <svg
                className="h-5 w-5 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Dropdown Results */}
        {showDropdown && results.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-overlay rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="px-4 py-3 hover:bg-overlay cursor-pointer border-b border-highlight-low last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  {" "}
                  <div className="flex-1">
                    <h3 className="font-semibold text-text truncate">
                      {result.trackName}
                    </h3>
                    <p className="text-sm text-muted truncate">
                      by {result.artistName}
                    </p>
                    {result.albumName && (
                      <p className="text-xs text-subtle truncate">
                        from {result.albumName}
                      </p>
                    )}
                  </div>
                  <div className="ml-2 flex flex-col items-end">
                    <span className="text-xs text-muted">
                      {formatDuration(result.duration)}
                    </span>
                    {result.instrumental && (
                      <span className="text-xs text-gold bg-highlight-low px-1 rounded mt-1">
                        Instrumental
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Lyrics Display */}
      {selectedLyrics && (
        <div className="mt-6 p-6 bg-surface border border-overlay rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-text">
              {selectedLyrics.trackName}
            </h2>
            <p className="text-muted">by {selectedLyrics.artistName}</p>
            {selectedLyrics.albumName && (
              <p className="text-sm text-subtle">
                from {selectedLyrics.albumName}
              </p>
            )}
          </div>

          {selectedLyrics.instrumental ? (
            <div className="text-center py-8">
              <div className="text-gold text-lg font-medium">
                🎵 Instrumental Track
              </div>
              <p className="text-muted mt-2">
                This track doesn't contain lyrics.
              </p>
            </div>
          ) : selectedLyrics.plainLyrics ? (
            <div className="lyrics-content">
              <pre className="whitespace-pre-wrap text-text leading-relaxed font-mono text-sm bg-highlight-low p-4 rounded-lg max-h-96 overflow-y-auto">
                {selectedLyrics.plainLyrics}
              </pre>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted">
                No lyrics available for this track.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
