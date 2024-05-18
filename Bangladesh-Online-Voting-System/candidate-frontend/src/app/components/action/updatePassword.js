"use server"
import bcrypt from "bcrypt";
import { DBConnect } from "@/app/mongodb/DBConnection";
import User from "@/app/mongodb/model/user";
import { redirect } from "next/navigation";

export async function updatePassword({newPassword , token}){
    console.log(token);
    await DBConnect();
    const salt = bcrypt.gensalt(20);
    const passwordHashed = await bcrypt.hash(newPassword,salt);
    await User.findOneAndUpdate({verifytoken:token},{password:passwordHashed});
    redirect("/login");
}