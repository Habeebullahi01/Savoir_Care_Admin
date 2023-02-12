import { NextPage } from "next";
import Head from "next/head";
import LoginComponent from "../../components/Login";
// import { useContext } from "react";
// import { AuthContext } from "../../components/AuthContext";
import { useRouter } from "next/router";
import { parseCookies } from "../../helpers";

const AddProduct: NextPage = (prop: { prop: { admin_auth: string } }) => {
  const router = useRouter();
  // const { auth } = useContext(AuthContext);
  let path: string;
  if (router.isReady) {
    path = router.asPath;
  }
  // if (!auth) {
  //   return <LoginComponent redPath={path} />;
  // }
  if (prop.prop.admin_auth === "null" || !prop.prop.admin_auth) {
    return <LoginComponent redPath={path} />;
  }
  return (
    <>
      <Head>
        <title>Admin E-store | Add Product</title>
        <meta />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Add Product</h1>
        <form
          method="post"
          // action="http://localhost:4000/products/addProduct"
          action="https://e-store-server.cyclic.app/products/addProduct"
          encType="application/x-www-form-urlencoded"
        >
          <label htmlFor="productName">Product Name</label>
          <input id="productName" name="productName" type={"text"} required />
          <label htmlFor="imageURL">Image URL</label>
          <input id="imageURL" name="imageURL" type={"url"} required />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required />
          <label htmlFor="tags">Tags</label>
          {/* <input id="tags" type="text" list="tagList" multiple /> */}
          <select id="tags" name="tags" multiple>
            <option value={"skincare"}>Skincare</option>
            <option value={"pedicure"}>Pedicure</option>
            <option value={"manicure"}>Manicure</option>
            <option value={"hair"}>Hair</option>
          </select>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required min={1} />
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" required min={1} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

AddProduct.getInitialProps = async (context) => {
  const data = parseCookies(context.req);

  if (context.res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      context.res
        .writeHead(301, {
          location: "/auth/login",
        })
        .end();
    }
  }
  return { prop: data };
};

export default AddProduct;
