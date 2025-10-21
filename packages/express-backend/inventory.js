import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        store: {
            name: String,
            location: [LocatationSchema],
            required: true,
            trim: true,
        },

    },
  { collection: "store_list" }
);

const LocatationSchema = new mongoose.Schema(
    {
        location: {
            address: String,
            product: [ProductSchema],
            required: true,
        }
    }
);

const ProductSchema = new mongoose.Schema(
    {
        product: {
            name: String,
            quantity: {
                type: Number,
                min: 0
            },
            price: {
                type: Number,
                min: 0
            },
        }
    }
);

const Inventory = mongoose.model("Inventory", StoreSchema);

export default Inventory;