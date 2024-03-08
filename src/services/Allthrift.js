import axios from "axios";
import {
    PostingFailed,
    PostingSuccessful,
    PostingThrift,
    GettingFailed,
    GettingSuccessful,
    GettingThrift,
    FetchingThrift,
    FetchingthriftSuccessful,
    FetchingthriftFailed
} from '../Redux/AllthriftSlice'
let endpoint = "https://ajo-backend.onrender.com"
let token = localStorage.getItem("token")
console.log(token);

export const getThrift = (dispatch) =>{
    dispatch(GettingThrift())
    try {
  axios.get(`${endpoint}/user/contribution`,{
            headers:{
                "Authorization":`bearer ${token}`,
                "Content-Type": "application/json",
                "accept": "application/json"
              }
       }) 
       .then((res)=>{
        dispatch(GettingSuccessful(res.data.Allcontribution))
        console.log(res.data);
       }).catch((err)=>{
        console.log(err);
        const errormessage = err?.response?.data?.message 
        dispatch(GettingFailed(errormessage))
       })
    } catch (error) {
        console.log(error);
        dispatch(GettingFailed(error.message))
    }
}
export const getOnethrift = (dispatch, id) =>{
    dispatch(FetchingThrift())
    try {
        axios.get(`${endpoint}/user/onecontribution/${id}`) 
       .then((res)=>{
        dispatch(FetchingthriftSuccessful(res.data.contribution))
        console.log(res);
        console.log(res.data);
       }).catch((err)=>{
        console.log(err);
        const errormessage = err?.response?.data?.message 
        dispatch(FetchingthriftFailed(errormessage))
       })
    } catch (error) {
        console.log(error);
        const errormessage = error?.response?.data?.message 
        dispatch(FetchingthriftFailed(errormessage))
    }
}
