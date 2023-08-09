import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { postuser } from '../services/Alluser'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'



const Signup = () => {
    const {isposting , postingsuccess, postingerror} = useSelector((state) => state.AlluserSlice)
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
       onSubmit: (data) =>{
        postuser(dispatch, data);
        navigate("/login")
       }
     
    })
    console.log(formik.errors)
  return (
    <>
      <div className='content'>
      <form onSubmit={formik.handleSubmit} className=' form-cont2' action="">
        {postingerror? postingerror: null}
        {postingsuccess? postingsuccess: null}
            <div className='log1'>
              <h1 className='text-center'>Create account</h1>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="username">Username</label>
               <input className='inp1' name='username' id='username' onChange={formik.handleChange} type="text" />
               <small className='text-danger'>{formik.errors.username}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="email">Email</label>
               <input className='inp1' name='email' id='email' onChange={formik.handleChange} type="text" />
               <small className='text-danger'>{formik.errors.email}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="bvn">Bvn</label>
               <input className=' inp1' name='bvn' id='bvn' onChange={formik.handleChange} type="number" />
               <small className='text-danger'>{formik.errors.bvn}</small>
            </div>
            <div className='form-group mt-3'>
                <label className='label' htmlFor="password">Password</label>
                <div className='d-flex justify-content-between align-items-center inp'>
                 <input name='password' id='password' onChange={formik.handleChange} type={showing?"text":"password"} />
                 <button type='button' onClick={show} className='eye'>{showing? <FaEye />: <FaEyeSlash/>}</button> 
                </div>
                <small className='text-danger'>{formik.errors.password}</small>
            </div>
            <div className='but mt-4'>
                <button type='submit' className='mx-auto w-100 p-2'>{isposting? "Loading": "Sign up"}</button>
            </div>
            <p className='text-center mt-2 dont'>Already have an account? <Link className='lik' to="/login">Sign In</Link> </p>
          </form>
      </div>
    </>
  )
}

export default Signup