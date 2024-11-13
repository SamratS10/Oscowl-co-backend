import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        //console.log(req.body)
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check if username already exists
        const findUserbyName = await User.findOne({ userName:name });
        if (findUserbyName) {
            return res.status(400).json({ message: "Username already in use", success: false });
        }

        // Check if email already exists
        const findUserbyEmail = await User.findOne({ email });
        if (findUserbyEmail) {
            return res.status(400).json({ message: "Email already exists, please login", success: false });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ userName:name, email, password: hashPassword });

        return res.status(200).json({ message: "Registered Successfully", success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const login=async(req,res)=>{
    try{
        const {email,password} = req.body 
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const findUserbyEmail = await User.findOne({ email });
        if (!findUserbyEmail) {
            return res.status(400).json({ message: "Email not registered, please register", success: false });
        }
        const comparePassword = await bcrypt.compare(password,findUserbyEmail.password)
        if(!comparePassword){
            return res.status(400).json({ message: "Invalid Credientials", success: false });
        }
        const token = jwt.sign({id:findUserbyEmail._id},process.env.JWT_SECRET,{expiresIn:"60m"})
        return res.status(201).json({message:"Logged in Successfully",success:true,token:token,user:{
            name:findUserbyEmail.userName,
            email:findUserbyEmail.email,
            role:findUserbyEmail.role
        }})
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({ message: error.message, success: false });
    }
}
