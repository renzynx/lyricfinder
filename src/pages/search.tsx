import axios from "axios";
import * as cheerio from "cheerio";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { betterEncodeURI } from "../lib/functions";
import { ChartProps, SearchProps } from "../lib/types";

const Search: NextPage<SearchProps> = ({ best, rest }) => {
  const router = useRouter();

  let body;

  if (best)
    body = (
      <>
        <div className="flex flex-col items-center justify-center border-b-2 border-b-slate-900/10 lg:px-8 mx-4 lg:mx-0">
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
        results: null,
      },
    };

  const res = await axios.get(
    `https://www.musixmatch.com/search/${encodeURI(q as string)}`
  );
  const $ = cheerio.load(res.data);
  const bestResult = $(
    "#search-all-results > div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a"
  );

  const bestResultLink = bestResult.attr("href");
  const bestResultTitle = bestResult.text();
  const bestResultArtist = $(
    "#search-all-results > div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h3 > span > span > a"
  ).text();
  const bestResultImg = $(
    "#search-all-results > div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-picture > img"
  )
    .attr("srcset")
    ?.split(" ")[2];

  const generalResults = $(
    "#search-all-results > div.main-panel > div:nth-child(2) > div.box-content > div > ul"
  )
    .first()
    .children();

  const songs: ChartProps[] = [];

  generalResults.map((_i, el) => {
    const $el = $(el);
    const $a = $el.find("a.title");
    const $img = $el.find("img");
    const $artist = $el.find(".artist-field");

    songs.push({
      url: $a.attr("href") as string,
      title: $a.text(),
      artist: $artist.text(),
      thumbnail: $img.attr("srcset")?.split(" ")[2],
    });
  });

  return {
    props: {
      best: {
        url: bestResultLink || null,
        title: bestResultTitle || null,
        artist: bestResultArtist || null,
        thumbnail: bestResultImg || null,
      },
      rest: songs,
    },
  };
};

export default Search;
