import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    title : String,
    price : String,
    deliveryTime: String,
    gigUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    },
    taskHead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    },
    taskDescription: String,    
    orderStatus: {
        type : String,
        default: "placed"
    },
    paymentReference : String,
    message : String,
    redirecturl: String,
    status : String,
    trans : String,
    transaction: String,
    trxref : String,
  
});

const  ordersModel = mongoose.model("orderData", ordersSchema);
export default ordersModel;