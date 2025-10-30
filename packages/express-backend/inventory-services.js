import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import inventoryModel from "./inventory.js"
 
mongoose.set("debug", true);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));

function getStores(name, location){
    let promise;
    if(name === undefined && location === undefined){
        promise = inventoryModel.find();
    }
    else if (name && !location){
        promise = findStoreByName(name);
    }
    else if (!name && location){
        promise = findStoreByLoc(location);
    }
    else if (name && location){
        promise = inventoryModel.find({name:name, location:location});
    }
    return promise;
}

function findStoreById(id){
    return inventoryModel.findById(id);
}

function findStoreByName(name){
    return inventoryModel.find({"store.name":name});
}

function findStoreByLoc(city){
    return inventoryModel.find({"store.location.city":city});
}

function addStore(store){
    const storeToAdd = new inventoryModel(store);
    const promise = storeToAdd.save();
    return promise;
}

function deleteStoreById(id){
    return inventoryModel.findByIdAndDelete(id);
}

export default{
    getStores,
    findStoreById,
    findStoreByLoc,
    findStoreByName,
    addStore,
    deleteStoreById
};
