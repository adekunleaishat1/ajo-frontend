import axios from 'axios'
import io from 'socket.io-client';
import {
    Gettingnotify,
    Gettingnotifysuccessful,
    GettingnotifyFailed
} from '../Redux/Allnotification'

// const socket = io("https://ajo-backend.onrender.com", {
//     transports: ['websocket', 'polling'],  
//     withCredentials: true,
//     path: "/socket.io"  
// });

export const getnotification = async (dispatch, socket) =>{
    dispatch(Gettingnotify())
    const token = localStorage.getItem("token");
    socket.emit('authenticate', token);

    socket.on('notification',(notification) => {
        console.log("notificatiion received", notification);
        dispatch(Gettingnotifysuccessful(notification.notify));
    });

    try {
     await axios.get("https://ajo-backend.onrender.com/user/notify",
        {
            headers:{
                "Authorization":`bearer ${token}`,
                "Content-Type": "application/json",
                "accept": "application/json"
             }
        }).then((res)=>{
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

