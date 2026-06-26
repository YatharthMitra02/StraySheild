import User from "../models/user.model.js";
import asynHandler from "../utils/asynHandler.js";

// cookie options in one place so we don't repeat in every function
const cookieOptions = {
    httpOnly: true,
    secure: false,        // change to true when deploying to production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000   // 1 day in milliseconds
};


export const userSignup = asynHandler(async (req, res) => {

    const { fullName, phoneNo, address, email, password, role } = req.body;

    // validate all fields are present
    if (!fullName || !phoneNo || !address || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // check if email already exists
    const userExisted = await User.findOne({ email: email.toLowerCase() });
    if (userExisted) {
        return res.status(400).json({ message: "This email is already registered. Please login." });
    }

    // create user — password is auto-hashed by pre('save') in user.model.js
    // Issue 4 fixed: use role from request body, not hardcoded "user"
    const user = await User.create({
        fullName,
        phoneNo,
        address,
        password,
        email: email.toLowerCase(),
        role: role === "NGO" ? "NGO" : "User"
    });

    // generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // verify user was actually created
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        return res.status(500).json({ message: "Something went wrong while creating account. Please try again." });
    }

    // set cookie and respond
    return res.status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            message: "Account created successfully.",
            user: {
                _id: createdUser._id,
                fullName: createdUser.fullName,
                email: createdUser.email,
                role: createdUser.role    // frontend needs this to redirect NGO to NgoForm
            }
        });
});


export const userLogin = asynHandler(async (req, res) => {

    const { email, password } = req.body;

    // validate
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.status(404).json({ message: "No account found with this email." });
    }

    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password." });
    }

    // generate fresh tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // update refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // get user without sensitive fields
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // set cookie and respond
    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            message: "Logged in successfully.",
            user: {
                _id: loggedInUser._id,
                fullName: loggedInUser.fullName,
                email: loggedInUser.email,
                role: loggedInUser.role
            }
        });
});



export const userLogOut = asynHandler(async (req, res) => {

   
    await User.findByIdAndUpdate(
        req.user._id,
        { refreshToken: "" },
        { new: true }
    );

    // clear cookie from browser
    return res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .json({ message: "Logged out successfully." });
});


export const getMe = asynHandler(async (req, res) => {// when the app request browser send s request to this automatically to update the redux status in frontend
    return res.status(200).json({
        user: req.user    // req.user set by auth middleware
    });
});