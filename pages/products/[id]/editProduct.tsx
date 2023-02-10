import { GetServerSideProps } from "next";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../components/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import LoginComponent from "../../../components/Login";
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

const EditProduct = (prop: { data: { auth: string } }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  let id: string | string[];
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
            Authorization: prop.data.auth,
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
    if (auth) {
      getProductDetails();
    } else {
      setLoading(false);
    }
  }, [id, auth, router.query]);
  const editProduct = (p: productData) => {
    return <ProductEdit {...p} />;
  };

  // if (!auth) {
  //   return <LoginComponent redPath={path} />;
  // }
  if (prop.data.auth === "null" || !prop.data.auth) {
    return <LoginComponent redPath={path} />;
  } else {
    setAuth(true);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!loading && productDetails) {
    return (
      <div>
        <form
          method="post"
          action={`https://e-store-server.cyclic.app/products/updateProduct/${productDetails._id}`}
          // action={`http://localhost:4000/products/updateProduct/${productDetails._id}`}
          encType="application/x-www-form-urlencoded"
        >
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            name="productName"
            type={"text"}
            required
            defaultValue={productDetails.name}
          />
          <label htmlFor="imageURL">Image URL</label>
          <input
            id="imageURL"
            name="imageURL"
            type={"url"}
            required
            defaultValue={productDetails.imageURL}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={productDetails.description}
          />
          <label htmlFor="tags">Tags</label>
          {/* <input id="tags" type="text" list="tagList" multiple /> */}
          <select
            id="tags"
            name="tags"
            defaultValue={productDetails.tags}
            multiple
          >
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
            defaultValue={productDetails.price}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={1}
            defaultValue={productDetails.quantity}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return <p>Can't get product</p>;
  }
};

EditProduct.getInitialProps = async (context) => {
  const data = parseCookies(context.req);

  if (context.res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      context.res
        .writeHead(301, {
          location: "/",
        })
        .end();
    }
  }
  return { data: data && data };
};

// export function getStaticProps() {

// }

export default EditProduct;
