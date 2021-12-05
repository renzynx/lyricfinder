import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return <>{loading ? <Loading /> : <Component {...pageProps} />}</>;
}

export default MyApp;
