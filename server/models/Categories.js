import mongoose from "mongoose";

const categorysSchema = new mongoose.Schema({
    categoryName : String,
    
});

const  categorysModel = mongoose.model("categorysData", categorysSchema);
export default categorysModel;