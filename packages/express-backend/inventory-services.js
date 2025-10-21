import mongoose from "mongoose";
import inventoryModel from "./inventory"

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
    return inventoryModel.find({name:name});
}

function findStoreByLoc(location){
    return inventoryModel.find({location:location});
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