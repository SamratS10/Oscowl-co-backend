import mongoose from "mongoose";

const connectDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongodb database")
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDatabase