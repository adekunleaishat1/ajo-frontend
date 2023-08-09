import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { BsBookHalf} from "react-icons/bs";

const Topnav = () => {
  return (
    <>
      <div className="topnav">
        <div className="dis-inp">
          <button>
            <FaSearch />
          </button>
          <input type="text" placeholder="Search..." />
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
              <img src={require("../component/1-water-money-plant.png")} alt="" />
            </div>

        </div>
      </div>
    </>
  );
};

export default Topnav;
