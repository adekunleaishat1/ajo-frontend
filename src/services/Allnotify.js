import axios from 'axios'

import {
    Gettingnotify,
    Gettingnotifysuccessful,
    GettingnotifyFailed
} from '../Redux/Allnotification'

export const getnotification = async (dispatch) =>{
    dispatch(Gettingnotify())
    const token = localStorage.getItem("token");
    try {
     await axios.get("https://ajo-backend.onrender.com/user/notify",
        {
            headers:{
                "Authorization":`bearer ${token}`,
                "Content-Type": "application/json",
                "accept": "application/json"
             }
        }).then((res)=>{
            console.log(res.data.notify);
            dispatch(Gettingnotifysuccessful(res.data.notify))
        }).catch((err)=>{
            console.log(err);
            const errormessage = err?.response?.data?.message
            dispatch(GettingnotifyFailed(errormessage))
        })
    } catch (error) {
        const errormessage = error?.response?.data?.message
        dispatch(GettingnotifyFailed(errormessage))
        console.log(error);
    }
 } 

