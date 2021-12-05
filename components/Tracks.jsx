import Link from "next/link";

export const Tracks = ({ track_list, title }) => {
  return (
    <>
      <h1 className="mx-auto my-10 text-center text-2xl">{title}</h1>
      <div className="container mb-20 mx-auto w-4/5">
        <div className="grid gap-10 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {track_list.map((item, index) => {
            return (
              <div
                className="inline-block mx-auto px-3 py-5 w-full bg-gray-800"
                key={index}
              >
                <h1 className="mb-2 text-purple-600 text-lg font-bold">
                  {item.track.artist_name}
                </h1>
                <p className="text-green-400">
                  <strong>Track: </strong> {item.track.track_name}
                </p>
                <p className="text-green-400">
                  <strong>Album:</strong> {item.track.album_name}
                </p>
                <Link
                  href={`/lyric/${item.track.track_name}_${item.track.artist_name}`}
                  passHref={true}
                >
                  <button
                    className="mr-5 mt-5 px-6 py-2.5 w-full text-white text-xs font-medium leading-tight bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800 rounded focus:outline-none hover:shadow-lg focus:shadow-lg active:shadow-lg shadow-md uppercase transition ease-in-out focus:ring-0"
                    type="button"
                  >
                    View Lyric
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
