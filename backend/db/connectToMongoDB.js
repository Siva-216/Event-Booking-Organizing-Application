import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_DB_Url);
        console.log("MongoDB connected successfully");
    }
    catch(e){
        console.error("Error connecting to MongoDB: ",e.message);
    }
};

export default connectToMongoDB;