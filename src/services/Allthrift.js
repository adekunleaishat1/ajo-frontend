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


export const getallThrift = async (dispatch, token) =>{
    console.log(token);
    dispatch(GettingThrift())
    try {
  await axios.get(`${endpoint}/user/contribution`,{
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
        const errormessage = err?.response?.data?.message 
        console.log(errormessage);
        dispatch(GettingFailed(errormessage))
       })
    } catch (error) {
        console.log(error);
        const errormessage = error?.response?.data?.message 
        dispatch(GettingFailed(errormessage))
    }
}

export const getOnethrift = async (dispatch, id) =>{
    dispatch(FetchingThrift())
    try {
      await axios.get(`${endpoint}/user/onecontribution/${id}`) 
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
