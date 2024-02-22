import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productName : String,
    productPrice: String,
    productCategory: String,
    productColors: String,
    productSizes: String,
    productQuantity : Number,
    image : String,
    
});

const  productsModel = mongoose.model("productsData", productsSchema);
export default productsModel;