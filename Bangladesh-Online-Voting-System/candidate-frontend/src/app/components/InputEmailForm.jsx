"use client";
import { useState } from "react";
import {mailAction} from "./action/mailAction"

function InputEmailForm() {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await mailAction({email});
    };
  return (
    <div  className='max-w-sm mx-auto bg-sky-800 rounded-lg p-10 justify-center mt-40 '>
      <h1 className="text-white text-center text-bold text-2xl py-4">
        Input Email to Reset 
      </h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-3 w-full">
            <label className="text-white">Email Id : </label>
            <input 
            type="text"
            onChange={(e)=> setEmail(e.target.value)}
            className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
        </fieldset>
        <fieldset>
            <button type="submit" className="bg-green-600 px-5 py-1 text-white rounded-lg mt-5 ">
                Send
            </button>
        </fieldset>
      </form>
    </div>
  )
}

export default InputEmailForm
