const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

function getAllProducts() {
  return getDB().then((db) => db.collection("designshop").find().toArray());
}

function getWeeklyRecommendations() {
  return getDB().then((db) =>
    db
      .collection("designshop")
      .aggregate([{ $sample: { size: 11 } }])
      .toArray()
  );
}

function getProductById(id) {
  return getDB().then((db) =>
    db.collection("designshop").findOne({ _id: ObjectId(id) })
  );
}

function addProductToDB(product) {
  return getDB()
    .then((db) => db.collection("designshop").insertOne(product))
    .then((result) => ({ ...product, id: result.insertedId }));
}

function editProduct(productId, editedProduct) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) =>
        db.collection("designshop").findOneAndUpdate(
          { _id: ObjectId(productId) },
          {
            $set: {
              ProductName: editedProduct.productname,
              Company: editedProduct.company,
              Price: editedProduct.price,
              ProductLink: editedProduct.productlink,
            },
          },
          { returnDocument: "after" }
        )
      )
      .then((result) => {
        if (result.ok === 1) resolve(result.value);
        else reject({ msg: "Error updating Product." });
      })
      .catch((err) => reject(err));
  });
}

function removeProduct(productId) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) =>
        db
          .collection("designshop")
          .findOneAndDelete({ _id: ObjectId(productId) })
      )
      .then((result) => {
        if (result.ok === 1) resolve(result.value);
        else reject({ msg: "Error deleting Product." });
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  addProductToDB,
  removeProduct,
  editProduct,
  getWeeklyRecommendations,
};
