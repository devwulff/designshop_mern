import { useState } from "react";
import helpers from "../data/helpers";

const AddProduct = ({ setProduct }) => {
  const [productname, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [productlink, setProductLink] = useState("");

  const addProduct = () => {
    fetch(helpers.apiLink + `product/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productname,
        company,
        price,
        productlink,
      }),
    })
      .then((res) => res.json())
      .then((addedProduct) =>
        setProduct((prevProducts) => [...prevProducts, addedProduct])
      );
  };

  return (
    <form>
      <h1 className="add_headline">Add a new product to the Shop!</h1>

      <div className="add_product_div">
        <label htmlFor="productname">Productname</label>
        <input
          type="text"
          id="productname"
          value={productname}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Productname here"
        />

        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name here"
        />

        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Starting with a $ sign"
        />

        <label htmlFor="productlink">Link / URL to Product Image</label>
        <input
          type="text"
          id="productlink"
          value={productlink}
          onChange={(e) => setProductLink(e.target.value)}
          placeholder="http://..."
        />
      </div>
      <button className="add_btn" onClick={addProduct}>
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
