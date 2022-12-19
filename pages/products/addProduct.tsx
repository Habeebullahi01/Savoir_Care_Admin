import { NextPage } from "next";

const AddProduct: NextPage = () => {
  return (
    <div>
      <h1>Add Product</h1>
      <form
        method="post"
        action="http://localhost:4000/products/addProduct"
        // action="https://creepy-plum-elk.cyclic.app/products/addProduct"
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
  );
};

export default AddProduct;
