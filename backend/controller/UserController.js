import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async(req,res)=>{
    try{
        const UserName = await req.params.userName;
        const Password = await req.params.Password ;

        const user = await User.findOne({ UserName });
        const PasswordMatch = await bcrypt.compare(Password , user?.Password || ""); 

        if(!PasswordMatch){
            return res.status(401).json({ error: 'Invalid UserName or Password' });
        }

        generateTokenAndSetCookie(user._id,res);
        console.log(`Welcome to ${user.UserName}`)
        res.status(200).json({user})
    }
    catch(error){
        console.error("Signup Controller error:", error);
        res.status(500).json({ error: error.message });
    }

}


export const signup = async (req, res) => {
    try {
        const { Name, UserName, Email, Password, Gender } = req.body;

        const existingUser = await User.findOne({ UserName });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ Email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const boyProfile = 'https://avatar.iran.liara.run/public/boy?username=Scott';
        const girlProfile = 'https://avatar.iran.liara.run/public/girl?username=Maria';

        // Hash the password here before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        // const hashedPassword = await hashPassword(Password); // You need to implement hashPassword

        const newUser = new User({
            Name,
            UserName,
            Email,
            Password:hashedPassword,
            Gender,
            ProfilePic: (Gender === 'Female') ? girlProfile : boyProfile  
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: 'User signed up successfully!', user: { Name, UserName, Email, Gender } });
        }
        else{
            console.error("User creation error:", newUser);
            return res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (error) {
        console.error("Signup Controller error:", error);
        res.status(500).json({ error: error.message });
    }
};


export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({ message: 'User logout in successfully!'});
    }
    catch(error){
        console.error("Logout Controller error:", error);
        res.status(500).json({ error: error.message });
    }
}

export const getAllUser = async(req,res) =>{
    
    try{
        const users = await User.find();
        res.status(200).json({users});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Get All User "+error.message);
    }
}

export const UpdateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.userId, req.body,{new:true});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Update User "+error.message);
    }
}
