import mongoose from "mongoose"
impot

const reelSchema = new mongoose.Schema({
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    reelsURL:{
        typer: String,
        required: true
    },
    caption:{
        type: String,
        required : true
    }
},{timestamps : true})