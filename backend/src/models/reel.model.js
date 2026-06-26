import mongoose from "mongoose"


const reelSchema = new mongoose.Schema({
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    reelsURL:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required : true
    }
},{timestamps : true})
const Reel = mongoose.model("Reel", reelSchema);
export default Reel;