import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { themeScript } from "./theme-script";
import { ThemeProvider } from "./components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyrics Finder - Search Your Favorite Song Lyrics",
  description:
    "Discover and search lyrics from your favorite songs with Lyrics Finder. Find accurate song lyrics, explore new music, and enjoy a beautiful, fast lyrics search experience.",
  keywords: [
    "lyrics",
    "song lyrics",
    "music",
    "lyrics search",
    "find lyrics",
    "song finder",
    "music lyrics",
  ],
  authors: [{ name: "Lyrics Finder" }],
  creator: "Lyrics Finder",
  publisher: "Lyrics Finder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lyric.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lyrics Finder - Search Your Favorite Song Lyrics",
    description:
      "Discover and search lyrics from your favorite songs with Lyrics Finder. Find accurate song lyrics, explore new music, and enjoy a beautiful, fast lyrics search experience.",
    url: "https://lyric.vercel.app",
    siteName: "Lyrics Finder",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Lyrics Finder - Search Your Favorite Song Lyrics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyrics Finder - Search Your Favorite Song Lyrics",
    description:
      "Discover and search lyrics from your favorite songs with Lyrics Finder. Find accurate song lyrics, explore new music, and enjoy a beautiful, fast lyrics search experience.",
    images: ["/og-image.jpg"], // You'll need to add this image
    creator: "@lyricsfinderapp", // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lyrics Finder",
    description: "Search and discover lyrics from your favorite songs",
    url: "https://lyric.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://lyric.vercel.app?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Lyrics Finder",
    },
    inLanguage: "en-US",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
