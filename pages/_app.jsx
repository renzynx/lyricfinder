import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A website made to find your favourite song lyric. Got a song that stuck on your mind for days and still doesn't the know the song lyric, use lyricfinder to discover lyrics now."
        />
        <meta
          name="keywords"
          content="lyricfinder, lyric, lyrics, lyricsfinder, lyricfinder.xyz, renzynx.space, renzynx, find lyric, save your tears, save your tear"
        />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content="lyricfinder" />
        <meta name="og:type" content="music" />
        <meta name="og:site_name" content="lyricfinder" />
      </Head>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
