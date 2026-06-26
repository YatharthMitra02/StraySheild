import Reel from "../models/reel.model.js";
import asynHandler from "../utils/asynHandler.js";

export const getAllReels = asynHandler(async(req ,res)=>{
    const reels = await Reel.find()
    .populate("uploadedBy", "fullName")
    .sort({createdAt : -1})
    return res.status(200).json(reels);
});


export const UploadReel = asynHandler(async(req, res)=>{
    const {reelURL, reelCaption} = req.body
    if(reelUrl || reelCaption){
        returnres.status(400).json(message :"URL and caption is required");
    }
    const reel = await Reel.create({
        uploadedBy: req.user._id,
        reelURL,
        reelCaption
    });
    const res.status(201).json({message: "Reel uploade sucessfully", reel});
});