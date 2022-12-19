import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const Product: NextPage = (props: {
  data: {
    name: string;
    description: string;
    imageURL: string;
    _id: string;
    dateAdded: string;
    price: number;
    quantity: number;
    tags: string[];
  };
}) => {
  // const route: NextRouter = useRouter();
  // const { id } = route.query;
  // console.log(route.query);
  // console.log(props);

  // pid = id;
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   console.log(id);

  //   if (id) {
  //     fetch(`http://localhost:4000/products/${id}`)
  //       // fetch(`https://creepy-plum-elk.cyclic.app/products/${id}`, {
  //       //   headers: {
  //       //     "Access-Control-Allow-Origin": "http://localhost:3000",
  //       //   },
  //       // })
  //       // axios
  //       // .get(`http://localhost:4000/products/${id}`)
  //       .then((res) => {
  //         res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);

  //         setData(data);
  //         setLoading(false);
  //         // console.log(data);
  //       })
  //       .catch((err) => {
  //         console.log(`Fetch Problem: ${err}`);
  //       });
  //   }
  //   setLoading(false);
  // }, []);

  // if (isLoading) {
  //   return <p>loading...</p>;
  // } else {
  //   // <h1>This is a product with id {data._id}</h1>;
  // }
  // console.log(props);
  const p = props.data;
  // console.log(p);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row items-center justify-evenly my-4`}
      >
        <div
          className={`w-[80%] md:w-[40%] h-[30em] py-4 rounded-xl border border-pink-500 relative`}
        >
          <Image
            src={p.imageURL}
            className={`w-full h-full object-contain`}
            alt={p.name}
            fill
            // width={300}
            // height={300}
          />
        </div>
        {/* The image should be a slideshow */}
        <div className={`w-[90%] md:w-[40%]`}>
          <p className={`text-2xl font-semibold my-4`}>
            {p.name ? p.name : "Product Name"}
          </p>
          <p className={`my-2`}>
            {p.description
              ? p.description
              : `This is the description of the product. It may be long, as I expect
            it to give detailed information about he product like the size and
            variant. Apparently, this is where the product is 'sold' to the
            visitor. It should be in markdown format to allow more flexibilty on
            the administrators' side.`}
          </p>
          <p className={`font-mono m-4`}>
            {p.price ? `#${p.price}` : "#9,999"}
            {p.quantity > 0 ? (
              <span
                className={`text-sm font-semibold bg-green-300 rounded px-2 m-4`}
              >
                Available
              </span>
            ) : (
              <span
                className={`text-sm font-semibold bg-red-500 rounded px-2 m-4`}
              >
                Out of Stock
              </span>
            )}
          </p>
          {/* <AddToCart /> */}
        </div>
        <Link
          href={"/products/[id]/editProduct"}
          as={`/products/${p._id}/editProduct`}
        >
          <button>Edit this product</button>
        </Link>
      </div>
    </>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const route = useRouter();
  // const { id } = route.query;
  const id = context.query.id;

  const res = await fetch(`https://creepy-plum-elk.cyclic.app/products/${id}`);
  // const res = await fetch(`http://localhost:4000/products/${id}`);
  const data = await res.json();

  return { props: { data } };
};
