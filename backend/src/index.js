const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const {
  getAllProducts,
  getProductById,
  addProductToDB,
  removeProduct,
  editProduct,
  getWeeklyRecommendations,
} = require("./../db_access/db-access");

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Logging Middleware
app.use((req, _, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (_, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("it works");
});

app.get("/products/all", (_, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  getAllProducts().then((products) => res.json(products));
});

app.get("/products/weekly", (_, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  getWeeklyRecommendations().then((products) => res.json(products));
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  res.set("Access-Control-Allow-Origin", "*");
  getProductById(productId).then((products) => res.json(products));
});

app.post("/product/add", (req, res) => {
  const newProduct = {
    ProductName: req.body.productname,
    Company: req.body.company,
    Price: req.body.price,
    ProductLink: req.body.productlink,
  };

  res.set("Access-Control-Allow-Origin", "*");
  addProductToDB(newProduct).then((addedProduct) => res.json(addedProduct));
});

app.put("/product/edit", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const productId = req.body.id;

  const editedProduct = {
    id: req.body.id,
    productname: req.body.productname,
    company: req.body.company,
    price: req.body.price,
    productlink: req.body.productlink,
  };

  editProduct(productId, editedProduct)
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update Product." });
    });
});

app.delete("/product/delete/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const productId = req.params.id;
  removeProduct(productId)
    .then((removedProduct) => res.json({ removedProduct }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to remove Product." });
    });
});

app.listen(PORT, () => console.log("Server Listening on Port:", PORT));
