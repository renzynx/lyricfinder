import { LyricPage } from "../../components/LyricPage";
import { getSong } from "gnus_xyz";
import Head from "next/head";

export default function Lyric({ data }) {
  return (
    <>
      <Head>
        <title>{data?.title || ""}</title>
        <meta name='description' content={data?.title || ""} />
        <meta name='robots' content='index,follow' />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content="Lyric Finder" />
        <meta name="og:type" content="music" />
        <meta name="og:site_name" content="Lyric Finder" />
      </Head>
      <LyricPage data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  if (params === null)
    return {
      notFound: true,
    };

  const { id } = params;

  const [track, artist] = id.split("_");

  if (!track || !artist)
    return {
      notFound: true,
    };

  const data = await getSong({
    apiKey: process.env.LYRIC,
    title: track,
    artist,
    optimizeQuery: true,
  });

  return {
    props: {
      data,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
