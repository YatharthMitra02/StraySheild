import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import User from "./user.model.js";
const ngoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required:true
    },
    organisationName:{
        type: String,
        required:true,
        unique:true
    },
    establishedIn:{
        type:String,
        required:true
    },
    password:{
        type: String,
        // required : [true, "Password is required"],
        minlength :6

    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique :true,
         lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    directorName:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    serviceIn:{
        type:String,
        required:true
   },
   membersCount:{
    type:Number,
    required:true
   }
},{timestamps:true})

ngoSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password =  await bcrypt.hash(this.password,10);
    return next();
})

ngoSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password , this.password)

}
ngoSchema.methods.createAccessToken = function(){
    return JWT.sign(
        {
            _id: this._id,
            email: this.email,
            organisationName: this.organisationName
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 


const Ngo = mongoose.model("Ngo", ngoSchema);


export default Ngo;