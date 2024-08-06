import { myAxios } from "./helper";

export const signUp=(user)=>{
    return myAxios
    .post("/auth/register",user)
    .then((response)=>response.data)
}


export const loginUser=(data)=>{
    return myAxios
    .post("/auth/login",data)
    .then((response)=>response.data)
}