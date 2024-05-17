'use client'
import { useForm } from "react-hook-form"
import {loginAction} from "./action/loginAction";
import { useState } from "react";
import { TiInfoOutline } from "react-icons/ti";



function LoginForm() {
    const {handleSubmit,register ,reset ,formState: {errors},}= useForm();
    const[errorMessage,setErrorMessage]=useState(null);
    const onSubmit = async (data)=>{
        const res = await loginAction(data);
        setErrorMessage(res?.error);
    };
  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 rounded-lg min-h-[350px] p-10">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
                Username : 
            </label>
            <input type="text" placeholder="Enter UserName" {...register("username",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.username?.type=='required' && <p className="text-orange-600"> Username Required </p>
            }
        </fieldset>
        <fieldset className="my-5 flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
                Password : 
            </label>
            <input type="password" placeholder="Enter Password"{...register("password",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.password?.type=='required' && <p className="text-orange-600"> Password Required </p>
            }
            <div className="text-red-500 text-right text-xs">
          Forgot Password ! <a href="/reset" className="text-green-500">Click here...</a>
          </div> 
        </fieldset>
        <fieldset>
            <button type="submit" className="bg-blue-600 px-5 py-1 text-white rounded-lg ">
                Login
            </button>
        </fieldset>
        <fieldset>
          <div className="text-red-500 my-3 py-3 ">
          Not yet registered! <a href="/signup" className="text-green-500">SignUp...</a>
          </div> 
        </fieldset>
      </form>
      {
        errorMessage && <div className="bg-orange-600 p-1 rounded-lg my-3 mx-3 flex flex-row gap-3 justify-center items-center"><span><TiInfoOutline /></span><span>{errorMessage}</span></div>
      }
    </div>
  )
}

export default LoginForm
