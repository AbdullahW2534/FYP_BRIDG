import mongoose from "mongoose";

const gigsSchema = new mongoose.Schema({
    title: String,
    description: String,
    keywords: String, 
    deliveryTime: String,    
    price: String,
    link: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    }
});

const gigsModel = mongoose.model("Gig", gigsSchema);
export default gigsModel;
