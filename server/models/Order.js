import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    productName : String,
    productPrice: String,
    customerName: String,
    quantity: Number,    
});

const  ordersModel = mongoose.model("orderData", ordersSchema);
export default ordersModel;