import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnethrift } from "../services/Allthrift";
import { useNavigate } from "react-router-dom";
import {Checkingtokensuccessful,Checkingtokenfailed, saveLinkBeforeLogin} from '../Redux/Jointhrift'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const JoinGroup = () => {
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()
  const { onethrift } = useSelector((state) => state.AllthriftSlice);
  console.log(onethrift);
  const {isseen, notseen} = useSelector((state) =>state.joinslice)
  let token = localStorage.getItem("token")
  console.log(token);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    getOnethrift(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    if (token == null) {
      dispatch(Checkingtokenfailed(token))
      toast.error("authentication error")
      alert("token not found")
      navigate("/login")
    }else{
      dispatch(Checkingtokensuccessful(token))
      toast.success("authentication successful")
    }
  
  }, [])
  

  const joingroup = () =>{
    if (token == null) {
      dispatch(saveLinkBeforeLogin(window.location.pathname))
      dispatch(Checkingtokenfailed())
      toast.error("token not found")
       navigate("/login")
    }else{
      dispatch(Checkingtokensuccessful(token))
      setisloading(true)
      axios.get(`https://ajo-backend.onrender.com/user/verifylink/${id}`,{
          headers:{
            "Authorization":`bearer ${token}`,
            "Content-Type": "application/json",
            "accept": "application/json"
          }
      }).then((res)=>{
        console.log(res.data.message);
        toast.success(res.data.message)
        setisloading(false)
        navigate("/dashboard")
      }).catch((err)=>{
        console.log(err.response.data.message);
        toast.error(err.response.data.message)
        setisloading(false)
      })

    }
  }

  return (
    <>
      <div className="joingroup-bg">
        <div className="join-div">
          <h1 className="text-center fs-3">Joingroup</h1>
          <div className="d-flex justify-content-between align-items-center px-5 mt-5">
            <div className="join-img">
              <img
                className="rounded-pil img-fluid"
                src={onethrift && onethrift.image}
                alt=""
              />
            </div>
            <div>
              <h1 className="fs-6">
                {onethrift && onethrift.contributionname}
              </h1>
              <p>{onethrift && onethrift.plan}</p>
            </div>
          </div>
          <div>
           <button onClick={joingroup} className="btn btn-success mx-auto mt-3">{isloading? "loading..." : "Join Group"}</button>
           <ToastContainer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGroup;
