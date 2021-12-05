import Head from "next/head";
import { Navbar } from "./Navbar";

export const LyricPage = ({ data }) => {
  if (!data) window.location.href = "/";

  const { title, lyrics, albumArt } = data;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="grid grid-flow-row pb-20">
        <h1 className="my-14 text-center text-yellow-300 text-xl">{title}</h1>
        <img className="mb-10 mx-auto w-64 h-64" src={albumArt} />
        <p className="text-center whitespace-pre-line">{lyrics}</p>
      </div>
    </>
  );
};
