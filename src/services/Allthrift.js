import axios from "axios";
import {
    PostingFailed,
    PostingSuccessful,
    PostingThrift,
    GettingFailed,
    GettingSuccessful,
    GettingThrift
} from '../Redux/AllthriftSlice'
let endpoint = "http://localhost:8888"
let token = localStorage.getItem("token")

export const getThrift = (dispatch) =>{
    dispatch(GettingThrift())
    try {
       axios.get(`${endpoint}/user/contribution`,{
        headers:{
            Authorization: `bearer ${token}`
        }
       }) 
       .then((res)=>{
        dispatch(GettingSuccessful(res.data.Allcontribution))
        console.log(res.data);
       }).catch((err)=>{
        console.log(err);
        dispatch(GettingFailed(err.message))
       })
    } catch (error) {
        console.log(error);
        dispatch(GettingFailed(error.message))
    }
}
export const getOnethrift = (dispatch, id) =>{
    dispatch(GettingThrift())
    try {
        axios.get(`${endpoint}/user/contribution/${id}`) 
       .then((res)=>{
        dispatch(GettingSuccessful(res.data))
        console.log(res.data);
       }).catch((err)=>{
        console.log(err);
        dispatch(GettingFailed(err.message))
       })
    } catch (error) {
        console.log(error);
        dispatch(GettingFailed(error.message))
    }
}
