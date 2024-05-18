"use client";
import { useState } from "react";
import {updatePassword} from "@/app/components/action/updatePassword";

function ResetPasswordPage({params}) {
    const [newPassword,setNewPassword]= useState("");
    const [reenterPassword,setReenterPassword]= useState("");
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        await updatePassword({newPassword , token: params.token})
        console.log({newPassword,reenterPassword});
    }
  return (
    <div  className='max-w-sm mx-auto bg-sky-800 rounded-lg p-10 justify-center mt-40 '>
      <h1 className="text-white text-center text-bold text-2xl py-4">
        Reset Password
      </h1>
      <form onSubmit={handleFormSubmit}>
        <fieldset className="flex flex-col gap-3 w-full">
            <label className="text-white mt-10">New Password :  </label>
            <input 
            type="text"
            onChange={(e)=> setNewPassword(e.target.value)}
            className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
        </fieldset>
        <fieldset className="flex flex-col gap-3 w-full mt-5">
            <label className="text-white">Re-Enter New Password :  </label>
            <input 
            type="text"
            onChange={(e)=> setReenterPassword(e.target.value)}
            className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
        </fieldset>
        <fieldset>
            <button type="submit" className="bg-green-600 px-5 py-1 text-white rounded-lg mt-8 ">
                Submit
            </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
