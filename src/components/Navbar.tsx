import { Formik, FormikErrors } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import useTheme from "../lib/hooks/useTheme";
import { SearchValue } from "../lib/types";
import CustomForm from "./Form";

const Navbar = () => {
  const initialValue: SearchValue = { query: "" };
  const router = useRouter();
  const { setTheme } = useTheme();
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
  ];

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 bg-opacity-0">
      <div className="flex-1">
        <Link href="/" passHref>
          <p className="btn btn-ghost normal-case text-xl">lyricfinder.xyz</p>
        </Link>
      </div>
      <div className="dropdown dropdown-end mr-5">
        <div className="btn gap-2 normal-case btn-ghost" tabIndex={0}>
          <SelectThemeSVG />
          <span className="hidden md:inline">Change Theme</span>
          <ArrowDownSVG />
        </div>
        <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px h-96 w-52 overflow-y-auto shadow-2xl mt-16">
          <ul className="menu menu-compact p-4" tabIndex={0}>
            {themes.map((item, index) => (
              <li key={index}>
                <button onClick={() => setTheme(item)}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-none gap-2">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => router.push(`/results?q=${values.query}`)}
          validate={(value: SearchValue) => {
            let errors: FormikErrors<SearchValue> = {};
            if (!value.query) errors.query = "Required";
            return errors;
          }}
        >
          {({ errors, touched }) => (
            <CustomForm
              name="query"
              placeholder="Search"
              errors={errors}
              touched={touched}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

const SelectThemeSVG = () => (
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    ></path>
  </svg>
);

const ArrowDownSVG = () => (
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1792 1792"
    className="ml-1 inline-block h-4 w-4 fill-current"
  >
    <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"></path>
  </svg>
);

export default Navbar;
