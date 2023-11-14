import axios from 'axios'

import {
    Gettingnotify,
    Gettingnotifysuccessful,
    GettingnotifyFailed
} from '../Redux/Allnotification'

export const getnotification = (dispatch) =>{
    dispatch(Gettingnotify())
    const token = localStorage.getItem("token");
    try {
        axios.get("http://localhost:8888/user/notify",
        {
            headers:{
                Authorization: `bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data.notify);
            dispatch(Gettingnotifysuccessful(res.data.notify))
        }).catch((err)=>{
            console.log(err);
            dispatch(GettingnotifyFailed(err.message))
        })
    } catch (error) {
        console.log(error);
    }
 } 

 export const update = (dispatch) =>{
    const token = localStorage.getItem("token");
    try {
        axios.post("http://localhost:8888/user/update",
        {isread: true},
        {
            headers:{
                Authorization: `bearer ${token}`
            }
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
 }