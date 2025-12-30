import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({
    likedBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER"
        }
    ]
},{timestamps :true})
export const Likes = mongoose.model("LIKES",likeSchema);