import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { IChartProps } from "../lib/types";

const Menu: FC<IChartProps> = ({ songs, start }) => {
  const router = useRouter();

  return (
    <div className="max-w-[90%] mx-auto grid lg:grid-cols-3 md:grid-cols-2 place-items-center sm:grid-cols-1 grid-cols-1 my-20 gap-5">
      {songs.map((song, i) => (
        <div
          key={i}
          className="card card-compact w-96 bg-primary text-primary-content"
        >
          <figure>
            <Image
              src={song.thumbnail as string}
              width="400px"
              height="225px"
              alt="album thumbnail"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-lg">
              {song.title}
              <div className="badge badge-secondary">
                {start ? start + i + 1 : i + 1}
              </div>
            </h2>
            <p>{song.artist}</p>
            <div className="card-actions justify-end">
              <button
                className="btn"
                onClick={() => router.push(`/lyric?q=${song.url}`)}
              >
                View Lyric
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
