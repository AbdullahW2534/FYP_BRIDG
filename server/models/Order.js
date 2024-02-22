import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    email : String,
    productName : String,
    productPrice: String,
    customerName: String,
    productColor: String,
    productSize: String,
    quantity: Number,    
    orderStatus: {
        type : String,
        default: "booked"
    },
});

const  ordersModel = mongoose.model("orderData", ordersSchema);
export default ordersModel;