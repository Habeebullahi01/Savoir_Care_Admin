import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const EditProduct = (props: {
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
  // const [pageData, setPageData] = useState({})
  // useEffect(() => {

  // })
  const data = props.data;
  const tagList = ["skincare", "manicure", "pedicure", "hair"];
  return (
    <div>
      <form
        method="post"
        action={`https://creepy-plum-elk.cyclic.app/products/updateProduct/${data._id}`}
        // action={`http://localhost:4000/products/updateProduct/${data._id}`}
        encType="application/x-www-form-urlencoded"
      >
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          name="productName"
          type={"text"}
          required
          defaultValue={data.name}
        />
        <label htmlFor="imageURL">Image URL</label>
        <input
          id="imageURL"
          name="imageURL"
          type={"url"}
          required
          defaultValue={data.imageURL}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={data.description}
        />
        <label htmlFor="tags">Tags</label>
        {/* <input id="tags" type="text" list="tagList" multiple /> */}
        <select id="tags" name="tags" defaultValue={data.tags} multiple>
          {/* {tagList.map((t) => {
           if (data.tags.includes(t)) {
              return (
                <option value={t} selected>
                  {t}
                </option>
              );
            } else {
              <option value={t}>{t}</option>;
            }
          })}  */}
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
          defaultValue={data.price}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          required
          min={1}
          defaultValue={data.quantity}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default EditProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const route = useRouter();
  // const { id } = route.query;
  const id = context.query.id;

  const res = await fetch(`https://creepy-plum-elk.cyclic.app/products/${id}`);
  // const res = await fetch(`http://localhost:4000/products/${id}`);
  const data = await res.json();

  return { props: { data } };
};
