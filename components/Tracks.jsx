import Link from "next/link";

export const Tracks = ({ track_list, title }) => {
  return (
    <>
      <h1 className="mt-10 mx-auto text-center text-2xl">{title}</h1>
      <div className="container mx-auto pb-20 w-4/5">
        <div className="grid gap-10 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {track_list.map((item, index) => {
            return (
              <Link
                href={`/lyric/${item.track.track_name}_${item.track.artist_name}`}
                passHref={true}
                key={index}
              >
                <div className="md:scale-none lg:hover:scale-105 mx-auto px-3 py-5 w-full bg-gray-800 rounded-lg cursor-pointer duration-300 ease-in-out sm:transform-none">
                  <div style={{ marginLeft: "20px" }}>
                    <h1 className="md:text-md mb-4 text-gray-300 font-bold sm:text-sm lg:text-xl">
                      {item.track.artist_name}
                    </h1>
                    <p className="lg:text-md mb-2 text-gray-300 sm:text-xs md:text-sm">
                      <strong>Track: </strong> {item.track.track_name}
                    </p>
                    <p className="lg:text-md mb-1 text-gray-300 sm:text-xs md:text-sm">
                      <strong>Album:</strong> {item.track.album_name}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
