import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loguser } from "../services/Alluser";
import { useFormik } from "formik";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import {
  postingSuccessful,
  postingFailed,
  postingUser,
} from "../Redux/AlluserSlice";
import * as yup from "yup";
import axios from "axios";
import AlluserSlice from "../Redux/AlluserSlice";
// import { getuser } from '../services/Alluser'

const Login = () => {
  const { isposting, postingsuccess, postingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const [showing, setshowing] = useState(false);
  const [users, setusers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alluser } = useSelector((state) => state.AlluserSlice);

  const show = () => {
    showing ? setshowing(false) : setshowing(true);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("This field is required"),
      password: yup
        .string()
        .min(8, "password too short")
        .required("This field is required"),
    }),
    onSubmit: (value) => {
      console.log(value);
      axios.post("http://localhost:8888/user/login", value).then((res) => {
        dispatch(postingSuccessful(res.data));
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }).catch((err)=>{
        dispatch(postingFailed(err.message))
        console.log(err);
        alert(err.message)
      })
    },
  });
  console.log(formik.errors);
  return (
    <>
      <div className="content">
        <form onSubmit={formik.handleSubmit} className=" form-cont" action="">
          <div className="log">
            <h1 className="text-center">Log In</h1>
          </div>
          <div className="form-group mt-3">
            <label className="label" htmlFor="username">
              Username/Email
            </label>
            <input
              className=" inp1"
              onChange={formik.handleChange}
              name="username"
              type="text"
            />
            <small className="text-danger">{formik.errors.username}</small>
          </div>
          <div className="form-group mt-3">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="d-flex justify-content-between align-items-center rounded-pill inp">
              <input
                name="password"
                onChange={formik.handleChange}
                type={showing ? "text" : "password"}
              />
              <button type="button" onClick={show} className="eye">
                {showing ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <small className="text-danger">{formik.errors.password}</small>
          </div>
           <p className="text-end"> <Link className="pass" to="/forgot" >Forgot Password ?</Link></p>
          <div className="but mt-4">
            <button type="submit" className="mx-auto w-100 p-2">
              Log in
            </button>
          </div>
          <p className="text-center mt-3 dont">
            Don't have an account?{" "}
            <Link className="lik" to="/signup">
              Sign Up
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
