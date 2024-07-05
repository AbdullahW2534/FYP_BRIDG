import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    serviceName : String,
    serviceDescription: String,
    serviceCategory: String,
    image : String,
    
});

const  servicesModel = mongoose.model("servicesData", servicesSchema);
export default servicesModel;