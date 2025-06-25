const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/profile",protect,getUserProfile);

authRouter.post("/upload-image",upload.single("profilePic"),(req,res) => {
    if(!req.file) {
        return res.status(400).json({success:false,message:"No file uploaded"});
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    return res.status(200).json({success:true,message:"Image uploaded successfully",imageUrl});
})

module.exports = {authRouter};