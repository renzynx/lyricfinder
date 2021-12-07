import { LyricPage } from "../../components/LyricPage";
import { getSong } from "gnus_xyz";
import Head from "next/head";

export default function Lyric({ data }) {
  return (
    <>
      <Head>
        <title>{data?.title || ""}</title>
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
