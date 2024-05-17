import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DBConnect } from "./mongodb/DBConnection";
import User from "./mongodb/model/user";
import bcrypt from "bcrypt";
//import GoogleProvider from "next-auth/providers/google";


export const{auth,signIn,handlers:{GET,POST},signOut }=NextAuth({
    providers:[
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        //   }),
         
        Credentials({
            name:"credentials",
            async authorize(credential){
                await DBConnect();
                const user = await User.findOne({
                    username:credential?.username,
                    
                });
                if(user){
                    const matched = bcrypt.compare(credential?.password,user.password)
                    if (matched){
                        return user;
                    }
                    return null;
                }else return null;
                
            },
        }),
    ],
    secret:process.env.AUTH_SECRET,
    pages:{
        signIn:'/login',
    },
    callbacks:{
        jwt:async({token,user})=>{
            if(user){
                token.role = "Candidate";
            }
            return token;
        },
        session:async({session,token})=>{
            if(session?.user){
                session.user.role = token.role;
            }
            return session;
        },
    },
    // session:{
    //     strategy:"jwt",
    //     maxAge:10,
    // }
});