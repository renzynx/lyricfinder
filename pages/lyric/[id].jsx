import { LyricPage } from "../../components/LyricPage";
import { getSong } from "gnus_xyz";

export default function Lyric({ data }) {
  return <LyricPage data={data} />;
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
