import {auth} from "./app/auth";


export default auth((req)=>{
    const isLoggedIn = !!req.auth;
    const {nextUrl} = req;

    if(nextUrl.pathname == "/login"){
        return null;
    }
    if(!isLoggedIn && nextUrl.pathname != "/login"){
        return Response.redirect(new URL("/login",nextUrl))
    }
});

export const config = {
    matcher: ["/dashboard","/profile"],
  };