import { useState } from "react";

export const Navbar = () => {
  const [value, setValue] = useState("");
  const [translate, setTranslate] = useState("100%");
  const [mb, setMB] = useState("-10rem");

  const onDisplay = () => {
    translate === "0%" ? setMB("-10rem") : setMB("0px");
    translate === "0%" ? setTranslate("100%") : setTranslate("0%");
  };

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <div className="navbar rounded-box mb-2 text-neutral-content bg-gray-800 shadow-lg">
        <div className="navbar-start mx-2 px-2">
          <span
            className="text-lg font-bold cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            lyricfinder
          </span>
          <div className="flex-1 mx-2 px-2">
            <div className="hidden items-stretch md:flex lg:flex">
              <a
                className="btn btn-ghost btn-sm rounded-btn"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="form-control relative hidden w-3/4 sm:hidden md:flex lg:flex">
            <input
              type="text"
              placeholder="Type a song name here..."
              className="input input-bordered pr-16 w-full"
              onChange={onChange}
              value={value}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  if (!value.length) return null;
                  return (window.location.href = `/results/${value}`);
                }
              }}
            />
            <button
              className="btn btn-ghost absolute right-0 top-0 rounded-l-none"
              onClick={() => {
                if (!value.length) return null;
                window.location.href = `/results/${value}`;
              }}
            >
              Search
            </button>
          </div>

          <button
            className="btn btn-square btn-ghost md:hidden lg:hidden xl:hidden"
            onClick={onDisplay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className="navbar rounded-box relative flex flex-col gap-3 bg-gray-800 duration-300 delay-500 ease-in-out md:hidden lg:hidden"
        style={{
          marginBottom: mb,
          transform: `translateX(${translate})`,
          transitionDelay: "0.3s",
        }}
      >
        <button
          className="btn btn-ghost w-full"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </button>
        <div className="form-control md: relative flex w-full sm:flex lg:hidden xl:hidden">
          <input
            type="text"
            placeholder="Type a song name here..."
            className="input input-bordered pr-16 w-full"
            onChange={onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                if (!value.length) return null;
                return (window.location.href = `/results/${value}`);
              }
            }}
          />
          <button
            className="btn btn-ghost absolute right-0 top-0 rounded-l-none"
            onClick={() => {
              if (!value.length) return null;
              window.location.href = `/results/${value}`;
            }}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};
