import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [view, setView]: [string, Function] = useState("mobile");
  useEffect(() => {
    const changeView = () => {
      return window.innerWidth > 767 ? setView("desktop") : setView("mobile");
    };
    changeView();

    window.addEventListener("resize", () => {
      changeView();
    });
  }, [view]);
  return (
    <>
      <Nav view={view} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
