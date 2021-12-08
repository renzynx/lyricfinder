import Head from "next/head";
import { Tracks } from "../components/Tracks";
import { Navbar } from "../components/Navbar";

export default function Home({ track_list }) {
  return (
    <>
      <Head>
        <title>lyricfinder</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="t1LgsLYBK9cGjBAM5LO7ivCLSrhw__xvJEBoBsiAK2I"
        />
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

      <Navbar />
      <Tracks track_list={track_list} title="THIS WEEK CHART" />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.URL}/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.KEY}`
  );

  if (!res)
    return {
      notFound: true,
    };

  const data = await res.json();

  const { track_list } = data.message.body;

  return {
    props: {
      track_list,
    },
  };
}
