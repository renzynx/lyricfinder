import { GetServerSidePropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { betterEncodeURI, searchResult } from "../lib/functions";
import { SearchProps } from "../lib/types";

const Search: NextPage<SearchProps> = ({ best, rest }) => {
  const router = useRouter();
  const MobileSearch = dynamic(() => import("../components/Search"));

  let body;

  if (best)
    body = (
      <>
        <div className="flex flex-col items-center justify-center border-b-2 mt-20 border-b-slate-900/10 lg:px-8 mx-4 lg:mx-0">
          <span className="text-2xl font-bold">Best Result</span>
          <div className="card card-compact w-96 bg-primary text-primary-content">
            <figure>
              <Image
                src={best.thumbnail as string}
                width="400px"
                height="225px"
                alt="album thumbnail"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">
                {best.title}
                <div className="badge badge-secondary">1</div>
              </h2>
              <p>{best.artist}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={() => {
                    const title = betterEncodeURI(best.title);
                    const artist = betterEncodeURI(best.artist);
                    router.push(`/lyric?q=${title}&artist=${artist}`);
                  }}
                >
                  View Lyric
                </button>
              </div>
            </div>
          </div>
        </div>
        <Menu songs={rest} start={1} />
      </>
    );

  if (!best.title)
    body = (
      <div className="mt-20 text-center font-bold text-2xl">
        No results found for {router.query.q}
      </div>
    );

  return (
    <>
      <Head>
        <title>Search results for {router.query.q}</title>
        <meta name="robots" content="index,follow" />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content="Lyric Finder" />
        <meta name="og:type" content="music" />
        <meta name="og:site_name" content="Lyric Finder" />
      </Head>
      <Navbar />
      <MobileSearch />
      {body}
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q } = context.query;

  if (!q)
    return {
      props: {
        best: null,
        rest: [],
      },
    };

  const title = betterEncodeURI(q as string);
  const { best, rest } = await searchResult(title);

  return {
    props: {
      best,
      rest,
    },
  };
};

export default Search;
