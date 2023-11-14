import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../services/Alluser";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import axios from "axios";
import {
  postingUser,
  postingSuccessful,
  postingFailed,
} from "../Redux/AlluserSlice";

const Forgotpassword = () => {
  const { isposting, postingsuccess, postingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendemail = async (res) => {
    console.log(email);
    axios
      .post("http://localhost:8888/user/reset", { email: email })
      .then((res) => {
        dispatch(postingSuccessful());
        localStorage.setItem("otp", JSON.stringify(res.data.OTP));
        alert("user found");
        navigate("/otp");
      })
      .catch((err) => {
        dispatch(postingFailed(err.message));
        alert("Error occured");
      });
    //  try {
    //  await forgotPassword(dispatch,email)
    //   if (postingsuccess) {

    //    navigate("/otp")
    //    console.log(res.data);
    //   }else{
    //     alert(postingerror)
    //   }
    //  } catch (error) {
    //    console.log(error);
    //    alert("An error occurred.");
    //  }
  };
  return (
    <>
      <div className="body">
        <div className="body2">
          <div className="iner-body">
            <div className="iner-body2">
              <div className="forg-cont">
                <h1 className="text-center fs-2 pt-3 fw-bold">
                  Forgotten Password?
                </h1>
                <p className="text-center fs-6">
                  Please enter your email so we can send you a verification code
                </p>
              </div>

              <form className="w-100 p-3  mx-auto" action="">
                <div className="form-group">
                  <label htmlFor="email">Email </label>
                  <div className="d-flex justify-content-center align-items-center email-cont">
                    {/* <CiMail/> */}
                    <IoMdMail />
                    <input
                      name="email"
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="w-100  d-flex justiify-content-center align-items-center  mt-3">
                  <div
                    onClick={sendemail}
                    className="text-center btn btn-dark  mt-2 email-but"
                  >
                    {" "}
                    Send Email
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
