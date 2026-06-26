import Ngo from "../models/ngoProfile.model.js";
import asynHandler from "../utils/asynHandler.js";


// Changes to be made here 
// 1. add asynhandler at the start of every function
// 2.validate using the array and soe field
// 3.check again the code
// 4.check for the fromtend login page to check which property to add in this




export const createNgo = asynHandler(async (req, res) => {
    const {
        organisationName,
        establishedIn,
        address,
        email,
        directorName,
        contactNo,
        serviceIn,
        membersCount,
        
    } = req.body;

    // Validation
    const required = [
        organisationName,
        establishedIn,
        address,
        email,
        directorName,
        contactNo,
        serviceIn,
        membersCount,]
        if(required.some(fields => !fields)){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingNgo = await Ngo.findOne({ user: req.user._id  });

    if (existingNgo) {
        return res.status(400).json({
            message: "NGO already exists with this email"
        });
    }

    const ngo = await Ngo.create({
        organisationName,
        establishedIn,
        address,
        email: email.toLowerCase(),
        directorName,
        contactNo,
        serviceIn,
        membersCount,
        user: req.user._id
    });
     if(!ngo){
        throw new Error("There is some problem while creating a NGO")
     }
    return res.status(201).json({
        message: "The NGO has successfully registered",
        ngo
    })
});

export const getAllNgos = asynHandler(async(req,res)=>{
    const ngos = await Ngo.find()// returns arrray of all the NGOS
    .select("organisationName establishedIn address email directorName contactNo serviceIn membersCount")
    .sort({createdAt:-1})// sort them in decreasing order(last-> first position)
    return res.status(200).json(ngos)
})