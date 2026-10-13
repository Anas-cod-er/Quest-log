import mongoose from "mongoose";

export async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect DataBase")
    }
    catch(error){
        console.error(error)
    }
}