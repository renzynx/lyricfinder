import { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { LyricProps } from "../lib/types";
import { getLyric } from "../lib/functions";
import Head from "next/head";
import dynamic from "next/dynamic";

const Lyric: NextPage<{ lyric: string }> = ({ lyric }) => {
  const Search = dynamic(() => import("../components/Search"));
  const router = useRouter();

  const { q, artist } = router.query;

  return (
    <>
      <Head>
        <title>
          {q} by {artist}
          <meta name="robots" content="index,follow" />
          <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
          <meta name="owner" content="renzynx"></meta>
          <meta name="identifier" content="https://lyricfinder.xyz"></meta>
          <meta name="og:title" content={`${q} by ${artist}`} />
          <meta name="og:type" content="music" />
        </title>
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
      notFound: true,
    };

  return {
    props: { lyric },
  };
};

export default Lyric;
