import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { betterGetLyric, getLyric } from "../lib/functions";
import { LyricProps } from "../lib/types";

const Lyric: NextPage<{
  lyric: string;
  title: string;
  artist: string;
  cover: string;
}> = ({ lyric, title, artist, cover }) => {
  const Search = dynamic(() => import("../components/Search"));

  return (
    <>
      <Head>
        <title>
          {title} by {artist}
        </title>
        <meta name="robots" content="index,follow" />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content={`${title} by ${artist}`} />
        <meta name="og:type" content="music" />
      </Head>
      <Navbar />
      <Search />
      <div className="my-20 place-items-center grid gap-5">
        <Image
          className="mx-auto"
          src={cover}
          alt="Album Cover"
          width="350px"
          height="350px"
        />
        <p className="text-2xl font-bold text-center mb-5">
          {title} by {artist}
        </p>
        <p className="whitespace-pre-line text-center text-lg">{lyric}</p>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }: { query: LyricProps }) => {
  const { q } = query;

  if (!q)
    return {
      notFound: true,
    };

  const data = await betterGetLyric(q);

  if (!data)
    return {
      props: {
        lyric: "No lyric was found for this song.",
        q,
      },
    };

  return {
    props: {
      lyric: data?.lyric,
      title: data?.title,
      artist: data?.artist,
      cover: data?.cover,
    },
  };
};

export default Lyric;
