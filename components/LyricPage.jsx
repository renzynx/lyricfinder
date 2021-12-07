import Head from "next/head";
import Page404 from "../pages/404";
import { Navbar } from "./Navbar";

export const LyricPage = ({ data }) => {
  if (!data) return <Page404 />;

  const { title, lyrics, albumArt } = data;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="grid grid-flow-row pb-20">
        <h1 className="my-14 text-center text-yellow-300 text-xl">{title}</h1>
        <img className="mb-10 mx-auto w-52 h-52" src={albumArt} />
        <p className="text-center whitespace-pre-line">{lyrics}</p>
      </div>
    </>
  );
};
