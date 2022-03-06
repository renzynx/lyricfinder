import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { getLyric } from "../lib/functions";
import { LyricProps } from "../lib/types";

const Lyric: NextPage<{ lyric: string; q: string; artist: string }> = ({
  lyric,
  q,
  artist,
}) => {
  const Search = dynamic(() => import("../components/Search"));

  return (
    <>
      <Head>
        <title>
          {q} by {artist}
        </title>
          <meta name="robots" content="index,follow" />
          <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
          <meta name="owner" content="renzynx"></meta>
          <meta name="identifier" content="https://lyricfinder.xyz"></meta>
          <meta name="og:title" content={`${q} by ${artist}`} />
          <meta name="og:type" content="music" />
      </Head>
      <Navbar />
      <Search />
      <div className="my-20">
        <p className="text-2xl font-bold text-center mb-5">
          {q} by {artist}
        </p>
        <p className="whitespace-pre-line text-center">{lyric}</p>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }: { query: LyricProps }) => {
  const { q, artist } = query;

  if (!q || !artist)
    return {
      notFound: true,
    };

  const lyric = await getLyric(q, artist);

  if (!lyric)
    return {
      props: {
        lyric: "No lyric was found for this song.",
        q,
        artist,
      },
    };

  return {
    props: { lyric, q, artist },
  };
};

export default Lyric;
