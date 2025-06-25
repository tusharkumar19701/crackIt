const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async(req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } else {
            return res.status(401).json({
                success:false,
                message:"Not authorized for this action",
            });
        }
    } catch(error) {
        return res.status(500).json({
            succes:false,
            message:"Token failed",
            error:error.message,
        })
    }
}

module.exports = {protect};