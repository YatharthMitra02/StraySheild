import Report from "../models/report.model.js";
import asyncHandler from "../utils/asynHandler.js"
import geocodeAddress from "../utils/geocode.js";


export const createReport  = asyncHandler(async(req,res)=>{
    const {description, address,caseType, severity,contactNumber} = req.body;


    if(!description || !address || !caseType || !severity || !contactNumber){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const { lat , lng} = await geocodeAddress(address);


    const report  = await Report.create({
        user: req.user._id,
        description,
        address,
        caseType,
        severity,
        contactNumber,
        images:[],
        location: {
            type: "Point",
            coordinates : [lng , lat]
        }
    })
    return res.status(201).json({
        message: "Report submitted.Piin added to map automatically",
        report
    })
})

// Get all Report
//Get /api/reports
//Public - no login needed
// map pages call this to get all pins

export const getAllReports = asyncHandler( async(req,res)=>{
    const reports = await Report.find({
        status: {$ne : "resolved"} // if report is not resolved status then retrive it form the database
     })
     .select("address location severity status caseType createdAt")
     .sort({createdAt : -1}) // newest report first 

     return res.status(200).json(reports);

})

export const getMyReports = asyncHandler(async(req,res) =>{
    const reports = await Report.find({user : req.user._id})
    .sort({createdAt : -1})
    return res.status(200).json(reports);
})
