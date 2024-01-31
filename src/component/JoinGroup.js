import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnethrift } from "../services/Allthrift";

const JoinGroup = () => {
  const { onethrift } = useSelector((state) => state.AllthriftSlice);
  console.log(onethrift);
  let token = localStorage.getItem("token")
  console.log(token);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    getOnethrift(dispatch, id);
  }, [dispatch, id]);

  const joingroup = () =>{
    if (token == null) {
      alert("token not found ")
    }else{
      alert("token found")
    }
  }

  return (
    <>
      <div className="joingroup-bg">
        <div className="join-div">
          <h1 className="text-center">joingroup</h1>
          <div className="d-flex justify-content-between align-items-center px-5">
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
          <button onClick={joingroup} className="btn btn-success mx-auto mt-3">Join Group</button>
        </div>
      </div>
    </>
  );
};

export default JoinGroup;
