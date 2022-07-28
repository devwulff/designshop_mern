import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import helpers from "../data/helpers";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(helpers.apiLink + `products/all`)
      .then((response) => response.json())
      .then((productsArray) => {
        setProducts(productsArray);
      });
  }, []);

  return (
    <div className="prod_section_grid">
      {products.map((product, i) => (
        <div className={i % 7 === 0 ? "bigImage" : "smallImage"} key={i}>
          <Link to={`/products/all/${product._id}`}>
            <img src={product.ProductLink} alt={product.ProductName} />
          </Link>
          <div>
            <div>
              <p className="article_headline">{product.ProductName}</p>
              <p className="article_prod">{product.Company}</p>
            </div>
            <p className="article_price">{product.Price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
