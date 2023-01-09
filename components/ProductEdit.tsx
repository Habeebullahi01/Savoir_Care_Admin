type productData = {
  name: string;
  imageURL: string;
  quantity: number;
  price: number;
  tags: string | string[];
  description: string;
  _id: string;
};

const ProductEdit = ({
  name,
  price,
  quantity,
  tags,
  imageURL,
  description,
  _id,
}: productData) => {
  return (
    <div>
      <form
        method="post"
        action={
          `https://e-store-server.cyclic.app/products/updateProduct/` + _id
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
          defaultValue={name}
        />
        <label htmlFor="imageURL">Image URL</label>
        <input
          id="imageURL"
          name="imageURL"
          type={"url"}
          required
          defaultValue={imageURL}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={description}
        />
        <label htmlFor="tags">Tags</label>
        {/* <input id="tags" type="text" list="tagList" multiple /> */}
        <select id="tags" name="tags" defaultValue={tags} multiple>
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
          defaultValue={price}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          required
          min={1}
          defaultValue={quantity}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default ProductEdit;
