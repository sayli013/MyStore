const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dbCon = require("./db");

const PORT = 5000;

app.post("/products", async (req, res) => {
  const db = await dbCon.getConnectionObj();
  const { image, title, category, price } = req.body;
  const query =
    "INSERT INTO products (image, title, category, price) VALUES (?, ?, ?, ?)";
  db.query(query, [image, title, category, price], (err, result) => {
    if (err) {
      console.error("Error in creating product:", err);
      return res.status(500).json({ error: "Error in creating product" });
    }
    res.status(201).json({ message: "Product added successfully" });
  });
  console.log(req.body.id);
});

app.get("/products", async (req, res) => {
  const db = await dbCon.getConnectionObj();
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.json(results); // Send the product list to frontend
  });
});

app.delete("/products/:id", async(req, res) => {
    const db = await dbCon.getConnectionObj();
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Error deleting product" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost: ${PORT}`);
});
