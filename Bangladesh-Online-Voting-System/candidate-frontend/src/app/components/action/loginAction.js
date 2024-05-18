"use server";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData){
    console.log(formData);

    try{
        await signIn("credentials",{
            username:formData.username,
            password:formData.password,
            redirectTo: "/",
        });
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"}
                    default:
                        return {error:"An Unknown Error is Occured"}
            }
        }
        throw error; 
    }
} 