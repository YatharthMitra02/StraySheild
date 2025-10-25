import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required:true

    },
        
    
    phoneNo:{
            type:Number,
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
    password:{
        type:String,
        required:true
    },
    refreshToken :{
        typr:String,
        required:true
    }

        
    
},{timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

       this.password = await bcrypt.hash(this.password,10);
        next();
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        password: this.password
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY

    })
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}


const User = mongoose.model("User", userSchema);
export default User;