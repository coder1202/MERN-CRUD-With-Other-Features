import { commonrequest } from "./ApiCall"
import { BASE_URL } from "./helper"

export const registerfunc = async(data, header) => {
        return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
    }
    //for useget
export const usergetfunc = async(search, gender, status, sort) => {
        //here dom't need to set header
        //query param ?
        return await commonrequest("GET", `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}`, "");
    }
    //for single user get 
export const singleUsergetfunc = async(id) => {
        //"" empty string
        return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
    }
    //edit id this update che aetle
export const editfunc = async(id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/user/edit/${id}`, data, header);
}
export const deletefunc = async(id) => {
    //{} empty object
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
}
export const statuschangefunc = async(id, data) => {
    //{} empty object
    return await commonrequest("PUT", `${BASE_URL}/user/status/${id}`, { data });
}
export const exporttocsvfunc = async() => {
    return await commonrequest("GET", `${BASE_URL}/userexport`, "");
}