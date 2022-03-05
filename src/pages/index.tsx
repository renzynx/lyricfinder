import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import * as cheerio from "cheerio";
import { ChartProps, IChartProps } from "../lib/types";
import Menu from "../components/Menu";
import dynamic from "next/dynamic";

const Home: NextPage<IChartProps> = ({ songs }) => {
  const Search = dynamic(() => import("../components/Search"));

  return (
    <>
      <Head>
        <title>LyricFinder | Home</title>
        <meta
          name="description"
          content="A website made to find your favourite song lyric. Got a song that stuck on your mind for days and still doesn't the know the song lyric, use lyricfinder to discover lyrics now."
        />
        <meta
          name="keywords"
          content="lyric finder, lyric find, lyric find xyz, lyricfinder, lyric, lyrics, lyricsfinder, lyricfinder.xyz, renzynx.space, renzynx, find lyric, save your tears, save your tear"
        />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="renzynx, magicdorm@hotmail.com"></meta>
        <meta name="owner" content="renzynx"></meta>
        <meta name="identifier" content="https://lyricfinder.xyz"></meta>
        <meta name="og:title" content="Lyric Finder" />
        <meta name="og:type" content="music" />
        <meta name="og:site_name" content="Lyric Finder" />
      </Head>
      <Navbar />
      <Search />
      <p className="mt-14 font-bold text-2xl text-center">
        Top lyrics of the week
      </p>
      <Menu songs={songs.slice(0, 9)} />
    </>
  );
};

export async function getStaticProps() {
  const res = await axios.get("https://www.musixmatch.com/explore");
  const $ = cheerio.load(res.data);

  const data = $(
    "#content > div > div.explore-panel > div > div:nth-child(1) > ul"
  )
    .first()
    .children();

  const songs: ChartProps[] = [];

  data.map((_i, el) => {
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
      songs,
    },
    revalidate: 10,
  };
}

export default Home;
