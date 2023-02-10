import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../components/AuthContext";
import axios from "axios";
import Login from "../../../components/Login";
import ProductEdit from "../../../components/ProductEdit";
import { parseCookies } from "../../../helpers";

type productData = {
  name: string;
  imageURL: string;
  quantity: number;
  price: number;
  tags: string | string[];
  description: string;
  _id: string;
};

let id: string | string[];
const editProduct = (p: productData) => {
  return (
    <div>
      <form
        method="post"
        action={
          `https://e-store-server.cyclic.app/products/updateProduct/` + p._id
        }
        // action={`http://localhost:4000/products/updateProduct/${productDetails._id}`}
        encType="application/x-www-form-urlencoded"
      >
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          name="productName"
          type={"text"}
          required
          defaultValue={p.name}
        />
        <label htmlFor="imageURL">Image URL</label>
        <input
          id="imageURL"
          name="imageURL"
          type={"url"}
          required
          defaultValue={p.imageURL}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={p.description}
        />
        <label htmlFor="tags">Tags</label>
        {/* <input id="tags" type="text" list="tagList" multiple /> */}
        <select id="tags" name="tags" defaultValue={p.tags} multiple>
          <option value={"skincare"}>Skincare</option>
          <option value={"pedicure"}>Pedicure</option>
          <option value={"manicure"}>Manicure</option>
          <option value={"hair"}>Hair</option>
        </select>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          min={1}
          defaultValue={p.price}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          required
          min={1}
          defaultValue={p.quantity}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Product = (data: { data: { auth: string } }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  let path: string;
  if (router.isReady) {
    path = router.asPath;
  }

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
            Authorization: data.data.auth,
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
          setLoading(false);
          return;
        });
    };
    // if (auth) {
    getProductDetails();
    // } else {
    // return (<Link href={`/auth/login`}></Link>)
    // }
  }, [id, auth, router.query]);

  // if (!auth) {
  //   // return <Link href={`/auth/login`}>Login Please</Link>;
  //   return (
  //     <>
  //       <Login redPath={path} />
  //     </>
  //   );
  // }
  if (data.data.auth === "null" || !data.data.auth) {
    return <Login redPath={"/"} />;
    // console.log(typeof data.data.auth);
  }
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
              <button
              // onClick={() => {
              //   return editProduct(productDetails);
              // }}
              >
                Edit this product
              </button>
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
Product.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res
        .writeHead(301, {
          location: "/",
        })
        .end();
    }
  }
  return {
    data: data && data,
  };
};

export default Product;

// const editProduct = ({data}) => {
//   return (
//     <div>
//       <form
//         method="post"
//         action={`https://creepy-plum-elk.cyclic.app/products/updateProduct/${data._id}`}
//         // action={`http://localhost:4000/products/updateProduct/${data._id}`}
//         encType="application/x-www-form-urlencoded"
//       >
//         <label htmlFor="productName">Product Name</label>
//         <input
//           id="productName"
//           name="productName"
//           type={"text"}
//           required
//           defaultValue={data.name}
//         />
//         <label htmlFor="imageURL">Image URL</label>
//         <input
//           id="imageURL"
//           name="imageURL"
//           type={"url"}
//           required
//           defaultValue={data.imageURL}
//         />
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           required
//           defaultValue={data.description}
//         />
//         <label htmlFor="tags">Tags</label>
//         {/* <input id="tags" type="text" list="tagList" multiple /> */}
//         <select id="tags" name="tags" defaultValue={data.tags} multiple>
//           {/* {tagList.map((t) => {
//            if (data.tags.includes(t)) {
//               return (
//                 <option value={t} selected>
//                   {t}
//                 </option>
//               );
//             } else {
//               <option value={t}>{t}</option>;
//             }
//           })}  */}
//           <option value={"skincare"}>Skincare</option>
//           <option value={"pedicure"}>Pedicure</option>
//           <option value={"manicure"}>Manicure</option>
//           <option value={"hair"}>Hair</option>
//         </select>
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           required
//           min={1}
//           defaultValue={data.price}
//         />
//         <label htmlFor="quantity">Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           id="quantity"
//           required
//           min={1}
//           defaultValue={data.quantity}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
