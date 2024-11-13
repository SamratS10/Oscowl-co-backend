import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const authUser = async(req,res,next)=>{
    const authHeader = req.headers["authorization"]
    let token 
    if(authHeader!==undefined){
        token = authHeader.split(" ")[1]
    }
    if(token===undefined){
        return res.status(401).json({success:false,message:"Please Login in"})
    }else{
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(!decoded){
                return res.status(401).json({success:false,message:"Token is invalid or token expired"})
            }
            const {id} = decoded 
            req.user = await User.findById({_id:id}).select('-password')
            next()
        }
        catch(error){
            return res.status(401).json({success:false,message:"Token is invalid or token expired"})
        }
    }
}