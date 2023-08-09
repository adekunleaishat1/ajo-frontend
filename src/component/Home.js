
import React from "react";
import {BsArrowRight} from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-img">
        <nav className="navbar navbar-expand-lg top-cont">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <div
                className=" d-flex justify-content-around col-3"
                role="search"
              >
                <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4 border-white">Log in</Link>
                <Link to="/signup" className="btn btn-light btn-sm rounded-pill"> Create an account</Link>
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
