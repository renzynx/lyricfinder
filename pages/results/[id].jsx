import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Tracks } from "../../components/Tracks";

export default function Result({ track_list, query }) {
  return (
    <>
      <Head>
        <title>Result for {query}</title>
        <meta name='description' content={query || ""} />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content="Lyric Finder" />
        <meta name="og:type" content="music" />
        <meta name="og:site_name" content="Lyric Finder" />
      </Head>
      <Navbar />
      <Tracks
        track_list={track_list}
        title={`Here are the results for "${query}"`}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  if (params.id === null)
    return {
      notFound: true,
    };

  const query = params.id;

  const res = await fetch(
    `${process.env.URL}/track.search?q_track=${query}&apikey=${process.env.KEY}&page=1&page_size=10&s_track_rating=desc`
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
      query,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
