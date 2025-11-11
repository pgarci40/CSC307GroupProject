// backend.js
import inventoryServices from "./inventory-services.js";
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Entire store page including name and location
app.get("/inventory", (req, res) => {
  const name = req.query.name;
  const SKU = req.query.SKU;
  
  const result = inventoryServices.getInventory(SKU, name);
  result
    .then((result) => {
      res.send({store_list:result});  
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Can't Find Inventory from Database");
    }); 
});

// Strictly the products for a store
app.get("/inventory/products", async (req, res) => {
  try {
    const stores = await inventoryServices.getInventory(); // all stores
    const products = (stores || [])
      .flatMap(s => s.inventory || [])
      .map(p => ({
        name: p.name,
        SKU: p.SKU,
        total_quantity: Number(p.total_quantity),
        quantity_on_floor: Number(p.quantity_on_floor),
        quantity_in_back: Number(p.quantity_in_back),
        incoming_quantity: Number(p.incoming_quantity),
        product_photo: p.product_photo || "",
        price: Number(p.price),

      }));
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to load inventory products");
  }
});

app.post("/inventory", (req, res) => {
  const product = req.body;
  const newProduct = inventoryServices.addProduct(product);
  
  newProduct
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      res.status(500).send(error);
    });

});

/*
app.delete("/stores/:id", (req, res) => {
  const id = req.params["id"];
  
  const deleteStore = inventoryServices.deleteStoreById(id);
  
  deleteStore
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("ID not found");
    });

});
*/

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
