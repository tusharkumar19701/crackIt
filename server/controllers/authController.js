const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
}

const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:'Missing fields required',
            });
        }

        // user exists or not
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(401).json({
                success: false,
                message:"User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            _id:user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"Invalid email or password",
            });
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match) {
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Logged in successfully",
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const getUserProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }

        return res.status(200).json({success:true,message:"User profile fetched successfully",user});

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

module.exports = {registerUser,loginUser,getUserProfile};