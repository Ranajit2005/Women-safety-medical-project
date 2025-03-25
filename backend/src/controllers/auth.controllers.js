import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


const signup = async (req, res) => {
    const { fullName, email, password, age, profession, bio } = req.body;
    try {
        // if (!fullName || !email || !password) {
        //     return res.status(400).json({ message: "Please fill all the fields" });
        // }
        // if (password.length < 6) {
        //     return res.status(400).json({ message: "Password must be atleast 6 characters long" });
        // }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hassedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hassedPassword,
            age,
            profession,
            bio
        });

        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully",
                success: true,
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                createdAt: newUser.createdAt,
            });

        }
        else {
            return res.status(400).json({
                message: "Something went wrong",
                success: false
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong in signup",
            success: false
        });
    }
}


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        generateToken(user._id, res);
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in login",
            success: false
        });
    }
}


const updateProfle = async (req, res) => {
    try{
     const { userId, fullName, email, age, profession, bio } = req.body;
    await User.findByIdAndUpdate(
        userId,
        { $set: { fullName, email, age, profession, bio } },
    )
        
    
    }catch(error){

    }
}

const logout = async (req, res) => {
    const val1 = process.env.OPERATION === "production";
    const val2 = process.env.OPERATION === "production" ? "None" : "Lax";

    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.OPERATION === "production",
            sameSite: process.env.OPERATION === "production" ? "None" : "Lax",
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const checkAuth = (req, res) => {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}


export { signup, login, logout, checkAuth,updateProfle };
