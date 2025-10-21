/*
Easy Copy and Paste for inserting into the database (at least when inserting from the terminal and running mongosh)
db.store_list.insertOne({
  store: {
    name: "<name>",
    location: {
      city: "<city>",
      state: "<state>"
    },
    inventory: [
      { name: "<name>", quantity: <num>, price: <num> },
      { name: "<name>", quantity: <num>, price: <num> }
    ]
  }
});

*/
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, min: 0, default: 0 },
        price: { type: Number, min: 0, default: 0 },
    }
);

const LocatationSchema = new mongoose.Schema(
    {
        street: String,
        city: String,
        state: String,
        zip: String,
    }
);

const StoreSchema = new mongoose.Schema(
    {
        store: {
            name: { type: String, required: true, trim: true },
            location: [LocatationSchema],
            inventory: {type: [ProductSchema], default: []},
        },

    },
  { collection: "store_list" }
);

const Inventory = mongoose.model("Inventory", StoreSchema);

export default Inventory;
