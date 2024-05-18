"use server";
import {DBConnect} from "@/app/mongodb/DBConnection";
import User from "@/app/mongodb/model/user"
import bcrypt from "bcrypt";
import axios from "axios";

export async function signupAction(formData){
    await DBConnect();
    const {username,email,password}= formData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await User.create({username:username,email:email,password:hashedPassword});
    //console.log(formData);

    
} 

