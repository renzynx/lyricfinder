import axios from "axios";
import * as cheerio from "cheerio";

export const getLyric = async (q: string, artist?: string) => {
  try {
    const res = await axios.get(
      `https://cors.lyricfinder.workers.dev/?https://search.azlyrics.com/search.php?q=${q
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
      `https://cors.lyricfinder.workers.dev/?https://www.musixmatch.com/search/${query} ${
        artist ? artist : ""
      }`
    );
    const $ = cheerio.load(res.data);
    const search = $("a.title").first().attr("href");
    if (!search) return null;
    const link =
      "https://cors.lyricfinder.workers.dev/?https://www.musixmatch.com" +
      search;
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
