import axios from "axios";
import * as cheerio from "cheerio";
import { CORS_PROXY } from "./constants";
import { ChartProps } from "./types";

export const betterGetLyric = async (q: string) => {
  try {
    const res = await axios.get(`${CORS_PROXY}https://www.musixmatch.com${q}`);
    const $ = cheerio.load(res.data);
    const firstPart = $(
      "#site > div > div > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > p > span"
    ).text();
    const secondPart = $(
      "#site > div > div > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > div > p > span"
    ).text();
    const title = $(
      "#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1"
    )
      .text()
      .replace("Lyrics", "");
    const artist = $(
      "#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h2 > span > a"
    ).text();
    const cover = $(
      "#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img"
    ).attr("src");
    return {
      lyric: firstPart + "\n" + secondPart,
      title,
      artist,
      cover: `https:${cover}`,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLyric = async (q: string, artist?: string) => {
  try {
    const res = await axios.get(
      `${CORS_PROXY}https://search.azlyrics.com/search.php?q=${q
        .split(" ")
        .join("+")} ${artist ? artist.split(" ").join("+") : ""}`
    );
    const $ = cheerio.load(res.data);
    const url = $(
      "body > div.container.main-page > div > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td > a"
    ).attr("href");
    if (!url) return fallBack(q, artist);
    const lyricRes = await axios.get(url);
    const $lyric = cheerio.load(lyricRes.data);
    const lyric = $lyric(
      "body > div.container.main-page > div > div.col-xs-12.col-lg-8.text-center > div:nth-child(8)"
    ).text();
    return lyric ?? fallBack(q, artist);
  } catch (error: any) {
    console.log(error.message);
    return fallBack(q, artist);
  }
};

const fallBack = async (
  query: string,
  artist?: string
): Promise<string | null> => {
  try {
    const res = await axios.get(
      `${CORS_PROXY}https://www.musixmatch.com/search/${query} ${
        artist ? artist : ""
      }`
    );
    const $ = cheerio.load(res.data);
    const search = $("a.title").first().attr("href");
    if (!search) return null;
    const link = `${CORS_PROXY}https://www.musixmatch.com${search}`;
    const res2 = await axios.get(link);
    const $2 = cheerio.load(res2.data);
    const lyric = $2(".lyrics__content__ok").text();
    if (!lyric) return null;
    return lyric;
  } catch (error: any) {
    console.error(`[getLyrics] error: ${error.message}`);
    return null;
  }
};

export const betterEncodeURI = (q: string) =>
  encodeURI(
    q
      .toString()
      .toLowerCase()
      .replace(/\[(.*?)\]|\-|\&|\((.*?)\)/g, "")
      .trim()
  );

export const searchResult = async (q: string) => {
  const res = await axios.get(
    `${CORS_PROXY}https://www.musixmatch.com/search/${encodeURI(q as string)}`
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
      thumbnail: $img.attr("srcset")?.split(" ")[2].includes("https")
        ? $img.attr("srcset")?.split(" ")[2]
        : `https:${$img.attr("srcset")?.split(" ")[2]}`,
    });
  });

  return {
    best: {
      url: bestResultLink ?? null,
      title: bestResultTitle ?? null,
      artist: bestResultArtist ?? null,
      thumbnail: bestResultImg ?? null,
    },
    rest: songs ?? null,
  };
};
