import React,{useState, useEffect} from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { BsBookHalf} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Gettingnotifysuccessful,Markallasread } from '../Redux/Allnotification'
import { useNavigate } from "react-router-dom";
import { getnotification, update } from "../services/Allnotify";
import axios from "axios";
import Sidenav from "./Sidenav";
import { IoMdClose } from "react-icons/io";

const Topnav = ({drop, showsidenav}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isfetching, alluser, fetchingerror} =  useSelector((state) => state.AlluserSlice);
  const { gettingnotify,allnotify,gettingnotifyerror} =  useSelector((state) => state.Allnotification);
  console.log(allnotify);
 
  const [username, setusername] = useState("")
  const [count, setcount] = useState(false)
  const [newnotification, setnewnotification] = useState([])
  const [read, setread] = useState([])
  // const [showsidenav, setshowsidenav] = useState(false)

  useEffect(() => {
    setread(allnotify.filter((item)=> item.isread == false))
    console.log(read.length);
  }, [allnotify])
  
  
  useEffect(() => {
    if(alluser){
      setusername(alluser.username?.slice(0,1))
    }
   
  }, [alluser]) 
  useEffect(() => {
    
  dispatch(getnotification)
   
  }, [dispatch])
  

   useEffect(() => {
      console.log(allnotify);
   }, [allnotify])
   
   const Read = () =>{
      const token = localStorage.getItem("token");
      try {
          axios.post("https://ajo-backend.onrender.com/user/update",
          {isread: true},
          {
              headers:{
                  Authorization: `bearer ${token}`
              }
          }).then((res)=>{
              console.log(res);
              navigate('/dashboard/message') 
          }).catch((err)=>{
              console.log(err);
          })
      } catch (error) {
          console.log(error);
      }
      
   }

  return (
    <>
      <div className="topnav">
        <div className="dis-inp">
          <button>
            <FaSearch />
          </button>
          <div className="position-fixed top-0 start-0">
           {showsidenav &&
           
            <Sidenav/>}
          </div>
          <input type="text"  placeholder="Search..." />
        </div>
        <div onClick={drop} className="bar">
          <FaBars/>
        </div>
        <div className="icon-div"> 
            <button className="icon-notify">
              <AiTwotoneNotification className="notification-icon" />
            </button>
            <button className="icon-notify">
              <BsBookHalf />
            </button>
            <button onClick={Read} className="icon-notify">
              <div className={read.length == 0? "notify bg-light" : "notify bg-danger"}>{read.length == 0  ? "" : read.length}</div>
              <FaBell className="bell-icon" />
            </button>
            <div className="icon_img">
              <div>
                <h1>{username}</h1>
              </div>
            </div>
            <div onClick={drop}>
              {showsidenav &&
              <IoMdClose />
              }
           </div>

        </div>
      </div>
    </>
  );
};

export default Topnav;
