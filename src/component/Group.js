import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getThrift } from "../services/Allthrift";
import Preloader from "./Preloader";

const Group = () => {
  const [thrifts, setthrifts] = useState([]);
  const navigate = useNavigate()
  const { isgetting, allthrift, gettingerror } = useSelector(
    (state) => state.AllthriftSlice
  );
  console.log(allthrift);
  
  const dispatch = useDispatch();
  useEffect(() => {
    getThrift(dispatch);
    if (gettingerror) {
      alert(gettingerror);
    } else {
      dispatch(getThrift)
    }
  }, []);
  console.log(allthrift);
  useEffect(() => {
   
      console.log(allthrift);
      if (allthrift) {
        console.log(allthrift);
        setthrifts(allthrift);
        console.log(thrifts);
      }
 
  }, [allthrift]);

  

  const show = (e, i) => {
    console.log(e.target);
    console.log(i);
    const clickedThrift = thrifts[i];
    const id = clickedThrift._id
    console.log(id);
    navigate(`onegroup/${id}`)
  };

  return (
    <>
      <div>
        {
          isgetting &&
         (
          <Preloader/>
         )
        }
        {
        allthrift === null? (
          <div className="bg_img"></div>
        ) : (
          allthrift.map((el, i) => (
            <div onClick={event => show(event, i)} className="bc mt-3 mb-3" key={i}>
              <div className="bc-iner">
                <div className="bc-img col-3">
                  <img className="img-fluid" src={el.image} alt="" />
                </div>
                <div className="bc-text">
                  <h1>{el.contributionname}</h1>
                  <span>{"₦" + el.amount}</span> <span>{el.plan + "pack"}</span>{" "}
                  . <span>{el.nopeople + "members"}</span>
                  {/* <Link to={`onegroup/${el._id}`}>see more</Link> */}
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M21 5.25C29.6986 5.25 36.75 12.3015 36.75 21C36.75 29.6986 29.6986 36.75 21 36.75C12.3015 36.75 5.25 29.6986 5.25 21C5.25 12.3015 12.3015 5.25 21 5.25Z"
                    stroke="black"
                    stroke-opacity="0.3"
                    stroke-width="6"
                    stroke-linecap="round"
                  />
                  <path
                    d="M21 5.25C29.6986 5.25 36.75 12.3015 36.75 21"
                    stroke="#6672EA"
                    stroke-width="6"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          ))
        )}
        <div className="text-center mx-auto">
          <Link to="/dashboard/group/thrift">+ Create a Thrift</Link>
        </div>
      </div>
    </>
  );
};

export default Group;
