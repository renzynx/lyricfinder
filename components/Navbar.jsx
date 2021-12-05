import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export const Navbar = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stop, setStop] = useState("");
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-gray-200 transition ease transform duration-300`;

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  if (isDesktopOrLaptop)
    return (
      <>
        <div className="flex items-center w-full h-16 text-white bg-gray-800">
          <Link href="/" passHref={true}>
            <div className="container px-2 cursor-pointer sm:px-6 lg:px-8">
              <h1 className="text-bold text-lg">lyricfinder</h1>
            </div>
          </Link>
          <div className="grid grid-flow-col">
            <button
              className="mr-1 px-6 py-2.5 text-white text-xs font-medium leading-tight bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800 rounded focus:outline-none hover:shadow-lg focus:shadow-lg active:shadow-lg shadow-md uppercase transition ease-in-out focus:ring-0"
              onClick={() => {
                if (!value.length) return null;
                window.location.href = `/results/${value}`;
              }}
              type="button"
            >
              Search
            </button>
            <input
              className="placeholder-gray-400 relative px-3 py-2 w-96 text-black text-sm bg-white border-gray-400 rounded outline-none focus:outline-none focus:ring md:mr-6 lg:mr-8"
              type="text"
              placeholder="Type a song name here..."
              onChange={onChange}
              value={value}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  if (!value.length) return null;
                  return (window.location.href = `/results/${value}`);
                }
              }}
            />
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="flex items-center w-full h-16 text-white bg-gray-800">
          <Link href="/" passHref={true}>
            <div className="container px-2 cursor-pointer sm:px-6 lg:px-8">
              <h1 className="text-bold text-lg">lyricfinder</h1>
            </div>
          </Link>
          <button
            className="group border-1 border-gray flex flex-col items-center justify-center float-right w-14 h-12 sm:mr-4 md:mr-0 lg:mr-8"
            onClick={() => {
              setIsOpen(!isOpen);
              setTimeout(
                () => (isOpen ? setStop("") : setStop("bounce")),
                1500
              );
            }}
          >
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
          </button>
        </div>

        {
          //! Dropdown
        }

        <div
          className="container px-2 py-3 animate-bounce"
          style={{ display: isOpen ? "" : "none", animation: stop }}
        >
          <div className="grid grid-flow-col">
            <button
              className="mx-auto px-6 py-2.5 text-white text-xs font-medium leading-tight bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800 rounded focus:outline-none hover:shadow-lg focus:shadow-lg active:shadow-lg shadow-md uppercase transition ease-in-out focus:ring-0 sm:ml-5 md:ml-8"
              onClick={() => {
                if (!value.length) return null;
                window.location.href = `/results/${value}`;
              }}
              style={{ width: "28vw" }}
              type="button"
            >
              Search
            </button>
            <input
              className="placeholder-gray-400 relative mx-auto px-3 py-2 text-black text-sm bg-white border-gray-400 rounded outline-none focus:outline-none focus:ring md:mr-6 lg:mr-8"
              style={{ width: "60vw" }}
              type="text"
              placeholder="Type a song name here..."
              onChange={onChange}
              value={value}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  if (!value.length) return null;
                  return (window.location.href = `/results/${value}`);
                }
              }}
            />
          </div>
        </div>
      </>
    );
};
