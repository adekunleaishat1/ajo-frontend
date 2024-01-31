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
        // dispatch(GettingFailed(err.res.data.message))
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
        dispatch( FetchingthriftSuccessful(res.data.contribution))
        console.log(res);
        console.log(res.data);
       }).catch((err)=>{
        console.log(err);
        dispatch(FetchingthriftFailed(err.message))
       })
    } catch (error) {
        console.log(error);
        dispatch(FetchingthriftFailed(error.message))
    }
}
