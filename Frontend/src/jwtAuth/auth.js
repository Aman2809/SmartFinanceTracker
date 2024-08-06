import { json } from "react-router-dom";

export const isLoggedIn=()=>{
    const data=localStorage.getItem("jwtTokenData")
    if(data==null){
        return fakse;
    }
    else{
        return true;

    }

}

export const doLogin=(jwtTokenData,next)=>{
    localStorage.setItem("jwtTokenData",JSON.stringify(jwtTokenData))
    next()
}



export const doLogout=(next)=>{
        localStorage.removeItem("JwtTokenData")
    next()
}

export const getCurrentUser=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("jwtTokenData")).user;
    }
    else{
        return false;
    }
}