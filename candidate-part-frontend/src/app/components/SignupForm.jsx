'use client'
import { useForm } from "react-hook-form"
import { useState } from "react";
import {signupAction} from "@/app/components/action/signupAction";

function SignupForm() {
    const {handleSubmit,register ,reset ,formState: {errors},}= useForm();
    const[errorMessage,setErrorMessage]=useState(null);
    const onSubmit = async (data)=>{
        await signupAction(data);


        //console.log("Data : ",data);
    };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 rounded-lg min-h-[350px] p-10">
      <form action="" onSubmit={handleSubmit(onSubmit)} >
        <fieldset className="flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
                Username : 
            </label>
            <input type="text" placeholder="Enter Your UserName" {...register("username",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.username?.type=='required' && <p className="text-orange-600"> Username Required </p>
            }
        </fieldset>
        <fieldset className="flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white mt-5">
                Email : 
            </label>
            <input type="text" placeholder="Enter Your Mail" {...register("email",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.email?.type=='required' && <p className="text-orange-600"> Email Required </p>
            }
        </fieldset>
        <fieldset className="my-5 flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
                Password : 
            </label>
            <input type="password" placeholder="Enter Your Password" {...register("password",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.password?.type=='required' && <p className="text-orange-600"> Password Required </p>
            }
        </fieldset>
        <fieldset className="my-5 flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
                Confirm Password : 
            </label>
            <input type="password" placeholder="Confirm Your Password" {...register("password",{required:true})} className="p-1 ouyline-none border border-gray-100 rounded-lg"/>
            {
                errors.password?.type=='required' && <p className="text-orange-600"> Confirm Password Required </p>
            }
        </fieldset>
        <fieldset>
            <button type="submit" className="my-2 bg-blue-600 px-5 py-1 text-white rounded-lg ">
                SignUp
            </button>
        </fieldset>
        <fieldset>
          <div className="text-red-500 my-3 py-3 ">
          Are You registered! <a href="/login" className="text-green-500">Login...</a>
          </div> 
        </fieldset>
      </form>
      {
        errorMessage && <div className="bg-orange-600 p-1 rounded-lg my-3 mx-3 flex flex-row gap-3 justify-center items-center"><span><TiInfoOutline /></span><span>{errorMessage}</span></div>
      }
    </div>
  )
}

export default SignupForm;
