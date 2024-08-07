import { json } from "react-router-dom";

export const isLoggedIn=()=>{
    const data=localStorage.getItem("jwtTokenData")
    if(data==null){
        return false;
    }
    else{
        return true;

    }

}

export const doLogin=(jwtTokenData,next)=>{
    localStorage.setItem("jwtTokenData",JSON.stringify(jwtTokenData));
    next()
};



export const doLogout = (next) => {
    localStorage.removeItem("jwtTokenData"); // Fixed key name
    next();
  };

export const getCurrentUser=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("jwtTokenData"))?.user;
    }
    else{
        return undefined;
    }
}


export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("jwtTokenData")).jwt
    }
    else{
        return null;
    }
}