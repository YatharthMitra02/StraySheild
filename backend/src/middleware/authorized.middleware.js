import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Middleware to check whether a user is logged in
const auth = async (req, res, next) => {
    try {
        // get token from cookie or Authorization header
        const token = req.cookies?.accessToken 
            || req.headers["authorization"]?.replace("Bearer ", "");

        // Bug 3 fixed: added return to stop execution
        if (!token) {
            return res.status(401).json({
                message: "You are not logged in. Please login first."
            });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id)
            .select("-password -refreshToken");

        // Bug 3 fixed: added return to stop execution
        if (!user) {
            return res.status(401).json({ 
                message: "User no longer exists. Please login again." 
            });
        }

        req.user = user;
        next();

    } catch (error) {  // Bug 2 fixed: using 'error' consistently everywhere
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please login again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please login again." });
        }
        return res.status(500).json({ message: "Authentication error: " + error.message });
    }
};

export default auth;