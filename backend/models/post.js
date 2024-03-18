import mongoose from "mongoose";
const PostsSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    userEmail:{
       type: String,
       required: true,
    },
    desc:{
        type: String,
        max: 500,
    },
    img:{
        type: String,
    },
    likes:{
        type: Array,
        default: [],
    },

},
    { timestamps: true }
);

export default mongoose.model("Post", PostsSchema)