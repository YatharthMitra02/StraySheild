import Ngo from "../models/ngo.model.js";
import Ngo from "../models/ngo.model.js";


// Changes to be made here 
// 1. add asynhandler at the start of every function
// 2.validate using the array and soe field
// 3.check again the code
// 4.check for the fromtend login page to check which property to add in this 


export const registerNgo = async (req, res) => {
    const {
        organisationName,
        establishedIn,
        password,
        address,
        email,
        directorName,
        contactNo,
        serviceIn,
        membersCount
    } = req.body;

    // ✅ Validation
    if (
        !organisationName ||
        !establishedIn ||
        !password ||
        !address ||
        !email ||
        !directorName ||
        !contactNo ||
        !serviceIn ||
        !membersCount
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingNgo = await Ngo.findOne({ email: email.toLowerCase() });

    if (existingNgo) {
        return res.status(400).json({
            message: "NGO already exists with this email"
        });
    }

    const ngo = await Ngo.create({
        organisationName,
        establishedIn,
        password,
        address,
        email: email.toLowerCase(),
        directorName,
        contactNo,
        serviceIn,
        membersCount
    });

    const accessToken = ngo.createAccessToken();

    const ngoData = ngo.toObject();
    delete ngoData.password;

    return res.status(201)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        .json({
            message: "NGO registered successfully",
            ngo: ngoData
        });
};

export const loginNgo = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const ngo = await Ngo.findOne({ email: email.toLowerCase() });

    if (!ngo) {
        return res.status(404).json({
            message: "NGO not found"
        });
    }

    const isValid = await ngo.isPasswordValid(password);

    if (!isValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const accessToken = ngo.createAccessToken();

    const ngoData = ngo.toObject();
    delete ngoData.password;

    return res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        .json({
            message: "Login successful",
            ngo: ngoData
        });
};


export const logoutNgo = async (req, res) => {
    return res.status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        .json({
            message: "NGO logged out successfully"
        });
};




export{
    registerNgo,
    loginNgo,
    logoutNgo
    
}