// backend.js
import express from "express";
import cors from "cors";
import inventoryServices from "./inventory-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/stores", (req, res) => {
  const name = req.query.name;
  const city = req.query.city;
  
  const result = inventoryServices.getStores(name, city);
  result
    .then((result) => {
      res.send({store_list:result});  
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Can't Get Stores from Database");
    }); 

});

app.get("/stores/:id", (req, res) => {
  const id = req.params["id"]; 
  const result = inventoryServices.findUserById(id);  
  
  result
    .then((result) => {
      res.send({store_list: result})
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("Resource not found.");
    });
});

app.post("/stores", (req, res) => {
  const storeToAdd = req.body;
  const newStore = inventoryServices.addStore(storeToAdd);
  
  newStore
    .then((store) => {
      res.status(201).send(store);
    })
    .catch((error) => {
      res.status(500).send(error);
    });

});


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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
