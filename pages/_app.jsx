import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
