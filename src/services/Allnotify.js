import axios from 'axios'
import io from 'socket.io-client';
import {
    Gettingnotify,
    Gettingnotifysuccessful,
    GettingnotifyFailed
} from '../Redux/Allnotification'

const socket = io("https://ajo-backend.onrender.com", {
    transports: ['websocket', 'polling'],
});

export const getnotification = async (dispatch) =>{
    dispatch(Gettingnotify())
    const token = localStorage.getItem("token");
    socket.emit('authenticate', token);

    socket.on('notification', (notification) => {
        console.log("notificatiion received");
        dispatch(Gettingnotifysuccessful(notification.notify));
    });
    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        dispatch(GettingnotifyFailed('Socket connection error'));
    });

    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        if (reason === 'io server disconnect') {
            socket.connect(); // Reconnect manually if server disconnects
        }
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
            // console.log(res.data.notify);
            // dispatch(Gettingnotifysuccessful(res.data.notify))
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

