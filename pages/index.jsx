import Head from "next/head";
import { Tracks } from "../components/Tracks";
import { Navbar } from "../components/Navbar";

export default function Home({ track_list }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Tracks track_list={track_list} title="THIS WEEK SONG CHART" />
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
