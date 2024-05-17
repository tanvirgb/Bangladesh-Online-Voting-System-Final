import mongoose from "mongoose";


export const DBConnect = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/productDB");
        console.log('Database Connected Success');

    }catch(error){
        console.log(error);
    }
}