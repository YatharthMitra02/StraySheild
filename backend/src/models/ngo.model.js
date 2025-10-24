import mongoose from "mongoose";
const ngoSchema = new mongoose.Schema({
    organisationName:{
        type: String,
        required:true
    },
    establishedIn:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    }
},{timestamps:true})
const Ngo = mongoose.model("Ngo", ngoSchema);
export default Ngo;