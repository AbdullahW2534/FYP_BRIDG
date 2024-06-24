import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    role: String,
    phoneNo: String,
    image: String,
});

const  userModel = mongoose.model("UserData", userSchema);
export default userModel;