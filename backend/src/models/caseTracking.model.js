import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    status:{
        type:String,
        enum: ['PENDING','ACCEPTED','PROGRESS', 'RESCUED'],
        required:true
    }
    
},{timestamps:true})