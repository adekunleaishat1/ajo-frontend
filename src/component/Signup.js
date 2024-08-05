import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { postuser } from '../services/Alluser'
import { postingFailed, postingUser, postingSuccessful } from '../Redux/AlluserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import * as yup from 'yup'



const Signup = () => {
    // const {isposting , postingsuccess, postingerror} = useSelector((state) => state.AlluserSlice)
    const [isposting, setisposting] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [bvn, setbvn] = useState('')
    const [password, setpassword] = useState('')
    const [showing, setshowing] = useState(false)


    // const addpost = async (e) =>{
    //   e.preventDefault()
    //     let data = {username, email , bvn, password}
    //     console.log(data);  
    //     await postuser(dispatch, data); 
    //     console.log(dispatch);
    //     if (postingsuccess) {
    //       alert("posting successful")
    //       navigate("/login"); 
    //     }else{
    //       console.log(postingerror);
    //       alert('An error occurred during signup.');
    //     }
    // }

    const show = () =>{
      showing? setshowing(false):setshowing(true)
    }

    const formik = useFormik({
      initialValues:{
        username: "",
        email: "",
        bvn: "",
        password: "",
       },
       validationSchema: yup.object({
        username:yup.string().min(5,"name too short").required("This field is required"),
        email:yup.string().email("must be a valid email").required("This field is required"),
        bvn:yup.number().min(10).required("This field is required"),
        password:yup.string().min(8, "password too short").required("This field is required")
       }),
       onSubmit:async (data) =>{
        console.log(data);
        try {
          setisposting(true)
          dispatch(postingUser())
       await axios.post("https://ajo-backend.onrender.com/user/signup", data).then((res)=>{
          setisposting(false)
            dispatch(postingSuccessful(res.data.message))
            toast.success(res.data.message)
            setTimeout(()=>{
              navigate("/login")
            },[5000])
            formik.setValues({
              username: "", 
              email: "",
              bvn: "",
              password: "",
            });
            console.log(formik.values);
        }).catch((err)=>{
            setisposting(false)
            dispatch(postingFailed(err?.response?.data?.message))
            toast.error(err.response.data.message)
            formik.setValues({
              username: "", 
              email: "",
              bvn: "",
              password: "",
            });
            console.log(formik.values);
        })
        } catch (error) {
           console.log(error)
           toast.error(error?.response?.data?.message)
        }
       }
     
    })
  return (
    <>
      <div className='content'>
      <form onSubmit={formik.handleSubmit} className=' form-cont2' action="">
        {/* {postingerror? postingerror: null}
        {postingsuccess? postingsuccess: null} */}
            <div className='log1'>
              <h1 className='text-center'>Create account</h1>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="username">Username</label>
               <input value={formik.values.username} className='inp1' name='username' id='username' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
               <small className='text-danger'>{formik.touched.username? formik.errors.username : ""}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="email">Email</label>
               <input value={formik.values.email} className='inp1' name='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
               <small className='text-danger'>{formik.touched.email ? formik.errors.email : ""}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="bvn">Bvn</label>
               <input value={formik.values.bvn} className=' inp1' name='bvn' id='bvn' onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" />
               <small className='text-danger'>{formik.touched.bvn ? formik.errors.bvn : ""}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="password">Password</label>
                <div className='d-flex justify-content-between align-items-center inp'>
                 <input className='tw-w-[95%]' value={formik.values.password} name='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} type={showing?"text":"password"} />
                 <button type='button' onClick={show} className='eye'>{showing? <FaEye />: <FaEyeSlash/>}</button> 
                </div>
                <small className='text-danger'>{formik.touched.password ? formik.errors.password : ""}</small>
            </div>
            <div className='but mt-4'>
                <button type='submit' className='mx-auto w-100 p-2'>{isposting? "Loading...": "Sign up"}</button>
                <ToastContainer/>
            </div>
            <p className='text-center mt-2 dont'>Already have an account? <Link className='lik' to="/login">Sign In</Link> </p>
          </form>
      </div>
    </>
  )
}

export default Signup