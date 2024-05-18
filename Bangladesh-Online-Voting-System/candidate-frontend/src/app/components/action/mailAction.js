"use server";
import { DBConnect } from "@/app/mongodb/DBConnection";
import User from "@/app/mongodb/model/user";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";


export async function mailAction({email}){
    await DBConnect();
    const result = await User.findOne({email:email});
    if(result){
        const token = nanoid(32);
        const nodemailer = require("nodemailer");
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
                
            },

          });

          const htmlBody = `Click here to <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;
          const info = await transport.sendMail({
            from: '"Fred Foo 👻" <alifalmehedihasan@gmail.com>', // sender address
            to: "alifalmehedihasan@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: htmlBody,
          });

        
        

          console.log("Message Sent : %s", info.messageId);

        //console.log("Token:",token);
        await User.findOneAndUpdate({email:email}, {verifytoken:token});
    }else{
        console.log("User Does Not Exist");
    }
}