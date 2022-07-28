import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import helpers from "../data/helpers";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  // EDIT PRODUCT
  const [editmode, setEditMode] = useState(false);
  const [productname, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [productlink, setProductLink] = useState("");

  useEffect(() => {
    fetch(helpers.apiLink + `product/` + id)
      .then((response) => response.json())
      .then((productObj) => setProduct(productObj));
  }, [id]);

  useEffect(() => {
    if (product) {
      setProductName(product.ProductName);
      setCompany(product.Company);
      setPrice(product.Price);
      setProductLink(product.ProductLink);
    }
  }, [product]);

  const editProduct = () => {
    fetch(helpers.apiLink + `product/edit`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
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

  const deleteProduct = () => {
    fetch(helpers.apiLink + `product/delete/` + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        productname,
        company,
        price,
        productlink,
      }),
    })
      .then((res) => res.json())
      .then((deletedProduct) =>
        setProduct((prevProducts) => [...prevProducts, deletedProduct])
      );
  };

  if (product)
    return (
      <div>
        <h2 className="article_headline">{product.ProductName}</h2>
        <img
          className="detail_img"
          src={product.ProductLink}
          alt={product.ProductName}
        />
        <p className="article_prod">{product.Company}</p>
        <p className="article_price">{product.Price}</p>

        <div className="goback">
          <Link className="hover" to="/">
            Go Back
          </Link>
        </div>
        <button
          className="add_btn"
          onClick={() => setEditMode((prev) => !prev)}
        >
          Edit Product
        </button>
        {editmode && (
          <form>
            <h1 className="add_headline">Edit Product:</h1>

            <div className="add_product_div">
              <label htmlFor="productname">Productname</label>
              <input
                type="text"
                id="productname"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Productname here"
                required
              />

              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name here"
                required
              />

              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Starting with a $ sign"
                required
              />

              <label htmlFor="productlink">Link / URL to Product Image</label>
              <input
                type="text"
                id="productlink"
                value={productlink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="http://..."
                required
              />
            </div>
            <button className="add_btn" onClick={editProduct}>
              Submit Edit
            </button>
            <button className="add_btn" onClick={deleteProduct}>
              Delete Product
            </button>
          </form>
        )}
      </div>
    );
  else return <h1>Failed to Load or missing Product</h1>;
};

export default ProductDetail;
