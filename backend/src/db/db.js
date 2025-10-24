import mongoose from "mongoose";

const connectDB = async()=>{
    try{
      const mongodbInstance =   await mongoose.connect(process.env.MONGODB_URI)
        console.log("databse connected sucessfully at port 3000");
        console.log(` mongo DB is connected !! mongodb connected to ${mongodbInstance.connection.host}`);
    }
    catch(err){
        console.log("databse fail to connect ", err)
        process.exit(1);
    }
}

export default connectDB;