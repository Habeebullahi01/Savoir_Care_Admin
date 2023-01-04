import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../components/AuthContext";
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
      <AuthContextProvider>
        <Nav view={view} />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;

// TODO: Check Auth status here and redirect to login page if none.
