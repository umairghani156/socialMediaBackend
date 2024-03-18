import mongoose from "mongoose";
import dotenv from "dotenv";

export const dbCollection = async ()=>{
   try{
      const con = await mongoose.connect(process.env.MONGO_DB_URI);
      console.log(`Mongo Connected: ${con.connection.host}`);
   }
   catch(error){
    console.log("Error!", error);
   }
}