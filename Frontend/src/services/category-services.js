import { myAxios } from "./helper";


export const loadAllCategories=()=>{
    return myAxios.get("/incomes/categories").then(response=>{return response.data})
}