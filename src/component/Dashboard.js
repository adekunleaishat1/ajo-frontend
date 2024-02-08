import React, { useEffect } from "react";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import { useDispatch, useSelector } from "react-redux";
import { verifyuser } from "../services/Alluser";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { isfetching, alluser, fetchingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(alluser);
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      console.log(fetchingerror);
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      verifyuser(dispatch)
    }
  }, []);

  return (
    <>
      <div className="dash">
        <Sidenav />
        <Topnav />
        <div className="wid">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
