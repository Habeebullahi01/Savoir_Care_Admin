import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/index.module.scss";
import LoginComponent from "../components/Login";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const Home: NextPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  if (!auth) {
    return <LoginComponent redPath={"/"} />;
  }

  return (
    <div className="">
      <Head>
        <title>Admin E-store</title>
        <meta />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold text-4xl">Admin Portal</h1>
      <div>
        <h3 className={`text-center text-2xl`}>What would you like to do?</h3>
        <ul className={`${style.actions_list}`}>
          <li className="p-2 rounded-xl bg-red-500">
            <Link href={`/products`}>
              <div>
                <p>View all products</p>
                <p>See all your products</p>
              </div>
            </Link>
          </li>
          <li className="p-2 rounded-xl bg-red-500">
            <Link href={`/products/addProduct`}>
              {/* <div> */}
              <p>Add a new product</p>
              {/* </div> */}
            </Link>
          </li>
          <li className="p-2 rounded-xl bg-red-500">
            <Link href={`/analysis`}>
              <div>
                <p>See an analysis of your store</p>
              </div>
            </Link>
          </li>
          <li></li>
        </ul>

        {/* Edit Product, View inventory, View orders,  */}
      </div>
    </div>
  );
};

export default Home;
