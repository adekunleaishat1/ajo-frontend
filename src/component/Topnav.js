import React,{useState, useEffect} from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { BsBookHalf} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Gettingnotifysuccessful,Markallasread } from '../Redux/Allnotification'
import { useNavigate } from "react-router-dom";
import { getnotification, update } from "../services/Allnotify";
import axios from "axios";

const Topnav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isfetching, alluser, fetchingerror} =  useSelector((state) => state.AlluserSlice);
  const {message} = useSelector((state)=> state.message)
  console.log(message);
  const { gettingnotify,allnotify,gettingnotifyerror} =  useSelector((state) => state.Allnotification);
  console.log(allnotify);
 
  const [username, setusername] = useState("")
  const [count, setcount] = useState(false)
  const [newnotification, setnewnotification] = useState([])
  const [read, setread] = useState([])

  useEffect(() => {
    setread(allnotify.filter((item)=> item.isread == false))
    console.log(read.length);
  }, [allnotify])
  
  
  useEffect(() => {
    if(alluser){
      setusername(alluser.username?.slice(0,1))
      // console.log(alluser.username.slice(0,1));
    }
   
  }, [alluser]) 
  useEffect(() => {
    
  getnotification(dispatch)
   
  }, [])
  

   useEffect(() => {
      console.log(allnotify);
   }, [allnotify])
   
   const Read = () =>{
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
          <input type="text"  placeholder="Search..." />
        </div>
        <div className="bar">
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
              {/* <img src={require("../component/1-water-money-plant.png")} alt="" /> */}
            </div>

        </div>
      </div>
    </>
  );
};

export default Topnav;
