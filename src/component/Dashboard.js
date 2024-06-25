import React, { useEffect, useRef, useState } from "react";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import { useDispatch, useSelector } from "react-redux";
import { verifyuser } from "../services/Alluser";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [showsidenav, setshowsidenav] = useState(false)
  // const showref = useRef(null)
  const { isfetching, alluser, fetchingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(alluser);
    const usertoken = localStorage.getItem("token");
    if (!usertoken || fetchingerror) {
      navigate("/login");
    }else{
      verifyuser(dispatch).then((res)=>{
        // console.log(res);
      }).catch((error)=>{
        console.log(error);
        const errorMessage = error.response ? error.response.data.message : null;
        if (errorMessage && errorMessage.includes("session expired")) {
         localStorage.removeItem("token");
          navigate("/login");
        }
      })
    }
    // if (!usertoken || fetchingerror) {
    //   console.log(fetchingerror);
    //   localStorage.removeItem("token");
    //   navigate("/login");
    // } else {
    //   verifyuser(dispatch)
    // }
  }, [dispatch, navigate]);
  const drop = () =>{
    setshowsidenav(!showsidenav)
  }
   
  
  return (
    <>
      <div className="dash">
        <Sidenav showsidenav={showsidenav} setshowsidenav= {setshowsidenav}/>
        <Topnav drop={drop} showsidenav={showsidenav} />
        <div className="wid">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
