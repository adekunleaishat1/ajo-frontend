
import React,{useState,useEffect, useRef} from "react";
import {BsArrowRight} from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Home = () => {
  const [show, setshow] = useState(false)
  const dropref = useRef()
  const drop = () =>{
  setshow(!show)
  }
  useEffect(() => {
    const handleClickOutside =(event) =>{
      if (dropref.current && !dropref.current.contains(event.target)) {
        setshow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropref])
  
  return (
    <div>
      <div className="bg-img">
        <nav className="top-cont">
          <div className="container-fluid d-flex justify-content-between py-2 px-2 md-px-3 ">
            <div className="">
              <img className="logo-img" src={require("./unity (1).png")} alt="" />  
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div
                className=" d-flex justify-content-around col-12 gap-5 d-none  d-md-flex" 
                
              >
                <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4 border-white">Log in</Link>
                <Link to="/signup" className="btn btn-light btn-sm rounded-pill"> Create an account</Link>
              </div>
              <div className="d-block  d-md-none">
                <button onClick={drop} className="navbar-toggler">
                 <MdMenu className="navbar-toggler-icon text-white" style={{color:"white",fontSize:"20px"}}  />
                </button>
              </div>
              <div ref={dropref} className={!show? "drop " : "drop2"}>
              <div className=" mt-5 d-flex justify-content-center align-items-center mx-auto">
               <img className="logo-img" src={require("./unity (1).png")} alt="" />  
              </div>
              <div className="mt-3 px-5">
                <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4 border-white d-block">Log in</Link>
                <Link to="/signup" className="btn btn-light btn-sm rounded-pill d-block mt-3"> Create an account</Link>
              </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="cont">
          <h1 className="text-white fs-1 fw-bold unlock">Unlock the Power of Thrift and Achieve Your Financial Goals.</h1>
           <div className="text-start mt-4 button_cont">
             <Link to="/thrift" className=" lin btn btn-secondary border-white px-5" >Create a Thrift  <BsArrowRight/> </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
