import React,{useEffect} from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { BsBookHalf} from "react-icons/bs";
import { useSelector } from "react-redux";

const Topnav = () => {
  const {isfetching, alluser, fetchingerror} =  useSelector((state) => state.AlluserSlice);

  useEffect(() => {
    console.log(alluser);
    console.log(alluser.username);
  }, []) 

  return (
    <>
      <div className="topnav">
        <div className="dis-inp">
          <button>
            <FaSearch />
          </button>
          <input type="text"  placeholder="Search..." />
        </div>
        <div className="icon-div"> 
            <button className="icon">
              <AiTwotoneNotification className="notification-icon" />
            </button>
            <button className="icon">
              <BsBookHalf />
            </button>
            <button className="icon">
              <FaBell className="bell-icon" />
            </button>
            <div className="icon_img">
              <div>
                <h1>{alluser.username}</h1>
              </div>
              {/* <img src={require("../component/1-water-money-plant.png")} alt="" /> */}
            </div>

        </div>
      </div>
    </>
  );
};

export default Topnav;
