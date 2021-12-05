import { Navbar } from "../../components/Navbar";
import { Tracks } from "../../components/Tracks";

export default function Result({ track_list, query }) {
  return (
    <>
      <Navbar />
      <Tracks track_list={track_list} title={`Result for ${query}`} />
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
