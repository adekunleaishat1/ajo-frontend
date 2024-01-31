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
import { ToastContainer , toast} from "react-toastify";
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
    onSubmit: async (value) => {
      console.log(value);
      try {
        dispatch(postingUser())
    await  axios.post("https://ajo-backend.onrender.com/user/login", value).then((res) => {
        dispatch(postingSuccessful(res.data.message));
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message)
        setTimeout(()=>{
          navigate("/dashboard");
        },[5000])
        formik.setValues({
          username: "",
          password: "",
        })
      }).catch((err)=>{
        dispatch(postingFailed(err.response.data.message))
        toast.error(err.response.data.message)
        formik.setValues({
          username: "",
          password: "",
        })
      })
      } catch (error) {
        console.log(error);
        toast.error(error)
        formik.setValues({
          username: "",
          password: "",
        })
      }  
    },
  });
  // console.log(formik.errors);
  // console.log(formik.touched);
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
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
              type="text"
            />
            <small className="text-danger">{formik.touched.username && formik.errors.username ? formik.errors.username : ""}</small>
          </div>
          <div className="form-group mt-3">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="d-flex justify-content-between align-items-center rounded-pill inp">
              <input
              value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showing ? "text" : "password"}
              />
              <button type="button" onClick={show} className="eye">
                {showing ? <FaEye /> : <FaEyeSlash />}
              </button>
              <ToastContainer/>
            </div>
            <small className="text-danger">{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</small>
          </div>
           <p className="text-end"> <Link className="pass" to="/forgot" >Forgot Password ?</Link></p>
          <div className="but mt-4">
            <button type="submit" className="mx-auto w-100 p-2">
              {isposting? "loading..." : "Log in"}
            </button>
          </div>
          <p className="text-center mt-1 dont">
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
