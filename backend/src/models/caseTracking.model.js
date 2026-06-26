import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    report:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"Report",
        required:true
    },
    claimedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    status:{
        type:String,
        enum: ['PENDING','ACCEPTED','IN_PROGRESS', 'RESCUED'],
        required:true
    }
    
},{timestamps:true})
const CaseTracking = mongoose.model("CaseTracking", caseSchema);
export default caseTracking;