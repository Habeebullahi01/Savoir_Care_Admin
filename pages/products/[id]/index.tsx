import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../components/AuthContext";
import axios from "axios";

let id: string | string[];

const Product = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      id = router.query.id;
    }
    // setAuth(true);
    // console.log(auth);
    const getProductDetails = async () => {
      await axios
        .get(`https://e-store-server.cyclic.app/products/${id}`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          setProductDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    };
    getProductDetails();
  }, [id, auth, router.query]);

  if (loading) {
    return (
      <>
        <p>Loading Product</p>
      </>
    );
  }
  if (!loading && productDetails) {
    return (
      <>
        {productDetails ? (
          <div
            className={`flex flex-col md:flex-row items-center justify-evenly my-4`}
          >
            <div
              className={`w-[80%] md:w-[40%] h-[30em] py-4 rounded-xl border border-pink-500 relative`}
            >
              <Image
                src={productDetails.imageURL}
                className={`w-full h-full object-contain`}
                alt={productDetails.name}
                fill
                // width={300}
                // height={300}
              />
            </div>
            {/* The image should be a slideshow */}
            <div className={`w-[90%] md:w-[40%]`}>
              <p className={`text-2xl font-semibold my-4`}>
                {productDetails.name ? productDetails.name : "Product Name"}
              </p>
              <p className={`my-2`}>
                {productDetails.description
                  ? productDetails.description
                  : `This is the description of the product. It may be long, as I expect
              it to give detailed information about he product like the size and
              variant. Apparently, this is where the product is 'sold' to the
              visitor. It should be in markdown format to allow more flexibilty on
              the administrators' side.`}
              </p>
              <p className={`font-mono m-4`}>
                {productDetails.price ? `#${productDetails.price}` : "#9,999"}
                {productDetails.quantity > 0 ? (
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
              as={`/products/${productDetails._id}/editProduct`}
            >
              <button>Edit this product</button>
            </Link>
          </div>
        ) : (
          <p>No data</p>
        )}
      </>
    );
  } else if (!loading && !productDetails) {
    return (
      <>
        <p>Unable to display data.</p>
      </>
    );
  }
};

export default Product;
