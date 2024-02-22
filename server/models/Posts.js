import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    heading : String,
    auther: String,
    content: String,
    image: String,    
});

const  postsModel = mongoose.model("postData", postsSchema);
export default postsModel;