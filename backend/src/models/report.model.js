import mongoose from ' mongoose'
const reportSchema = new mongoose.reportASchema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    file:{
        type :String,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},{timestamps:true})
const Report  = mongoose.model("Report", reportSchema);
export default Report ;