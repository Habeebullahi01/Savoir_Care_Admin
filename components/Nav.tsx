import Link from "next/link";
import { useEffect, useState } from "react";
import style from "../styles/nav.module.scss";

const Nav = ({ view }) => {
  const MobileDisplay = () => {
    /* How to change css properties from within here. */
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = (val) => {
      setMenuOpen(val);
    };
    useEffect(() => {});

    return (
      <div className={`${style.navLinkContainer}`}>
        <button
          onClick={() => {
            toggleMenu(true);
          }}
        >
          MENU
        </button>

        {menuOpen ? (
          <>
            <ul className={[style.mobileMenu].join(" ")}>
              <button
                onClick={() => {
                  toggleMenu(false);
                }}
                className="text-2xl"
              >
                CLOSE
              </button>
              <li
                onClick={() => {
                  toggleMenu(false);
                }}
              >
                <Link href="/"> Home</Link>
              </li>
              <li
                onClick={() => {
                  toggleMenu(false);
                }}
              >
                <Link href={"/products"}> Inventory</Link>
              </li>
              <li
                onClick={() => {
                  toggleMenu(false);
                }}
              >
                <Link href={"/analysis"}> Analysis</Link>
              </li>
              <li
                onClick={() => {
                  toggleMenu(false);
                }}
              >
                <Link href={"#"}> Account</Link>
              </li>
            </ul>
          </>
        ) : null}
      </div>
    );
  };

  const DesktopDisplay = () => {
    return (
      <ul className={`${style.desktopMenu} text-xl`}>
        <li>
          <Link href="/"> Home</Link>
        </li>
        <li>
          <Link href={"/products"}> Inventory</Link>
        </li>
        <li>
          <Link href={"/analysis"}> Analysis</Link>
        </li>
        <li>
          <Link href={"#"}> Account</Link>
        </li>
      </ul>
    );
  };
  // mobileView ? mobileDisplay : desktopDisplay;

  return (
    <div
      className={`${style.navBar} p-3 md:p-5 md:px-[5rem] w-full  m-auto mt-2 backdrop-blur bg-white/30 rounded-lg z-10`}
    >
      {/* <div
        className={`background-blur ${style.backgroundBlur} blur bg-white`}
      ></div> */}
      <h2 className="text-xl">Savoir Care-Admin</h2>
      {view === "mobile" ? MobileDisplay() : DesktopDisplay()}
    </div>
  );
};

export default Nav;
